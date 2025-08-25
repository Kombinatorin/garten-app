// Simple bubble "pop" animation
document.addEventListener("click", function(e) {
  if(e.target.tagName === "BUTTON") {
    e.target.style.transform = "scale(0.8)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 200);
  }
});

