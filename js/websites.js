

websites.forEach(site => {
    document.querySelector(".list__wrapper").innerHTML +=
        `<a target="_blank" class="list__item"
            href="${site.href}">
            <div class="item__overlay">
                <div class="blackout"></div>
                <img src="img/icons/add_fav.svg" alt="" item-id="${site.id}" class="star">
            </div>
            <img src="img/websites/${site.img}" alt="123" class="item__img">
            <h3 class="item__title">${site.name}</h3>
            <p class="item__description">
                ${site.description}
            </p>
        </a>`
});