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
    navItem.innerHTML = `<a href='#' data-name='${section.id}' class='menu__link'>${section.dataset.nav}</a>`;
    
    navItem.addEventListener("click", (e) => {
      e.preventDefault();
      goToSection(e.target.dataset.name);
      console.log(e)
      
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
        }
      } else {
        removeClass(section, "active");
      }
    });
  }
}

// Scroll to anchor ID using scrollTO event
function goToSection(el) {
  const elSection = document.getElementById(el)
  console.log(elSection);
  window.scrollTo({
    top:elSection.offsetTop,
    behavior: 'smooth'
   })
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
