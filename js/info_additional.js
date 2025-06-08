function setupItems(){
    try{
        document.querySelectorAll(".info-item").forEach(item => {
            item.onclick = (e) => {
                e.preventDefault()
                overlay = document.createElement("div")
                overlay.classList.add("info__overlay")
                overlay.innerHTML = `<img src="${item.querySelector(".item__img").src}" alt="" class="info__big">`
                document.querySelector("main").appendChild(overlay)
        
                document.querySelector(".info__overlay").onclick = () => {
                    document.querySelector(".info__overlay").remove()
                }
                document.querySelector(".info__big").onclick = (e) => {
                    e.stopPropagation()
                }
            }
        });
    }catch{}
}
setupItems()
