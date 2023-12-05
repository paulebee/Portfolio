document.addEventListener('DOMContentLoaded', (event) => {
  // Obtaining the canvas element and its 2D rendering context.
  const canvas = document.getElementById("canvas");
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
  

  // Initializing an array to store circle information.
  const circles = [];

  // Defining constants for control.
  const maxCircles = 20; // Limiting the number of circles on the canvas.
  const trailLength = 10; // Specifying the length of the trails.

  let [R, G, B] = [255, 0, 0]; // Setting the RGB color of the circles.
  // Generating a color for the circles.
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

  // Creating a new circle and adding it to the array, managing the maximum limit.
  function createCircle(x, y, radius, color) {
    circles.push({ x, y, radius, color });

    // Removing the oldest circle if the maximum circle count is reached.
    if (circles.length > maxCircles) {
      circles.shift();
    }
  }

  // Function to draw the canvas and animate the circles.
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clearing the canvas.

    // Looping through the circles array, drawing each with a fading effect.
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fillStyle = circle.color;

      // Adjusting the transparency based on the circle's position in the array.
      ctx.globalAlpha = (i / circles.length) * 0.5;
      ctx.fill();

      circle.radius += 0.5; // Increasing the radius for animation.

      // Removing old circles when they exceed a certain size.
      if (circle.radius > 50) {
        circles.splice(i, 1);
        i--;
      }
    }

    requestAnimationFrame(draw); // Continuing the animation loop.
  }

  // Function for handling mouse movement and creating new circles at the pointer.
  function onMouseMove(event) {
    const x = event.pageX;
    const y = event.pageY;
    createCircle(x, y, 10, getColor()); // Creating a new circle at the mouse position.
  }

  canvas.addEventListener("mousemove", onMouseMove); // Listening for mouse movement.

  draw(); // Starting the animation loop.
});