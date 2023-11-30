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
    let canvas = document.querySelector('canvas');
    let imageContainer = document.getElementById('imageContainer');
    let hasClicked = false;

    profil.addEventListener('click', function() {
        console.log(new Date().getSeconds());
        this.classList.add('d-none');
        this.classList.add('test');
        profilDesc.classList.remove('d-none');
        profilBg.classList.remove('d-none');
        hasClicked = true;
        console.log(this.classList);
    });

    profil.addEventListener('mouseover', function() {
        clearInterval(clickMe);
        setTimeout(function() {
            profil.style.filter = "grayscale(0)";
        }, 500);
        profil.style.filter = "grayscale(0)";
        console.log('test');
        // canvas.remove();
        clearInterval(clickMe);
        background.classList.add('hidden');
    });

    function clearProfile() {
        if(hasClicked){
            setTimeout(function() {
                profilDesc.classList.add('d-none');
                profilBg.classList.add('d-none');
                background.classList.remove('hidden');
                profil.classList.remove('d-none');
                imageContainer.classList.remove('d-none');
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

});