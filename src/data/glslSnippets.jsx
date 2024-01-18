
export const glslSnippets = [
    {
        name:'Random',
        code: `
        float random (vec2 st) {
          return fract(sin(dot(st.xy,
                               vec2(12.9898,78.233)))*
              43758.5453123);
      }`,
          tags:'random, fractal, fraction, pseudo random, hash'
    },
    {
        name:'Adjust Contrast',
        code: `
        vec3 adjustContrast(vec3 color, float value) {
          return 0.5 + (1.0 + value) * (color - 0.5);
        }`,
          tags:'contrast, light, brightness, value'
    },
    {
        name:'Adjust Exposure',
        code: `
        vec3 adjustExposure(vec3 color, float value) {
          return (1.0 + value) * color;
        }`,
          tags:'contrast, light, brightness, value'
    },
    {
        name:'Adjust Saturation',
        code: `
        vec3 adjustSaturation(vec3 color, float value) {
          const vec3 luminosityFactor = vec3(0.2126, 0.7152, 0.0722);
          vec3 grayscale = vec3(dot(color, luminosityFactor));
        
          return mix(grayscale, color, 1.0 + value);
        }`,
          tags:'contrast, light, brightness, value, color'
    },
    {
        name:'Adjust Brightness',
        code: `
        vec3 adjustBrightness(vec3 color, float value) {
          return color + value;
        }`,
          tags:'contrast, light, brightness, value'
    },
    {
        name:'Rotate',
        code: `
        mat2 rotate(float angle){
          return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
      }`,
          tags:'rotate, matrix, spin, turn'
    },
    {
        name:'Noise',
        code: `
        //requires a random hash function
        float noise( in vec2 p )
        {
            vec2 id = floor( p );
            vec2 f = fract( p );
          
          vec2 u = f*f*(3.0-2.0*f);
        
            return mix(mix(random(id + vec2(0.0,0.0)), 
                           random(id + vec2(1.0,0.0)), u.x),
                       mix(random(id + vec2(0.0,1.0)), 
                           random(id + vec2(1.0,1.0)), u.x), 
                       u.y);
        }`,
          tags:'random, noise, fractal, hash'
    },
    {
        name:'fBm',
        code: `
        float fbm( vec2 p ) {
            float f = 0.0;
            float gat = 0.0;
            
            for (float octave = 0.; octave < 6.; ++octave)
            {
                float la = pow(2.0, octave);
                float ga = pow(0.5, octave + 1.);
                f += ga*noise( la * p ); 
                gat += ga;
            }
            
            f = f/gat;
            
            return f;
        }`,
          tags:'fbm, fractional brownian motion, fractal, noise, random'
    },
    {
        name:'Noise Threshold',
        code: `
        //by jorgemaog on shadertoy https://www.shadertoy.com/view/WslcR2
        //requires the fBm function
        float outline(vec2 p, float eps)
        {
            float f = noise_fbm(p - vec2(0.0, 0.0));
            
            float ft = noise_fbm(p - vec2(0.0, eps));
            float fl = noise_fbm(p - vec2(eps, 0.0));
            float fb = noise_fbm(p + vec2(0.0, eps));
            float fr = noise_fbm(p + vec2(eps, 0.0));
            
            float gg = clamp(abs(4. * f - ft - fr - fl - fb), 0., 1.);
            
            return gg;
        }`,
          tags:'fbm, fractional brownian motion, fractal, noise, random, threshold, line, ripple'
    },
    {
        name:'LUT Hookup/Value Mapping',
        code: `
        //create a uniform 'g' as a gradient from y0.0 to y1.0
        //g is a uniform graphics object from js
        vec4 texG = texture2D(g, st);
        //map luminance as a y value on our gradient
        vec2 lum = vec2(0.5, {...mainTexture...});
        //pick the color off of g based on the coordinate grabbed created by lum
        vec4 colVal = texture2D(g, lum);
        //initialize color
        vec3 color = colVal.rgb;`,
          tags:'color, lut, lookup table, look up, value map'
    },
    {
        name:'Map Range',
        code: `
        float map(float value, float inMin, float inMax, float outMin, float outMax) {
          return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
        }`,
          tags:'range map, interpolate, scale, math'
    },
    
  //   {
  //       name:'Deterministic Random',
  //       code: `
  //       //requires a seed uniform from js
  //       const float PHI=1.61803398875;
  //       float random(in vec2 xy){
  //         // golden noise, works better on less precise hardware, but adds odd artifacts
  //         return fract(tan(distance(xy*PHI,xy)*fract(randseed/100.+10.))*xy.x);
  // }`,
  //         tags:'random, hash, deterministic, fractal, seed, golden noise'
  //   },
    
]



