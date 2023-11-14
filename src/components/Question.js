import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timerId = setTimeout(() => {
      // Decrease timeRemaining by 1 every second
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timerId);
  }, [timeRemaining]); // Adding timeRemaining as a dependency

  useEffect(() => {
    // When timeRemaining hits 0
    if (timeRemaining === 0) {
      // Reset timeRemaining to 10 seconds
      setTimeRemaining(10);
      // Trigger onAnswered callback with value false
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]); // Adding timeRemaining and onAnswered as dependencies

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
