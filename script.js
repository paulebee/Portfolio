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

    profil.addEventListener('mouseover', function() {
        this.classList.add('hidden');
        profilDesc.classList.remove('hidden');
    });

    profil.addEventListener('mouseout', function() {
        this.classList.remove('hidden');
        background.classList.remove('hidden');
        profilBg.classList.add('hidden');
        profilDesc.classList.add('hidden');
    });

    let colorDegree = 0;
    document.addEventListener('scroll', function() {
        colorDegree += 5;
        if(colorDegree >= 360) {
            colorDegree = 0;
        }
        background.style.filter = "hue-rotate("+colorDegree+"deg)";
    });

    let colorDegree2 = 0;
    let profilSize = 50;
    // setInterval(function(){
    //     profilSize += 1;
    //     if(profilSize >= 52) {
    //         profilSize = 50;
    //     }
    //     profil.style.width = profilSize+"%";
        
    // },500);
    
});