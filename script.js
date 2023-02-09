console.log("Welcome to tron!");
    
//Initialise the variables
let songIndex = 0;
let muteFlag=0;
let volumeInput = 50;
let audioElement = new Audio('media/songs/0.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let timeRead = document.getElementById('timeRead');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let speaker = document.getElementById('muteUnmute');
let volSlider = document.getElementById('volSlider');
let curTimeText = document.getElementById('curTimeText');
let durTimeText = document.getElementById('durTimeText');
audioElement.volume = volumeInput/100;


let songs = [
    {songName: "Sang Hoon tere", filePath: "media/songs/0.mp3", coverPath: "media/covers/cover1.jpg"},
    {songName: "Heer Ranjha", filePath: "media/songs/1.mp3", coverPath: "media/covers/cover2.jpg"},
    {songName: "Safar", filePath: "media/songs/2.mp3", coverPath: "media/covers/cover3.jpg"},
    {songName: "Rahguzar", filePath: "media/songs/3.mp3", coverPath: "media/covers/cover4.jpg"},
    {songName: "Bas Mein", filePath: "media/songs/4.mp3", coverPath: "media/covers/cover5.jpg"},
    {songName: "Didi Song", filePath: "media/songs/5.mp3", coverPath: "media/covers/cover6.jpg"},
];

songItems.forEach((Element, i)=>{
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText =songs[i].songName;

})
// audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }
})


//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{    
    //updating seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');    
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){

            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `media/songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime =0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else
        {
            audioElement.pause();
            makeAllPlays();
        }
        if(gif.style.opacity==0){
            gif.style.opacity=1;
        }
        else{
            gif.style.opacity=0;
        }
    })

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -=1;
    }
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    audioElement.src = `media/songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime <=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    if(gif.style.opacity==0)
    {
        gif.style.opacity=1;
    }

})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    audioElement.src = `media/songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime =0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    
    if(gif.style.opacity==0)
    {
        gif.style.opacity=1;
    }
    

})

speaker.addEventListener('click', ()=>{
    if(muteFlag ==0)
    {
        speaker.classList.remove('fa-volume-high');
        speaker.classList.add('fa-volume-mute');
        muteFlag = 1;
        document.getElementById('volSlider').value = 0;
        audioElement.muted = true;
    }
    else{
        speaker.classList.remove('fa-volume-mute');
        speaker.classList.add('fa-volume-high');
        muteFlag = 0;
        document.getElementById('volSlider').value = volumeInput;
        audioElement.muted = false;

    }


})

volSlider.addEventListener('change', ()=>{
    volumeInput = parseInt(volSlider.value);
    audioElement.volume = volumeInput/100;
})

audioElement.addEventListener('timeupdate',()=>{
    var nt =audioElement.currentTime*(100/audioElement.duration);
    myProgressBar.value =nt;
    var curmins = Math.floor(audioElement.currentTime/60);
    var cursecs = Math.floor(audioElement.currentTime - curmins * 60);
    var durmins = Math.floor(audioElement.duration/60);
    var dursecs = Math.floor(audioElement.duration - durmins * 60);
    if(cursecs <10){cursecs ="0"+cursecs;}
    if(curmins <10){curmins ="0"+curmins;}
    if(dursecs <10){dursecs ="0"+dursecs;}
    if(durmins <10){durmins ="0"+durmins;}
    curTimeText.innerHTML = curmins+ ":"+ cursecs;
    durTimeText.innerHTML = durmins+ ":"+ dursecs;
})

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();            
            document.getElementById(songIndex).classList.remove('fa-circle-play');
            document.getElementById(songIndex).classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
        else{
            audioElement.pause();
            makeAllPlays();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
      console.log('Space pressed'); //whatever you want to do when space is pressed
    }
  })

document.getElementById('home').addEventListener('click', ()=>{
    window.open("https://www.instagram.com/bhuvan.bam22/") ;
})

document.getElementById('about').addEventListener('click',()=>{
    window.open("about.html");
})

document.getElementById('main').addEventListener('click',()=>{
    window.open("index.html");
})