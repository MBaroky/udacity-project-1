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

const headerNav = document.querySelector('#navbar__list'); // Navigation container ul
const navList = []; // empty array for list of nav items
const sections = document.querySelectorAll('[data-nav]') // NodeList of sections that will be linked to in the nav

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
sections.forEach((listItem)=>{ // looping through sections
    const item = {}; // create an object
    // adding id and data-nav attribute value to the nav item object
    item.id = listItem.getAttribute('id');
    item.navName = listItem.getAttribute('data-nav');
    // pushing items to the array
    navList.push(item);
});




/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
const navFrag = document.createDocumentFragment();
for (const navItem of navList) { // looping through nav items array
    // creating the tree of li's including a's linked to the id's of co-related section and carrying the data-nav name of the section
    let linkItem = document.createElement('li');
    let link = document.createElement('a');
    link.textContent = navItem.navName;
    link.href = `#${navItem.id}`;
    link.classList.add('menu__link');
    linkItem.appendChild(link);
    // addingn the list items to the fragment to be ready for rendering in once
    navFrag.appendChild(linkItem);
}


// Add class 'active' to section when near top of viewport
function checkRect(el){
    const rect = el.getBoundingClientRect(); // getting boundaries of target elm
    let check = rect.top >= -10 &&
    rect.top < ((window.innerHeight * 0.8) || (document.documentElement.clientHeight  * 0.8)) // boolean var to check for rectList top comparing to viewport height (cross browser)
    return check; // returning check boolean

}
// seperate function to run on both document ready and scroll event
function markActive(){
    sections.forEach((section)=>{
        let isVisible = checkRect(section); // using rectangle checker function
        let sectionLink = document.querySelector(`a[href*="#${section.id}"]`); // storing the corresponding anchor in variable to reduce code later
        if(isVisible){ // rect checker in action, yay!
            section.classList.add('current');
            sectionLink.style.backgroundColor = "#000d3c";
            sectionLink.style.color = "#fff";
        }else{
            // putting everything to normal when off viewport
            section.classList.remove('current');
            sectionLink.setAttribute('style',"");
        }
    });
}



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
headerNav.appendChild(navFrag);
// Scroll to section on link click
headerNav.addEventListener('click', function(e){ // listening to clicks on the nav
    e.preventDefault(); // stopping the jump
    scrollToSection(e.target.getAttribute('href')); // taking the link's href using event target and passing the value to the smooth scrollto function
})
// Set sections as active
markActive(); // mark the current section when page loads
document.addEventListener('scroll', function(){
    // mark the current section when page scrolls
    markActive();
});

