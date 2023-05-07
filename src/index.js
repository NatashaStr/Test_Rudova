import { quizData } from "./data.js";

const slideTitle = document.querySelector('.form__title');
const slideStep = document.querySelector('.step');
const answersListContainer = document.querySelector('.form__container');

let currentQuizStep = 0;

loadQuiz();

function loadQuiz() {

  slideTitle.textContent = quizData[currentQuizStep].title;
  slideStep.textContent = currentQuizStep + 1;

  quizData[currentQuizStep].text.forEach((el, index) => createRadioItem(el, index));
}

function createRadioItem(item, id) {
  const radioItemTemplate = document.querySelector('#radioItem').content.cloneNode(true);
  const radioItem = radioItemTemplate.querySelector('.answer');
  const label = radioItemTemplate.querySelector('.form__label');

  radioItem.id = `radio-${id}`;
  label.setAttribute('for',`radio-${id}`);
  label.textContent = item;

  answersListContainer.append(radioItemTemplate);
}
