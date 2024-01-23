// Imports
//=require jquery/dist/jquery.min.js
//=require swiper/swiper-bundle.min.js

//Funcion Hamburger Show and Hide Menu Navegación Mobile
function showMenuHamburguer() {
  const btnNav = document.querySelector("#btnNav");
  const navMain = document.querySelector(".navigation");
  btnNav.addEventListener("click", (event) => {
    event.preventDefault();
    btnNav.classList.toggle("open");
    navMain.classList.toggle("show");
    if (navMain.classList.contains("show")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.removeAttribute("style");
    }
  });
  document.querySelectorAll('.menu__list .menu__item').forEach((element) => {
    if (element.childNodes[3]) {
      let childrenMenu = element.children[1].querySelectorAll('.submenu__item');
      childrenMenu.forEach(el => {
          el.querySelector('.link').addEventListener('click', () => {
              document.querySelector('body').removeAttribute('style');
          });
      });
    }
  });
}

//accordion tab
function accordionToggle(element) {
  let components = document.getElementsByClassName(element);
  if (components) {
    let component;
    for (let a = components.length - 1; a >= 0; a--) {
      component = components[a];
      let tabs = component.getElementsByClassName("accordion__tab");
      let tab;
      for (let b = tabs.length - 1; b >= 0; b--) {
        tab = tabs[b];
        tab.id = "accordionTab" + b;
        tab.setAttribute("aria-expanded", false);
        let button = tab;
        button.addEventListener("click", toggle);
        let panel = tab.nextElementSibling;
        if (panel) {
          panel.id = "accordionPanel" + b;
          panel.dataset.height = getHeight(tab, panel);
          // -- Set Initial ARIA
          tab.setAttribute("aria-controls", panel.id);
          tab.setAttribute("aria-expanded", false);
          panel.setAttribute("aria-labelledby", tab.id);
        }
      }
    }
  }
}
// -- Toggle Panels
function toggle(e) {
  e.preventDefault();
  let component = this.parentNode.parentNode;
  let tab = this;
  let panel = tab.nextElementSibling;
  if (component.dataset.multiselect == "false") {
    let active = component.getElementsByClassName("accordion__tab--active")[0];
    tab.classList.toggle("accordion__tab--active");
    if (active?.nextElementSibling) {
      active.classList.remove("accordion__tab--active");
      active.nextElementSibling.style.height = 0;
      tab.setAttribute("aria-expanded", "false");
    }
  } else tab.classList.toggle("accordion__tab--active");
  // Set the aria-expanded
  if (tab.classList.contains("accordion__tab--active") && panel) {
    panel.style.height = panel.dataset.height;
    this.setAttribute("aria-expanded", "true");
  } else if (panel) {
    panel.style.height = 0;
    this.setAttribute("aria-expanded", "false");
  }
}
// -- Get the natural height of the element
function getHeight(tab, panel) {
  tab.classList.add("accordion__tab--active");
  let height = panel.scrollHeight + "px";
  tab.classList.remove("accordion__tab--active");
  return height;
}

function animationDelay() {
  document.querySelectorAll(".menu__list .menu__item").forEach((element) => {
    if (element.childNodes[3]) {
      let childrenMenu = element.children[1].querySelectorAll(".submenu__item");
      let count = 0;
      childrenMenu.forEach((elementChild) => {
        let delay = 0.1 + count * 0.03;
        elementChild.setAttribute("style", "animation-delay:" + delay + "s;");
        count++;
      });
    }
  });
}

//Swiper Sliders Function
function swiperLoops() {
  // banner
  if (document.querySelector(".tuenti__banner--carousel")) {
    var swiper_banner = new Swiper(".tuenti__banner--carousel", {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: ".swiper-pagination--banner",
        clickable: true,
      },
    });
  }

  // plans
  if (document.querySelector(".tuenti__plans--list")) {
    var swiper_plans = new Swiper(".tuenti__plans--list", {
      slidesPerView: 1,
      spaceBetween: 15,
      pagination: {
        el: ".swiper-pagination--plans",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next--plans",
        prevEl: ".swiper-button-prev--plans",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
  }

  // benefit
  if (document.querySelector(".benefit__swiper")) {
    let swiper_benefit = new Swiper(".benefit__swiper", {
      slidesPerView: 1,
      spaceBetween: 15,
      pagination: {
        el: ".benefit__swiper .swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 25,
        },
      },
    });
  }
}

//Footer Function
function footerAccordion() {
  if (document.querySelector(".tue-footer .menu-accordion")) {
    let acc = document.querySelectorAll(
      ".tue-footer .menu-accordion .menu-accordion__header"
    );
    let i;
    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function (e) {
        e.preventDefault();
        let panel = this.nextElementSibling;
        let coursePanel = document.getElementsByClassName(
          "menu-accordion__collapse"
        );
        let courseAccordionActive = document.getElementsByClassName(
          "menu-accordion__header active"
        );

        if (panel.style.height) {
          panel.style.height = null;
          this.classList.remove("active");
        } else {
          for (const element of courseAccordionActive) {
            element.classList.remove("active");
          }
          for (const element of coursePanel) {
            this.classList.remove("active");
            element.style.height = null;
          }

          panel.style.height = panel.scrollHeight + "px";
          this.classList.add("active");
        }
      };
    }
  }
}

// Tabs
function tueTabsF(element1, element2) {
  const tueTabsId = "#" + element1.id;
  const tueTabsPaneId = element2.getAttribute("data-fragment-namespace");
  var fragmentElement = document.querySelector(tueTabsId);
  var fragmentNamespace = tueTabsPaneId;

  const tabItems = [].slice.call(
    fragmentElement.querySelectorAll(
      '[data-fragment-namespace="' + fragmentNamespace + '"].tab__link'
    )
  );
  const tabPanelItems = [].slice.call(
    fragmentElement.querySelectorAll(
      '[data-fragment-namespace="' + fragmentNamespace + '"].tue-tab-pane'
    )
  );

  function activeTab(item) {
    tabItems.forEach(function (tabItem) {
      tabItem.setAttribute("aria-selected", false);
      tabItem.classList.remove("active");
    });
    item.setAttribute("aria-selected", true);
    item.classList.add("active");
  }

  function activeTabPanel(item) {
    tabPanelItems.forEach(function (tabPanelItem) {
      if (!tabPanelItem.classList.contains("tue-tab-pane--none")) {
        tabPanelItem.classList.add("tue-tab-pane--none");
      }
    });
    item.classList.remove("tue-tab-pane--none");
  }

  function openTabPanel(event, i) {
    const currentTarget = event.currentTarget;
    const target = event.target;

    currentTarget.focus();

    activeTab(currentTarget, i);
    activeTabPanel(tabPanelItems[i]);

    this.tabIndex = i;
  }

  function mainTabs() {
    const initialState = !this.tabIndex || this.tabIndex >= tabItems.length;
    let tabItemSelected = tabItems[0];

    if (initialState) {
      tabItems.forEach(function (item, i) {
        if (!i) {
          activeTab(item);
        }
        item.addEventListener("click", function (event) {
          openTabPanel(event, i);
        });
      });
      tabPanelItems.forEach(function (item, i) {
        if (!i) {
          activeTabPanel(item);
        }
      });
    } else {
      tabItemSelected = tabItems[this.tabIndex];
      tabItems.forEach(function (item, i) {
        activeTab(tabItems[this.tabIndex]);
        item.addEventListener("click", function (event) {
          openTabPanel(event, i);
        });
      });
      tabPanelItems.forEach(function () {
        activeTabPanel(tabPanelItems[this.tabIndex]);
      });
    }
  }
  mainTabs();
}

// Hunter
function hunterWeb() {
  if (document.querySelector(".tue-hunter-tpl")) {
    const hunterBox = document.querySelector(".tue-hunter-tpl");
    const hunterClick = document.querySelector(".hunter__button");

    hunterClick.addEventListener("click", function (e) {
      if (hunterBox.classList.contains("active")) {
        hunterBox.classList.remove("active");
      } else {
        hunterBox.classList.add("active");
      }
    });
  }
}

// function accordion toggle
accordionToggle("accordion");
animationDelay();

// // function header mobile
showMenuHamburguer();

// // function swiper sliders
swiperLoops();

// // Tabs Section
if (document.querySelector(".tue-tabs-container")) {
  let tueTabs = document.querySelector(".tue-tabs-container");
  let tueTabsPane = document.querySelector(
    ".tue-tabs-container .tue-tab-pane"
  );
  tueTabsF(tueTabs, tueTabsPane);
}

// Footer Menu accordion
footerAccordion();

// Function Hunter
hunterWeb();
