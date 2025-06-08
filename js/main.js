auth = localStorage.getItem("auth")

profile_link = document.querySelector(".profile")
if (!!auth) {
    profile_link.onclick = (e) => {
        e.preventDefault()
        setupLoggedIn()
    }

} else {
    profile_link.onclick = (e) => {
        e.preventDefault()
        setupNotLoggedIn()
    }
}

function setupNotLoggedIn() {
    modal = document.createElement("div")
    modal.classList.add("modal")
    modal.innerHTML = `<div class="modal-form">
                <h2>Введите логин</h2>
                <input type="text" placeholder="Логин" id="login-input">
                <div id="confirm-login" class="button">Войти</div>
            </div>`
    document.querySelector("body").appendChild(modal)
    document.querySelector(".modal").onclick = () => {
        document.querySelector(".modal").remove()
    }
    document.querySelector(".modal-form").onclick = (e) => {
        e.stopPropagation()
        e.preventDefault()
    }

    document.querySelector("#confirm-login").onclick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        login = document.querySelector("#login-input").value
        if (login.length) {
            localStorage.setItem("auth", login)
            window.location.reload()
        } else {
            alert("Введите логин")
        }
    }
}

function setupLoggedIn() {
    window.location.href = "favorite.html"
}

function setupLogout() {
    localStorage.clear("auth")
    window.location.reload()
}


