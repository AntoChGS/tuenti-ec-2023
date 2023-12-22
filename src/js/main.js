// Imports
//=require jquery/dist/jquery.min.js
//=require swiper/swiper-bundle.min.js

//function accordion toggle
// accordionToggle("accordion");
// animationDelay();

// //dropdown menu quicklinks
// // dropDownQuickLinks();

// //function header mobile
// showMenuHamburguer();

// // function swiper sliders
// // swiperLoops();

// // Footer Menu accordion
// footerAccordion();

//function resize
// window.addEventListener("resize", widthChangeCallback);
// widthChangeCallback();

//dropdown menu quicklinks
function dropDownQuickLinks() {
  const btnQuicklink = document.querySelector(
    ".header--quicklinks .dropdown--toggle"
  );
  const contQuicklinks = document.getElementById("quickLinks");
  btnQuicklink.addEventListener("click", (event) => {
    if (document.getElementById("mainQuicklinks")) {
      event.preventDefault();
      if (!contQuicklinks.classList.contains("show")) {
        btnQuicklink.classList.add("open");
        contQuicklinks.classList.add("show");
        contQuicklinks.style.height = "auto";
        let height = contQuicklinks.clientHeight + "px";
        contQuicklinks.style.height = "0px";
        document.body.insertAdjacentHTML(
          "beforeend",
          '<div class="backdrop">&nbsp;</div>'
        );
        setTimeout(function () {
          contQuicklinks.style.height = height;
        }, 0);
        document
          .querySelector(".header--navigation .navigation--menu")
          .classList.remove("show");
        document
          .querySelector(".header--navigation .navigation--action .btn--menu")
          .classList.remove("open");
        btnQuicklink.focus();
      } else {
        contQuicklinks.style.height = "0px";
        contQuicklinks.addEventListener(
          "transitionend",
          function () {
            contQuicklinks.classList.remove("show");
            btnQuicklink.classList.remove("open");
            document.querySelector(".backdrop").remove();
          },
          {
            once: true,
          }
        );
      }
    }
  });
  //focus next btnclick
  if (btnQuicklink.nextElementSibling) {
    const subMenu = btnQuicklink.nextElementSibling;
    const subMenuLinks = subMenu.querySelectorAll("a");
    const lastLinkIndex = subMenuLinks.length - 1;
    const lastLink = subMenuLinks[lastLinkIndex];
    lastLink.addEventListener("blur", function () {
      if (document.getElementById("mainQuicklinks")) {
        btnQuicklink.parentElement.querySelector(".dropdown--toggle").focus();
      }
    });
  }
}

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
    if (element.childNodes[2]) {
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
  // Section Interest Carousel
  if (document.querySelector(".cards-tpl-swiper")) {
    let swiper = new Swiper(".cards-tpl-swiper .swiper", {
      slidesPerView: 1,
      spaceBetween: 15,
      navigation: {
        nextEl: ".cards-tpl-swiper .swiper .swiper-button-next",
        prevEl: ".cards-tpl-swiper .swiper .swiper-button-prev",
      },
      pagination: {
        el: ".cards-tpl-swiper .swiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 25,
        },
        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 40,
        },
      },
    });
    return swiper;
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

//Window Resize
function widthChangeCallback() {
  const navigation = document.querySelector(".nav__menu#navigation");
  const search = document.querySelector(".navigation--search");
  if (window.innerWidth > 768) {
    document.querySelector(".header--quicklinks").removeAttribute("id");
    document
      .querySelector(".navigation .navigation--desktop")
      .insertAdjacentElement("beforeEnd", navigation);
    document
      .querySelector(".navigation .navigation--login")
      .insertAdjacentElement("beforebegin", search);
  } else {
    document
      .querySelector(".header--quicklinks")
      .setAttribute("id", "mainQuicklinks");
  }
  if (window.innerWidth > 992) {
    document.querySelector(".nav__menu").classList.remove("nav__accordion");
    document.querySelector(".navigation--menu").classList.remove("show");
    document
      .querySelector(".navigation--action .btn--menu")
      .classList.remove("open");
    document.querySelector(".nav__menu").removeAttribute("style");
    document.querySelector(".nav__menu").classList.add("nav__accessible");
  } else {
    document.querySelector(".nav__menu").classList.add("nav__accordion");
    document.querySelector(".nav__menu").classList.remove("nav__accessible");
    document
      .querySelector(".navigation--menu")
      .insertAdjacentElement("beforeEnd", navigation);
  }
}

// plans
var swiper_plans = new Swiper(".tuenti__plans--list", {
  slidesPerView: 1,
  spaceBetween: 15,
  pagination: {
    el: ".swiper-pagination--plans",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 26,
    },
  },
});

// benefit
let swiper_benefit = new Swiper(".mySwiperBenefit", {
  slidesPerView: 1,
  spaceBetween: 15,
  pagination: {
    el: ".swiper-pagination",
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
