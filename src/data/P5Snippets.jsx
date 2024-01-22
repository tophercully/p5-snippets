export const p5Snippets = [
    {
        name:'Find Vector Distance',
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
          tags:'distance, vector, difference, geometry, trigonometry'
    },
    {
        name:'Angle Between Vectors',
        code: `
        function angBetween(x1, y1, x2, y2) {
            return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
          }`,
          tags: 'angle, atan'
    },
    {
        name:'Point From Angle',
        code: `
        function ptFromAng(xPosition, yPosition, ang, dis) {
            var xMod = cos(ang)*dis
            var yMod = sin(ang)*dis
          
            return {
                x:(xPosition+xMod), 
                y:(yPosition+yMod)
            }
          }`,
          tags:'polar, distance, angle, geometry, trigonometry'
    },
    {
        name:'Positive or Negative',
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
          tags:'plus, minus, flip, absolute, value'
    },
    {
        name:'Point Between Vectors',
        code: `
        function ptBetween(xA, yA, xB, yB, amt) {
            var xBetween = map(amt, 0, 1, xA, xB)
            var yBetween = map(amt, 0, 1, yA, yB)
            var betweenPos = createVector(xBetween, yBetween)
            return betweenPos
          }`,
          tags:'map, range, interpolate, interpolation, geometry, trigonometry'
    },
    {
        name:'Shuffle Array',
        code: `
        function shuff(array) {
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
          tags:'shuffle, sort, random, scramble, list, geometry, trigonometry'
    },
    {
        name:'Sort By Property',
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
          tags:'property, attribute, array, '
    },
    {
        name:'Grid',
        code: `
        function grid() {
            cols = 10
            rows = 10
            cellW = width/cols
            cellH = height/rows 
            for(let y = 0; y < rows; y++) {
              for(let x = 0; x < cols; x++) {
                rect(x*cellW+cellW/2, y*cellH+cellH/2)
              }
            }
          }`,
          tags:'grid, mesh, matrix'
    },
    {
        name:'Circle with Polar Noise',
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
          tags:'geometry, trigonometry, polar shape, noise'
    },
    {
        name:'Random Integer',
        code: `
        function randomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
        }`,
          tags:'random, limit, round, floor, ceil'
    },
    {
        name:'Map Range',
        code: `
        //works just like p5's map() but works globally
        function map_range(value, low1, high1, low2, high2) {
          return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
        }`,
          tags:'range map, interpolate, scale, math'
    },
    {
      name:'Geometry Class Quickstart',
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
        tags:'geometry, shape, class, custom, object'
  },
  {
      name:'Polar Rectangle',
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
        tags:'geometry, shape, rectangle, square, polar, conversion, p5'
  },
  {
      name:'Polar Circle',
      code: `
      function polarCircle(x, y, radius) {
        push()
        translate(x, y)
        beginShape()
        for(let i = 0; i < 360; i+=1) {
          var xPosition = cos(i)*radius
          var yPosition = sin(i)*radius
      
          curveVertex(xPosition, yPosition)
        }
        endShape(CLOSE)
        pop()
      }`,
        tags:'geometry, shape, class, custom, object'
  },
  {
      name:'Polar Flower',
      code: `
      function flower(x, y, radius, numPetals) {
        push()
        translate(x, y)
        beginShape()
        for(let i = 0; i < 360; i++) {
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
        tags:'geometry, shape, sine, petals, exponential'
  },
]