document.addEventListener('DOMContentLoaded', (event) => {

  const canvas = document.getElementById("canvas2");
  const competences = document.getElementById("competences");
  const ctx = canvas.getContext("2d");

  canvas.width = 0;
  canvas.height = 0;
  canvas.classList.add('d-none');

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.clientHeight
  });

  competences.addEventListener('mouseover', function() {
    console.log('add');
    canvas.classList.remove('d-none');
  });

  competences.addEventListener('mouseout', function() {
    console.log('remove');
    canvas.classList.add('d-none');
  });
 
  setTimeout(function() {
    if(window.matchMedia("(any-hover: none)").matches) {
      canvas.classList.add('d-none');
    } 
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  }, 1000);
  

  const circles = [];

  const maxCircles = 20; 
  const trailLength = 10; 

  let [R, G, B] = [255, 0, 0]; 
  
  let divCompetences= competences.querySelector('div');

  divCompetences.querySelectorAll('div').forEach(function(div) {
    div.addEventListener('mouseover', function() {
      let divTitle = div.querySelector('h2');
      if (divTitle.className.split('-')[1] == 'red') {
        [R, G, B] = [255, 0, 0];
      }
      if (divTitle.className.split('-')[1] == 'blue') {
        [R, G, B] = [0, 0, 255];
      }
      if (divTitle.className.split('-')[1] == 'purple') {
        [R, G, B] = [255, 0, 255];
      }
      if (divTitle.className.split('-')[1] == 'orange') {
        [R, G, B] = [255, 165, 0];
      } 
      color = "rgb("+R+", "+G+", "+B+")";
    });
  });

  let color = "rgb("+R+", "+G+", "+B+")";

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
    const x = event.clientX;
    const y = event.clientY;
    createCircle(x, y, 10, color); 
  }

  competences.addEventListener("mousemove", onMouseMove); 

  draw(); 
});