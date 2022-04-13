const windowInnerWidth = window.innerWidth;
document.body.addEventListener("click", clickHandler);
window.addEventListener("resize", checkResize);
const drawer = document.querySelector(".drawer");
const drawers = document.querySelector(".drawer-content");


// alert(document.location.href)

function checkResize() {
    if (window.innerWidth > 640 && document.querySelector(".drawer").getAttribute("isActive") === "true") {
      drawerClose();
    }
  }


function drawerOpen() {
    drawer.setAttribute("isActive", true)
    document.documentElement.style.overflow = 'hidden';

    setTimeout(function () {
        drawer.setAttribute("isVisible", true);
        drawers.focus();
        trapFocus(drawers);
      }, 20); 
}

function drawerClose() {
    drawer.setAttribute("isVisible", false);
    document.documentElement.style.overflow = '';

    setTimeout(function () {
        drawer.setAttribute("isActive", false);
      }, 280); 
    // for (let element of document.body.children) {
    //     if (!element.classList.contains("drawer")) {
    //         element.classList.remove("drawer-overlay")
    //     } else {
    //         element.classList.remove("drawer-expanded");
    //     }
    // }
}

function clickHandler(event) {
    let openClick = event.target.closest("#button-menu");
    let drawerClick = event.target.closest(".drawer-content");

    if(openClick) {
        drawerOpen();
    } else if (!drawerClick) {
        drawerClose();
    }
}

// Trap Focus 
// https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
//
function trapFocus(element) {
    var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    var firstFocusableEl = focusableEls[0];  
    var lastFocusableEl = focusableEls[focusableEls.length - 1];
    var KEYCODE_TAB = 9;

    element.addEventListener('keydown', function(e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

        if (!isTabPressed) { 
        return; 
        }

        if ( e.shiftKey ) /* shift + tab */ {
        if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            e.preventDefault();
            }
        } else /* tab */ {
        if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            e.preventDefault();
            }
        }
    });
}