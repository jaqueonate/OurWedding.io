// Humburger menu 
$(function () {

    
    $(".hamburger").click(function () {

      $("ul").toggleClass("active");

    });


    
    
  });

// Humburger menu 

//--------- particle-js-------------//



//...................Sticky Navbar starts ...............//
$(function(){

  $(window).on('scroll', function(){

    if ($(window).scrollTop ()){

        $('.navigation').addClass('nav-hide-show');
    }


    else{
        $('.navigation').removeClass('nav-hide-show');
    }

})


});




//...................Sticky Navbar Ends ...............//

// OwlCarousel-1 starts here 

$('.owl-carousel-1').owlCarousel({
  loop:true,
  margin:0,
  nav:true,
  dots:false,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:1
      }
  }
})

// OwlCarousel-1 ends here 


// owlCarousel starts 2
$('.owl-carousel-2').owlCarousel({
  loop:true,
  margin:0,
  autoplay:true,
  autoplayTimeout:5000,
  autoplayTimedelay:10000,
  nav:true,
  dots:false,
  center:true,
  responsive:{
      0:{
          items:1.1
      },

      468:{
          items:1.5
      },


      768:{
          items:1.5
      },
      992:{
          items:3
      },
      1200:{
        items:4
    }


  }
})

// owlCarousel 2 ends
;///-------------FUNCION FADEOUT AND FADEIN-----------------//
function fadeOut(el){
  el.style.opacity = 1;
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity - (new Date() - last) / 2000;
    last = +new Date();

    if (+el.style.opacity > 0) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    } else {
      el.style.display = 'none';
    }
  };
  tick();
};

// fade in
function fadeIn(el,time_milsec=2000){
  el.style.opacity = 0;
  el.style.display = "block";
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time_milsec;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
};

// fade in
function fadeInFlex(el,time_milsec=2000){
  el.style.opacity = 0;
  el.style.display = "flex";
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time_milsec;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
};



//------------------AUDIO------------------//
// Reproduction of audio
const play_music=document.querySelector('.player');
const name_song=document.getElementById('song');
play_music.addEventListener('click',function(){
  document.getElementById("my_audio").play();
  //play_music.style.display='none';
  fadeOut(play_music);
  setTimeout(function() {
    fadeIn(name_song);
  }, 2000);
});
// End of audio reproduction

//...................cOUNTDOWN TO WEDDING ...............//
// Set the date of the wedding
//It's gmt-5 so we need to add 5 hours to the time
//------------Here we set the time of the wedding----------------//
//const weddingDate = new Date("2023-04-30T21:00:00Z").getTime();

//------------Here we set the time of the wedding for educational purposes----------------//
const currentDate = new Date("2025-12-06T00:00:00");  // Obtiene la fecha actual
currentDate.setHours(15, 0, 0, 0);  // Establece la hora deseada (21:00:00)
const weddingDate = currentDate.getTime(); 
// Update the countdown every second
setInterval(() => {
  // Get the current date
  const now = new Date().getTime();

  // Calculate the time remaining until the wedding date
  const timeRemaining = weddingDate - now;

  // Calculate the days, hours, minutes, and seconds remaining
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const minutesRemaining = Math.floor((timeRemaining / (1000 * 60)) % 60);
  const secondsRemaining = Math.floor((timeRemaining / 1000) % 60);

  // Update the HTML with the time remaining
  document.getElementById("days").innerHTML = daysRemaining;
  document.getElementById("hours").innerHTML = hoursRemaining;
  document.getElementById("minutes").innerHTML = minutesRemaining;
  document.getElementById("seconds").innerHTML = secondsRemaining;

    // If the count down is over, write some text 
  if (timeRemaining < 0) {
    document.getElementById("countdown").classList.add("countdown-finished");
    document.getElementById("countdown").innerHTML = "¡ Que viva la familia Ramirez Aranda !";
  }
}, 1000);;

// ...................invitation card ...............//
const input = document.getElementById('id_invitado');


input.addEventListener('input', function() {
  this.value = this.value.toUpperCase();
});
// API-CONSULTA LISTA DE INVITADOS
const btnConsultar = document.getElementById('consulta-api');
const loading = document.querySelector('.loading');
const errormessage = document.querySelector('.error-message');
const envelope = document.querySelector('.envelope.paper');
const pruebaDiv = document.getElementById('prueba');
const ShowInvitation= document.getElementById('section-to-guests');

btnConsultar.addEventListener('click', async (event) => {
  event.preventDefault();

  loading.style.display = 'block';
  errormessage.style.display = 'none';
  ShowInvitation.style.display = 'none';

  const nombre = input.value.trim();
  const apiURL = `https://ourwedding-io.onrender.com/api/${nombre}`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("Invitado no encontrado");

    const data = await response.json();

    document.getElementById('nombre').innerText = data.nombre;
    document.getElementById('mesa').innerText = `Mesa: ${data.mesa}`;
    document.getElementById('confirmado').innerText = data.confirmado ? "✅ Confirmado" : "❌ No confirmado";

    ShowInvitation.style.display = 'block';
    loading.style.display = 'none';
  } catch (error) {
    console.error(error);
    loading.style.display = 'none';
    errormessage.style.display = 'block';
  }
});




//-- cambiar el placeholder del input -----

function changePlaceholder() {
  if (window.innerWidth < 600) {
    input.placeholder = "Ingrese Código Secreto";
  } 
}

changePlaceholder();

window.addEventListener("resize", changePlaceholder);

//---Cargado de imágenes e iframes con Intersection Observer API ---

const images = document.querySelectorAll("img[data-src], iframe[data-src]");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const image = entry.target;
      image.src = image.dataset.src;
      fadeIn(image, 1000);
      observer.unobserve(image);
    }
  });
}, {
  rootMargin: "0px 0px 100px 0px"
});

images.forEach((image) => {
  observer.observe(image);
});
