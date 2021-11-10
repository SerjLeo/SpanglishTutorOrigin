import {QuestionVariant} from "../types";

export const questions: string[] = [
    'Какой язык Вы хотели бы изучать?',
    'Каков Ваш уровень владения иностранным языком?',
    'Ваша возрастная категория?'
]

export const variants: Array<Array<QuestionVariant>> = [
    [
        {
            id:0,
            text: 'Испанский',
            img: 'anws_1_1'
        },
        {
            id:1,
            text: 'Английский',
            img: 'anws_1_2'
        },
        {
            id:2,
            text: 'Оба ;)!',
            img: 'anws_1_3'
        },
    ],
    [
        {
            id:1,
            text: 'Начальный',
            img: 'anws_2_1'
        },
        {
            id:2,
            text: 'Средний',
            img: 'anws_2_2'
        },
        {
            id:3,
            text: 'Продвинутый',
            img: 'anws_2_3'
        },
    ],
    [
        {
            id:1,
            text: 'Ребёнок (6-18 лет)',
            img: 'anws_3_1'
        },
        {
            id:2,
            text: 'Молодой (18-30 лет)',
            img: 'anws_3_2'
        },
        {
            id:3,
            text: 'Взрослый (30-70 лет)',
            img: 'anws_3_3'
        },
    ]
]
