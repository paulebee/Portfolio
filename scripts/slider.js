
$(document).ready(function() {
  
  let active_slide = 1;

  let slide_count = 6;

  let speed = 250;

  $(".slide[pos!='" + active_slide + "']").each(function() {
    $(this).hide();
  })

  $(".slide-toggle[direction='next']").click(function() {
    
    console.log("test");
    let next_slide = active_slide + 1;
    
    Next(active_slide, next_slide, slide_count, speed);

    if (next_slide <= slide_count) {
      active_slide = next_slide;
    } else {
      active_slide = 1;
    }

    
  })
  
  
  $(".slide-toggle[direction='prev']").click(function() {

    
    let next_slide = active_slide - 1;
    
    Prev(active_slide, next_slide, slide_count, speed);

    if (next_slide < 1) {
      active_slide = slide_count;
    } else {
      active_slide = next_slide;
    }
    
    
  })

  let container = document.querySelector('.container');
  let reduce = false;
  container.addEventListener('wheel', function() {
    if(!reduce){
      if (event.deltaY < 0) {
        let next_slide = active_slide - 1;
  
        Prev(active_slide, next_slide, slide_count, speed);

        if (next_slide < 1) {
          active_slide = slide_count;
        } else {
          active_slide = next_slide;
        }
      } else {
        console.log("test");
        let next_slide = active_slide + 1;
        
        Next(active_slide, next_slide, slide_count, speed);

        if (next_slide <= slide_count) {
          active_slide = next_slide;
        } else {
          active_slide = 1;
        }
      }
      reduce = true;
      setTimeout(function(){
        reduce = false;
      }, 500);  
    }
    
    
  })
  
  $('.owl-modal').owlCarousel({
    items: 1,
    margin: 10,
    loop: true, 
    dots: true,
    mouseDrag : true,
  });

  $('.btn-close').click(function() {
    $('#myModal').modal('hide');
});

;})


function Next(active_slide, next_slide, slide_count, speed) {

  $(".slide[pos!='" + active_slide + "']").each(function() {
      $(this).css("top", "10px");
    })
    
    if (next_slide <= slide_count) {

      $(".slide[pos='" + active_slide + "']").animate({opacity:0, top: "-10px"}, {duration: speed}).hide(0).animate({top: "10px"});
      
      $(".slide[pos='" + next_slide + "']").delay(speed).show(0).animate({opacity:1, top: "0px"}, {duration: speed});
      
      $(".index > p").text(next_slide + "/" + slide_count);

    } else {
      
      next_slide = 1;
        
      $(".slide[pos='" + active_slide + "']").animate({opacity:0, top: "-10px"}, {duration: speed}).hide(0).animate({top: "10px"});
      
      $(".slide[pos='" + next_slide + "']").delay(speed).show(0).animate({opacity: 1, top: "0px"});
      
      $(".index > p").text(next_slide + "/" + slide_count);
      
    }
    
}

function Prev(active_slide, next_slide, slide_count, speed) {

    $(".slide[pos!='" + active_slide + "']").each(function() {
      $(this).css("top", "-10px");
    })

    if (next_slide < 1) {

      next_slide = slide_count;
      
      $(".slide[pos='" + active_slide + "']").animate({opacity:0, top: "10px"}, {duration: speed}).hide(0).animate({top: "10px"});
      
      $(".slide[pos='" + next_slide + "']").delay(speed).show(0).animate({opacity:1, top: "0px"}, {duration: speed});
      
      $(".index > p").text(next_slide + "/" + slide_count);

    } else {

      $(".slide[pos='" + active_slide + "']").animate({opacity:0, top: "10px"}, {duration: speed}).hide(0).animate({top: "10px"});
      
      $(".slide[pos='" + next_slide + "']").delay(speed).show(0).animate({opacity: 1, top: "0px"});
      
      $(".index > p").text(next_slide + "/" + slide_count);

    }
}