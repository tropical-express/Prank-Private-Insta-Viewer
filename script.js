console.log("Instaviewer loaded");

/* ========= ELEMENTS ========= */
const scanBtn = document.getElementById("scanBtn");
const usernameInput = document.getElementById("usernameInput");
const progress = document.getElementById("progress");
const meme = document.getElementById("meme");
const memeImg = document.getElementById("memeImg");
const error = document.getElementById("error");
const banner = document.getElementById("rarityBanner");

/* ========= STATE ========= */
let scanning = false;

/* ========= SOUNDS ========= */
const sounds = {
  normal: new Audio("sounds/full-golden-freddy-scream.mp3"),
  rare: new Audio("sounds/loud-version_7n1qEm2.mp3"),
  legendary: new Audio("sounds/minecraft-266.mp3")
};

/* ========= MEME ARRAYS ========= */
// NORMAL (most common)
const normalMemes = [
  "prank-images/maxresdefault.jpg",
  "prank-images/y_tho_meme.png",
  "prank-images/spongebob_meme_64.webp",
  "prank-images/02885f46b2ce57a092572ca322f34097.jpg",
  "prank-images/909e2b65e3f84dd296cec52571bdf430.jpg"
];

// RARE (~25%)
const rareMemes = [
  "prank-images/image_2025-12-21_131437740.png"
];

// ULTRA RARE (~5%)
const ultraMemes = [
  "prank-images/pitafacedbaby.jpg",
  "prank-images/j8uyn8kkrhz41.webp"
];

// LEGENDARY (~1%)
const legendaryMemes = [
  "prank-images/b28f954f7202ab88e015638e4bb9366200e0a8cd.png",
  "prank-images/6106296.png"
];

/* ========= PICK MEME ========= */
function getMeme() {
  const roll = Math.random();

  if (roll < 0.01) {
    return {src: legendaryMemes[Math.floor(Math.random()*legendaryMemes.length)], rarity:"legendary"};
  }
  if (roll < 0.06) {
    return {src: ultraMemes[Math.floor(Math.random()*ultraMemes.length)], rarity:"ultra"};
  }
  if (roll < 0.31) {
    return {src: rareMemes[Math.floor(Math.random()*rareMemes.length)], rarity:"rare"};
  }
  return {src: normalMemes[Math.floor(Math.random()*normalMemes.length)], rarity:"normal"};
}

/* ========= SHOW MEME ========= */
function showMeme(result){
  memeImg.src = result.src;
  meme.style.display = "block";

  banner.className = "banner " + result.rarity;
  banner.textContent = result.rarity.toUpperCase() + " MEME";
  banner.style.display = "block";

  if (sounds[result.rarity]) {
    sounds[result.rarity].currentTime = 0;
    sounds[result.rarity].play().catch(()=>{});
  }
}

/* ========= RUN SCAN ========= */
scanBtn.onclick = () => {
  if (scanning) return;
  scanning = true;

  const username = usernameInput.value.trim();
  if (!username) {
    error.style.display = "block";
    scanning = false;
    return;
  }
  error.style.display = "none";

  meme.style.display = "none";
  banner.style.display = "none";

  let p = 0;
  progress.textContent = "Scanning… 0%";

  const loop = setInterval(() => {
    p += Math.floor(Math.random()*12)+8;

    if (p >= 100) {
      clearInterval(loop);
      progress.textContent = "Results ready…";

      setTimeout(() => {
        const result = getMeme();
        showMeme(result);

        progress.textContent = "Scan complete";
        usernameInput.value = "";
        usernameInput.placeholder = "Scan another username…";
        scanning = false;
      }, 800);
    } else {
      progress.textContent = "Scanning… " + p + "%";
    }
  }, 300);
};
