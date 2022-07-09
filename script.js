const startBtn = document.querySelector("#start-btn");
const questionContainer = document.querySelector("#question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  console.log("Started");
  startBtn.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  //while answerButtonsElement has any firstChild or any child at all
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question:
      "Identify the noun in the following sentences:  'I live in Amsterdam.'",
    answers: [
      { text: "In", correct: false },
      { text: "Live", correct: false },
      { text: "Amsterdam", correct: true },
      { text: "I", correct: false },
    ],
  },
  {
    question:
      "Identify the noun in the following sentences:  'I visited the Eiffel Tower in Paris.'",
    answers: [
      { text: "Eiffel Tower and Paris", correct: true },
      { text: "The", correct: false },
      { text: "Paris", correct: false },
      { text: "Eiffel Tower", correct: false },
    ],
  },
  {
    question:
      "Identify the noun in the following sentences:  'Bhutan is a beautiful country.'",
    answers: [
      { text: "A", correct: false },
      { text: "Country", correct: false },
      { text: "Beautiful", correct: false },
      { text: "Bhutan", correct: true },
    ],
  },
  {
    question:
      "Identify the noun in the following sentences:  'Summer is very hot.'",
    answers: [
      { text: "Summer", correct: true },
      { text: "Very", correct: false },
      { text: "Hot", correct: false },
      { text: "Is", correct: false },
    ],
  },
  {
    question:
      "Identify the noun in the following sentences:  'The moon looks so beautiful.'",
    answers: [
      { text: "Looks", correct: false },
      { text: "Moon", correct: true },
      { text: "The", correct: false },
      { text: "Beautiful", correct: false },
    ],
  },
];
