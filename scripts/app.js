const windowInnerWidth = window.innerWidth;
const drawer = document.querySelector(".drawer");
const drawerContent = document.querySelector(".drawer-content");

window.addEventListener("resize", checkResize);
document.body.addEventListener("click", clickHandler);
document.body.addEventListener("keydown", keydownHandler);

function checkResize() {
    if (window.innerWidth > 640 && drawer.getAttribute("isActive") === "true") {
      drawerClose();
    }
  }

function drawerOpen() {
    drawer.setAttribute("isActive", true)
    document.documentElement.style.overflow = 'hidden';

    setTimeout(function () {
        drawer.setAttribute("isVisible", true);
        drawerContent.focus();
        trapFocus(drawerContent);
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

function keydownHandler(event) {
    if (drawer.getAttribute("isVisible") === "true" && (event.key === 'Escape' || event.keyCode === 27)) {
        drawerClose();
      }
}

// Trap Focus 
function trapFocus(element) {
    let focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    let firstFocusableEl = focusableEls[0];  
    let lastFocusableEl = focusableEls[focusableEls.length - 1];

    element.addEventListener('keydown', function(e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

        if (!isTabPressed) { 
        return; 
        }
        if ( e.shiftKey ) {// shift + tab
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else{ // tab 
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }
    });
}