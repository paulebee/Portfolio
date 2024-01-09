document.addEventListener('DOMContentLoaded', (event) => {

    $('.owl-modal').owlCarousel({
        items: 1,
        margin: 10,
        loop: true, 
        dots: true,
        // mouseDrag : true,
    });
    
    let background = document.getElementById('background'),
     profilBg = document.getElementById('profilBg'),
     profilDesc = document.getElementById('profilDesc'),
     profil = document.getElementById('profil'),
     hasClicked = false,
     portfolio = document.getElementById('portfolio'),
     canvas = document.getElementById("canvas"),
     footer = document.querySelector('footer'),
     navbar = document.querySelector('header');
     body = document.body,
     competences = document.getElementById('competences'),
    html = document.documentElement;
    
    let origin = 0;


    //Transition avec d-none
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

    //Actions survol profil
    profil.addEventListener('mouseover', function() {
        portfolio.classList.remove('d-none');
        this.classList.add('d-none');
        opacityTransition(profilDesc, 'up');
        opacityTransition(profilBg, 'up');
        hasClicked = true;
        clearInterval(clickMe);
        opacityTransition(background, 'up');
        navbar.style.opacity = 1;
        footer.classList.remove('d-none');
        competences.classList.remove('d-none');

        setTimeout(function() {
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

    //Réaparition profil
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
    
    //Animation profil
    let clickMe = setInterval(function() {
        profil.style.filter = "grayscale(1) drop-shadow(0 0 2rem rgb(160, 160, 160))";
        setTimeout(function() {
            profil.style.filter = "grayscale(1) drop-shadow(0 0 0.75rem rgb(160, 160, 160))";
        }, 500);
    }, 1000);

    // var owl = $('.owl-carousel');
    // owl.owlCarousel();

    //Changement couleur background
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