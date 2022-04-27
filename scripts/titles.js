const bottom = document.querySelector(".bottom-bar");
const menuFilter = document.querySelector(".menu-filter");
const btnFilterOpen = document.querySelector(".btn-filter-open");
const btnFilterClose = document.querySelector(".btn-filter-close");
const btnFilterExecute = document.querySelector(".btn-filter");

let mangaList = [];

window.addEventListener("resize", checkResize);
btnFilterOpen.addEventListener("click", makeFilterFullScreen);
btnFilterClose.addEventListener("click", makeFilterNone);
btnFilterExecute.addEventListener("click", executeFilter);

// Trap Focus 
function trapFocus(element) {
    let focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), svg:not([disabled])');
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

function checkResize() {
    if (window.innerWidth >= 641) {
        makeFilterSide();
    } else {
        if (menuFilter.getAttribute("visible") != "full-screen") {
            makeFilterNone();
        } 
    }
}

function makeFilterFullScreen() {   
    if (btnFilterOpen.getAttribute("isReadyToExecute") != "true") {
        btnFilterExecute.style.display = "none";
        menuFilter.setAttribute("visible", "full-screen");
        btnFilterOpen.addEventListener("click", executeFilter);
        btnFilterOpen.setAttribute("isReadyToExecute", "true");
        btnFilterOpen.innerText = "Показать";
        menuFilter.focus();
        trapFocus(menuFilter);
    }
}

function makeFilterNone() {
    btnFilterExecute.style.display = "block";
    menuFilter.setAttribute("visible", "none");
    btnFilterOpen.setAttribute("isReadyToExecute", "false");
    btnFilterOpen.innerText = "Фильтры";
    btnFilterOpen.removeEventListener("click", executeFilter);
    let activeCheckboxes = document.querySelectorAll("input[type=checkbox]:checked");
    for (let checkbox of activeCheckboxes) {
        checkbox.checked = false;
    }
}

function makeFilterSide() {
    btnFilterExecute.style.display = "block";
    menuFilter.setAttribute("visible", "side");
    btnFilterOpen.setAttribute("isReadyToExecute", "false");
    btnFilterOpen.innerText = "Фильтры";
    btnFilterOpen.removeEventListener("click", executeFilter);
}

function getCBNames (arr) {
    let names = []
    for (let i = 0; i < arr.length; ++i) {
        let name = arr.item(i).name;
        names.push(name);
    }
    return names;
}

function executeFilter() {
    const activeCheckboxes = document.querySelectorAll("input[type=checkbox]:checked");
    let mangaListFiltered;
    if (activeCheckboxes.length != 0) {
        const mangaTypes = document.querySelectorAll(".mangaTypeCheckbox:checked");
        const mangaStatuses = document.querySelectorAll(".mangaStatusCheckbox:checked");
        if (mangaTypes.length == 0) {
            mangaListFiltered = mangaList.filter(item => getCBNames(mangaStatuses).includes(item.status));
        } else if (mangaStatuses.length == 0) {
            mangaListFiltered = mangaList.filter(item => getCBNames(mangaTypes).includes(item.type));
        } else {
            mangaListFiltered = mangaList.filter(item => (getCBNames(activeCheckboxes).includes(item.type) && getCBNames(activeCheckboxes).includes(item.status)));
        }
        document.querySelector(".grid").remove();
        addMangaList(mangaListFiltered);
    } else {
        document.querySelector(".grid").remove();
        addMangaList(mangaList);
    }
    if (menuFilter.getAttribute("visible") == "full-screen") {
        makeFilterNone();
    } 
}

(async () => {
    mangaList = await getMangaList();
    addMangaList(mangaList);
})()

function addMangaCard(grid, mangaName, mangaType, readLink, mangaImage) {
    //Создание манга карточки
    // let card = `<div class="card">
    //                 <div class="cardImage">
    //                     <a href="${readLink}">
    //                     <img src="${mangaImage}" alt="">
    //                     <div class="card-footer">
    //                         <h4>${mangaName}</h4>
    //                         <h5>${mangaType}</h5>
    //                     </div>
    //                     </a>
    //                 </div>
    //             </div>`

    let card = `<div class="card">
                    <a href="${readLink}">
                        <div class="cardImage"><img src="${mangaImage}" alt=""></div>
                        <div class="card-footer">
                            <h4>${mangaName}</h4>
                            <h5>${mangaType}</h5>
                        </div>
                    </a>
                </div>`

    grid.insertAdjacentHTML('beforeend', card);
}

function addMangaList(mangaList) {
    let grid = document.createElement("div");
    grid.classList.add("grid");
    menuFilter.insertAdjacentElement('afterend', grid);
    for (let i = 0; i < mangaList.length; i++) {
        addMangaCard(grid, mangaList[i].name, mangaList[i].type, mangaList[i].readLink, mangaList[i].imageLink);
    }
}
if (window.innerWidth < 641) {
    makeFilterNone();

} else if (window.innerWidth >= 641) {
    makeFilterSide();
}
