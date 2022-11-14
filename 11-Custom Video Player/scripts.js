//Get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const range = player.querySelectorAll(".player__slider");
const skip = player.querySelectorAll("[data-skip]");
//Build function
function togglePlay() {
  video[video.paused ? "play" : "pause"]();
}
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}
function toggleSkip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRange() {
  // console.log(this.name);
  // console.log(this.value);
  video[this.name] = this.value;
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
//event listener
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);
skip.forEach((button) => button.addEventListener("click", toggleSkip));
range.forEach((range) => range.addEventListener("change", handleRange));
range.forEach((range) => range.addEventListener("mousemove", handleRange));
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
