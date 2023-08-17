import { quizData } from "./data.js";
import { saveAnswers, sendQuiz } from "./answers.js";

const slideTitle = document.querySelector('.form__title');
const slideStep = document.querySelector('.step');
const answersListContainer = document.querySelector('.form__container');
const buttonWrapper = document.querySelector('.button__wrapper');
const prevBtn = createElement('button', 'form__button form__button--prev', 'Назад');
const nextBtn = createElement('button', 'form__button form__button--next', 'Вперед');
const sendBtn = createElement('button', 'form__button--last', 'Получить подборку');
document.querySelector('.form__steps-amount').textContent = quizData.length;

let currentQuizStep = 0;

loadStep(currentQuizStep);

function loadStep(step) {
  switch (quizData[step].type) {
    case 'radio':
      checkColumns(quizData[step]);
      renderRadioItem(quizData[step]);
      break;
    case 'select':
      checkColumns(quizData[step]);
      renderSelectItem(quizData[step]);
      break;
    case 'end':
      checkColumns(quizData[step]);
      renderFinishItem(quizData[step]);
  }

  if (step === 0) {
    buttonWrapper.append(nextBtn);
  } else if (step === quizData.length) {
    buttonWrapper.append(sendBtn);
  } else {
    buttonWrapper.append(prevBtn);
    buttonWrapper.append(nextBtn);
  }
}

nextBtn.addEventListener('click', clickNext);
prevBtn.addEventListener('click', clickBack)

function clickNext() {
  saveAnswers();
  nextBtn.disabled = true;
  currentQuizStep++;
  loadStep(currentQuizStep);
  if (currentQuizStep === quizData.length - 1) {
    buttonWrapper.remove();
  };
};

function clickBack() {
  currentQuizStep--;
  loadStep(currentQuizStep);
  if (currentQuizStep === 0) {
    prevBtn.remove();
  }
};

function renderRadioItem(item) {
  answersListContainer.textContent = '';
  slideTitle.textContent = item.title;
  slideStep.textContent = item.step + 1;

  item.text.forEach((el, id) => {
    const li = createElement('li', 'form__item');
    const radioItem = createElement('input', 'form__input answer', '', 'radio');
    const label = createElement('label', 'form__label');
    const span = createElement('span', 'form__control-mark')
    radioItem.id = `radio-${id}`;
    radioItem.name = 'answer';
    radioItem.value = el;
    label.setAttribute('for', `radio-${id}`);
    label.textContent = el;
    li.append(radioItem);
    li.append(label);
    li.append(span);

    answersListContainer.append(li);
  });
}

function renderSelectItem(item) {
  answersListContainer.textContent = '';
  slideTitle.textContent = item.title;
  slideStep.textContent = item.step + 1;

  const selectList = createElement('select', 'select__list');
  answersListContainer.append(selectList);
  item.text.forEach((el) => {
    const option = createElement('option', 'select__item', el);
    option.value = el;
    selectList.append(option);
    answersListContainer.append(selectList);
  });
}

function renderFinishItem(item) {
  answersListContainer.textContent = '';
  slideTitle.textContent = item.title;
  slideStep.textContent = item.step + 1;

  const wrapper = createElement('div', 'form__container--last');
  wrapper.append(createElement('input', 'form__input--last', '','text', 'Как вас зовут?', 'true'));
  wrapper.append(createElement('input', 'form__input--last', '','number', 'Номер телефона', 'true'));
  wrapper.append(createElement('input', 'form__input--last', '','email', 'E-mail', 'true'));
  wrapper.append(sendBtn);
  const copyright = createElement('p', 'form__copyright', 'Нажимая на кнопку, вы даете согласие на обработку своих');
  copyright.append(createElement('span', '', 'Персональных данных'));
  wrapper.append(copyright);
  answersListContainer.append(wrapper);
}

function createElement(tag, classes, text, type, placeholder, isRequired) {
  const el = document.createElement(tag);
  el.className = classes;
  text ? el.textContent = text : '';
  type ? el.type = type : '';
  placeholder ? el.placeholder = placeholder : '';
  isRequired ? el.required = isRequired : '';
  return el;
}

function checkColumns(item) {
  answersListContainer.classList.remove('form__list--2columns');
  if (item.text.length > 3 && item.type === 'radio') {
    answersListContainer.classList.add('form__list--2columns');
  }
}

answersListContainer.addEventListener('click', (evt) => {
  if (evt.target.type === 'radio' || evt.target.type === 'select-one') {
    nextBtn.disabled = false;
  }
});

sendBtn.addEventListener('click', sendQuiz);



