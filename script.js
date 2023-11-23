document.addEventListener('DOMContentLoaded', (event) => {
    $('.owl-carousel').owlCarousel({
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
    let imageContainer = document.getElementById('imageContainer');
    let hasClicked = false;

    profil.addEventListener('click', function() {
        this.classList.add('hidden');
        profilDesc.classList.remove('hidden');
        profilBg.classList.remove('hidden');
        hasClicked = true;
    });

    profil.addEventListener('mouseover', function() {
        clearInterval(clickMe);
        profil.style.filter = "grayscale(0)";
    });

    profil.addEventListener('mouseout', function() {
        if(hasClicked){
            profilDesc.classList.add('hidden');
            this.classList.remove('hidden');
            background.classList.remove('hidden');
            profilBg.remove();
            imageContainer.remove();      
        } 
    });

    let colorDegree = 0;
    document.addEventListener('scroll', function() {
        colorDegree += 5;
        if(colorDegree >= 360) {
            colorDegree = 0;
        }
        background.style.filter = "hue-rotate("+colorDegree+"deg)";
    });

    let profilDiv = document.getElementById('profilDiv');

    document.addEventListener('mousemove', (e) => {
        console.log(window.innerWidth/2);
        const x = e.clientX-(window.innerWidth/2);
        const y = e.clientY;

        const imageContainer = document.querySelector('.image-container');

        imageContainer.style.clipPath = `circle(50px at ${x}px ${y}px)`;
        console.log(imageContainer.style.clipPath);
    });

    let clickMe =
        setInterval(function() {
            profil.style.filter = "grayscale(1) drop-shadow(0 0 2rem rgb(160, 160, 160))";
            setTimeout(function() {
                profil.style.filter = "grayscale(1) drop-shadow(0 0 0.75rem rgb(160, 160, 160))";
            }, 500);
        }, 1000);


});