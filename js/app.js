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
*/

/**
 * Define Global Variables
 *
*/
const header = document.querySelector('#navbar__list');
const navList = [];
const sections = document.querySelectorAll('[data-nav]')

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
sections.forEach((listItem)=>{
    const item = {};
    item.id = listItem.getAttribute('id');
    item.navName = listItem.getAttribute('data-nav');
    navList.push(item);
});




/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
const navFrag = document.createDocumentFragment();
for (const navItem of navList) {
    let linkItem = document.createElement('li');
    let link = document.createElement('a');
    link.textContent = navItem.navName;
    link.href = `#${navItem.id}`;
    link.classList.add('menu__link');
    linkItem.appendChild(link);
    navFrag.appendChild(linkItem);
}


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
function scrollToSection(el){
    const target = document.querySelector(`${el}`);
    window.scrollTo({top:target.offsetTop,
        behavior: 'smooth'});
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
header.appendChild(navFrag);
// Scroll to section on link click
document.querySelectorAll('.menu__link').forEach((link)=>{
    link.addEventListener('click', function(e){
        e.preventDefault();
        scrollToSection(this.getAttribute('href'));
    })
})
// Set sections as active


