"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./CausticPool.module.css";
import {
  approach,
  brushStrength,
  CAUSTIC_DEFAULTS,
  CAUSTIC_PRESETS,
  ghostPos,
  MAX_DROPS,
  RENDER,
  RENDER_UNIFORMS,
  UPDATE,
  UPDATE_UNIFORMS,
  uName,
  VERT,
  type CausticParams,
  type Slot,
  type Vec3,
} from "./causticPrograms";

/**
 * Shallow water lit from above. A wave equation runs on a ping-ponged float
 * texture; the render pass reads that height field as a lens, so the bright
 * veins land where the surface actually focuses light.
 *
 * The pool stirs itself with ambient drops and a wandering ghost cursor.
 * Nothing here listens to the pointer.
 */
export type CausticPoolProps = {
  /** Explicit height: the canvas fills this box. */
  height?: string;
  preset?: keyof typeof CAUSTIC_PRESETS;
  params?: Partial<CausticParams>;
  /** Simulation grid. 512 is lovely and costs four times 256. */
  resolution?: 128 | 256 | 512;
  className?: string;
};

export function CausticPool({
  height = "100svh",
  preset = "calm",
  params,
  resolution = 256,
  className = "",
}: CausticPoolProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const resolved = useMemo<CausticParams>(
    () => ({ ...CAUSTIC_DEFAULTS, ...(CAUSTIC_PRESETS[preset] ?? {}), ...(params ?? {}) }),
    [preset, params],
  );
  // The loop reads through a ref, so tuning a value never restarts WebGL.
  const paramsRef = useRef(resolved);
  paramsRef.current = resolved;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      depth: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      setFailed(true);
      return;
    }
    // Rendering into a float texture is the whole technique.
    const float = gl.getExtension("EXT_color_buffer_float");
    const half = gl.getExtension("EXT_color_buffer_half_float");
    if (!float && !half) {
      setFailed(true);
      return;
    }
    gl.getExtension("OES_texture_half_float_linear");

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("CausticPool:", gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };
    const link = (vs: string, fs: string) => {
      const vertex = compile(gl.VERTEX_SHADER, vs);
      const fragment = compile(gl.FRAGMENT_SHADER, fs);
      const program = vertex && fragment ? gl.createProgram() : null;
      if (!program || !vertex || !fragment) return null;
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("CausticPool:", gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    const stepProgram = link(VERT, UPDATE);
    const drawProgram = link(VERT, RENDER);
    if (!stepProgram || !drawProgram) {
      setFailed(true);
      return;
    }

    const findUniforms = (program: WebGLProgram, slots: Slot[], fixed: string[]) => {
      const tuned = slots.map(([key, kind]) => [gl.getUniformLocation(program, uName(key)), key, kind] as const);
      const named: Record<string, WebGLUniformLocation | null> = {};
      for (const name of fixed) named[name] = gl.getUniformLocation(program, name);
      return { tuned, named };
    };
    const stepU = findUniforms(stepProgram, UPDATE_UNIFORMS, ["uState", "uTexel", "uAspect", "uDropCount", "uDrops"]);
    const drawU = findUniforms(drawProgram, RENDER_UNIFORMS, ["uState", "uTexel", "uResolution", "uTime", "uAspect"]);

    const upload = (uniforms: typeof stepU, p: CausticParams) => {
      for (const [location, key, kind] of uniforms.tuned) {
        const value = p[key];
        if (kind === "c") {
          const color = value as Vec3;
          gl.uniform3f(location, color[0] / 255, color[1] / 255, color[2] / 255);
        } else if (kind === "v") {
          const vector = value as Vec3;
          gl.uniform3f(location, vector[0], vector[1], vector[2]);
        } else if (kind === "i") {
          gl.uniform1i(location, (value as number) | 0);
        } else {
          gl.uniform1f(location, value as number);
        }
      }
    };

    const grid = resolution;
    const makeTarget = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, grid, grid, 0, gl.RGBA, gl.HALF_FLOAT, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return { tex, fbo };
    };
    const targets = [makeTarget(), makeTarget()];
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      setFailed(true);
      return;
    }
    for (const target of targets) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      gl.viewport(0, 0, grid, grid);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    let read = 0;
    const vao = gl.createVertexArray();

    let cssWidth = 1;
    let cssHeight = 1;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = Math.max(canvas.clientWidth, 1);
      cssHeight = Math.max(canvas.clientHeight, 1);
      const width = Math.floor(cssWidth * dpr);
      const height = Math.floor(cssHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const dropData = new Float32Array(MAX_DROPS * 4);
    let queued: number[][] = [];
    const drop = (x: number, y: number, strength: number, radius: number) => {
      if (queued.length < MAX_DROPS) queued.push([x, y, strength, radius]);
    };
    const flushDrops = () => {
      const count = Math.min(queued.length, MAX_DROPS);
      for (let i = 0; i < count; i++) dropData.set(queued[i], i * 4);
      queued = [];
      return count;
    };

    type Source = {
      px: number; py: number; ax: number; ay: number;
      sx: number; sy: number; phx: number; phy: number;
      next: number; period: number;
    };
    let sources: Source[] = [];
    const seedSources = (count: number) => {
      sources = [];
      for (let i = 0; i < count; i++) {
        sources.push({
          px: 0.2 + 0.6 * Math.random(), py: 0.2 + 0.6 * Math.random(),
          ax: 0.1 + 0.1 * Math.random(), ay: 0.1 + 0.1 * Math.random(),
          sx: 0.05 + 0.08 * Math.random(), sy: 0.05 + 0.08 * Math.random(),
          phx: Math.random() * 6.28, phy: Math.random() * 6.28,
          next: Math.random() * 1.2, period: 0.7 + Math.random() * 1.1,
        });
      }
    };
    seedSources(resolved.ambientCount);
    let sourceCount = resolved.ambientCount;

    const t0 = performance.now();
    const clock = () => (performance.now() - t0) / 1000;

    const onLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onRestored = () => setGeneration((value) => value + 1);
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    let ghostEnvelope = 0;
    let ghostX = 0.5;
    let ghostY = 0.5;
    let ghostSeeded = false;

    const stirAmbient = (t: number, step: number) => {
      const p = paramsRef.current;
      if (!p.ambient) return;
      if (p.ambientCount !== sourceCount) {
        seedSources(p.ambientCount);
        sourceCount = p.ambientCount;
      }
      for (const source of sources) {
        source.next -= step;
        if (source.next > 0) continue;
        source.next = (source.period / Math.max(p.ambientRate, 0.05)) * (0.7 + Math.random() * 0.6);
        const x = Math.min(Math.max(source.px + source.ax * Math.sin(t * source.sx * 6.28 + source.phx), 0.06), 0.94);
        const y = Math.min(Math.max(source.py + source.ay * Math.cos(t * source.sy * 6.28 + source.phy), 0.06), 0.94);
        drop(x, y, p.ambientStrength, p.ambientRadius * (0.7 + Math.random() * 0.6));
      }
    };

    const stirGhost = (t: number, step: number) => {
      const p = paramsRef.current;
      ghostEnvelope = approach(ghostEnvelope, p.ghost ? 1 : 0, step, p.ghostFade);
      const [gx, gy] = ghostPos(t, p.ghostSpeed);
      if (!ghostSeeded) {
        ghostX = gx;
        ghostY = gy;
        ghostSeeded = true;
      }
      if (ghostEnvelope > 0.001) {
        const distance = Math.hypot(gx - ghostX, gy - ghostY);
        const magnitude = brushStrength(distance, p) * ghostEnvelope * p.ghostGain;
        if (magnitude > 1e-4) drop(gx, gy, magnitude, p.brushRadius);
      }
      ghostX = gx;
      ghostY = gy;
    };

    let pulseIn = 0;
    const stirPulse = (step: number) => {
      const p = paramsRef.current;
      if (p.pulsePeriod <= 0) return;
      pulseIn -= step;
      if (pulseIn > 0) return;
      pulseIn = p.pulsePeriod;
      drop(p.pulseX, p.pulseY, p.ambientStrength, p.ambientRadius);
    };

    const stepOnce = (step: number) => {
      const t = clock();
      stirAmbient(t, step);
      stirPulse(step);
      stirGhost(t, step);
      const count = flushDrops();
      const source = targets[read];
      const destination = targets[read ^ 1];

      gl.useProgram(stepProgram);
      gl.bindVertexArray(vao);
      gl.bindFramebuffer(gl.FRAMEBUFFER, destination.fbo);
      gl.viewport(0, 0, grid, grid);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, source.tex);
      gl.uniform1i(stepU.named.uState, 0);
      gl.uniform2f(stepU.named.uTexel, 1 / grid, 1 / grid);
      gl.uniform1f(stepU.named.uAspect, cssWidth / cssHeight);
      gl.uniform1i(stepU.named.uDropCount, count);
      gl.uniform4fv(stepU.named.uDrops, dropData);
      upload(stepU, paramsRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      read ^= 1;
    };

    const paint = () => {
      gl.useProgram(drawProgram);
      gl.bindVertexArray(vao);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, targets[read].tex);
      gl.uniform1i(drawU.named.uState, 0);
      gl.uniform2f(drawU.named.uTexel, 1 / grid, 1 / grid);
      gl.uniform2f(drawU.named.uResolution, canvas.width, canvas.height);
      gl.uniform1f(drawU.named.uTime, clock());
      gl.uniform1f(drawU.named.uAspect, cssWidth / cssHeight);
      upload(drawU, paramsRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let last = performance.now();
    let accumulated = 0;
    const frame = (now: number) => {
      raf = 0;
      const p = paramsRef.current;
      let delta = (now - last) / 1000;
      if (delta > 0.25) delta = 0.25;
      last = now;
      const step = 1 / Math.max(p.simRate, 1);

      // Fixed-step integration: the wave equation is only stable at the rate it
      // was tuned for, so a slow frame takes several steps rather than one big
      // one — capped, or a stalled tab wakes up and detonates the pool.
      accumulated += delta;
      let taken = 0;
      while (accumulated >= step && taken < p.maxSub) {
        stepOnce(step);
        accumulated -= step;
        taken++;
      }
      if (taken === 0 && accumulated > 0) {
        stepOnce(step);
        accumulated = 0;
      }

      paint();
      raf = requestAnimationFrame(frame);
    };

    // Flat water is a single flat colour, so run the wave out before the first
    // paint and the pool is already lit the moment anyone sees it.
    // A pulsing pool starts from its own ring, not a scatter of drops.
    for (let i = 0; i < 6 && resolved.pulsePeriod <= 0; i++) {
      drop(
        0.2 + 0.6 * Math.random(),
        0.2 + 0.6 * Math.random(),
        0.05 + 0.07 * Math.random(),
        0.035 + 0.03 * Math.random(),
      );
      if (i % 3 === 2) stepOnce(1 / 60);
    }
    // A pulsing pool runs its rings out across the screen first, so it opens already rippling.
    const warmup = resolved.pulsePeriod > 0 ? 60 * 20 : 26;
    for (let i = 0; i < warmup; i++) stepOnce(1 / 60);

    if (reduced) {
      paint();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      for (const target of targets) {
        gl.deleteFramebuffer(target.fbo);
        gl.deleteTexture(target.tex);
      }
      gl.deleteVertexArray(vao);
      gl.deleteProgram(stepProgram);
      gl.deleteProgram(drawProgram);
    };
  }, [resolution, reduced, generation]);

  return (
    <div className={`${styles.pool} ${className}`} style={{ height }} aria-hidden="true">
      {failed ? <div className={styles.fallback} /> : <canvas ref={canvasRef} className={styles.canvas} />}
    </div>
  );
}
