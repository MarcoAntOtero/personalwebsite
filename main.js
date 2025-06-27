const outsideLinks = document.querySelector(".outside-links");
let offsetTop = outsideLinks.offsetTop;

window.addEventListener("resize", () => {
  offsetTop = outsideLinks.offsetTop;
});

window.addEventListener("scroll", () => {
  if (window.scrollY > offsetTop) {
    outsideLinks.classList.add("fixed");
  } else {
    outsideLinks.classList.remove("fixed");
  }
});

/*
const outsideLinks = document.querySelector('.outside-links');
let triggerPoint = outsideLinks.offsetTop;

window.addEventListener('resize', () => {
  triggerPoint = outsideLinks.offsetTop;
});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const width = window.innerWidth;

  if (width > 1350) {
    if (scrollTop > triggerPoint - 100) {
      outsideLinks.classList.add('fixed');
    } else {
      outsideLinks.classList.remove('fixed');
    }
  } else if (width > 850) {
    if (scrollTop > triggerPoint - 50) {
      outsideLinks.classList.add('fixed');
    } else {
      outsideLinks.classList.remove('fixed');
    }
  } else {
    outsideLinks.classList.remove('fixed');
  }
});


window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;


  if (window.innerWidth > 1350) // normal big width
  {
    if (scrollTop > outsideLinks.offsetTop - 100) 
    {
      outsideLinks.classList.add('fixed');
    } 
    else 
    {
      outsideLinks.classList.remove('fixed');
    }
  } 
  else if(window.innerWidth > 850)
  {
    if (scrollTop > outsideLinks.offsetTop - 50) 
      {
        outsideLinks.classList.add('fixed');
      } 
      else {
      outsideLinks.classList.remove('fixed');
    }

  }
  else
  {
    // On small screens, always remove fixed
    outsideLinks.classList.remove('fixed');
  }
});*/




const sections = document.querySelectorAll('.project1-container, .project2-container,.project3-container');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Element has entered the viewport
      entry.target.classList.add('is-visible');

    } else {
      // Element has left the viewport
      entry.target.classList.remove('is-visible');
    }
  });
}, {
  threshold: 0.3, // Trigger when 10% of the element is visible
});

sections.forEach(section => {
  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    // Smoothly scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    // Add event listeners
    window.addEventListener("scroll", { passive: true });
    scrollToTopBtn.addEventListener("click", scrollToTop);

});