/*let offsetTop = outsideLinks.offsetTop;


window.addEventListener("resize", () => {
  offsetTop = outsideLinks.offsetTop;
});
*/
/*
window.addEventListener("scroll", () => {
  if (window.scrollY > offsetTop) {
    outsideLinks.classList.add("slide-in");
  } else {
    outsideLinks.classList.remove("slide-in");
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
  threshold: 0.45, // Trigger when 10% of the element is visible
});
/**entries.forEach(entry => {
  const isVisible = entry.isIntersecting;
  if (isVisible !== entry.target.classList.contains('is-visible')) {
    entry.target.classList.toggle('is-visible', isVisible);
  }
});*/
sections.forEach(section => {
  observer.observe(section);
});

//Scroll to top btn
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
    /*===========================================================
    MESSAGE: I HAVE NO CLUE HOW THIS WORKS, I JUST COPIED IT FROM THE INTERNET
    BUT IT WORKS AND I DON'T WANT TO BREAK IT.

    ONLY GOD KNOWS HOW THIS WORKS
    =========================================================*/
    if(window.innerWidth < 851) return;
    
    const outsideLinks = document.getElementById("outside-links");

  let mouseIn = false;
  let lastTransform = null;
  let scrollSlideDistance = null;
  let isSticky = false;

  outsideLinks.addEventListener("mouseenter", () => {
    const rect = outsideLinks.getBoundingClientRect();
    if (rect.top > 0) return;

    mouseIn = true;

    const visibleWidth = 140;
    const fullSlide = scrollSlideDistance;
    
    const slideInDistance = fullSlide - (outsideLinks.offsetWidth - visibleWidth);
    const desiredTransform = `translateX(${slideInDistance}px)`;
    outsideLinks.style.transform = desiredTransform;
    lastTransform = desiredTransform;
  });

  outsideLinks.addEventListener("mouseleave", () => {
    mouseIn = false;

    if (isSticky && scrollSlideDistance !== null) {
      const desiredTransform = `translateX(${scrollSlideDistance}px)`;
      outsideLinks.style.transform = desiredTransform;
      lastTransform = desiredTransform;
    }
  });

  window.addEventListener("scroll", () => {
    if (mouseIn) return;

    const rect = outsideLinks.getBoundingClientRect();
    const visibleWidth = 160;

    let desiredTransform = "";

    if (rect.top <= 0 && !isSticky) {
      // Bar just became sticky — calculate once
      const distanceFromRight = window.innerWidth - rect.right;
      scrollSlideDistance = Math.round(outsideLinks.offsetWidth - visibleWidth + distanceFromRight);
      desiredTransform = `translateX(${scrollSlideDistance}px)`;
      isSticky = true;
      outsideLinks.style.backgroundColor = "#323232"; // Change background color when sticky
    } 
    else if (rect.top > 0 && isSticky) {
      // Bar is back in normal layout
      desiredTransform = "translateX(0)";
      isSticky = false;
      scrollSlideDistance = null;
    } 
    else {
      return; // no state change — skip
    }

    if (desiredTransform !== lastTransform) {
      outsideLinks.style.transform = desiredTransform;
      lastTransform = desiredTransform;
    }
  });
});