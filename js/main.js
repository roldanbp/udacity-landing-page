// Sections
const headerSection = document.querySelector("#home-section");
const servicesSection = document.querySelector("#services-section");
const visionSection = document.querySelector("#vision-section");
const contactSection = document.querySelector("#contact-section");
const parent = document.querySelector("#wrapper-parent");

// Header elements
const menuTopContainer = document.querySelector(".header__top");
const menuContainer = document.querySelector("#header__top-nav");
const menuCollapsable = document.querySelector("#header__top-icon-menu");
const menuCollapsableExit = document.querySelector("#header__top-icon-menu-exit");

const SECTION_TOP_BOT_SPACE = 80;
const SECTION_LEFT_RIGHT_SPACE = 240;
const menuItemsDummy = ["Home", "Services", "Vision", "Contact"];

let listMenu;
let menuContainerCollapsable;


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
 * Remove class to the element
 * @param {*} className - class that you want remove.
 */
const removeClass = className => {
  const section = document.querySelector(`.${className}`);
  if (section) {
    section.classList.remove(className);
  }
}

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
  * Set class and image to active section
  * @param {*} activeSection
  */
const setSectionActive = (activeSection) => {

  const titleContainer = activeSection.querySelector("#content__container-title");
  activeSection.classList.add("active-section");
  const activeImage = buildActiveSectionImage();
  if(titleContainer) {
    titleContainer.insertBefore(activeImage, titleContainer.children[0]);
  }

}


 /**
  * Remove class and image to active section
  * @param {*} activeSection
  */
const removeSectionActive = () => {
    const images = document.querySelectorAll("#active-section-img");
    removeClass("active-section")
    if (images && images.length > 0) {
      for (const image of images) {
        image.remove();
      }
  }
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

//window.onscroll = function() {buildStickyMenu()};

/**
 *  Set Sticky class to the Menu it isn't in the viewport
 */
const setStickyElement = (element) => {
  element.classList.add("sticky", "background-sticky");
}

/**
 *  Remove Sticky class to the Menu it isn't in the viewport
 */
const removeStickyElement = (element) => {
  element.classList.remove("sticky", "background-sticky");
}

const validateScrollToSection = (event) => {
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

const setMenuIconConfigs = ({menuContainerDisplay, menuCollapsableDisplay, menuCollapsableExitDisplay}) => {
  menuContainerCollapsable.style.display = menuContainerDisplay;
  menuCollapsable.style.display = menuCollapsableDisplay;
  menuCollapsableExit.style.display = menuCollapsableExitDisplay;
}

menuCollapsable.addEventListener('click', () => {

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

menuCollapsableExit.addEventListener('click', () => setMenuIconConfigs({menuContainerDisplay: "none", menuCollapsableDisplay: "flex", menuCollapsableExitDisplay:"none"}));
listMenu.addEventListener('click', event => validateScrollToSection(event));

/**
 * Callback to handle the active section
 * @param {Element} entries - intersected element.
 */
const intersectionCallback = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      return setSectionActive(entry.target);
    }
      return removeSectionActive()
  }
};
const observer = new IntersectionObserver(intersectionCallback, { threshold: 1});
observer.observe(servicesSection);
observer.observe(visionSection);
observer.observe(contactSection);

