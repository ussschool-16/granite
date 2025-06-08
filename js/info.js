
try {
        document.querySelectorAll(".list").forEach(list => {
            list.remove()
        });
    }
    catch { }

for (const key in info) {
    let list = document.createElement("section")
    list.classList.add("list")
    let inner = ``
    info[key].forEach(item => {
        inner += `<div class="list__item info-item">
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
    });
    list.innerHTML = `
                <div class="container">
                    <h2>${key}</h2>
                    <div class="list__wrapper wrapper">
                        ${inner}
                    </div>
                </div>
            `
    document.querySelector("main").appendChild(list)
}
