const outsideLinks = document.querySelector(".outside-links");
/*let offsetTop = outsideLinks.offsetTop;


window.addEventListener("resize", () => {
  offsetTop = outsideLinks.offsetTop;
});
*/
const observer2 = new IntersectionObserver(
  ([entry]) => {
    if (entry) {
      outsideLinks.classList.add("slide-in");
    } 
    else {
      outsideLinks.classList.remove("slide-in");
    }
  },
  {threshold: 1.0}
);
observer2.observe(outsideLinks);
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
  threshold: 0.37, // Trigger when 10% of the element is visible
});

sections.forEach(section => {
  observer.observe(section);
});
observer2.observe(outsideLinks);

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

});