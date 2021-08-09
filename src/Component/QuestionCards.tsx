import React from 'react'
import {AnswerObject} from '../App'
type Props = {
    question: string,
    answers: string[],
    correctAnswer: string,
    callback:  (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined

}
const QuestionCards: React.FC<Props> = ({ question, answers,callback,userAnswer }) => {
    return (
        <div >
            <p dangerouslySetInnerHTML={{ __html: question }} />
            {answers && answers.map((answer) => {
                return <div key={answer}> <button disabled={userAnswer ? true : false} onClick={callback} value={answer}><span dangerouslySetInnerHTML={{ __html: answer }}></span></button></div>
            })}
        </div>
    )
}

export { QuestionCards }
