import { loadMenu } from './helper function/loadContent.js';

const sliderImages = document.querySelectorAll('.slider__img');
const slider = document.querySelector('.slider');
const checkbox = document.getElementById('checkbox');

let sliderCount = 0;
let sliderWidth;
let interval;

function nextSlide() {
  sliderCount++;

  if (sliderCount >= sliderImages.length) {
    sliderCount = 0;
  }
  autoRollSlider();
}

function autoRollSlider() {
  sliderWidth = window.innerWidth;
  slider.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

export function rollSlider() {
  if (!checkbox.checked) {
    sliderWidth = window.innerWidth;
    let slide = localStorage.getItem('slide');

    slider.style.transform = `translateX(${-slide * sliderWidth}px)`;
  }
}

checkbox.addEventListener('click', () => {
  if (checkbox.checked) {
    interval = setInterval(() => {
      nextSlide();
    }, 10000);
  } else {
    clearInterval(interval);
    loadMenu();
  }
});

window.addEventListener('resize', () => {
  if (!checkbox.checked) {
    rollSlider();
  } else {
    autoRollSlider();
  }
});
