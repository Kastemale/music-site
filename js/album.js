 let container=document.querySelector(`.album`);
let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);
let album = albums[i];
if(!album){
    container.innerHTML = `ERROR isnotfound u'll redirect in five seconds `
    setTimeout(() => {
        window.location.pathname = `index.html`
    }, 5000);
    
}
else{
    rendercard()
    renderTracks()
    function rendercard(){
        container.innerHTML=` 
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4 ">
                <img src="${album.img}" alt=""  class="img-fluid rounded-start be">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${album.title}
                    <h6><p class="card-text"><small>${album.description}</small></p>
                    </h6>
                    <p class="card-text"><small class="text-muted">выпущен ${album.year}</small></p>
                </h5>
                </div> 
            </div>
        </div> 
    </div>`
    }
    function renderTracks(){
    let playlist= document.querySelector(`.playlist`);
    let tracks= album.tracks;
    for (let j = 0; j < tracks.length;j++){
        let track = tracks[j];
        playlist.innerHTML += `
        <li class="track list-group-item d-flex align-items-center">
        <img src="assets/play.png" alt="" class="img-pause me-3" height="30px">
        <img src="assets/off2.png" alt="" class="d-none img-play me-3" height="30px">
        <div>
            <div>
                <div>${track.title}</div>
                <div class="text-secondory text-muted">${track.author}</div>
            </div>
        </div>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 0%;"></div>
        </div>
            <div class="time ms-auto">${track.time}</div>  
                <audio class="audio" src="${track.src}" ></audio>
                <div class="t" ></div>  
        </li>`
    }

    }
    function setupAudio() {
        // Найди коллекцию с треками
        let trackNodes = document.querySelectorAll(`.track`); 
        for (let i = 0; i < trackNodes.length; i++) {
            let tracks= album.tracks;
            let track = tracks[i];
            let node = trackNodes[i];   
            let timeNode = node.querySelector(`.time`);
            let imgpause = node.querySelector(`.img-pause`);
            let imgplay = node.querySelector(`.img-play`);
            let progressBar = node.querySelector(`.progress-bar`);
            // Тег аудио внутри этого элемента
            let audio = node.querySelector(`.audio`); 
            node.addEventListener(`click`, function () {
            // Если трек сейчас играет...
            if (track.isPlaying) {
                track.isPlaying = false;
                // Поставить на паузу
                audio.pause();
                imgpause.classList.remove(`d-none`);
                imgplay.classList.add(`d-none`);
            // Если трек сейчас не играет...
            } else {
                track.isPlaying = true;
                // Включить проигрывание
                audio.play();
                imgpause.classList.add(`d-none`);
                imgplay.classList.remove(`d-none`);
                updateProgress();
            }
        });
            function updateProgress() {
                console.log(`функция вызвана`);
                // Нарисовать актуальное время
                let time = getTime(audio.currentTime);
                if(timeNode.innerHTML !=time){
                    console.log(`звук дорожка`)
                    timeNode.innerHTML =audio.currentTime;
                    progressBar.style.width = audio.currentTime*100/audio.duration + '%';
                }
                
            
                // Нужно ли вызвать её ещё раз?
                if (track.isPlaying) {
                    requestAnimationFrame(updateProgress);
                }  
            }
        }
    }
    setupAudio();
    function getTime(time){
        let currentSeconds = Math.floor(time);
        let minutes = Math.floor(currentSeconds/60);
        let seconds = Math(currentSeconds%60);
        if(minutes<10){
            minutes =`0`+ minutes;
        }
        if(seconds<10){
            seconds= `0`+ seconds;
        }
        return `${minutes}:${seconds}`
    } 
}
