document.querySelector("#nav-open").onclick = ()=>{
    document.querySelector("nav").classList.add("active")
}

document.querySelector("#nav-close").onclick = ()=>{
    document.querySelector("nav").classList.remove("active")
}