import React, { useState } from 'react'
import './App.css';
import { QuestionCards } from './Component/QuestionCards'
import { fetchQuestions, QuestionState } from './APi'
//'https://opentdb.com/api.php?amount=10&category=18&type=multiple api
let TOTAL_QUESTON = 10
export type AnswerObject = {
  question: string,
  correct: boolean,
  answer: string,
  correctAnswer: string,
}
function App() {
  const [loading, setLoading] = useState(false)
  const [gameOver, setGameOver] = useState(true)
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])

  const startQiz = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestion = await fetchQuestions()
    setQuestions(newQuestion)
    setQuestions(newQuestion)
    setLoading(false)
    setUserAnswer([]);
    setScore(0);
    setNumber(0)

  }
  const nextQuestion = () => {
    let nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTON) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }
  console.log(questions, 'questions');
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value)
    let answer = e.currentTarget.value;
    let correct = answer === questions[number].correct_answer;
    if (correct) {
      setScore(pre => pre + 1)
    }
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer
    }
    setUserAnswer(pre => [...pre, answerObject])
  }
  console.log(userAnswer.length, TOTAL_QUESTON, 'userans', number !== TOTAL_QUESTON - 1)
  return (
    <div className="App">
      <h1>Quiz app</h1>
      {gameOver || userAnswer.length === TOTAL_QUESTON ? <button onClick={startQiz} >start</button> : null}
      <p>Score :{score}</p>
      {loading && <p>Loading...</p>}
      <QuestionCards
        question={questions && questions[number] && questions[number].question}
        answers={questions && questions[number] && questions[number].answers}
        correctAnswer={questions && questions[number] && questions[number].correct_answer}
        callback={checkAnswer}
        userAnswer={userAnswer ? userAnswer[number] : undefined}
      />
      {!gameOver && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTON - 1 && <button onClick={nextQuestion}>Next</button>}
    </div>
  );
}

export default App;
