"use client";

import { useEffect, useRef } from "react";
import { fragmentShaderSource, vertexShaderSource } from "./shoreShader";

const DEFAULT_MAX_PIXELS = 4_500_000;
const STATIC_FRAME_TIME = 3.4;

type ShoreBackgroundProps = {
  className?: string;
  /** Photograph used for the dry sand. Pass null for the procedural sand alone. */
  sandUrl?: string | null;
  /** Render budget. Higher is sharper sand, and more work per frame. */
  maxPixels?: number;
  /** Playback rate of the swash cycle. 1 = ~21s per wave. */
  speed?: number;
  /** Viewport heights of scrolling over which the wave sweeps in and leaves sand. */
  scrollRange?: number;
};

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShoreBackground({
  className,
  speed = 1,
  scrollRange = 1,
  sandUrl = null,
  maxPixels = DEFAULT_MAX_PIXELS,
}: ShoreBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(speed);
  speedRef.current = speed;
  const scrollRangeRef = useRef(scrollRange);
  scrollRangeRef.current = scrollRange;
  const maxPixelsRef = useRef(maxPixels);
  maxPixelsRef.current = maxPixels;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "uResolution");
    const timeLocation = gl.getUniformLocation(program, "uTime");
    const scrollLocation = gl.getUniformLocation(program, "uScroll");
    const sandMixLocation = gl.getUniformLocation(program, "uSandMix");

    const sandTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sandTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([190, 155, 120, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(program, "uSand"), 0);
    gl.uniform1f(sandMixLocation, 0);

    let image: HTMLImageElement | null = null;
    if (sandUrl) {
      image = new Image();
      image.onload = () => {
        const source = image as HTMLImageElement;
        gl.bindTexture(gl.TEXTURE_2D, sandTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        gl.uniform1f(sandMixLocation, 1);
        if (!frame) draw(clock);
      };
      image.src = sandUrl;
    }

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      const budget = Math.sqrt(maxPixelsRef.current / Math.max(clientWidth * clientHeight, 1));
      const dpr = Math.min(window.devicePixelRatio || 1, 2, budget);
      const width = Math.max(Math.round(clientWidth * dpr), 1);
      const height = Math.max(Math.round(clientHeight * dpr), 1);
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolutionLocation, width, height);
    };

    const draw = (time: number) => {
      const range = Math.max(window.innerHeight * scrollRangeRef.current, 1);
      gl.uniform1f(scrollLocation, Math.min(window.scrollY / range, 1));
      gl.uniform1f(timeLocation, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = performance.now();
    let clock = STATIC_FRAME_TIME;

    const loop = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      clock += delta * speedRef.current;
      resize();
      draw(clock);
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const start = () => {
      if (frame || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const sync = () => {
      stop();
      if (reducedMotion.matches) {
        resize();
        draw(clock);
        return;
      }
      start();
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (!frame) draw(clock);
    });
    observer.observe(canvas);

    // While the loop is parked the scroll position still has to reach the shader.
    const onScroll = () => {
      if (!frame) draw(clock);
    };

    sync();
    reducedMotion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      observer.disconnect();
      reducedMotion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", onScroll);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(sandTexture);
      if (image) image.onload = null;
    };
  }, [sandUrl]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        background: "#be9b78",
        zIndex: -1,
      }}
    />
  );
}
