export const vertexShaderSource = /* glsl */ `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const fragmentShaderSource = /* glsl */ `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
// 0 at the top of the page, 1 once the water has drained out of the frame.
uniform float uScroll;
// Photographed dry sand, mapped to cover the frame. 0 until it has loaded.
uniform sampler2D uSand;
uniform float uSandMix;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm4(vec2 p) {
  mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.03;
    a *= 0.5;
  }
  return v;
}

float fbm6(vec2 p) {
  mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = rot * p * 2.03;
    a *= 0.5;
  }
  return v;
}

// One swash cycle: fast rush up the beach, slow drain back.
float swash(float u, float t, float period, float seed) {
  float ph = fract(t / period + seed + u * 0.10);
  float rush = smoothstep(0.0, 0.18, ph);
  rush = 1.0 - pow(1.0 - rush, 3.0);
  float back = smoothstep(0.32, 1.0, ph);
  back = back * back * (3.0 - 2.0 * back);
  return rush - back;
}

// Bubbles are whipped up while the wave runs in, then drain away before the next one.
float swashFoam(float u, float t, float period, float seed) {
  float ph = fract(t / period + seed + u * 0.10);
  float born = smoothstep(0.0, 0.09, ph);
  float drained = 1.0 - smoothstep(0.20, 0.72, ph);
  return born * drained;
}

float swashY(float u, float t) {
  float s = 0.50 + (u - 0.5) * 0.06;
  s -= 0.11 * swash(u, t, 21.0, 0.0);
  s -= 0.035 * swash(u, t, 13.5, 0.41);
  return s;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = max(uResolution.x / max(uResolution.y, 1.0), 0.0001);
  float t = uTime;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Seen from almost straight above: detail barely compresses toward the top.
  float depthScale = 0.90 + uv.y * 0.30;

  float wobble = (fbm4(vec2(uv.x * 2.2, t * 0.025)) - 0.5) * 0.045
               + (fbm4(vec2(uv.x * 6.5, 40.0 + t * 0.045)) - 0.5) * 0.026;
  // Scrolling walks the shoreline off the top and leaves bare sand behind.
  float lift = uScroll * 0.95;
  float sh = swashY(uv.x, t) + wobble + lift;
  float d = uv.y - sh;

  // The sand drifts a little slower than the water for a touch of parallax.
  p += vec2(0.0, uScroll * 0.25);

  // ---- sand ----
  float grain = noise(p * 880.0);
  float micro = noise(p * 2300.0 + 9.0);
  float speck = noise(p * 320.0 + 17.0);
  float bed = fbm4(p * 9.0 + 4.0);
  float berm = fbm4(vec2(p.x * 6.0, uv.y * 8.0) + 21.0);
  float lit = 1.0 + (uv.y - 0.2) * 0.015;

  vec3 sand = vec3(0.745, 0.608, 0.471) * lit;
  sand *= 0.975 + bed * 0.05 + (berm - 0.5) * 0.03;
  sand *= 1.0 + (grain - 0.5) * 0.075 + (micro - 0.5) * 0.05 + (speck - 0.5) * 0.03;
  sand *= 1.0 - smoothstep(0.88, 1.0, grain) * 0.10;

  // The plate is fitted into the strip of sand, so its whole height is on screen
  // from the moment the water uncovers it, and it stretches as the strip grows.
  float band = clamp(sh, 0.30, 1.0);
  // Above the strip the plate is mirrored, so the bed under the water keeps its
  // texture instead of smearing the top row of the photograph.
  float plateV = 1.0 - abs(1.0 - clamp(uv.y / band, 0.0, 2.0));
  vec2 sandUv = vec2(uv.x, plateV);
  vec3 plate = texture2D(uSand, clamp(sandUv, 0.001, 0.999)).rgb * lit;
  // Keep a touch of the procedural grain so it does not look like a flat print.
  plate *= 1.0 + (grain - 0.5) * 0.04 + (micro - 0.5) * 0.03;
  sand = mix(sand, plate, uSandMix);

  // Sand stays dark where the water reached during the last few seconds.
  float wetY = min(swashY(uv.x, t - 1.6), swashY(uv.x, t - 3.8));
  wetY = min(min(wetY, swashY(uv.x, t - 6.5)) + wobble + lift, sh);
  float wet = smoothstep(wetY - 0.03, wetY + 0.13, uv.y);

  vec3 wetSand = mix(vec3(0.639, 0.533, 0.447) * lit, plate * vec3(0.80, 0.84, 0.86), uSandMix);
  wetSand *= 0.97 + bed * 0.05 + (grain - 0.5) * 0.045;
  sand = mix(sand, wetSand, wet * 0.55);
  // Film of water still draining: cooler and glossier than the sand under it.
  float sheen = wet * exp(-max(sh - uv.y, 0.0) / 0.07);
  sand += sheen * vec3(0.020, 0.028, 0.030);

  // ---- water ----
  float waterMask = smoothstep(-0.004, 0.012, d);
  float depth = smoothstep(0.0, 0.40, d);

  // Refraction net: slow, warped ridges that focus light on the bed.
  vec2 cp = vec2(p.x * 4.2 * depthScale, uv.y * 5.6 * depthScale - t * 0.16);
  float warpC = fbm4(cp * 0.6 + vec2(0.0, t * 0.04));
  float cau = fbm6(cp + vec2(warpC * 1.2, 0.0));
  float ridge = pow(1.0 - abs(cau * 2.0 - 1.0), 3.2);
  // Wind chop riding on top of it, stretched along the shore.
  float fine = noise(vec2((p.x + uv.y * 0.35) * 22.0 * depthScale, uv.y * 26.0 * depthScale - t * 0.30));
  float chop = pow(1.0 - abs(fine * 2.0 - 1.0), 2.0);

  vec3 shallow = vec3(0.663, 0.631, 0.596);
  vec3 midWater = vec3(0.118, 0.333, 0.447);
  vec3 deepWater = vec3(0.000, 0.231, 0.349);
  vec3 abyss = vec3(0.000, 0.133, 0.216);
  vec3 water = mix(shallow, midWater, smoothstep(0.0, 0.30, d));
  water = mix(water, deepWater, smoothstep(0.22, 0.52, d));
  water = mix(water, abyss, smoothstep(0.45, 0.95, d));
  water *= 0.96 + fbm4(p * 2.0 + 3.0) * 0.08;

  // The bed seen through moving water: lit by the caustic net, shaded between it.
  vec3 litBed = sand * vec3(0.84, 0.92, 0.99) * (0.93 + ridge * 0.16 - (1.0 - ridge) * 0.05);
  vec3 submerged = mix(litBed, water, clamp(depth * 1.25, 0.0, 1.0));
  // Caustic highlights are cool light on the surface, not brighter sand.
  submerged += ridge * vec3(0.050, 0.078, 0.090) * (0.85 - depth * 0.78);
  submerged += chop * (0.02 + depth * 0.045);
  // Veins where the focus runs hot, and sun caught on the tilted facets.
  // Back of the spent wave lifting behind the foam.
  submerged += exp(-pow((d - 0.24) / 0.13, 2.0)) * 0.020;

  vec3 col = mix(sand, submerged, waterMask);

  // ---- foam ----
  // Sampled in shore-relative space so the lace travels with the swash.
  vec2 fp = vec2(p.x * 12.0 * depthScale, d * 12.0 * depthScale);
  float warp = fbm4(fp * 0.5 + vec2(0.0, t * 0.04));
  float lace = fbm6(fp + vec2(warp * 1.6, -t * 0.12));
  float bubbles = noise(fp * 7.5 + vec2(0.0, -t * 0.18)) * 0.5
                + noise(fp * 19.0 + vec2(3.0, -t * 0.25)) * 0.3
                + noise(fp * 44.0 + vec2(7.0, -t * 0.30)) * 0.2;

  // How much foam this particular wave carries: a burst as it runs in, then nothing.
  float charge = max(swashFoam(uv.x, t, 21.0, 0.0), swashFoam(uv.x, t, 13.5, 0.41) * 0.7);
  // Some waves arrive loaded, others come in almost clean.
  charge *= 0.35 + fbm4(vec2(uv.x * 0.9, t * 0.06)) * 1.30;
  charge = clamp(charge, 0.0, 1.0);

  // Foam reaches far into the water and only a thin lace onto the sand.
  float profile = exp(-max(d, 0.0) / 0.21 - max(-d, 0.0) / 0.035);
  profile *= smoothstep(0.46, 0.24, d);
  // Density varies in clumps along the shore, never an even band.
  profile *= 0.72 + fbm4(vec2(p.x * 1.6, t * 0.05)) * 0.62;
  profile *= charge;
  float edge = exp(-abs(d) / 0.007) * charge;

  // Filaments: the ridges of the noise read as bubble strings, not cotton.
  float net = pow(1.0 - abs(lace * 2.0 - 1.0), 2.0);
  float field = lace * 0.55 + net * 0.45 + bubbles * 0.16;

  float threshold = 1.0 - profile * 0.86;
  float foam = smoothstep(threshold, threshold + 0.09, field);
  // Holes torn through the foam sheet, so the bed shows through the lace.
  foam *= smoothstep(0.40, 0.72, fbm4(fp * 1.5 + vec2(0.0, -t * 0.08)) + 0.20);
  // The leading line is bright but broken, never a clean stroke.
  float edgeBreak = smoothstep(0.34, 0.62, fbm4(fp * 2.1 + vec2(0.0, -t * 0.12)));
  foam = clamp(foam + edge * edgeBreak * (0.30 + field * 0.50), 0.0, 1.0);

  // Once it runs onto the sand the sheet drains and the bubbles pop out in patches.
  float dying = smoothstep(0.0, -0.06, d);
  float popping = smoothstep(0.30, 0.78, fbm4(fp * 3.2 + vec2(0.0, -t * 0.22)));
  foam *= 1.0 - dying * (0.45 + popping * 0.55);

  // Loose bubbles stranded on the wet sand.
  float specks = smoothstep(0.74, 0.95, noise(fp * 24.0 + vec2(0.0, -t * 0.15)));
  specks *= exp(-max(-d, 0.0) / 0.09) * (1.0 - waterMask) * 0.55 * (0.25 + charge * 0.75);

  // Drying foam streaks left behind on the sand.
  float residue = (1.0 - waterMask) * wet * smoothstep(0.52, 0.80, field) * 0.30 * (0.3 + charge * 0.7);

  // The foam sheet sits above the surface, so it shades what is just behind it.
  col *= 1.0 - exp(-max(d, 0.0) / 0.018) * waterMask * (1.0 - foam) * 0.12;
  col *= 1.0 - exp(-max(-d, 0.0) / 0.012) * (1.0 - waterMask) * (1.0 - foam) * 0.10;
  col *= 1.0 - exp(-max(-d, 0.0) / 0.05) * 0.08 * (1.0 - waterMask);
  col *= 1.0 - foam * 0.10 * (1.0 - waterMask);

  // With no foam on it the sheet still draws a thin bright rim where it thins out.
  col += exp(-abs(d) / 0.004) * (1.0 - foam) * 0.07;

  vec3 foamColor = mix(vec3(0.773, 0.718, 0.663), vec3(0.965, 0.937, 0.890), bubbles);
  // Thinner over the water, thinner still once it is draining into the sand.
  col = mix(col, foamColor, foam * (0.72 - 0.18 * dying));
  col = mix(col, vec3(0.95, 0.93, 0.89), specks);
  col = mix(col, vec3(0.84, 0.80, 0.75), residue);

  // ---- sun glitter on the open water ----
  float far = smoothstep(0.25, 0.85, d);
  float sparkle = smoothstep(0.965, 1.0, noise(p * 300.0 + vec2(0.0, -t * 0.28)));
  col += sparkle * far * waterMask * (1.0 - foam) * 0.14;

  col = mix(col, vec3(0.86, 0.89, 0.92), 0.008);
  col = mix(col, col * col * (3.0 - 2.0 * col), 0.08);
  col *= 1.0 - 0.04 * smoothstep(0.60, 1.0, length((uv - 0.5) * vec2(1.1, 1.0)));
  col += (hash(gl_FragCoord.xy + t) - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
`;
