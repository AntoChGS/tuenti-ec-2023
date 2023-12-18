// Imports
//=require jquery/dist/jquery.min.js
//=require swiper/swiper-bundle.min.js

//function accordion toggle
accordionToggle("accordion");
accordionToggle("accordion__list");

//dropdown menu quicklinks
dropDownQuickLinks();

//function header mobile
showMenuHamburguer();

// function swiper sliders
swiperLoops();

// Footer Menu accordion
footerAccordion();

//function resize
window.addEventListener("resize", widthChangeCallback);
widthChangeCallback();

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
  const navMain = document.querySelector(".navigation--menu");
  const navigation = document.querySelector(".nav__menu#navigation");
  btnNav.addEventListener("click", (event) => {
    if (document.querySelector(".nav__accordion")) {
      event.preventDefault();
      btnNav.classList.toggle("open");
      navMain.classList.toggle("show");
      if (navMain.classList.contains("show")) {
        document.body.style.overflow = "hidden";
        navMain.insertAdjacentElement("beforeEnd", navigation);
        document.querySelector(
          ".navigation--menu .nav__menu"
        ).style.visibility = "visible";
        const visibleNav = Array.from(
          document.querySelectorAll(".nav__menu")
        ).filter(
          (s) =>
            window.getComputedStyle(s).getPropertyValue("display") !== "none"
        )[0];
        const visibleNavLinks = Array.from(
          visibleNav.getElementsByTagName("li")
        ).filter(
          (s) =>
            window.getComputedStyle(s).getPropertyValue("display") !== "none"
        );
        if (visibleNavLinks.length > 0) {
          const firstLink = visibleNavLinks[0].querySelector("a");
          firstLink.focus();
        }
      } else {
        document.querySelector(
          ".navigation--menu .nav__menu"
        ).style.visibility = "hidden";
        document.body.removeAttribute("style");
      }
    }
    navMain.addEventListener("focusout", (e) => {
      if (navMain !== e.target && !navMain.contains(e.relatedTarget)) {
        document.getElementById("btnNav").focus();
      }
    });
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
  if (document.querySelector(".prv-footer .menu-accordion")) {
    let acc = document.querySelectorAll(
      ".prv-footer .menu-accordion .menu-accordion__header"
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

//  sticky
(function () {
  let d = document;

  function init() {
    let links = document.querySelectorAll(".btn__navigatelink");
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        let anchor = this.getAttribute("data-navigatelink");
        anchor = document.querySelector(`[data-navigateanchor='${anchor}']`);
        scrollTo(anchor, e);
      });
    });
  }

  var requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  function scrollTo(to, callback, duration = 500) {
    if (isDomElement(to)) {
      // console.log('this is an element:', to); //DEBUG
      to = to.offsetTop;
    }
    /*else {
			// console.log('this is NOT an element:', to); //DEBUG
		}*/

    // because it's so fucking difficult to detect the scrolling element, just move them all
    function move(amount) {
      // document.scrollingElement.scrollTop = amount; //FIXME Test that
      document.documentElement.scrollTop = amount;
      document.body.parentNode.scrollTop = amount;
      document.body.scrollTop = amount;
    }

    function position() {
      console.log("anchor position", to);
      return (
        // document.documentElement.offsetTop ||
        // document.body.parentNode.offsetTop ||
        // document.body.offsetTop
        document.body.getBoundingClientRect().top * -1
      );
    }

    var start = position(),
      change = to - start,
      currentTime = 0,
      increment = 20;
    console.log("start:", start); //DEBUG
    console.log("to:", to); //DEBUG
    console.log("change:", change); //DEBUG

    var animateScroll = function () {
      // increment the time
      currentTime += increment;
      // find the value with the quadratic in-out easing function
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      // move the document.body
      move(val);
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimFrame(animateScroll);
      } else {
        if (callback && typeof callback === "function") {
          // the animation is done so lets callback
          callback();
        }
      }
    };

    animateScroll();
  }

  init();
})();

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function (t, b, c, d) {
  var tc = (t /= d) * t * t;
  return b + c * tc;
};

Math.inOutQuintic = function (t, b, c, d) {
  var ts = (t /= d) * t,
    tc = ts * t;
  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

function isDomElement(obj) {
  return obj instanceof Element;
}

function isMouseEvent(obj) {
  return obj instanceof MouseEvent;
}

function findScrollingElement(element) {
  //FIXME Test this too
  do {
    if (
      element.clientHeight < element.scrollHeight ||
      element.clientWidth < element.scrollWidth
    ) {
      return element;
    }
  } while ((element = element.parentNode));
}

// ver mas
let certificados__items = document.querySelectorAll(".prv__certificados--item");
let boton_vermas = document.querySelector(".prv__certificados--vermas");
if (certificados__items.length <= 4) {
  boton_vermas.style.display = "none";
}
if (certificados__items.length > 4) {
  certificados__items.forEach((elem, i) => {
    if (i > 3) {
      certificados__items[i].classList.add("desactive");
    }
  });
}
boton_vermas.addEventListener("click", (e) => {
  e.preventDefault();
  if (boton_vermas.classList.contains("active")) {
    boton_vermas.classList.remove("active");
    certificados__items.forEach((elem, i) => {
      if (i > 3) {
        boton_vermas.textContent = "Ver más";
        certificados__items[i].classList.add("desactive");
      }
    });

    boton_vermas.blur();
    setTimeout(function () {
      certificados__items[0]
        .querySelector(".prv__certificados--item--link")
        .focus();
    }, 50);
  } else {
    boton_vermas.classList.add("active");
    certificados__items.forEach((elem, i) => {
      boton_vermas.textContent = "Ver menos";
      certificados__items[i].classList.remove("desactive");
    });

    boton_vermas.blur();
    setTimeout(function () {
      certificados__items[4]
        .querySelector(".prv__certificados--item--link")
        .focus();
    }, 50);
  }
});
