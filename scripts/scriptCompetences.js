document.addEventListener('DOMContentLoaded', (event) => {
    let testCount = 1;

    let tr = Array.from(document.querySelectorAll('tr'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){ 
                // Element visible
                entry.target.querySelector('td').style.opacity = 1;
                entry.target.style.color="black";
                entry.target.style.fontSize="1.1em";
                entry.target.style.backgroundColor="white";
                entry.target.querySelector('td:nth-child(2)').querySelector('h3').classList.add(`title${tr.indexOf(entry.target)}`);
            } else if(entry.target.querySelector('td').style.opacity == 1) {
                // Element plus visible
                entry.target.querySelector('td').style.opacity = 0;
                entry.target.style.color="lightgrey";
                entry.target.style.fontSize="1em";
                entry.target.style.backgroundColor="rgb(240, 240, 240,0)";
                entry.target.querySelector('td:nth-child(2)').querySelector('h3').classList.remove(`title${tr.indexOf(entry.target)}`);
                nextObserver(entry);
            }
           
        });
    }, {
        root: null,
        rootMargin: '-50% 250px -50% 250px', 
        threshold: 0
    });

    observer.observe(tr[0]);

    function nextObserver(entry){
        if(tr.indexOf(entry.target) + testCount > 3){ 
            testCount = testCount * -1;
            observer.observe(tr[3]);
        }
        else if(tr.indexOf(entry.target) + testCount < 0) {
            testCount = testCount * -1;
            observer.observe(tr[0]);
        }else {
            observer.observe(tr[tr.indexOf(entry.target) + testCount]);
        }
    }
});