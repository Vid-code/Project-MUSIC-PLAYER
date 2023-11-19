"use strict"; // Strict mode - strozija pravila u JS, pise detaljnije greske. 


// Ovaj deo koda ukljucuje deklaraciju promenljivih HTML elementa
// u okviru korisnickog interface-a


let audioTrack = document.createElement("audio"); // audioTrack kreira novi HTML audio element.
audioTrack.preload = "metadata";
document.body.append(audioTrack); // Reprodukcija audio zapisa.

let blurElement = document.getElementById("blurElement"); // Zamucenje u interfejsu.

let themes = document.getElementById("themes"); // Stilovi plejera.

let musicBox = document.getElementById("musicBox"); // Glavni kontejner plejera.

let trackItemsWrapper = document.getElementById("trackItemsWrapper"); // Pesme u peljeru.

let trackArtistName = document.getElementById("trackArtistName"); // Informacije o izvodjacu.
let trackAlbumName = document.getElementById("trackAlbumName"); // Infomracije o albumu.

let coverImage = document.getElementById("coverImage"); // Omot albuma, neka slika.

let playButton = document.getElementById("playButton"); // Dugme za play.
let playButtonIcon = playButton.firstElementChild;
let pauseButtonIcon = playButton.lastElementChild;

let previousButton = document.getElementById("previousButton"); // Dugme za pauziranje.
let nextButton = document.getElementById("nextButton"); // Dugme za sledecu pesmu.

let volumeWrapper = document.getElementById("volumeWrapper"); // Kontejner za jacinu zvuka.
let volumeButton = document.getElementById("volumeButton"); //  Dugme za jacinu zvuka.
let volumeNumber = document.getElementById("volumeNumber"); // Trenutna jacina zvuka.

let wavesVolumeButton = document.getElementById("wavesVolumeButton"); // Vizualni simbol za jacinu zvuka.
let highVolumeSymbol = document.getElementById("highVolumeSymbol"); // Vizualni simbol za jacinu zvuka.
let mediumVolumeSymbol = document.getElementById("mediumVolumeSymbol"); // Vizualni simbol za jacinu zvuka.
let lowVolumeSymbol = document.getElementById("lowVolumeSymbol");  // Vizualni simbol za jacinu zvuka.
let volumeCross = document.getElementById("volumeCross"); // Vizualni simbol za jacinu zvuka.

let currentTrackTimeNumber = document.getElementById("currentTrackTimeNumber"); // Vreme trajanja pesme.
let currentTrackDuration = document.getElementById("currentTrackDuration"); // Ukupno vreme trajanja pesme.

let trackProgressBar = document.getElementById("trackProgressBar"); // Traka trajanja pesme.
let trackLoading = document.getElementById("trackLoading"); // Ucitavanje pesme.
let currentTrackTimeBar = document.getElementById("currentTrackTimeBar"); // Trenutno trajanje pesme.


// Ovaj deo koda predstavlja informacije o razlictim pesmama.
let musics = [
  {
    trackName: "Losing Control", // Naziv pesme.
    artist: "Villain of the story", // Izvodjac.
    album: "Divided", // Album.
    coverImage: "https://i.postimg.cc/y62Drhym/image.jpg", // Omot albuma ili pesme.
    audioSource:
      "https://cdns-preview-4.dzcdn.net/stream/c-465dbacd317d67cc6a4d1adb22355970-2.mp3" // URL zapis pesme.
  },
  {
    trackName: "Senden Baska", // Naziv pesme.
    artist: "Serhet Durmus", // Izvodjac.
    album: "Singles", // Album.
    coverImage: "https://i.postimg.cc/cCtNnnKZ/image.jpg", // Omot albuma ili pesme.
    audioSource:
      "https://cdns-preview-9.dzcdn.net/stream/c-94e53a428fd9dbf35c5b06d800447c2a-4.mp3" // URL zapis pesme.
  },
  {
    trackName: "I don't care", // Naziv pesme.
    artist: "Apocalyptica", // Izvodjac.
    album: "Singles", // Album.
    coverImage: "https://i.postimg.cc/BZj8g7HZ/image.jpg", // Omot albuma ili pesme.
    audioSource:
      "https://cdns-preview-d.dzcdn.net/stream/c-dbbdb0dd57e34c52b2379fb69bc7da4f-3.mp3" // URL zapis pesme.
  },
  {
    trackName: "Monster", // Naziv pesme.
    artist: "Fight the Fade", // Izvodjac.
    album: "APOPHYSITIS", // Album.
    coverImage: "https://i.postimg.cc/BnS4htk5/image.jpg", // Omot albuma ili pesme.
    audioSource: 
      "https://cdns-preview-4.dzcdn.net/stream/c-46413a2a74ddd53a2f13ef2b853202f7-3.mp3" // URL zapis pesme.
  },

  { 
    trackName: "Dance With the Devil", // Naziv pesme.
    artist: "Breaking Benjamin", // Izvodjac.
    album: "Phobia", // Album.
    coverImage: "https://i.postimg.cc/15Xzmj0J/image.jpg", // Omot albuma ili pesme.
    audioSource:
      "https://cdns-preview-b.dzcdn.net/stream/c-b2bbd0db3fb9e1314ef56dfc11c86a65-5.mp3" // URL zapis pesme.
  },
  {
    trackName: "The Catalyst", // Naziv pesme.
    artist: "Linkin Park", // Izvodjac.
    album: "A Thousand Sun", // Album.
    coverImage: "https://i.postimg.cc/FK3jRqxM/image.jpg", // Omot albuma ili pesme.
    audioSource:
      "https://cdns-preview-8.dzcdn.net/stream/c-8930ac6a4a087666b651b8aad5cd4a26-5.mp3" // URL zapis pesme.
  },
  {
    trackName: "Lali", // Naziv pesme.
    artist: "Jony", // Izvodjac.
    album: "Spisok tvoikh mysley", // Album.
    coverImage: "https://i.postimg.cc/hvyGBHCW/image.jpg", // Omot albuma ili pesme.
    audioSource:
      "https://cdns-preview-0.dzcdn.net/stream/c-095471cd71c784daa9eab6beb69c5848-3.mp3" // URL zapis pesme.

      // Napisao sam svuda za svaki slucaj... ^
  }
];


// Ovaj deo koda se koristi kao generisanje HTML sadrzaja koji prikazuje listu pesama.
musics.forEach((item, index) => {
  trackItemsWrapper.innerHTML += `<div class="track-item" data-index="${index}">${
    index + 1
  }. ${item.trackName}</div>`;
});

trackItemsWrapper.firstElementChild.classList.add("active");


// Ovaj deo koda se koristi za azuriranje informacija o pesmi, slika omota,albuma izvor audio zapisa
// ime izvodjaca i naziv albuma. 
// Funkcija uzima vrednost iz musics i postavlja odgovarajuce vrednosti elemenata na info. o pesmi
function informationUpdate(target) {
  target = target ? target : 0;
  coverImage.src = "";
  coverImage.src = musics[target].coverImage;
  audioTrack.src = musics[target].audioSource;
  trackArtistName.textContent = musics[target].artist;
  trackAlbumName.textContent = musics[target].album;
}

informationUpdate();


// Ovaj kod se koristi za promenu teme koju korisnik odluci da izabere. 
// Kada se klikne na temu, primenjuju se odgovarajuci stilovi na element stranice kako bi se postigao
// zeljeni izgled. 
// Sve uz pomoc slusaoca dogadjaja click na element id-em themes.
themes.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) return;
  let targetTheme = e.target.dataset.theme;

  let activeTheme = document.querySelector(".active-theme");
  activeTheme.classList.remove("active-theme");

  e.target.classList.add("active-theme");

  switch (targetTheme) {
    case "theme1":
      blurElement.style.visibility = "hidden";
      musicBox.style.border = "";
      musicBox.style.boxShadow = "";
      coverImage.style.background = "";
      trackProgressBar.style.background = "";
      currentTrackTimeBar.style.background = "";
      trackLoading.style.background = "";
      break;

    case "theme2":
      blurElement.style.visibility = "visible";
      musicBox.style.border = "1px solid #ffffff12";
      musicBox.style.boxShadow =
        "inset -10px -10px 15px #ffffff0a, inset 10px 10px 15px #ffffff0a";
      blurElement.style.background =
        "linear-gradient(135deg, #dc143c, #009688)";
      coverImage.style.background = "#00968875";
      trackProgressBar.style.background = "#0fd5ca73";
      currentTrackTimeBar.style.background = "#0fd5ca";
      trackLoading.style.background = "#0fd5ca";
      break;

    case "theme3":
      blurElement.style.visibility = "visible";
      musicBox.style.border = "1px solid #ffffff12";
      musicBox.style.boxShadow =
        "inset -10px -10px 15px #ffffff0a, inset 10px 10px 15px #ffffff0a";
      blurElement.style.background =
        "linear-gradient(135deg, #7f0096, #14abdc)";
      coverImage.style.background = "#288bcf75";
      trackProgressBar.style.background = "#0fd5ca73";
      currentTrackTimeBar.style.background = "#0fd5ca";
      trackLoading.style.background = "#0fd5ca";
      break;
  }
});


// Ovaj deo koda se koristi za oznacavanje aktivne pesme kada se klikne na njenu stavku.
// Stavka dobija klasu active koja omogucava stilozvanje za tu oznacenu pesmu
// dok se prethodna pesma deaktivira uklanjanjem klase active.
// informationUpdate() se koristi kao azuziranje informacija o pesmi
trackItemsWrapper.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) return;
  let activeAudio = document.querySelector(".active");
  activeAudio.classList.remove("active");
  e.target.classList.add("active");

  let targetIndex = e.target.dataset.index;

  informationUpdate(targetIndex);
});

// Potrebno je cekanje zbog ucitavanja audio sadrzaja, zbog toga koristimo ovaj deo koda. 
audioTrack.addEventListener("waiting", waitingEvent);

// Trenutni status ucitvanja pesme za odgovarajuci vizualni prikaz korisniku.
function waitingEvent() {
  trackLoading.classList.add("track-loading");
}

// Odredjivanje akcije koja treba da se preuzime kada je pesma spremna za repordukciju
audioTrack.addEventListener("canplay", (e) => {
  trackLoading.classList.remove("track-loading");
  audioTrack.removeEventListener("waiting", waitingEvent);
});

let firstPlay = true;

// Prikaz statusa ucitvanja, resetovanje vizuelnog prikaza vracanje na pocetnu vrednost ili pokretanje
// pesme u odredjenim uslovima
audioTrack.addEventListener("loadstart", (e) => {
  audioTrack.addEventListener("waiting", waitingEvent);
  currentTrackTimeBar.style.width = 0;
  if (!firstPlay) {
    audioTrack.play();
  }
  firstPlay = false;
});

let requestAnimationTimeArgument = performance.now();


// Ovaj deo koda koristimo za azuziranje vremenskih informacija i vizualnih elementa dok audio ide.
requestAnimationFrame(function currentTimeUpdater(
  requestAnimationTimeArgument
) {
  let currentTime = audioTrack.currentTime;

  let currentMinute = Math.trunc(currentTime / 60);
  let currentSeconds = Math.trunc(currentTime % 60);

  if (currentSeconds < 10) {
    currentSeconds = "0" + currentSeconds;
  }

  currentTrackTimeNumber.textContent = `${currentMinute}:${currentSeconds}`;

  currentTrackTimeBar.style.width =
    (currentTime / audioTrack.duration) * 100 + "%";

  requestAnimationFrame(currentTimeUpdater);
});

audioTrack.addEventListener("canplay", canPlayEvent);

audioTrack.addEventListener("durationchange", canPlayEvent);


// Ovaj deo koda je za ukupno trajanje audio fajla, canPlayEvent se poziva,
// kako bi se izracunalo i prikazalo ukupno trajanje minuti, sekunde.
function canPlayEvent(e) { 
  let totalTime = audioTrack.duration;

  let totalMinute = Math.trunc(totalTime / 60);
  let totalSeconds = Math.trunc(totalTime % 60);

  if (totalSeconds < 10) {
    totalSeconds = "0" + totalSeconds;
  }

  currentTrackDuration.textContent = `${totalMinute}:${totalSeconds}`;
}


// Ovaj deo koda se koristi kako bi korisnik mogao da upravlja vremenom
// video / audio zapisa. Na osnovu pozicije klika ili pomerom misa se 
// audio / video pravilno racuna i azuzira
trackProgressBar.addEventListener("pointerdown", (e) => {
  audioTrack.currentTime =
    ((e.offsetX / trackProgressBar.offsetWidth) * 100 * audioTrack.duration) /
    100;
  trackProgressBar.addEventListener("pointermove", trackProgressBarPointerMove);
  function trackProgressBarPointerMove(e) {
    audioTrack.currentTime =
      ((e.offsetX / trackProgressBar.offsetWidth) * 100 * audioTrack.duration) /
      100;
  }

  // Osigurava pracenje misa na traci, prekine kad korisnik pusti levi klik misa.
  document.addEventListener("pointerup", (e) => {
    trackProgressBar.removeEventListener(
      "pointermove",
      trackProgressBarPointerMove
    );
  });
});

// Upravljanje trake uspomoc kotacica misa (srednji klik, wheel na misu) od 5 sekundi, napred nazad.
trackProgressBar.addEventListener("wheel", (e) => {
  if (e.deltaY < 0) {
    audioTrack.currentTime += 5;
  }
  if (e.deltaY > 0) {
    audioTrack.currentTime -= 5;
  }
});

// Ovaj kod se koristi da bi se pokrenuo audio/video zapis takodje da bi se i pauzirao.
playButton.addEventListener("click", (e) => {
  if (audioTrack.paused) {
    audioTrack.play();
  } else {
    audioTrack.pause();
  }
});

// Ovaj deo koda omogucava korisnika da prelazi na prethodnu pesmu u listi 
// klikom na dugme previousButton.
previousButton.addEventListener("click", (e) => {
  let activeAudio = document.querySelector(".active");

  let trackItems = document.querySelectorAll(".track-item");

  let activeIndex =
    +activeAudio.dataset.index == 0
      ? trackItems.length
      : +activeAudio.dataset.index;

  let targetIndex = +activeIndex - 1;

  activeAudio.classList.remove("active");
  trackItems[targetIndex].classList.add("active");

  informationUpdate(targetIndex);
});

// Ovaj deo koda omogucava da korisnik prelazi na sledecu pesmu u listi klikom 
// na dugme nextButton
nextButton.addEventListener("click", (e) => {
  let activeAudio = document.querySelector(".active");

  let trackItems = document.querySelectorAll(".track-item");

  let activeIndex =
    +activeAudio.dataset.index == trackItems.length - 1
      ? -1
      : +activeAudio.dataset.index;

  let targetIndex = +activeIndex + 1;

  activeAudio.classList.remove("active");
  trackItems[targetIndex].classList.add("active");

  informationUpdate(targetIndex);
});

// Ovaj deo koda menja ikonu dugmeta, kada pesma pocne ikona se skriva
// a ikona za pauziranje postaje vidljiva.
audioTrack.addEventListener("play", (e) => {
  playButtonIcon.style.opacity = 0;
  pauseButtonIcon.style.opacity = 1;
  if (wasPlaying) {
    wasPlaying = false;
  }
});

// sprecavanje ugnjezdenih animacija
let firstTimeAnimation = true;
audioTrack.addEventListener("playing", (e) => {
  if (firstTimeAnimation) {
    blurElement.animate(
      { filter: "blur(30px)" },
      {
        duration: 5000,
        easing: "ease-in-out",
        direction: "alternate",
        iterations: Infinity
      }
    );
    firstTimeAnimation = false;
  }
});

// Isto kao predprosli, menja ikonu dugmeta. Sad samo kad se pauzira video/audio
// ikona za play postaje vidljiva.
audioTrack.addEventListener("pause", (e) => {
  playButtonIcon.style.opacity = 1;
  pauseButtonIcon.style.opacity = 0;

  blurElement.animate(
    { filter: "blur(10px)" },
    {
      duration: 1000,
      easing: "linear",
      fill: "forwards"
    }
  );

  firstTimeAnimation = true;
});

// Ovaj kod omogucava menjanje jacine zvuka sa pomocu tockica misa.
volumeWrapper.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    switch (true) {
      case e.deltaY < 0:
        audioTrack.volume = (audioTrack.volume += 0.05).toFixed(2);
        break;

      case e.deltaY > 0:
        audioTrack.volume = (audioTrack.volume -= 0.05).toFixed(2);
        break;
    }
    volumeNumberUpdate();
  },
  { passive: false }
);

// Azuziranje prikaza brojaca jacine zvuka
function volumeNumberUpdate() {
  volumeNumber.textContent = Math.trunc(audioTrack.volume * 100);
}
let wasPlaying;

// Ovaj deo koda se odnosi na događaj "volumechange" koji se pokrece kada se promeni 
// jacina zvuka audio elementa. 
audioTrack.addEventListener("volumechange", (e) => {
  let currentVolume = audioTrack.volume;
  switch (true) {
    case 0.66 < currentVolume:
      highVolumeSymbol.style.fill = "white";
      mediumVolumeSymbol.style.fill = "white";
      lowVolumeSymbol.style.fill = "white";
      wavesVolumeButton.style.opacity = 1;
      volumeCross.style.opacity = 0;
      if (wasPlaying) {
        audioTrack.play();
        wasPlaying = false;
      }
      break;

    case 0.33 < currentVolume && currentVolume < 0.66:
      highVolumeSymbol.style.fill = "#808080";
      mediumVolumeSymbol.style.fill = "white";
      lowVolumeSymbol.style.fill = "white";
      wavesVolumeButton.style.opacity = 1;
      volumeCross.style.opacity = 0;
      if (wasPlaying) {
        audioTrack.play();
        wasPlaying = false;
      }
      break;

    case 0 < currentVolume && currentVolume < 0.33:
      highVolumeSymbol.style.fill = "#808080";
      mediumVolumeSymbol.style.fill = "#808080";
      lowVolumeSymbol.style.fill = "white";
      wavesVolumeButton.style.opacity = 1;
      volumeCross.style.opacity = 0;
      if (wasPlaying) {
        audioTrack.play();
        wasPlaying = false;
      }
      break;

    case currentVolume == 0:
      wavesVolumeButton.style.opacity = 0;
      volumeCross.style.opacity = 1;
      if (!audioTrack.paused) {
        wasPlaying = true;
        audioTrack.pause();
      }
      break;
  }

  volumeNumberUpdate();
});

// Aktivira se na dogadjaj keydown koji se nalazi na tastaturi, 
// Pojacanje zvuka za 0.05 ili Smanjenje zvuka za 0.05 sa tasterima
// arrow up ili arrow down.
document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowDown":
      audioTrack.volume = (audioTrack.volume -= 0.05).toFixed(2);
      break;

    case "ArrowUp":
      audioTrack.volume = (audioTrack.volume += 0.05).toFixed(2);
      break;

    case "ArrowLeft":
      audioTrack.currentTime -= 5;
      break;

    case "ArrowRight":
      audioTrack.currentTime += 5;
      break;

    case "Space":
      if (audioTrack.paused) {
        audioTrack.play();
      } else {
        audioTrack.pause();
      }
      break;
  }

  // Ovaj deo koda se koristi za prikaz dugmeta za jacinu zvuka i brojaca 
  // jacine zvuka nakon pritiska tastera arrowup ili arrowdown 
  if (e.code == "ArrowDown" || e.code == "ArrowUp") {
    volumeButton.style.opacity = 0;
    volumeNumber.style.opacity = 1;

    document.addEventListener("keyup", (e) => {
      let volumeChangeAnimation = setTimeout(() => {
        volumeButton.style.opacity = 1;
        volumeNumber.style.opacity = 0;
      }, 600);

      document.addEventListener("keydown", (e) => {
        if (e.code == "ArrowDown" || e.code == "ArrowUp") {
          clearTimeout(volumeChangeAnimation);
        }
      });
    });
  }
});


// Ovaj deo koda omogucava da se prikaze veca verzija omota albuma
// zatim je uklanja tu vecu verziju kada se taster pusti.
coverImage.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  let coverImageBigSize = coverImage.cloneNode();
  coverImageBigSize.className = "cover-image-big-size";
  coverImageBigSize.removeAttribute("id");
  document.body.append(coverImageBigSize);

  document.addEventListener("pointerup", (e) => {
    coverImageBigSize.remove();
  });
});
