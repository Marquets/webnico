export type Vec3 = [number, number, number];

export type CausticParams = {
  propagation: number;
  damping: number;
  edgeWidth: number;
  edgeDamp: number;
  clampH: number;
  simRate: number;
  maxSub: number;
  ambient: boolean;
  ambientCount: number;
  ambientStrength: number;
  ambientRate: number;
  ambientRadius: number;
  ghost: boolean;
  ghostFade: number;
  ghostSpeed: number;
  ghostGain: number;
  brushRadius: number;
  brushBase: number;
  brushGain: number;
  brushMax: number;
  causticA: number;
  detFloor: number;
  clamp1: number;
  contrast: number;
  clamp2: number;
  floorBase: number;
  causticGain: number;
  veinThresh: number;
  veinGain: number;
  veinColor: Vec3;
  baseDepth: number;
  depthScale: number;
  depthNoise: number;
  depthNoiseAmp: number;
  absorb: Vec3;
  absorbScale: number;
  deepColor: Vec3;
  deepGain: number;
  parallax: number;
  nScale: number;
  sun1: Vec3;
  sun2: Vec3;
  spec1: number;
  spec2: number;
  spec2Gain: number;
  glintGain: number;
  glintColor: Vec3;
  fresnelPow: number;
  fresnelGain: number;
  skyColor: Vec3;
  sandHi: Vec3;
  sandLo: Vec3;
  rippleScale: number;
  warpScale: number;
  warp: number;
  bandFreq: number;
  bandSkew: number;
  bandGain: number;
  grainScale: number;
  grainAmp: number;
  octaves: number;
  lacunarity: number;
  gain: number;
  exposure: number;
  grain: number;
  gamma: number;
  vigOuter: number;
  vigInner: number;
  vigDark: number;
  vigBright: number;
};

export const CAUSTIC_DEFAULTS: CausticParams = {
  propagation: 0.245,
  damping: 0.996,
  edgeWidth: 0.045,
  edgeDamp: 0.9,
  clampH: 1.6,
  simRate: 60,
  maxSub: 4,

  ambient: true,
  ambientCount: 4,
  ambientStrength: 0.018,
  ambientRate: 1,
  ambientRadius: 0.04,

  ghost: true,
  ghostFade: 1.5,
  ghostSpeed: 4,
  ghostGain: 2,

  brushRadius: 0.032,
  brushBase: 0.012,
  brushGain: 0.9,
  brushMax: 0.09,

  causticA: 9,
  detFloor: 0.06,
  clamp1: 6,
  contrast: 1.22,
  clamp2: 8,
  floorBase: 0.34,
  causticGain: 0.3,
  veinThresh: 1,
  veinGain: 0.1,
  veinColor: [140, 204, 217],

  baseDepth: 1.05,
  depthScale: 1.4,
  depthNoise: 2,
  depthNoiseAmp: 0.25,
  absorb: [107, 33, 20],
  absorbScale: 1.7,
  deepColor: [5, 26, 37],
  deepGain: 0.3,

  parallax: 2.4,
  nScale: 8.5,

  sun1: [0.3, 0.45, 0.82],
  sun2: [-0.5, 0.15, 0.78],
  spec1: 150,
  spec2: 70,
  spec2Gain: 0.35,
  glintGain: 0.85,
  glintColor: [255, 247, 224],

  fresnelPow: 4,
  fresnelGain: 0.22,
  skyColor: [41, 77, 102],

  sandHi: [219, 179, 120],
  sandLo: [158, 117, 77],
  rippleScale: 6.5,
  warpScale: 3,
  warp: 0.6,
  bandFreq: 9,
  bandSkew: 4,
  bandGain: 0.06,
  grainScale: 240,
  grainAmp: 0.045,

  octaves: 4,
  lacunarity: 2.03,
  gain: 0.5,

  exposure: 1.55,
  grain: 0.022,
  gamma: 0.4545,
  vigOuter: 1.28,
  vigInner: 0.32,
  vigDark: 0.6,
  vigBright: 1.05,
};

/** Overlays on the defaults. Names are the water, not the numbers. */
export const CAUSTIC_PRESETS: Record<string, Partial<CausticParams>> = {
  tidepool: {},
  "deep-ocean": {
    causticA: 12, contrast: 1.5, veinGain: 0.16, veinColor: [120, 190, 235],
    floorBase: 0.22, causticGain: 0.26, baseDepth: 1.6, depthScale: 1.9,
    absorb: [70, 30, 14], absorbScale: 2.4, deepColor: [4, 22, 40], deepGain: 0.55,
    sandHi: [150, 160, 150], sandLo: [70, 90, 95], skyColor: [30, 66, 104],
    fresnelGain: 0.3, exposure: 1.35, glintColor: [220, 240, 255], glintGain: 0.7,
  },
  calm: {
    causticA: 13, contrast: 1.55, veinGain: 0.12, veinColor: [110, 170, 215],
    floorBase: 0.16, causticGain: 0.22, baseDepth: 1.8, depthScale: 2,
    absorb: [64, 26, 10], absorbScale: 2.6, deepColor: [0, 20, 36], deepGain: 0.62,
    sandHi: [120, 135, 135], sandLo: [48, 70, 82], skyColor: [18, 52, 82],
    fresnelGain: 0.32, exposure: 1.25, glintColor: [200, 226, 245], glintGain: 0.55,
  },
};

export const MAX_DROPS = 12;

type Kind = "f" | "i" | "c" | "v";
export type Slot = [keyof CausticParams, Kind];

export const UPDATE_UNIFORMS: Slot[] = [
  ["propagation", "f"], ["damping", "f"], ["edgeWidth", "f"], ["edgeDamp", "f"], ["clampH", "f"],
];

export const RENDER_UNIFORMS: Slot[] = [
  ["causticA", "f"], ["detFloor", "f"], ["clamp1", "f"], ["contrast", "f"], ["clamp2", "f"],
  ["floorBase", "f"], ["causticGain", "f"], ["veinThresh", "f"], ["veinGain", "f"], ["veinColor", "c"],
  ["baseDepth", "f"], ["depthScale", "f"], ["depthNoise", "f"], ["depthNoiseAmp", "f"],
  ["absorb", "c"], ["absorbScale", "f"], ["deepColor", "c"], ["deepGain", "f"],
  ["parallax", "f"], ["nScale", "f"],
  ["sun1", "v"], ["sun2", "v"], ["spec1", "f"], ["spec2", "f"], ["spec2Gain", "f"],
  ["glintGain", "f"], ["glintColor", "c"],
  ["fresnelPow", "f"], ["fresnelGain", "f"], ["skyColor", "c"],
  ["sandHi", "c"], ["sandLo", "c"], ["rippleScale", "f"], ["warpScale", "f"], ["warp", "f"],
  ["bandFreq", "f"], ["bandSkew", "f"], ["bandGain", "f"], ["grainScale", "f"], ["grainAmp", "f"],
  ["octaves", "i"], ["lacunarity", "f"], ["gain", "f"],
  ["exposure", "f"], ["grain", "f"], ["gamma", "f"],
  ["vigOuter", "f"], ["vigInner", "f"], ["vigDark", "f"], ["vigBright", "f"],
];

export const uName = (key: string) => "u" + key[0].toUpperCase() + key.slice(1);

const glslType = (kind: Kind) => (kind === "i" ? "int" : kind === "f" ? "float" : "vec3");

const declare = (slots: Slot[]) =>
  slots.map(([key, kind]) => "uniform " + glslType(kind) + " " + uName(key) + ";").join("\n");

export const VERT = `#version 300 es
out vec2 vUv;
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

export const UPDATE = `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform vec2 uTexel;
uniform float uAspect;
uniform int uDropCount;
uniform vec4 uDrops[${MAX_DROPS}];
${declare(UPDATE_UNIFORMS)}
in vec2 vUv;
out vec4 o;
void main(){
  vec2 uv = vUv;
  float c = texture(uState, uv).r, p = texture(uState, uv).g;
  float l = texture(uState, uv - vec2(uTexel.x, 0.0)).r;
  float r = texture(uState, uv + vec2(uTexel.x, 0.0)).r;
  float u = texture(uState, uv + vec2(0.0, uTexel.y)).r;
  float d = texture(uState, uv - vec2(0.0, uTexel.y)).r;
  float nv = (2.0 * c - p) + (l + r + u + d - 4.0 * c) * uPropagation;
  nv *= uDamping;
  for (int i = 0; i < ${MAX_DROPS}; i++) {
    if (i >= uDropCount) break;
    vec2 dp = uv - uDrops[i].xy;
    dp.x *= uAspect;
    float rr = uDrops[i].w;
    nv += uDrops[i].z * exp(-dot(dp, dp) / (rr * rr));
  }
  vec2 e = min(uv, 1.0 - uv);
  nv *= mix(uEdgeDamp, 1.0, smoothstep(0.0, uEdgeWidth, min(e.x, e.y)));
  o = vec4(clamp(nv, -uClampH, uClampH), c, 0.0, 1.0);
}`;

export const RENDER = `#version 300 es
precision highp float;
uniform sampler2D uState;
uniform vec2 uTexel;
uniform vec2 uResolution;
uniform float uTime;
uniform float uAspect;
${declare(RENDER_UNIFORMS)}
in vec2 vUv;
out vec4 frag;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0)), c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p){
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 8; i++) { if (i >= uOctaves) break; s += a * vnoise(p); p *= uLacunarity; a *= uGain; }
  return s;
}
vec3 sand(vec2 uv){
  vec2 p = uv * vec2(uAspect, 1.0);
  float rip = fbm(p * uRippleScale + fbm(p * uWarpScale) * uWarp);
  float band = 0.5 + 0.5 * sin(rip * uBandFreq + p.x * uBandSkew);
  vec3 b = mix(uSandHi, uSandLo, rip);
  b = mix(b, b * (1.0 + uBandGain), band);
  return b + (vnoise(p * uGrainScale) - 0.5) * uGrainAmp;
}
void main(){
  vec2 uv = vUv, t = uTexel;
  float hc = texture(uState, uv).r;
  float hl = texture(uState, uv - vec2(t.x, 0.0)).r, hr = texture(uState, uv + vec2(t.x, 0.0)).r;
  float hu = texture(uState, uv + vec2(0.0, t.y)).r, hd = texture(uState, uv - vec2(0.0, t.y)).r;
  float hpp = texture(uState, uv + t).r, hmm = texture(uState, uv - t).r;
  float hpm = texture(uState, uv + vec2(t.x, -t.y)).r, hmp = texture(uState, uv + vec2(-t.x, t.y)).r;
  float hx = (hr - hl) * 0.5, hy = (hu - hd) * 0.5;
  float hxx = hr - 2.0 * hc + hl, hyy = hu - 2.0 * hc + hd, hxy = (hpp - hpm - hmp + hmm) * 0.25;

  // The caustic is the area compression of the refracted-ray map: bright where
  // the surface focuses light, which is the determinant of its Jacobian.
  float jxx = 1.0 - uCausticA * hxx, jyy = 1.0 - uCausticA * hyy, jxy = -uCausticA * hxy;
  float det = jxx * jyy - jxy * jxy;
  float ca = clamp(1.0 / max(abs(det), uDetFloor), 0.0, uClamp1);
  ca = clamp(pow(ca, uContrast), 0.0, uClamp2);

  vec2 land = uv + vec2(hx, hy) * uParallax;
  vec3 col = sand(land) * (uFloorBase + ca * uCausticGain);
  col += uVeinColor * max(ca - uVeinThresh, 0.0) * uVeinGain;

  float depth = clamp(uBaseDepth - hc * uDepthScale + fbm(land * uDepthNoise) * uDepthNoiseAmp, 0.2, 3.0);
  col *= exp(-uAbsorb * depth * uAbsorbScale);
  col += uDeepColor * depth * uDeepGain;

  vec3 N = normalize(vec3(-hx * uNScale, -hy * uNScale, 1.0)), V = vec3(0.0, 0.0, 1.0);
  vec3 s1 = normalize(uSun1 + vec3(0.0, 0.0, 1e-4));
  vec3 s2 = normalize(uSun2 + vec3(0.0, 0.0, 1e-4));
  float sp = pow(max(dot(N, normalize(s1 + V)), 0.0), uSpec1)
           + pow(max(dot(N, normalize(s2 + V)), 0.0), uSpec2) * uSpec2Gain;
  col += sp * uGlintColor * uGlintGain;
  col = mix(col, uSkyColor, pow(1.0 - N.z, uFresnelPow) * uFresnelGain);
  col *= mix(uVigDark, uVigBright, smoothstep(uVigOuter, uVigInner, length((uv - 0.5) * vec2(uAspect, 1.0))));
  col = vec3(1.0) - exp(-col * uExposure);
  col += (hash(uv * uResolution + fract(uTime)) - 0.5) * uGrain;
  frag = vec4(pow(max(col, vec3(0.0)), vec3(uGamma)), 1.0);
}`;

/**
 * The wandering cursor that stirs the water: a sum of sines whose frequencies
 * share no common multiple, so its path never repeats.
 */
export function ghostPos(t: number, speed: number) {
  const TAU = 6.283185307;
  const x = 0.5 + 0.3 * Math.sin(t * 0.037 * TAU * speed) + 0.12 * Math.sin(t * 0.011 * TAU * speed + 1.7);
  const y = 0.5 + 0.28 * Math.cos(t * 0.043 * TAU * speed) + 0.13 * Math.cos(t * 0.017 * TAU * speed + 4.1);
  return [Math.min(Math.max(x, 0.06), 0.94), Math.min(Math.max(y, 0.06), 0.94)];
}

type Brush = { brushBase: number; brushGain: number; brushMax: number };

export function brushStrength(distance: number, p: Brush) {
  return Math.min(p.brushBase + distance * p.brushGain, p.brushMax);
}

export function approach(current: number, target: number, step: number, seconds: number) {
  const rate = step / Math.max(seconds, 0.05);
  return current + Math.max(-rate, Math.min(rate, target - current));
}
