// All lems images
const images = [
    '../images/CreatArt.png',
    '../images/DevWeb.png',
    '../images/DispoInter.png',
    '../images/UxDesign.png',
];

let bandeau = document.querySelector('.bandeau');

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      console.log("Page is visible. User is likely active.", Date.now());

    } else if (document.visibilityState === "hidden"){
      console.log("Page is hidden. User is likely inactive.", Date.now());
      stopGenerating();
    }
});

// Animation settings
const numLems = 8,
    animSecs = 15,
    frames = 10;

var isGenerating = true;

// Min and max included random number
function randomFromRange(min, max)
{
    return Math.floor( Math.random() * (max - min + 1) + min );
}

function generate(waitSec, offset) 
{
    setTimeout(function() {

        for ( var i=0; i < numLems; i++ ) {

            var rand = randomFromRange( 1, images.length ),
                animTime = Math.random() * animSecs,
                animationStr = 'anim' + randomFromRange(1, 3) + ' ' + animTime + 's',
                imgId = ( offset * numLems ) + i;

            //console.log(animationStr);

            // Remove previous image and replace with new
            if ( document.getElementById( 'img' + imgId ) != null ) {
                document.getElementById( 'img' + imgId ).remove();
            }

            // Create image and add to body
            var img = document.createElement('img');
            img.id = 'img' + imgId;
            img.alt = 'Lems ' + rand;

            img.style.top = randomFromRange(1, 100) + 'vh';
            img.style.left = '-11vw';
            img.style.animation = animationStr;
            img.classList.add('imgtest');

            img.src = images[ rand - 1 ];
          
            bandeau.appendChild(img);

        }

        if(isGenerating){
            generate( 3000 * animSecs, offset );
        }

    }, waitSec );

}

// // Generate animation frames
// for ( var i=0; i < frames; i++ ) {
//     var secs = ( ( animSecs / frames ) * i * 3000 );

//     generate(secs, i);
// }

function stopGenerating() {
    isGenerating = false;
}

// setTimeout(function() {
//     document.body.style.background = '#000000';
//     window.history.go(0);
// }, 120000);
