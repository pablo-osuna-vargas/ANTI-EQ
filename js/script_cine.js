let scrolled = false;

window.addEventListener("wheel", function (e) {
  if (!scrolled) {
    scrolled = true;
    window.location.href = "../P N L (prototipo)/fin.html";
  }
});
