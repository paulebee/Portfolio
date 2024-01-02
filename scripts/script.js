document.addEventListener('DOMContentLoaded', (event) => {
    $('.owl-main').owlCarousel({
        loop: true, 
        margin: 20,
        nav: true,
        responsive: {
            0: {
                items: 1 
            },
            600: {
                items: 2
            },
            1000: {
                items: 3 
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
    
    $('.custom-nav button.next').on('click', function() {
    $('.owl-carousel').trigger('next.owl.carousel');
    });
    $('.custom-nav button.prev').on('click', function() {
    $('.owl-carousel').trigger('prev.owl.carousel');
    });

    let background = document.getElementById('background'),
     profilBg = document.getElementById('profilBg'),
     profilDesc = document.getElementById('profilDesc'),
     profil = document.getElementById('profil'),
     profilDiv = document.getElementById('profilDiv'),
     hasClicked = false,
     portfolio = document.getElementById('portfolio'),
     welcomeTitle = document.getElementById('welcomeTitle'),
     canvas = document.getElementById("canvas"),
     footer = document.querySelector('footer'),
     navbar = document.getElementById('navbar'),
     body = document.body,
     competences = document.getElementById('competences'),
    html = document.documentElement;

    profil.style.marginTop = 5 + "em";
    
    let origin = 0;

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
        this.classList.add('d-none');
        opacityTransition(profilDesc, 'up');
        opacityTransition(profilBg, 'up');
        hasClicked = true;
        clearInterval(clickMe);
        // opacityTransition(background, 'down');
        // canvas.classList.add('d-none');
        // opacityTransition(background, 'up');
        opacityTransition(background, 'up');
        navbar.style.opacity = 1;
        footer.classList.remove('d-none');
        competences.classList.remove('d-none');

        setTimeout(function() {
            // canvas.classList.remove('d-none');
            canvas.width = window.innerWidth;
            canvas.height = Math.max( body.scrollHeight, body.offsetHeight, 
                html.clientHeight, html.scrollHeight, html.offsetHeight );
            console.log(canvas.height);
            origin = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
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

    document.addEventListener('click', function() {
        console.log(canvas.height);
    });

    profilBg.addEventListener('mouseout', clearProfile);
    document.addEventListener('scroll', clearProfile);
    
    let clickMe = setInterval(function() {
        profil.style.filter = "grayscale(1) drop-shadow(0 0 2rem rgb(160, 160, 160))";
        setTimeout(function() {
            profil.style.filter = "grayscale(1) drop-shadow(0 0 0.75rem rgb(160, 160, 160))";
        }, 500);
    }, 1000);

    var owl = $('.owl-carousel');
    owl.owlCarousel();

    async function loopElementColor() {
        let hue = 0;

        while (true) {
            background.style.filter = `hue-rotate(${hue}deg)`;
            hue += 10;
            await sleep(300);
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    loopElementColor();
});