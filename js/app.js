/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
* 
/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");
let navLinks;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
catchNavLinks = async () => {
  navLinks = document.querySelectorAll(".menu__link");
  goToSection(navLinks);
};
function addClass(item, className) {
  item.classList.add(className);
}
function removeClass(item, className) {
  item.classList.remove(className);
}
function inView(sec) {
  let { top, bottom  } = sec.getBoundingClientRect();
  return top - 52 <= 80  && bottom - 52 >= 80 ;
}
function downScroll(el) {
  window.scrollTo({
    top: el.offsetHeight,
    behavior: "smooth",
  });
}

/*
 *
 *
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

function createNavItems(sections) {
  for (const section of sections) {
    const navItem = document.createElement("li");
    navItem.innerHTML = `<a href='#${section.id}' class='menu__link'>${section.dataset.nav}</a>`;
    navItem.addEventListener("click", () => {
      section.scrollIntoView({ behavior: "smooth" });
    });
    navList.appendChild(navItem);
  }
}

// Add class 'active' to section when near top of viewport
function addActive(sections) {
  for (const section of sections) {
    document.addEventListener("scroll", () => {
      if (inView(section)) {
        if (!section.classList.contains("active")) {
          addClass(section, "active");
          console.log(section.id ,section.getBoundingClientRect());
        }
      } else {
        removeClass(section, "active");
      }
    });
  }
}

// Scroll to anchor ID using scrollTO event
function goToSection(els) {
  for (const navLink of els) {
    const id = navLink.hash.substring(1);
    const connectSection = document.getElementById(id);
    navLink.addEventListener("click", () => {
      preventDefault();
      window.scrollTo({
        top: connectSection.offsetHeight,
        behavior: "smooth",
      });
    });
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */
// Build menu
createNavItems(sections);
// Scroll to section on link click
catchNavLinks();
// Set sections as active
addActive(sections);
