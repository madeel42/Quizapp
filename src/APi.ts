import { suffleArray } from './Utils'
export type Questions = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}
export type QuestionState = Questions & {
    answers: string[],
}

export const fetchQuestions = async () => {
    const endPoint = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple'
    const questions = await (await fetch(endPoint)).json();

    return questions.results.map((question: Questions) => {
        return {
            ...question,
            answers: suffleArray([...question.incorrect_answers, question.correct_answer])
        }
    })
}