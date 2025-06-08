

function shadeColor(color, percent) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);
    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);
    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;
    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)
    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
    return "#" + RR + GG + BB;
}

currentSong = 0
function setSong(autoplay = false) {
    seconds = (songs[currentSong].length % 60).toString()
    if (seconds.length < 2) {
        seconds = "0" + seconds
    }
    document.querySelector(".total-time").innerHTML = `${Math.floor(songs[currentSong].length / 60)}:${seconds}`
    soundPlayer = new Audio(songs[currentSong].file)
    document.querySelector(".now-time").innerHTML = `0:00`
    document.querySelector("body").style = `background-color:${songs[currentSong].color};`
    document.querySelector(".songs-list").style = `background-color:${songs[currentSong].color};`
    document.querySelector(".songname").innerHTML = songs[currentSong].name
    document.querySelector(".author").innerHTML = songs[currentSong].author
    if (autoplay) {
        while (soundPlayer.paused) {
            soundPlayer.play()
        }
    }
    document.querySelector(".songs-list").innerHTML = ""
    songs.forEach(song => {
        seconds = (song.length % 60).toString()
        if (seconds.length < 2) {
            seconds = "0" + seconds
        }
        document.querySelector(".songs-list").innerHTML += `
        <div class="list__song">
                <img src="${song.cover}" alt="">
                <div class="list__song__info">
                    <div class="song__title">
                        ${song.name}
                    </div>
                    <div class="song__author">
                        ${song.author}
                    </div>
                </div>
                <div class="list__song__length">
                    ${Math.floor(song.length / 60)}:${seconds}
                </div>
            </div>
        `
        document.querySelectorAll(".list__song").forEach((song, index) => {
            song.onclick = () => {
                soundPlayer.pause()
                currentSong = index
                setSong(true)
                document.querySelector(".album-covers img").src = songs[currentSong].cover
            }
        });
        document.querySelectorAll(".list__song").forEach((element, i) => {

            element.classList.remove("active")

            if (i == currentSong) {
                element.classList.add("active")
            }
        });
    });


    update(soundPlayer.currentTime)
}


function update(time) {
    minutes = Math.floor(time / 60)
    seconds = Math.floor(time % 60).toString()

    if (seconds.length < 2) {
        seconds = "0" + seconds
    }
    if (soundPlayer.paused) {
        document.querySelector(".pause").classList.add("paused")
    } else {
        document.querySelector(".pause").classList.remove("paused")

    }
    document.querySelector(".now-time").innerHTML = `${minutes}:${seconds}`
    document.querySelector(".progress").style.width = `${time / songs[currentSong].length * 100}%`
    document.querySelector(".circle").style.left = `${time / songs[currentSong].length * 100}%`
    checkEnded()
}



function checkEnded() {
    if (songs[currentSong].length - soundPlayer.currentTime <= 0) {
        nextSong(true)
    }
}
function nextSong(autoplay = false) {
    if (can_switch) {
        can_switch = false


        if (currentSong == songs.length - 1) {
            currentSong = 0;
        }
        else {
            currentSong += 1
        }
        document.querySelector(".album-covers").innerHTML += `
            <img src="${songs[currentSong].cover}" alt="" class="cover2" style="transform:translateX(100%);transition:.3s;">
        `

        setTimeout(() => {
            document.querySelector(".album-covers img").style = "transform:translate(calc(-100% - 40px),0);"
            document.querySelector(".album-covers img.cover2").style = "transform:translate(0,0);"
        }, 1);
        setTimeout(() => {
            document.querySelector(".album-covers img.cover2").style = "transition:0;"
            document.querySelector(".album-covers img.cover2").classList.remove("cover2")
            document.querySelector(".album-covers img").classList.add("toremove")
            document.querySelector(".album-covers img.toremove").remove()


            can_switch = true
        }, 300);

        if (!soundPlayer.paused || autoplay) {
            soundPlayer.pause()
            setTimeout(() => {
                setSong(true)
            }, 150);

        } else {
            setSong()
        }
        soundPlayer.pause()
    }
}
function previousSong(autoplay = false) {
    if (can_switch) {
        can_switch = false

        if (currentSong == 0) {
            currentSong = songs.length - 1;
        }
        else {
            currentSong -= 1
        }

        document.querySelector(".album-covers").innerHTML = `
            <img src="${songs[currentSong].cover}" alt="" class="cover2" style="transform:translateX(-100%); transition:.3s;">
        `+ document.querySelector(".album-covers").innerHTML

        setTimeout(() => {
            document.querySelectorAll(".album-covers img")[1].style = "transform:translate(calc(100% + 40px),0);"
            document.querySelector(".album-covers img.cover2").style = "transform:translate(0,0);"
        }, 1);
        setTimeout(() => {
            document.querySelector(".album-covers img.cover2").style = "transition:0;"
            document.querySelector(".album-covers img.cover2").classList.remove("cover2")
            document.querySelectorAll(".album-covers img")[1].classList.add("toremove")
            document.querySelector(".album-covers img.toremove").remove()


            can_switch = true
        }, 300);






        if (!soundPlayer.paused || autoplay) {
            soundPlayer.pause()
            setTimeout(() => {
                setSong(true)
            }, 150);
        } else {
            setSong()
        }
        soundPlayer.pause()
    }

}


can_switch = true

setInterval(() => {
    update(soundPlayer.currentTime)
}, 16);



setSong()


let time = 0


function setButtons() {



    document.querySelector(".album-covers").innerHTML = `<img src="${songs[currentSong].cover}" alt="">`
    document.querySelector(".next").onclick = () => {
        nextSong()
    }
}
document.querySelector(".previous").onclick = () => {
    time = soundPlayer.currentTime
    previousSong()
}

timeline = document.querySelector(".timeline")
timeline.addEventListener("click", (event) => {
    time = Math.floor(event.offsetX / timeline.offsetWidth * songs[currentSong].length)
    soundPlayer.currentTime = time
    update(soundPlayer.currentTime)


})
pauseButton = document.querySelector(".pause")
pauseButton.onclick = () => {
    if (soundPlayer.paused) {
        soundPlayer.play()
    } else {
        soundPlayer.pause()
    }
    pauseButton.classList.toggle("paused")

}




document.querySelector("body").addEventListener("keypress", (event) => {
    if (event.key == " " || event.key == "k") {
        if (soundPlayer.paused) {
            soundPlayer.play()
        } else {
            soundPlayer.pause()
        }
        update(soundPlayer.currentTime)
    }
    else if (event.key == "l") {
        nextSong()
    }
    else if (event.key == "j") {
        previousSong()
    }
})

setButtons()