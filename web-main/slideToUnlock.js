var slider = document.getElementById('slider');
var dragger = document.getElementById('dragger');
var text = document.getElementById('text');
var isDragging = false;
var startPosition = 0;
var endPosition = 0;
var sliderContainer = document.getElementById('sliderContainer');
var maxOffset = sliderContainer.offsetWidth - dragger.offsetWidth;

dragger.addEventListener('mousedown', startSlide);
dragger.addEventListener('touchstart', startSlide);

document.addEventListener('mousemove', moveSlide);
document.addEventListener('touchmove', moveSlide);

document.addEventListener('mouseup', endSlide);
document.addEventListener('touchend', endSlide);

function startSlide(event) {
  isDragging = true;
  startPosition = event.clientX || event.touches[0].clientX;
  event.preventDefault();
}

function moveSlide(event) {
  if (isDragging) {
    var currentPosition = event.clientX || event.touches[0].clientX;
    var distance = currentPosition - startPosition;

    var offset = Math.max(0, Math.min(distance, maxOffset));

    dragger.style.left = offset + 'px';
    slider.style.width = offset + dragger.offsetWidth / 2 + 'px';

    event.preventDefault();
  }
}

function endSlide(event) {
  if (isDragging) {
    endPosition = event.clientX || event.changedTouches[0].clientX;
    var distance = endPosition - startPosition;

    var threshold = sliderContainer.offsetWidth / 2;

    if (distance >= threshold) {
      // Navigate to the next page
      window.location.href = 'map.html';
    } else {
      // Reset action
      dragger.style.left = '0';
      slider.style.width = '0';
      text.textContent = 'Slide to Unlock';
      slider.style.backgroundColor = '#e0e0e0';
    }

    isDragging = false;
    event.preventDefault();
  }
}
