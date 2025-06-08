auth = localStorage.getItem("auth")

if (!auth) {
    window.location.href = "index.html"
}

document.querySelector(".profile img").src = "img/icons/logout.svg"
document.querySelector(".profile img").onclick = (e) => {
    e.preventDefault()
    setupLogout()
}
const wrapper = document.querySelector(".list__wrapper")

getFav().then(fav => {
    if (fav.success){
        fav.data.forEach(fav_item => {
            for (const key in books.subjects) {
                books.subjects[key].grades.forEach(grade => {
                    grade.forEach(book => {
                        if (book.id == fav_item.id) {
                            wrapper.innerHTML +=
                                `
                            <a target="_blank" class="list__item" href="${book.href}">
                                <div class="item__overlay">
                                    <div class="blackout"></div>
                                    <img src="img/icons/add_fav.svg" alt="" item-id="${book.id}" class="star">
                                </div>
                                <img src="${book.img}" alt="" class="item__img">
                                <h3 class="item__title">${book.name}</h3>
                            </a>
                            `
                        }
                    });
                });
            }
            for (const key in info) {
                info[key].forEach(item => {
                    if (item.id == fav_item.id) {
                        wrapper.innerHTML += `<div class="list__item info-item">
                            <div class="item__overlay">
                                <div class="blackout"></div>
                                <img src="img/icons/add_fav.svg" alt="" item-id="${item.id}" class="star">
                            </div>
                            <img src="img/info/${item.img}" alt="" class="item__img">
                            <h3 class="item__title">${item.name}</h3>
                            <p class="item__description">
                                ${item.description}
                            </p>
                        </div>`
                    }
                });
            }
            websites.forEach(site => {
                if (site.id == fav_item.id) {
                    wrapper.innerHTML += `
                    <a target="_blank" class="list__item"
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
            </a>
                    `
                }
            });
        });
    }
    
    clickStars()
    setupItems()
    if (wrapper.children.length == 0){
        wrapper.remove()
        document.querySelector(".list .container").innerHTML += "<h3 class='not-found'>Вы не добавили ничего в избранное</h3>"
    }
})






