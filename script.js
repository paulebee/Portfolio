document.addEventListener('DOMContentLoaded', (event) => {
    $('.owl-main').owlCarousel({
        loop: true, 
        margin: 20,
        nav: true,
        // mouseDrag : true,
        responsive: {
            0: {
                items: 1 // Nombre d'éléments à afficher à partir de 0px de largeur d'écran
            },
            600: {
                items: 2 // Nombre d'éléments à afficher à partir de 600px de largeur d'écran
            },
            1000: {
                items: 3 // Nombre d'éléments à afficher à partir de 1000px de largeur d'écran
            }
        }
    });

    $('.owl-modal').owlCarousel({
        items: 1,
        margin: 10,
        loop: true, 
        nav: true,
        // mouseDrag : true,
    });
    
    // Associez les boutons de contrôle aux flèches
    $('.custom-nav button.next').on('click', function() {
    $('.owl-carousel').trigger('next.owl.carousel');
    });
    $('.custom-nav button.prev').on('click', function() {
    $('.owl-carousel').trigger('prev.owl.carousel');
    });

    let background = document.getElementById('background');
    let profilBg = document.getElementById('profilBg');
    let profilDesc = document.getElementById('profilDesc');
    let profil = document.getElementById('profil');
    let profilDiv = document.getElementById('profilDiv');
    // let canvas = document.querySelector('canvas');
    let imageContainer = document.getElementById('imageContainer');
    let hasClicked = false;
    let contactContent = document.getElementById('contactContent');

    // profil.addEventListener('click', function() {
        
    // });

    function opacityTransition(element, way){
        if(way == 'up'){
            element.classList.remove('d-none');
            element.style.opacity = 0;
            setTimeout(function() {
                element.style.opacity = 1;
            }
            , 500);
        }
        if(way == 'down'){
            element.style.opacity = 1;
            setTimeout(function() {
                element.style.opacity = 0;
            }
            , 500);
        }
    }

    profil.addEventListener('mouseover', function() {
        this.classList.add('d-none');
        this.classList.add('test'); 
        opacityTransition(profilDesc, 'up');
        opacityTransition(profilBg, 'up');
        hasClicked = true;
        clearInterval(clickMe);
        opacityTransition(background, 'down');
    });

    function clearProfile() {
        if(hasClicked){
            setTimeout(function() {
                profilDesc.classList.add('d-none');
                profilBg.classList.add('d-none');
                opacityTransition(background, 'up');
                opacityTransition(profil, 'up');
                // imageContainer.classList.remove('d-none');
            }, 1000);  
            hasClicked = false;    
        } 
    }

    profilBg.addEventListener('mouseout', clearProfile);
    document.addEventListener('scroll', clearProfile);

    let colorDegree = 0;

    // document.addEventListener('mousemove', (e) => {
    //     const x = e.clientX;
    //     const y = e.clientY+290;
    //     console.log(x,y);
    //     const imageContainer = document.querySelector('.image-container');

    //     imageContainer.style.clipPath = `circle(50px at ${x}px ${y}px)`;
    // });

    
    let clickMe = setInterval(function() {
        console.log(profil.style.filter);
        profil.style.filter = "grayscale(1) drop-shadow(0 0 2rem rgb(160, 160, 160))";
        setTimeout(function() {
            profil.style.filter = "grayscale(1) drop-shadow(0 0 0.75rem rgb(160, 160, 160))";
        }, 500);
    }, 1000);

    var owl = $('.owl-carousel');
    owl.owlCarousel();

    // Listen to owl events:
    owl.on('changed.owl.carousel', function(event) {
        colorDegree += 50;
        if(colorDegree >= 360) {
            colorDegree = 0;
        }
        background.style.filter = "hue-rotate("+colorDegree+"deg)";
    })

    const scrollingElement = (document.scrollingElement || document.body);

    // let scrollBottom = setTimeout(function() {
    //     opacityTransition(contactContent, 'up');
    //     window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    // }, 1000);

    let timeoutId;
    let endPos = document.body.scrollHeight;
    window.addEventListener('scroll', () => {
        endPos = document.body.scrollHeight;
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            // User has scrolled to the bottom of the page
            if (!timeoutId) {
                contactContent.style.bottom = "-9em";
                contactContent.style.opacity = "1";
                timeoutId = setTimeout(() => {
                    timeoutId = null; 
                    endPos = document.body.scrollHeight;
                    console.log("test1",endPos);
                    contactContent.scrollIntoView();
                }, 0);
            }
        } else {
            // User is not at the bottom of the page, clear the timeout
            clearTimeout(timeoutId);
            timeoutId = null;  // Reset the timeout ID
            contactContent.style.bottom = "";
            contactContent.style.opacity = "0";
            endPos = document.body.scrollHeight;
            console.log("test2",endPos);
        }
    });
      
    // Obtaining the canvas element and its 2D rendering context.
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Setting the canvas dimensions to match the viewport size.
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;

    window.addEventListener('resize', function() {
        canvas.height = document.body.scrollHeight;
    });

    // Initializing an array to store circle information.
    const circles = [];

    // Defining constants for control.
    const maxCircles = 20; // Limiting the number of circles on the canvas.
    const trailLength = 10; // Specifying the length of the trails.

    // Generating a random color for the circles.
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
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
      createCircle(x, y, 10, getRandomColor()); // Creating a new circle at the mouse position.
    }

    canvas.addEventListener("mousemove", onMouseMove); // Listening for mouse movement.

    draw(); // Starting the animation loop.

});