let answers = {};

function saveAnswers(evt) {
  const checkedAnswersRadio = document.querySelector('input:checked');
  const checkedAnswersSelect = document.querySelector('select');
  const currentStep = document.querySelector('.step').textContent;
  const currentAnswerKey = `step${currentStep}`;

  if (checkedAnswersRadio) {
    answers[currentAnswerKey] = checkedAnswersRadio.value;
    console.log(answers);
  }

  if (checkedAnswersSelect) {
    answers[currentAnswerKey] = checkedAnswersSelect.value;
    console.log(answers);
  }
}

function sendQuiz() {
  const name = document.querySelector('input[type="text"]').value;
  const phone = document.querySelector('input[type="number"]').value;
  const email = document.querySelector('input[type="email"]').value;
  let userAnswers = '';
  for (const element in answers) {
    userAnswers += `${element}: ${answers[element]}`
  }

  const message = `Имя: ${name}, телефон: ${phone}, почта: ${email}, ответы:
    ${userAnswers}`;
    fetch(`https://api.telegram.org/bot5228283336:AAGbI9fRLsVUgPqJISoJYzJ3V5hIezepyDw/sendMessage?chat_id=-1001537413319&text=${message}`)
} 

export { saveAnswers, sendQuiz };