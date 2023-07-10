const parallax_el = document.querySelectorAll(".parallax");
const cursor = document.querySelector('.cursor');
const cursorinner = document.querySelector('.cursor2');
const a = document.querySelectorAll('a');
const btns = document.querySelectorAll('button')
const menu = document.querySelector(".hamburger")

window.onload = function () {
    console.log("fdsg")
}

menu.addEventListener("click", () => {
  menu.classList.toggle("active")
  document.body.classList.toggle("menu")
})



let xValue = 0,
  yValue = 0;

  let rotateDegree = 0;

  function update(cursor) {
    parallax_el.forEach((elem) => {
        let speedx = elem.dataset.speedx;
        let speedy = elem.dataset.speedy;
        let speedz = elem.dataset.speedz;
    
        let rotateSpeed = elem.dataset.rotation;
    
    
        let isInLeft = parseFloat(getComputedStyle(elem).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursor - (parseFloat(getComputedStyle(elem).left))) * isInLeft * 0.1;
    
    
        elem.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px))
                                translateY(calc(-50% + ${yValue * speedy}px)) 
                                perspective(2300px) 
                                rotateY(${rotateDegree * rotateSpeed}deg)
                                translateZ(${zValue * speedz}px)`;
      });
  }

  update(0)

  window.addEventListener('mousedown', function(){
    cursor.classList.add('click');
    cursorinner.classList.add('cursorinnerhover')
  });
  
  window.addEventListener('mouseup', function(){
    cursor.classList.remove('click')
    cursorinner.classList.remove('cursorinnerhover')
  });
  
  

  a.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

  btns.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  })

window.addEventListener("mousemove", (e) => {
    // cursor stuff
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`

    cursorinner.style.left = e.clientX + 'px';
    cursorinner.style.top = e.clientY + 'px';

  if(timeline.isActive()) {
    cursor.style.opacity = "0"
    cursorinner.style.opacity = "0"
    return
  }

  cursor.style.opacity = "1"
  cursorinner.style.opacity = ".9"
  // document.body.style.overflow="hidden";

//   document.body.style.overflow="visible"
//   document.body.style.overflowX="hidden"

  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX)
});


if (window.innerWidth >= 725) {
    document.querySelector("main").style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
    document.querySelector("main").style.maxHeight = `${window.innerWidth * 1.6}px`;
}



// gsap staff

let timeline = gsap.timeline();

Array.from(parallax_el)
    .filter(el => !el.classList.contains('text'))
    .forEach(el => {
        timeline.from(
            el, 
            {
            top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
            duration: 2.5,
            },
            "1"
        );
    })

timeline.from(".text h1", 
    {
        y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 200,
        duration: 2,
    },
    "2.5"
).from(".text h2", 
    {
        y: -150,
        opacity: 0,
        duration: 1.5
    },
    "3"
).from(".btn-para",
    {
      opacity: 0,
      duration: 1.1
    },
    "3.1"
    ).from(".hide",
    {
        opacity: 0,
        duration: 1.5
    },
    "3"
)

// cursor



