// Sections
const headerSection = document.querySelector("#home-section");
const servicesSection = document.querySelector("#services-section");
const visionSection = document.querySelector("#vision-section");
const contactSection = document.querySelector("#contact-section");
const parent = document.querySelector("body");

// Header elements
const menuTopContainer = document.querySelector(".header__top");
const menuContainer = document.querySelector("#header__top-nav");
const menuCollapsable = document.querySelector("#header__top-icon-menu");
const menuCollapsableExit = document.querySelector("#header__top-icon-menu-exit");

// constants
const SECTION_TOP_BOT_SPACE = 80;
const SECTION_LEFT_RIGHT_SPACE = 240;
const menuItemsDummy = ["Home", "Services", "Vision", "Contact"];

let listMenu;
let menuContainerCollapsable;


/**
 * Create unordered list base on the quantity of item that menuItemsDummy has
 * @param {String} className
 */
const createListMenu = (className) => {
  const listContainer = document.createElement("ul");
  listContainer.className = className;

  for(item of menuItemsDummy)  {
      const itemList = document.createElement("li");
      const itemLink = document.createElement("a");
      itemList.className = "nav-menu-item";
      itemLink.className = "nav-menu-item-link";
      itemLink.id = `nav-menu-${item.toLowerCase()}`;
      itemLink.textContent = item;
      itemList.appendChild(itemLink)
      listContainer.appendChild(itemList);
  };

  return listContainer;
}

/**
 * Creating a dynamic Menu navigation
**/

const buildDynamicNavigation = () => {
  listMenu = createListMenu("header__top-nav-menu")
  menuContainer.appendChild(listMenu);
}

buildDynamicNavigation();

/**
 * Creating img element to active sections
 */
 const buildActiveSectionImage = () => {
  const img = document.createElement("img");
  img.src= "./assets/palta.gif";
  img.style.width = "80px";
  img.style.height = "80px";
  img.id = "active-section-img"

  return img;
 }

/**
 * Calculate the hieght size of the menu
 * @param {*} section
 */
const calculateStickyHeaderSize = section => {
  const isSticky = menuContainer.classList.contains("sticky");
  section.style.scrollMarginTop = isSticky ? "112px" : "170px";
}

/**
 * Scroll to the selected section
 * @param {*} section - selected section
 */
const scrollToSection = section => {
    calculateStickyHeaderSize(section);
    return section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Validate  which section should be scroll
 * @param {*} event
 */
const validateScrollToSection = (event) => {
  event.preventDefault();
  const navMenuPrefix = "nav-menu"
  switch (event.target.id) {
    case document.querySelector(`#${navMenuPrefix}-home`).id:
      scrollToSection(headerSection);
      break;
    case document.querySelector(`#${navMenuPrefix}-services`).id:
      scrollToSection(servicesSection);
      break;
    case document.querySelector(`#${navMenuPrefix}-vision`).id:
      scrollToSection(visionSection)
      break;
    case document.querySelector(`#${navMenuPrefix}-contact`).id:
      scrollToSection(contactSection)
      break;
  }
}

/**
 * Set the display atribute to elements.
 * @param {Element, Element, Element}
 */
const setMenuIconConfigs = ({menuContainerDisplay, menuCollapsableDisplay, menuCollapsableExitDisplay}) => {
  menuContainerCollapsable.style.display = menuContainerDisplay;
  menuCollapsable.style.display = menuCollapsableDisplay;
  menuCollapsableExit.style.display = menuCollapsableExitDisplay;
}

/**
 * Listener to handle the event click when the user press Menu Icon
 */
menuCollapsable.addEventListener('click', () => {
  event.preventDefault();
  // if the element exists it appears/disappear through CSS
  if(document.querySelector("#header__top-collapsable-menu")){
    setMenuIconConfigs({menuContainerDisplay: "flex", menuCollapsableDisplay: "none", menuCollapsableExitDisplay:"flex"})
    return;
  }

  menuContainerCollapsable = document.createElement("div");
  menuContainerCollapsable.className = "header__top-collapsable-menu"
  menuContainerCollapsable.id = "header__top-collapsable-menu";
  setMenuIconConfigs({menuContainerDisplay: "flex", menuCollapsableDisplay: "none", menuCollapsableExitDisplay:"flex"})

  listMenu = createListMenu("header__top-nav-menu header__top-nav-menu-collapsable");
  menuContainerCollapsable.appendChild(listMenu);
  parent.appendChild(menuContainerCollapsable);

  listMenu.addEventListener('click', event => validateScrollToSection(event));
  menuContainerCollapsable.addEventListener('click', () => setMenuIconConfigs({menuContainerDisplay: "none", menuCollapsableDisplay: "flex", menuCollapsableExitDisplay:"none"}));
});

/**
 * Listener to handle the event click when the user press Menu Exit Icon
 */
menuCollapsableExit.addEventListener('click', (event) => {
  event.preventDefault();
  setMenuIconConfigs({menuContainerDisplay: "none", menuCollapsableDisplay: "flex", menuCollapsableExitDisplay:"none"})
});

/**
 * Listener to handle the event click when the user press the menu elements
 */
listMenu.addEventListener('click', event => validateScrollToSection(event));

/**
 * Check if the element is in the viewport
 * @param {*} element
 */
const isInViewPort = element => {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= window.innerHeight - (window.innerHeight/2) ||
    rect.bottom <= window.innerHeight - (window.innerHeight/2)
  );
}

/**
 * Set class sticky to menu when is scrolling
 */
const setStickyMenu = () => {
  if (window.scrollY <= menuContainer.offsetTop) {
    menuContainer.classList.remove("sticky");
    menuContainer.classList.remove("sticky-background")
    return;
  }
  menuContainer.classList.add("sticky")
  menuContainer.classList.add("sticky-background")
}

/**
 * Listener to handle scroll behaviors
 */
const sectionsList = [headerSection, servicesSection, visionSection, contactSection];
document.addEventListener(
  'scroll',
  () => {
      setStickyMenu();
      sectionsList.forEach(section => {
        if(section != headerSection) {
        if(!isInViewPort(section)) {
            section.classList.add("active");
        } else {
            section.classList.remove("active");
        }
      }});

  }
);



