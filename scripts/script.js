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
    let hasClicked = false;
    let contact = document.getElementById('contact');
    let contactContent = document.getElementById('contactContent');
    let contactLink = document.getElementById('contactLink');
    let contactHr = document.getElementById('contactHr');
    let mentionsLink = document.getElementById('mentionsLink');
    let portfolio = document.getElementById('portfolio');
    let welcomeTitle = document.getElementById('welcomeTitle');
    let canvas = document.getElementById("canvas");

    welcomeTitle.style.marginTop = -5 + "em";
    profil.style.marginTop = 5 + "em";

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
        portfolio.classList.remove('d-none');
        contact.classList.remove('d-none');
        contactHr.classList.remove('d-none');
        this.classList.add('d-none');
        opacityTransition(profilDesc, 'up');
        opacityTransition(profilBg, 'up');
        hasClicked = true;
        clearInterval(clickMe);
        opacityTransition(background, 'down');
        this.style.filter = "grayscale(0)";
        canvas.classList.add('d-none');
        setTimeout(function() {
            canvas.classList.remove('d-none');
            canvas.width = window.innerWidth;
            canvas.height = document.body.scrollHeight;
        }, 1500);
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
    
    let clickMe = setInterval(function() {
        profil.style.filter = "grayscale(1) drop-shadow(0 0 2rem rgb(160, 160, 160))";
        setTimeout(function() {
            profil.style.filter = "grayscale(1) drop-shadow(0 0 0.75rem rgb(160, 160, 160))";
        }, 500);
    }, 1000);

    var owl = $('.owl-carousel');
    owl.owlCarousel();

    // Listen to owl events:
    // owl.on('changed.owl.carousel', function(event) {
        // Function to loop through element color with CSS filter
        async function loopElementColor() {
            let hue = 0;

            while (true) {
                // Apply CSS filter to change hue
                background.style.filter = `hue-rotate(${hue}deg)`;

                // Increment hue for the next color
                hue += 10;

                // Pause for a moment (you can adjust the time as needed)
                await sleep(300);
            }
        }

        // Function to simulate sleep (using Promise)
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Call the function to start the color loop
        loopElementColor();
    // })

    let timeoutId;
    let endPos = document.body.scrollHeight;
    window.addEventListener('scroll', () => {
        endPos = document.body.scrollHeight;
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            // User has scrolled to the bottom of the page
            if (!timeoutId) {
                contactLink.addEventListener('click', function() {
                    if(mentionsContent.style.opacity == "1"){
                        mentionsContent.style.bottom = "";
                        mentionsContent.style.opacity = "0";
                    }
                    contactContent.style.bottom = "-8em";
                    contactContent.style.opacity = "1";
                    timeoutId = null; 
                    endPos = document.body.scrollHeight;
                    contactContent.scrollIntoView();
                });
                mentionsLink.addEventListener('click', function() {
                    if(contactContent.style.opacity == "1"){
                        contactContent.style.bottom = "";   
                        contactContent.style.opacity = "0";
                    }
                    if(window.innerWidth < 575){
                        mentionsContent.style.bottom = "-15em";
                    }
                    else{
                        mentionsContent.style.bottom = "-10em";
                    }
                    mentionsContent.style.opacity = "1";
                        timeoutId = null; 
                        endPos = document.body.scrollHeight;
                    mentionsContent.scrollIntoView();
                });
            }
        } else {
            // User is not at the bottom of the page, clear the timeout
            clearTimeout(timeoutId);
            timeoutId = null;  // Reset the timeout ID
            contactContent.style.bottom = "";
            contactContent.style.opacity = "0";
            mentionsContent.style.bottom = "";
            mentionsContent.style.opacity = "0";
            endPos = document.body.scrollHeight;
        }
    });

    // contactLink.addEventListener('click', function() {
    //     contactContent.scrollIntoView();
    // });

});