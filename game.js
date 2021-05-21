//Seems like an alternative to "getElementId" .. a way to target the classes/IDs from the HTML
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText= document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
//Allows you to make the score start at 0 and the questionsn start at 0
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'How many refugees or forcibly displaced people are there in the world?',
        choice1: '79.5 Million',
        choice2: '40 Million',
        choice3: '8.5 Million',
        choice4: '525,000',
        answer: 1,
    },
    {
        question: 'Of the following countries, which has the highest percentage of recent refugees in Colorado?',
        choice1: 'Democratic Republic of Congo',
        choice2: 'Afghanistan',
        choice3: 'Mexico',
        choice4: 'Vietnam',
        answer: 2,
    },
    {
        question: 'What is the definition of a refugee?',
        choice1: 'A person with a well-founded fear of persecution for reasons of race, religion, nationality, political opinion or membership in a particular social group.',
        choice2: 'Someone who has been forced to flee his or her country because of persecution, war or violence.',
        choice3: 'A person who is granted legal residency in the United States',
        choice4: 'All of the Above',
        answer: 4,
    },

    {
        question: 'What free services does Emily Griffith Technical College offer Refugees?',
        choice1: 'Scholarship Support',
        choice2: 'Free Tutoring',
        choice3: 'Free English Classes',
        choice4: 'All of the Above',
        answer: 4,
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    //...= spread operator; gets all of the values from questions
    getNewQuestion()
}

//create getNewQuestions function

//arrow function:
getNewQuestion = () => {
if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
//local storage saves to local storage/stores locally
    return window.location.assign('end.html')
    // if not does not equal - or questions counter is NOT greater than 
    // Max_Questions, return this/ go to this end.html page    
}

questionCounter++
progressText.innerText =  `Question ${questionCounter} of ${MAX_QUESTIONS}`
//says 1/5, 2/5 as you progress through quiz, ++ means it will increase by one every time
progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
//going to calculate what question we are on and correspond that with a progress
//percentage

const questionsIndex = Math.floor(Math.random()* availableQuestions.length)
//will calculate the value of the question index
currentQuestion = availableQuestions[questionsIndex]
    //this will keep track of what question the user is on
question.innerText = currentQuestion.question
//alert documentt to know which question to ask

choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

availableQuestions.splice(questionsIndex,1)
//splice will remove the questions as you are going through them?
acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        //ternary operator/conditional that is saying if the answer is correct then show the green correct button from the html/css, 
        // if incorrect show the red incorrect button  from the html/css

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
            //if you get the question correct, you arre going to increase your score by 100 points
        }
        selectedChoice.parentElement.classList.add(classToApply)
        //we can add it when we get it right

        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
