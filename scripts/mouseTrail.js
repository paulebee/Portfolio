document.addEventListener('DOMContentLoaded', (event) => {
  const canvas = document.getElementById("canvas");
  const profilPart = document.getElementById("profilPart");
  const ctx = canvas.getContext("2d");
  let profil = document.getElementById('profil');

  canvas.width = 0;
  canvas.height = 0;

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.clientHeight
  });

  canvas.classList.add('d-none');  
  setTimeout(function() {
    canvas.classList.remove('d-none');
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  }, 1000);
  
  const circles = [];

  const maxCircles = 20; 
  const trailLength = 10; 

  let [R, G, B] = [255, 0, 0];

  function getColor() {
    let color = "rgb("+R+", "+G+", "+B+")";
    let speed = 15;
    if (R == 255 && G < 255 && B == 0){
      G += speed;
    }
    else if (R > 0 && G == 255 && B == 0){
      R -= speed;
    }
    else if (R == 0 && G == 255 && B < 255){
      B += speed;
    }
    else if (R == 0 && G > 0 && B == 255){
      G -= speed;
    }
    else if (R < 255 && G == 0 && B == 255){
      R += speed;
    }
    else if (R == 255 && G == 0 && B > 0){
      B -= speed;
    }
    color = "rgb("+R+", "+G+", "+B+")";
    return color;
  }

  function createCircle(x, y, radius, color) {
    circles.push({ x, y, radius, color });

    if (circles.length > maxCircles) {
      circles.shift();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fillStyle = circle.color;

      ctx.globalAlpha = (i / circles.length) * 0.5;
      ctx.fill();

      circle.radius += 0.5; 

      if (circle.radius > 50) {
        circles.splice(i, 1);
        i--;
      }
    }

    requestAnimationFrame(draw); 
  }

  function onMouseMove(event) {
    const x = event.pageX;
    const y = event.pageY;
    createCircle(x, y, 10, getColor()); 
  }

  profilPart.addEventListener("mousemove", onMouseMove); 

  draw(); 
});