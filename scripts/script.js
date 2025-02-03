document.addEventListener('DOMContentLoaded', (event) => {

    let nextProjectDivs = document.querySelectorAll('.nextProject');

    let project1 = document.getElementById('project1');

    let projectsDiv = document.querySelectorAll('.projectImg');

    let buttons = document.querySelectorAll('.btn');

    let returnArrows = document.querySelectorAll('.returnArrow');

    let footer = document.querySelector('footer');

    let positions = ["P1", "P2", "P3", "P4", "P5","P6","P7"];

    let order= [1,2,3,4,5,6,7];

    //Ajoute les addEventListener sur les croix pour fermer les projets et sur les flèches pour revenir en haut de la page
    projectsDiv.forEach((projectDiv) => {
        let nextProjectDiv = projectDiv.querySelector('.nextProject');
        nextProjectDiv.addEventListener('click', (event) => {
            changePositions();
            footer.classList.remove('hidden');
        });

        let returnArrow = projectDiv.querySelector('.returnArrow');
        returnArrow.addEventListener('click', (event) => {
            document.getElementById("projetsTitre").scrollIntoView({behavior: 'smooth'});
        });
    });
 
    buttons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            let projectDiv = projectsDiv[index];
            projectDiv.querySelector('div:nth-child(2)').classList.remove('slide');
            projectDiv.querySelector('div:nth-child(2)').classList.add('slideMini');
            button.classList.add('d-none');
            projectDiv.querySelector('.details').classList.remove('d-none');
            footer.classList.add('hidden');
        });
    });

    function changePositions(){
        let lastElement = order.pop();
        order.unshift(lastElement);

        projectsDiv.forEach((projectDiv, index) => {
            if (positions.some(className => projectDiv.classList.contains(className))) {
                projectDiv.classList.remove(...positions);
                projectDiv.classList.add("P" + (order[index])); 
                if(order[index] > 5){
                    projectDiv.querySelector('div:nth-child(2)').classList.remove('slideMini');
                    projectDiv.querySelector('div:nth-child(2)').classList.add('slide');
                    projectDiv.classList.add('moveOut');
                    setTimeout(() => {
                        projectDiv.querySelector('.details').classList.add('d-none');
                    }, 1000);
                }
                if(order[index] == 5){
                    projectDiv.classList.remove('moveOut');
                    projectDiv.querySelector('.nextProject').classList.add('hidden');
                    projectDiv.querySelector('div:nth-child(2)').classList.remove('slideMini');
                    projectDiv.querySelector('div:nth-child(2)').classList.add('slide');
                    projectDiv.querySelector('button').classList.remove('d-none');
                }
                if(order[index] == 1){
                    projectDiv.querySelector('.nextProject').classList.remove('hidden');
                }
            }
        });
    }

    //Animation affichage des projets
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){ 
                project1.classList.remove('P1first');
                projectsDiv.forEach((projectDiv, index) => {
                    projectDiv.classList.add(positions[index]);
                });
                observer.unobserve(entry.target);
            } 
        });
    }, {
        root: null,
        rootMargin: '-50% 50px -50% 50px', 
        threshold: 0
    });

    observer.observe(project1);

    //Animation affichage titre
    const elementToHide = document.getElementById('portfolioTitre');
    const triggerElement = document.querySelector('.aPropos');
    function checkPosition() {
        const triggerRect = triggerElement.getBoundingClientRect();
        const hideRect = elementToHide.getBoundingClientRect();
    
        if (triggerRect.top < hideRect.top) {
          elementToHide.classList.add('hidden2');
        } else {
          elementToHide.classList.remove('hidden2');
        }
    }

    window.addEventListener('scroll', checkPosition);

    
    //Disparition du "Découvrir"
    let accueilBtm = document.getElementById('accueilBtm');
    window.addEventListener('scroll', function(){
        if(window.scrollY==0){
            accueilBtm.classList.remove('hidden');
        } 
        else {
            accueilBtm.classList.add('hidden');
        }
    });

    let aPropos = document.querySelector('.aPropos');
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){ 
                console.log("test");
                aPropos.classList.add('visible');
                aPropos.classList.remove('hidden3');
                
                observer2.unobserve(entry.target);
            } 
        });
    }, {
        root: null,
        rootMargin: '-50% 50px -20% 50px', 
        threshold: 0
    });

    observer2.observe(aPropos);

});