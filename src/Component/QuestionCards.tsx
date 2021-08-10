import React from 'react'
import { AnswerObject } from '../App'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
type Props = {
    question: string,
    answers: string[],
    correctAnswer: string,
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined

}
const QuestionCards: React.FC<Props> = ({ question, answers, callback, userAnswer }) => {
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            width: 375,
            margin: 'auto',
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        optnbtn: {
            marginBottom: 10,
        }
    });
    const classes = useStyles();
    return (
        // <div >
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <p dangerouslySetInnerHTML={{ __html: question }} />
                {answers && answers.map((answer) => {
                    return <div key={answer} className={classes.optnbtn}> <button disabled={userAnswer ? true : false} onClick={callback} value={answer}><span dangerouslySetInnerHTML={{ __html: answer }}></span></button></div>
                })}
            </CardContent>
        </Card>
        // </div>

    )
}

export { QuestionCards }
