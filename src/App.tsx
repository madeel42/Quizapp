import React, { useState } from 'react'
import './App.css';
import { QuestionCards } from './Component/QuestionCards'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
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
  const [displaycard, setDisplaycard] = useState(false)
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      heading: {
        paddingTop: 26,
        marginBottom: 8
      },
      circularprogress: {
        marginTop: 40,
      },
      diplay: {
        display: 'block'
      },
      hide: {
        display: 'none'
      },
      score: {
        paddingTop: 46,
        fontWeight: 700,
        color: 'white',
        fontSize: 24,
      },
    }),
  );
  const startQiz = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestion = await fetchQuestions()
    setQuestions(newQuestion)
    setQuestions(newQuestion)
    setLoading(false)
    setDisplaycard(true)
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
  const classes = useStyles();
  console.log(userAnswer.length, TOTAL_QUESTON, 'userans', number !== TOTAL_QUESTON - 1)
  return (
    <div className="App">
      <h1 className={classes.heading}>Quiz app kjjk</h1>
      {gameOver || userAnswer.length === TOTAL_QUESTON ? <Button variant="contained" onClick={startQiz} color="primary">
        Start
      </Button> : null}
      {userAnswer.length === TOTAL_QUESTON ? <p className={classes.score}> Your Score: {score}</p> : ''}
      {loading && <div className={classes.circularprogress}> <CircularProgress color="secondary" /></div>}
      {userAnswer.length === TOTAL_QUESTON ? '' : <div className={displaycard ? classes.diplay : classes.hide}>
        <QuestionCards
          question={questions && questions[number] && questions[number].question}
          answers={questions && questions[number] && questions[number].answers}
          correctAnswer={questions && questions[number] && questions[number].correct_answer}
          callback={checkAnswer}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
        />
      </div>
      }
      {!gameOver && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTON - 1 && <Button variant="contained" onClick={nextQuestion} color="secondary">
        Next
      </Button>}
    </div>
  );
}

export default App;
