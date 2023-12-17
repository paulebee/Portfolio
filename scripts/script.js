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
        dots: true,
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
    let contactRow = document.getElementById('rowContact');
    let footer = document.querySelector('footer');
    let navbar = document.getElementById('navbar');

    welcomeTitle.style.marginTop = -5 + "em";
    profil.style.marginTop = 5 + "em";
    
    let contentPos, contactContentHeight, mentionsContentHeight = "";
    let origin = 0;
    var rect = 0;
    var targetScrollPosition = 0;

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
        canvas.classList.add('d-none');
        opacityTransition(background, 'up');
        navbar.classList.remove('d-none');

        setTimeout(function() {
            canvas.classList.remove('d-none');
            canvas.width = window.innerWidth;
            canvas.height = document.body.scrollHeight;
            origin = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            targetScrollPosition = contactRow.offsetTop + contactRow.offsetHeight - window.innerHeight;
        }, 1500);
    });

    function clearProfile() {
        if(hasClicked){
            setTimeout(function() {
                profilDesc.classList.add('d-none');
                profilBg.classList.add('d-none');
                opacityTransition(profil, 'up');
                profil.style.filter = "grayscale(0)";
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

    addEventListener('resize', function() {
        contentPos = document.body.clientHeight - contactRow.offsetHeight;   
        contactContentHeight = contactContent.offsetHeight;
        canvas.height = document.body.scrollHeight;          
    });


    // User has scrolled to the bottom of the page
    let alreadyOpened = false;
    let hasReachedBottom = false;

    let prevScrollPos = document.documentElement.scrollTop;

    function clearFooter(){
        var scrollTriggerPosition = 500; 
        var isScrollingUp = false;
        var wasAtBottom = false;     
        document.addEventListener('scroll', function () {
            var currentScrollPosition = window.scrollY;
    
            if (currentScrollPosition < scrollTriggerPosition) {
                isScrollingUp = true;
            } else {
                isScrollingUp = false;
            }
    
            var bottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
            
            if(bottom){
                wasAtBottom = true;
            }
    
            if (wasAtBottom && isScrollingUp) {
                contactRow.style.marginTop ="";
                contactContent.style.opacity = "0";
                contactContent.style.top = "";
                contactContent.style.display = "none";
                mentionsContent.style.display = "none";
                mentionsContent.style.opacity = "0";
                mentionsContent.style.top = "";
                hasReachedBottom = false;
                alreadyOpened = false;
                console.log("Scrolled up past the trigger position after being at the bottom.");
            }
        });

    }
   

    function openFooter(element, alreadyOpened){
        let delay = "";
        if(alreadyOpened){
            delay = 0;
        }
        else{
            delay = 0;
        }
        setTimeout(function() {
            contentPos = document.body.scrollHeight - contactRow.offsetHeight;
            console.log(contentPos, origin);
            element.style.top = contentPos + "px";
            element.style.display = "block";
            elementHeight = element.offsetHeight;
            contactRow.style.marginTop = elementHeight + "px";
            element.style.opacity = "1";
            clearFooter();
        }, delay);
    }

    contactLink.addEventListener('click', function() {
        if(contactContent.style.opacity == "1"){
            setTimeout(function() {
                window.scrollTo({
                    top: targetScrollPosition,
                    behavior: 'smooth' // You can use 'auto' for instant scrolling
                });
            }, 1600);
            contactRow.style.marginTop ="";
            contactContent.style.opacity = "0";
            contactContent.style.top = "";
            contactContent.style.display = "none";
            hasReachedBottom = false;
            alreadyOpened = false;
        }
        else if(mentionsContent.style.opacity == "1"){
            setTimeout(function() {
                window.scrollTo({
                    top: targetScrollPosition,
                    behavior: 'smooth' // You can use 'auto' for instant scrolling
                });
                openFooter(contactContent,alreadyOpened);
            }, 1600);
            mentionsContent.style.display = "none";
            mentionsContent.style.opacity = "0";
            mentionsContent.style.top = "";
            contactRow.style.marginTop ="";
        }
        else {
            openFooter(contactContent,alreadyOpened);
            alreadyOpened = true;
        }     
    });
    
    mentionsLink.addEventListener('click', function() {
        if(mentionsContent.style.opacity == "1"){
            setTimeout(function() {
                window.scrollTo({
                    top: targetScrollPosition,
                    behavior: 'smooth' // You can use 'auto' for instant scrolling
                });
            }, 1600);
            contactRow.style.marginTop ="";
            mentionsContent.style.opacity = "0";
            mentionsContent.style.top = "";
            mentionsContent.style.display = "none";
            hasReachedBottom = false;
            alreadyOpened = false;
        }
        else if(contactContent.style.opacity == "1"){
            setTimeout(function() {
                window.scrollTo({
                    top: targetScrollPosition,
                    behavior: 'smooth' // You can use 'auto' for instant scrolling
                });
                openFooter(mentionsContent,alreadyOpened);
            }, 1600);
            contactContent.style.opacity = "0";
            contactContent.style.top = "";
            contactContent.style.display     = "none";
            contactRow.style.marginTop ="";
            
        }
        else {
            openFooter(mentionsContent,alreadyOpened);
            alreadyOpened = true;
        }   
    });
    
});