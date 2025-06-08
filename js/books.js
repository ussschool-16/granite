document.querySelectorAll(".grade__select").forEach(button => {
    button.onclick = () => {
        document.querySelectorAll(".grade__select").forEach(b => {
            b.classList.remove("active")
        })
        button.classList.add("active")
        fillGrade(parseInt(button.textContent))
    }
});


function fillGrade(grade = 5) {

    try {
        document.querySelectorAll(".list").forEach(list => {
            list.remove()
        });
    }
    catch { }

    books.subjects.forEach(subject => {
        let inner = ``
        subject.grades[grade - 5].forEach(book => {
            // <img src="img/books/${subject.name}/${grade}/${book.id}.jpg" alt="" class="item__img">
            inner += `
                <a target="_blank" class="list__item" href="${book.href}">
                    <div class="item__overlay">
                        <div class="blackout"></div>
                        <img src="img/icons/add_fav.svg" alt="" item-id="${book.id}" class="star">
                    </div>
                    <img src="${book.img}" alt="" class="item__img">
                    <h3 class="item__title">${book.name}</h3>
                </a>
                `
        });
        if (subject.grades[grade - 5].length != 0) {
            let list = document.createElement("section")
            list.classList.add("list")
            list.innerHTML = `
                <div class="container">
                    <h2>${subject.name}</h2>
                    <div class="list__wrapper wrapper">
                        ${inner}
                    </div>
                </div>
            `
            document.querySelector("main").appendChild(list)
        }
    });
    clickStars()
}

fillGrade(document.querySelector(".grade__select.active").textContent)