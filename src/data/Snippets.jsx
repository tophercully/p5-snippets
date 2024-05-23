export const snippets = {
  p5: [
    {
      name: "Grid",
      code: `
            function grid() {
                var cols = 10
                var rows = 10
                var cellW = width/cols
                var cellH = height/rows 
                for(let y = 0; y < rows; y++) {
                  for(let x = 0; x < cols; x++) {
                    rect(x*cellW+cellW/2, y*cellH+cellH/2)
                  }
                }
              }`,
      tags: "grid, mesh, matrix",
      author: "Chris McCully",
    },
    {
      name: "Circle with Polar Noise",
      code: `
            function blob(x, y, wid, hei) {
                var phase = Math.random() * 10000000000
                var ns = 0.01
                var minIrreg = 0.25
                var rot = randomVal(0, 360)
                
                push()
                translate(x, y)
                beginShape()
                for(let i = rot; i < rot+360; i+=360/8) {
                  var xoff = map(cos(i), -1, 1, 0, 10)
                  var yoff = map(sin(i), -1, 1, 0, 10)
                  var n = noise(xoff*ns, yoff*ns, phase)
                  var blobW = map(n, 0, 1, wid*minIrreg, wid*0.5)
                  var blobH = map(n, 0, 1, hei*minIrreg, hei*0.5)
    
                  var xC = cos(i)*blobW
                  var yC = sin(i)*blobH
              
                  vertex(xC, yC)
                }
                endShape(CLOSE)
                pop()
              }`,
      tags: "geometry, trigonometry, polar shape, noise",
      author: "Chris McCully",
    },

    {
      name: "Geometry Class Quickstart",
      code: `
          class Geometry{
            constructor(x, y, wid, hei) {
              this.pos = {
                x:x,
                y:y
              }
              this.size = {
                width:wid,
                height:hei
              }
          
            }
          
            show() {
              rect(this.pos.x, this.pos.y, this.size.width, this.size.height)
            }
          
            update() {
              this.pos.x += 1
            }
          }`,
      tags: "geometry, shape, class, custom, object",
      author: "Chris McCully",
    },
    {
      name: "Polar Rectangle",
      code: `
          function squarePolar(squareAng) {
            return min(1 / abs(cos(squareAng)), 1 / abs(sin(squareAng)))
          }
          
          function polarRectangle(x, y, wid, hei) {
            push()
            translate(x, y)
            beginShape()
            for(let i = 0; i < 360; i++) {
              var xPosition = cos(i)*wid*squarePolar(i)
              var yPosition = sin(i)*hei*squarePolar(i)
          
              curveVertex(xPosition, yPosition)
            }
            endShape(CLOSE)
            pop()
          }`,
      tags: "geometry, shape, rectangle, square, polar, conversion, p5",
      author: "Chris McCully",
    },
    {
      name: "Polar Circle",
      code: `
          function polarCircle(x, y, radius) {
            push()
            translate(x, y)
            beginShape()
            for(let i = -1; i < 360; i+=1) {
              var xPosition = cos(i)*radius
              var yPosition = sin(i)*radius
          
              curveVertex(xPosition, yPosition)
            }
            endShape(CLOSE)
            pop()
          }`,
      tags: "geometry, shape, class, custom, object",
      author: "Chris McCully",
    },
    {
      name: "Polar Flower",
      code: `
          function flower(x, y, radius, numPetals) {
            push()
            translate(x, y)
            beginShape()
            for(let i = -1; i < 360; i++) {
              var sinMod = map(sin(i*numPetals), -1, 1, 0, 1)
              var expo = 0.25
              var expoMod = map(pow(sinMod, expo), 0, pow(1, expo), 0.5, 1)
          
              var xPosition = cos(i)*radius*expoMod
              var yPosition = sin(i)*radius*expoMod
          
              curveVertex(xPosition, yPosition)
            }
            endShape(CLOSE)
            pop()
          }`,
      tags: "geometry, shape, sine, petals, exponential",
      author: "Chris McCully",
    },
    {
      name: "Polar Polygon",
      code: `
          function polarPolygon(x, y, radius, numSides, offset) {
            var inc = 360/numSides
            push()
            translate(x, y)
            beginShape()
            for(let i = offset; i < 360+offset; i+=inc) {
              var xPosition = cos(i)*radius
              var yPosition = sin(i)*radius
          
              vertex(xPosition, yPosition)
            }
            endShape(CLOSE)
            pop()
          }`,
      tags: "geometry, shape, sides, offset",
      author: "Chris McCully",
    },
    {
      name: "Save PNG",
      code: `
          function keyTyped() {
            if (key === "s" || key === "S") {
              save("img");
            }
          }`,
      tags: "image, download, png, file",
      author: "Chris McCully",
    },
  ],
  glsl: [
    {
      name: "Random",
      code: `
            float random (vec2 st) {
              return fract(sin(dot(st.xy,
                                   vec2(12.9898,78.233)))*
                  43758.5453123);
          }`,
      tags: "random, fractal, fraction, pseudo random, hash",
      author: "Chris McCully",
    },
    {
      name: "Adjust Contrast",
      code: `
            vec3 adjustContrast(vec3 color, float value) {
              return 0.5 + (1.0 + value) * (color - 0.5);
            }`,
      tags: "contrast, light, brightness, value",
      author: "Chris McCully",
    },
    {
      name: "Adjust Exposure",
      code: `
            vec3 adjustExposure(vec3 color, float value) {
              return (1.0 + value) * color;
            }`,
      tags: "contrast, light, brightness, value",
      author: "Chris McCully",
    },
    {
      name: "Adjust Saturation",
      code: `
            vec3 adjustSaturation(vec3 color, float value) {
              const vec3 luminosityFactor = vec3(0.2126, 0.7152, 0.0722);
              vec3 grayscale = vec3(dot(color, luminosityFactor));
            
              return mix(grayscale, color, 1.0 + value);
            }`,
      tags: "contrast, light, brightness, value, color",
      author: "Chris McCully",
    },
    {
      name: "Adjust Brightness",
      code: `
            vec3 adjustBrightness(vec3 color, float value) {
              return color + value;
            }`,
      tags: "contrast, light, brightness, value",
      author: "Chris McCully",
    },
    {
      name: "Rotate",
      code: `
            mat2 rotate(float angle){
              return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
          }`,
      tags: "rotate, matrix, spin, turn",
      author: "Chris McCully",
    },
    {
      name: "Noise",
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
      tags: "random, noise, fractal, hash",
      author: "Chris McCully",
    },
    {
      name: "fBm",
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
      tags: "fbm, fractional brownian motion, fractal, noise, random",
      author: "Chris McCully",
    },
    {
      name: "Noise Threshold",
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
      tags: "fbm, fractional brownian motion, fractal, noise, random, threshold, line, ripple",
      author: "Chris McCully",
    },
    {
      name: "LUT Hookup/Value Mapping",
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
      tags: "color, lut, lookup table, look up, value map",
      author: "Chris McCully",
    },
    {
      name: "Map Range",
      code: `
            float map(float value, float inMin, float inMax, float outMin, float outMax) {
              return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
            }`,
      tags: "range map, interpolate, scale, math",
      author: "Chris McCully",
    },
    {
      name: "Deterministic Random",
      code: `
            //requires 'randseed' to be passed as a uniform from js
            const float PHI=1.61803398875;
            float random(in vec2 xy){
              // golden noise, works better on less precise hardware, but adds odd artifacts
              return fract(tan(distance(xy*PHI,xy)*fract(randseed/100.+10.))*xy.x);
      }`,
      tags: "random, hash, deterministic, fractal, seed, golden noise",
      author: "Wouter Missler",
    },
    {
      name: "Vertex Shader for Canvas",
      code: `
            // our vertex data
            attribute vec3 aPosition;
            attribute vec2 aTexCoord;
            
            // lets get texcoords just for fun!
            varying vec2 vTexCoord;
            
            void main() {
              // copy the texcoords
              vTexCoord = aTexCoord;
            
              // copy the position data into a vec4, using 1.0 as the w component
              vec4 positionVec4 = vec4(aPosition, 1.0);
              positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
            
              // send the vertex information on to the fragment shader
              gl_Position = positionVec4;
            }
            `,
      tags: "vertex, shader, rectangle, starter, quickstart, template",
      author: "Chris McCully",
    },
  ],
  palettes: [
    {
      name: "IGIG",
      code: [
        "#D31826",
        "#F77834",
        "#FDC36D",
        "#008944",
        "#027ECE",
        "#6D1DB5",
      ],
      tags: "colorful, bright, saturated, rainbow, red, orange, yellow, green, blue, purple",
      author: "Chris McCully",
    },
    {
      name: "D",
      code: [
        "#F28989",
        "#007428",
        "#5F8CCB",
        "#1950A9",
        "#FDB302",
        "#4C2C18",
        "#B12424",
        "#FE7B05",
      ],
      tags: "colorful, rich, wide, pink, green, blue, yellow, gold, red, orange, warm, fall",
      author: "Chris McCully",
    },
    {
      name: "C",
      code: [
        "#EC521A",
        "#3656C9",
        "#AD80C3",
        "#74BFFE",
        "#FF3B09",
        "#5B7554",
        "#047B37",
        "#FDD4C3",
        "#FE7BA1",
      ],
      tags: "colorful, rich, wide, pink, green, blue, yellow, gold, red, orange, beige, tan",
      author: "Chris McCully",
    },
    {
      name: "Dino",
      code: [
        "#A1C470",
        "#62BCE0",
        "#937FA1",
        "#F1E696",
        "#CB4F5D",
        "#D2A87E",
      ],
      tags: "dull, natural, rich, flat, cool, desaturated, earthy, green, blue, purple, yellow, tan, brown, red, burgundy",
      author: "Chris McCully",
    },
    {
      name: "G",
      code: [
        "#DC3B97",
        "#180732",
        "#067FC0",
        "#F40931",
        "#FF622F",
        "#9A88C8",
      ],
      tags: "rich, neon, saturated, warm, saturated, blue, purple, yellow, red, modern",
      author: "Chris McCully",
    },
    {
      name: "GenX",
      code: [
        "#2b0028",
        "#f57600",
        "#000b00",
        "#003abe",
        "#791461",
        "#930000",
        "#509dff",
        "#006900",
      ],
      tags: "rich, saturated, warm, dark, black, orange, blue, purple, red, green, fall, autumn, royal, plum",
      author: "Chris McCully",
    },
    {
      name: "Gen2",
      code: [
        "#423395",
        "#000c01",
        "#a90000",
        "#ff6900",
        "#00612b",
        "#968ef9",
      ],
      tags: "rich, saturated, warm, dark, black, orange, lavender, purple, red, green",
      author: "Chris McCully",
    },
    {
      name: "Overlook",
      code: [
        "#282723",
        "#edd2b7",
        "#3d4d20",
        "#ad0b08",
        "#1d5473",
        "#798b97",
        "#b76439",
        "#d2955f",
      ],
      tags: "warm, rich, desaturated, natural, earthy, red, green, blue, tan, brown, black",
      author: "Chris McCully",
    },
    {
      name: "PinkLeaf",
      code: [
        "#0a1d23",
        "#fce5e5",
        "#d7753e",
        "#505026",
        "#f2a9ce",
        "#8f7f4c",
        "#97caff",
      ],
      tags: "warm, flat, dull, natural, desaturated, earthy, pink, green, blue, tan, brown, black, rust",
      author: "Chris McCully",
    },
    {
      name: "Sash",
      code: [
        "#151117",
        "#efefef",
        "#eac8ae",
        "#d88039",
        "#7aa4bc",
        "#d83f35",
        "#213d6d",
      ],
      tags: "warm, flat, dull, natural, desaturated, pop, vibrant, earthy, red, blue, tan, brown, black, complimentary",
      author: "Chris McCully",
    },
    {
      name: "Shepard",
      code: [
        "#000000",
        "#E0FBFC",
        "#3D5A80",
        "#98C1D9",
        "#E0FBFC",
        "#FF4D21",
        "#293241",
      ],
      tags: "complimentary, modern, sharp, futuristic, vibrant, red, blue, orange",
      author: "Chris McCully",
    },
    {
      name: "Source",
      code: [
        "#000000",
        "#A6C8CA",
        "#F1E8D9",
        "#097857",
        "#E3CE61",
        "#E35A7E",
        "#EE692A",
        "#BFCCD4",
        "#217F96",
        "#EBD5D7",
      ],
      tags: "complimentary, modern, sharp, futuristic, vibrant, red, blue, orange",
      author: "Chris McCully",
    },
    {
      name: "Cyano",
      code: ["#f6e6d5", "#1e2d3b", "#557EA2"],
      tags: "monochrome, cyanotype, blue, ultramarine, simple, monochromatic",
      author: "Chris McCully",
    },
  ],
  js: [
    {
      name: "Find Vector Distance",
      code: `
            function diff (num1, num2) {
                if (num1 > num2) {
                  return (num1 - num2);
                } else {
                  return (num2 - num1);
                }
              };
              
              function distBetween (x1, y1, x2, y2) {
                var deltaX = diff(x1, x2);
                var deltaY = diff(y1, y2);
                var dstnc = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                return (dstnc);
              };`,
      tags: "distance, vector, difference, geometry, trigonometry",
      author: "Chris McCully",
    },
    {
      name: "Point From Angle",
      code: `
            function ptFromAng(xPosition, yPosition, ang, dis) {
                var xMod = Math.cos(ang)*dis
                var yMod = Math.sin(ang)*dis
              
                return {
                    x:(xPosition+xMod), 
                    y:(yPosition+yMod)
                }
              }`,
      tags: "polar, distance, angle, geometry, trigonometry",
      author: "Chris McCully",
    },
    {
      name: "Angle Between Coordinates",
      code: `
            function angBetween(x1, y1, x2, y2) {
              return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            }`,
      tags: "angle, atan",
      author: "Chris McCully",
    },
    {
      name: "Angle Between Vectors",
      code: `
            export const angleBetweenPoints = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x);`,
      tags: "angle, atan, vector",
      author: "Matt Perkins",
    },
    {
      name: "Positive or Negative",
      code: `
            function plusOrMin(x) {
                var chance = Math.random() 
                if(chance < 0.5) {
                  mod = 1
                } else {
                  mod = -1
                }
    
                return x*mod
    
              }`,
      tags: "plus, minus, flip, absolute, value",
      author: "Chris McCully",
    },
    {
      name: "Point Between Vectors",
      code: `
            function ptBetween(xA, yA, xB, yB, amt) {
                var xBetween = map(amt, 0, 1, xA, xB)
                var yBetween = map(amt, 0, 1, yA, yB)
                var betweenPos = {
                    x:xBetween, 
                    y:yBetween
                }
                return betweenPos
              }`,
      tags: "map, range, interpolate, interpolation, geometry, trigonometry",
      author: "Chris McCully",
    },
    {
      name: "Shuffle Array",
      code: `
            function shuffleArray(array) {
                let currentIndex = array.length,
                  randomIndex;
              
                while (currentIndex != 0) {
                  randomIndex = Math.floor(Math.random() * currentIndex);
                  currentIndex--;
                  [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex],
                    array[currentIndex],
                  ];
                }
              
                return array;
              }`,
      tags: "shuffle, sort, random, scramble, list, geometry, trigonometry",
      author: "Chris McCully",
    },
    {
      name: "Sort By Property",
      code: `
            function dynamicSort(property) {
                var sortOrder = 1;
                if(property[0] === "-") {
                    sortOrder = -1;
                    property = property.substr(1);
                }
                return function (a,b) {
                    /* next line works with strings and numbers, 
                     * and you may want to customize it to your needs
                     */
                    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                    return result * sortOrder;
                }
              }`,
      tags: "property, attribute, array, ",
      author: "Chris McCully",
    },
    {
      name: "Random Integer",
      code: `
            function randomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1) + min); 
              // The maximum is exclusive and the minimum is inclusive
            }`,
      tags: "random, limit, round, floor, ceil",
      author: "Chris McCully",
    },
    {
      name: "Map Range",
      code: `
            //works just like p5's map() but works globally
            function map_range(value, low1, high1, low2, high2) {
              return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
            }`,
      tags: "range map, interpolate, scale, math",
      author: "Chris McCully",
    },
    {
      name: "Matt Perkins' Random Functions",
      code: `
            // Replace this with your random number generator of choice
            export const randomValue = () => Math.random();
            
            export const randomNumberBetween = (min, max) => Math.abs(randomValue()) * (max - min) + min;
            
            export const randomWholeBetween = (min, max) => Math.round(randomValue() * (max - min) + min);`,
      tags: "random, range, round, ceil, floor, integer, between, randomValue",
      author: "Matt Perkins",
    },
    {
      name: "Random Chance, Boolean, Sign",
      code: `
            export const randomSign = () => (randomChance() ? 1 : -1);

            export const randomBoolean = () => Math.round(randomValue()) === 1;

            export const randomChance = (c = 0.5) => randomValue() < c;`,
      tags: "random, chance, boolean, true, false, positive, negative, sign",
      author: "Matt Perkins",
    },
    {
      name: "Box-Muller Transform",
      code: `
            // Box-Muller Transform
            // https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
            export const randomNormalBM = () => {
                let u = 0;
                let v = 0;
                while (u === 0) u = randomValue(); // Converting [0,1) to (0,1)
                while (v === 0) v = randomValue();
                let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
                num = num / 10.0 + 0.5; // Translate to 0 -> 1
                if (num > 1 || num < 0) return randomNormalBM(); // resample between 0 and 1
                return num;
            };
            
            export const randomNormalNumberBetween = (min, max) => randomNormalBM() * (max - min) + min;
            
            export const randomNormalWholeBetween = (min, max) => Math.round(randomNormalBM() * (max - min) + min);`,
      tags: "random, gaussian, bell curve, distribution, normal, between, number",
      author: "Matt Perkins",
    },
    {
      name: "Get Random Array Elements",
      code: `
            export const getRandomArrayElements = (arr, num) => shuffleArray(arr).slice(0, num);`,
      tags: "random, array",
      author: "Matt Perkins",
    },
    {
      name: "One Element from Array",
      code: `
            export const oneOf = (arry) => {
              const i = randomWholeBetween(0, arry.length - 1);
              return arry[i];
          };`,
      tags: "random, gaussian, bell curve, distribution, normal, between, number",
      author: "Matt Perkins",
    },
    {
      name: "Uniform Random Radii in a Circle",
      code: `
            // For uniform random radii in a circle https://youtu.be/4y_nmpv-9lI
            export const randomNumberBetweenSq = (min, max) => Math.sqrt(randomValue()) * (max - min) + min;`,
      tags: "random, radius, polar, sqrt, square",
      author: "Matt Perkins",
    },
    {
      name: "Get Unique Values",
      code: `
            export const getUniqueValues = (arry, num) => {
              const res = [];
              while (res.length < num) {
                  const pick = oneOf(arry);
                  if (!res.includes(pick)) res.push(pick);
              }
              return res;
          };`,
      tags: "random, unique, array, number, repeat",
      author: "Matt Perkins",
    },
    {
      name: "Euler's Number",
      code: `
            // 2.7182818284590452353602874713527
            export const E = 2.718; // Euler's number rounded of to 3 places`,
      tags: "Euler, logarithm, log, exponential",
      author: "Matt Perkins",
    },
    {
      name: "Golden Ratio",
      code: `
            // φ phi 1.6180339887498948482
            export const golden = (Math.sqrt(5) + 1) / 2;`,
      tags: "golden, curve, phi, gold",
      author: "Matt Perkins",
    },
    {
      name: "Fibonacci Sequence",
      code: `
            export const fibonacci = [
              0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657,
              46368, 75025, 121393, 196418, 317811,
            ];`,
      tags: "golden, curve, phi, gold, golden ratio",
      author: "Matt Perkins",
    },
    {
      name: "Clamp",
      code: `
            export const clamp = (min = 0, max = 1, a) => Math.min(max, Math.max(min, a));`,
      tags: "clamp, range, restrict, ",
      author: "Matt Perkins",
    },
    {
      name: "Round to Even",
      code: `
            export const roundToEven = (value) => 2 * Math.round(value / 2));`,
      tags: "round, ceil, floor, even, 2, number",
      author: "Matt Perkins",
    },
    {
      name: "Snap Number",
      code: `
            export const snapNumber = (snap, n) => Math.floor(n / snap) * snap;`,
      tags: "round, ceil, floor, snap, number",
      author: "Matt Perkins",
    },
    {
      name: "Hough Transform (Quantize)",
      code: `
            // Hough transform
            // https://stackoverflow.com/questions/24372921/how-to-calculate-quantized-angle
            export const houghQuantize = (numAngles, theta) => Math.floor((numAngles * theta) / TAU + 0.5);`,
      tags: "quantize, angle, theta, angle, tau",
      author: "Matt Perkins",
    },
    {
      name: "Quantize",
      code: `
            // https://stackoverflow.com/questions/47047691/how-to-quantize-directions-in-canny-edge-detector-in-python
            export const quantize = (numAngles, theta) => (Math.round(theta * (numAngles / Math.PI)) + numAngles) % numAngles;`,
      tags: "quantize, angle, theta, angle, pi",
      author: "Matt Perkins",
    },
    {
      name: "Round to Decimal Points",
      code: `
            // Round to 'n' decimal points.
            export const roundN = (a, n) => {
                const d = 10 ** n;
                return Math.round((a + Number.EPSILON) * d) / d;
            };`,
      tags: "round, decimal, tenth",
      author: "Matt Perkins",
    },
    {
      name: "Round to Decimal Points",
      code: `
            // Round to 'n' decimal points.
            export const roundN = (a, n) => {
                const d = 10 ** n;
                return Math.round((a + Number.EPSILON) * d) / d;
            };`,
      tags: "quantize, angle, theta, angle, pi",
      author: "Matt Perkins",
    },
    {
      name: "Lerp",
      code: `
            // lerp(20, 80, 0.5) -> 40
            export const lerp = (x, y, a) => x * (1 - a) + y * a;`,
      tags: "interpolate, between, middle",
      author: "Matt Perkins",
    },
    {
      name: "Inverse Lerp",
      code: `
            // invlerp(50, 100, 75)  -> 0.5
            export const invlerp = (x, y, a) => clamp(0, 1, (a - x) / (y - x));`,
      tags: "interpolate, between, middle, lerp, return ratio",
      author: "Matt Perkins",
    },
    {
      name: "Radians to Degrees",
      code: `
            export const radiansToDegrees = (rad) => (rad * 180) / Math.PI;`,
      tags: "radians, degrees, angle, conversion, converter",
      author: "Matt Perkins",
    },
    {
      name: "Degrees to Radians",
      code: `
            export const degreesToRadians = (deg) => (deg * Math.PI) / 180;`,
      tags: "radians, degrees, angle, conversion, converter",
      author: "Matt Perkins",
    },
    {
      name: "Rotate Point",
      code: `
            export const rotatePoint = (p, rad) => ({
              x: p.x * Math.cos(rad),
              y: p.y * Math.sin(rad),
            });`,
      tags: "rotate, point",
      author: "Matt Perkins",
    },
    {
      name: "Rotate Point Around Corner",
      code: `
            export const rotatePointAroundCenter = (cx, cy, x, y, radians) => {
              const cos = Math.cos(radians);
              const sin = Math.sin(radians);
              const nx = cos * (x - cx) + sin * (y - cy) + cx;
              const ny = cos * (y - cy) - sin * (x - cx) + cy;
              return [nx, ny];
          };`,
      tags: "rotate, point, corner",
      author: "Matt Perkins",
    },
    {
      name: "Intersection of Two Lines",
      code: `
            // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
            // Determine the intersection point of two line segments
            // Return FALSE if the lines don't intersect
            function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
            
              // Check if none of the lines are of length 0
                if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
                    return false
                }
            
                denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
            
              // Lines are parallel
                if (denominator === 0) {
                    return false
                }
            
                let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
                let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
            
              // is the intersection along the segments
                if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
                    return false
                }
            
              // Return a object with the x and y coordinates of the intersection
                let x = x1 + ua * (x2 - x1)
                let y = y1 + ua * (y2 - y1)
            
                return {x, y}
            }`,
      tags: "intersect, cross, line, overlap, paul bourke",
      author: "Ahmad Moussa",
    },
  ],
};
