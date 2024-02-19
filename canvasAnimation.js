const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numPoints = 600;
const canvasState = {
  points: []
}

const coupleOfSatellites = (data) => {
  const numberOfSatellites = Math.floor(Math.random() * 6)
  if(!numberOfSatellites) {
    return []
  }
  satellitesData = []
  for(let i = 0; i < numberOfSatellites; i++) {
    satellitesData.push({
      x: data.x,
      y: data.y,
      speed: data.speed,
      startX: data.startX,
      startY: data.startY,
      angle: data.angle,
      fading: data.fading,
      radius: Math.floor(Math.random() * 2) + 1,
      minRadius: Math.floor(Math.random() * 10) + 2 + data.radius,
      theta: 0,
      color: 'rgb(0, 0, 0)',
      DTheta: (Math.floor(Math.random() * 20) + 10) / 1000,
      satellites: []
    })
  }

  return satellitesData
}

const getRandom = (n) => {
  return Math.floor(Math.random() * n)
}

const generateColor = () => {
  return `rgb(${getRandom(255)}, ${getRandom(255)}, ${getRandom(255)})`
}

function createPoint() {
  const x = canvas.width / 2
  const y = canvas.height / 2
  const startX = canvas.width / 2
  const startY = canvas.height / 2
  const speed = Math.random() * 4
  const angle = Math.random() * Math.PI * 2
  const fading = false
  const radius = Math.floor(Math.random() * 12) + 1
  const color = 'rgb(0, 0, 0)'

  return {
    x,
    y,
    startX,
    startY,
    speed,
    angle,
    fading,
    radius,
    color,
    satellites: []
    // satellites: coupleOfSatellites({x, y, startX, startY, speed, angle, fading, radius})
  }
}

for (var i = 0; i < numPoints; i++) {
  canvasState.points.push(createPoint());
}

function drawPoints(points, satellitesArr = []) {
  for (var i = 0; i < points.length; i++) {
    const point = points[i];

    if(satellitesArr.length === 0){
      point.x += Math.cos(point.angle) * point.speed;
      point.y += Math.sin(point.angle) * point.speed;
    }

    const coefficientFading = point.radius * 2

    if (point.x > canvas.width + coefficientFading || point.x < 0 - coefficientFading || point.y > canvas.height + coefficientFading || point.y < 0 - coefficientFading) {
      point.fading = true;
    }

    // const distanceToBottomEdge = canvas.height - point.y
    // const distanceToTopEdge = point.y
    // const distanceToLeftEdge = point.x
    // const distanceToRightEdge = canvas.width - point.x

    // const minDistance = Math.min(distanceToBottomEdge, distanceToTopEdge, distanceToLeftEdge, distanceToRightEdge)

    // const coefficient = 1 - (minDistance / Math.min(canvas.height, canvas.width))
    // const grawingCoeff = coefficient * coefficient * coefficient * 2

    // if(satellitesArr.length > 0) {
    //   point.x = satellitesArr[0] + point.minRadius * grawingCoeff * Math.cos(point.theta);
    //   point.y = satellitesArr[1] + point.minRadius * grawingCoeff * Math.sin(point.theta);
    //   point.theta += point.DTheta;
    // }

    ctx.beginPath();
    // ctx.arc(point.x, point.y, point.radius * grawingCoeff, 0, Math.PI * 2);
    ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    ctx.fillStyle = point.color;
    ctx.fill();

    if(point.satellites.length > 0 && point.radius > 6) {
      drawPoints(point.satellites, [point.x, point.y])
    }
  }
}

setTimeout(() => {

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPoints(canvasState.points)

    canvasState.points = canvasState.points.filter(function(p) {
      return !p.fading;
    });

    if (canvasState.points.length < 1) {
      cancelAnimationFrame(animationId);
    } else {
      animationId = requestAnimationFrame(update);
    }
  }

  var animationId = requestAnimationFrame(update);

}, 5000)

const findClickedPoint = (x, y) => {
  for(let i = 0; i < canvasState.points.length; i++) {
    let xPoint = canvasState.points[i].x
    let yPoint = canvasState.points[i].y
    let radPoint = canvasState.points[i].radius
    if(x > xPoint - radPoint && x < xPoint + radPoint && y > yPoint - radPoint && y < yPoint + radPoint){
      canvasState.points[i].color = generateColor()
      canvasState.points[i].angle = Math.random() * Math.PI * 2
    }
  }
}

addEventListener("click", (event) => {
  findClickedPoint(event.clientX, event.clientY)
})

