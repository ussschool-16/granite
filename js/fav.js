function addFav(event, star) {
    event.preventDefault()
    event.stopPropagation()
    for (const key in books.subjects) {
        books.subjects[key].grades.forEach(grade => {
            grade.forEach(book => {
                if (book.id == star.getAttribute("item-id")) {
                    addToServer(book.id).then(resp => {
                        if (resp) {
                            star.classList.add("active")
                            star.src = "img/icons/fav.svg"
                            star.onclick = (event) => {
                                removeFav(event, star)
                            }
                        } else {
                            alert("Войдите в аккаунт")
                        }
                    })
                }
            });
        });
    }
    for (const key in info) {
        info[key].forEach(item => {
            if (item.id == star.getAttribute("item-id")) {
                addToServer(item.id).then(resp => {
                    if (resp) {
                        star.classList.add("active")
                        star.src = "img/icons/fav.svg"
                        star.onclick = (event) => {
                            removeFav(event, star)
                        }
                    } else {
                        alert("Войдите в аккаунт")
                    }
                })
            }
        });
    }
    websites.forEach(item => {
        if (item.id == star.getAttribute("item-id")) {
            addToServer(item.id).then(resp => {
                if (resp) {
                    star.classList.add("active")
                    star.src = "img/icons/fav.svg"
                    star.onclick = (event) => {
                        removeFav(event, star)
                    }
                } else {
                    alert("Войдите в аккаунт")
                }
            })
        }
    });
}
function removeFav(event, star) {
    event.preventDefault()
    event.stopPropagation()
    //это только книги надо будет ебануть еще для остальных типов данных
    for (const key in books.subjects) {
        books.subjects[key].grades.forEach(grade => {
            grade.forEach(book => {
                if (book.id == star.getAttribute("item-id")) {
                    removeFromServer(book.id).then(resp => {
                        if (resp) {
                            star.classList.remove("active")
                            star.src = "img/icons/add_fav.svg"
                            star.onclick = (event) => {
                                addFav(event, star)
                            }
                        } else {
                            alert("Войдите в аккаунт")
                        }
                    })
                }
            });

        });
    }
    for (const key in info) {
        info[key].forEach(item => {
            if (item.id == star.getAttribute("item-id")) {
                removeFromServer(item.id).then(resp => {
                    if (resp) {
                        star.classList.remove("active")
                        star.src = "img/icons/add_fav.svg"
                        star.onclick = (event) => {
                            addFav(event, star)
                        }
                    } else {
                        alert("Войдите в аккаунт")
                    }
                })
            }
        });
    }
    websites.forEach(item => {
        if (item.id == star.getAttribute("item-id")) {
            removeFromServer(item.id).then(resp => {
                if (resp) {
                    star.classList.remove("active")
                    star.src = "img/icons/add_fav.svg"
                    star.onclick = (event) => {
                        addFav(event, star)
                    }
                } else {
                    alert("Войдите в аккаунт")
                }
            })
        }
    });
}


const server = "https://ed0ffc14-aab4-4912-acb3-95fa67051f9b-00-2u3pfffnp4b5.kirk.replit.dev"


async function addToServer(id) {
    if (!!auth) {
        fetch(`${server}/add-fav`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "auth": auth,
                "fav_id": id
            })
        })
        return await `Добавлено в избранное ${id}`
    }
    else {
        return false;
    }
}
async function removeFromServer(id) {
    if (!!auth) {
        fetch(`${server}/remove-fav`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "auth": auth,
                "fav_id": id
            })
        })
        return await `Удалено из избранного ${id}`
    }
    else {
        return false;
    }
}

async function getFav() {
    if (!!auth){
        try{
            response = await fetch(`${server}/get-fav`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    "auth": auth,
                })
            })
            return await response.json()
        }catch{
            return {"success":false,"message":"Сервер не отвечает"}
        }
    }
    else{
        return {"success":false,"message":"Вы не вошли в аккаунт"}
    }

}

function clickStars() {

    getFav().then(data => {
        if (data.success){
            fav = data.data
            document.querySelectorAll(".star").forEach(star => {
                star.onclick = (event) => {
                    addFav(event, star)
                }
                fav.forEach(item => {
                    if (item.id == star.getAttribute("item-id")) {
                        star.classList.add("active")
                        star.src = "img/icons/fav.svg"
                        star.onclick = (event) => {
                            removeFav(event, star)
                        }
                    }
                });
            });
        }else{
            document.querySelectorAll(".star").forEach(star => {
                star.onclick = (event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    alert(data.message)
                }
            });
        }
    })
}

clickStars()

