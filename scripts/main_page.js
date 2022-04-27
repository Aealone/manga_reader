const cardHead = document.querySelector(".card-list");
let mangaList = [];

(async () => {
    mangaList = await getMangaList();
    addMangaList(mangaList);
})()

function addMangaList(mangaList) {
    for (let i = 0; i < mangaList.length; i++) {
        addMangaCard(mangaList[i].name, mangaList[i].readLink, mangaList[i].imageLink, mangaList[i].lastAddedTitles, mangaList[i].lastAddedTime);
    }
}

function addMangaCard(mangaName, readLink, mangaImage, lastTitles, lastTime) {
    //Создание манга карточки
    let card = `<div class="card">
                    <div class="card-img">
                        <a href="${readLink}">
                        <img alt="Манга превью" src="${mangaImage}">
                        </a>
                    </div>
                    <div class="card-titles">
                        <p>${mangaName}</p>
                        <ul class="card-titles-list">
                        </ul>
                    </div>
                    <div class="card-author">
                        <p>Добавлено ${lastTime} минут(у/ы) назад</p>
                    </div>
                </div>`
    for (let name in lastTitles) {
        let title = `<li><a href=${lastTitles[name]}>${name}</a></li>`;
        card = card.slice(0, card.indexOf("</ul>")) + title + card.slice(card.indexOf("</ul>"), card.length);
    }
    cardHead.insertAdjacentHTML('beforeend', card);
}
