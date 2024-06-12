/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./style.css";

const questions = [
  {
    question: "¿Qué lenguaje se ejecuta en un navegador web?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: "d",
  },
  {
    question: "¿De que color son las naranjas?",
    answers: ["Armario", "Naranja", "Verde", "Rojo"],
    correct: "b",
  },
  {
    question: "¿Cuál es la capital de Colombia?",
    answers: ["Bogotá", "América", "Oceanía", "Medellín"],
    correct: "a",
  },
];

const messages = [
  "Por favor, selecciona una respuesta",
  "¡Correcto!",
  "Respuesta incorrecta",
];
const types = ["error", "success", "warning"];

function createNotification(message, type) {
  let notf = document.createElement("div");
  notf.classList.add("toast", type);
  notf.textContent = message;
  toasts.appendChild(notf);

  setTimeout(() => {
    toasts.removeChild(notf);
  }, 1800);
}

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === "") {
      createNotification(messages[0], types[0]);
      return;
    }

    const correctAnswer = questions[currentQuestion].correct;
    setScore(
      (prevScore) => prevScore + (selectedAnswer === correctAnswer ? 1 : 0)
    );

    if (currentQuestion === questions.length - 1) {
      createNotification(
        `¡Quiz completado! Tu puntuación es ${
          score + (selectedAnswer === correctAnswer ? 1 : 0)
        } de ${questions.length}`,
        types[1]
      );
      // Ocultar el botón de enviar y mostrar el botón de recargar
      document.getElementById("submitBtn").style.display = "none";
      const reloadBtn = document.createElement("button");
      reloadBtn.textContent = "Reload";
      reloadBtn.onclick = () => window.location.reload();
      document.getElementById("quiz-container").appendChild(reloadBtn);
    } else {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
      setSelectedAnswer("");
    }
  };

  return (
    <div id="quiz-container" className="quiz-container">
      <h1 id="question">{questions[currentQuestion].question}</h1>
      <div className="answers">
        {questions[currentQuestion].answers.map((answer, index) => (
          <label key={index}>
            <input
              type="radio"
              name="answer"
              value={String.fromCharCode(97 + index)}
              checked={selectedAnswer === String.fromCharCode(97 + index)}
              onChange={handleAnswerChange}
            />
            {answer}
          </label>
        ))}
      </div>
      <button id="submitBtn" onClick={handleSubmit}>
        Enviar
      </button>
      <div id="toasts"></div>
    </div>
  );
};

export default Quiz;
