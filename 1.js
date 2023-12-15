
//creates question, answers, and the correct answers
const questions = [
    {
        question: "What is the name of the high school in '10 Things I Hate About You'?",
        answers: ["Padua High School", "Rydell High School", "Hollywood High School", "West Beverly High School"],
        correctAnswer: "Padua High School"
    },
    {
        question: "Who plays the character Kat Stratford in the movie?",
        answers: ["Julia Stiles", "Amanda Bynes", "Lindsay Lohan", "Reese Witherspoon"],
        correctAnswer: "Julia Stiles"
    },
    {
        question: "Where does the movie take place?",
        answers: ["San Jose", "Seattle", "New York", "Santa Cruz"],
        correctAnswer:"Seattle"
    },
    {
        question: "What is Bianca and Kat's last name?",
        answers: ["White", "Anderson", "Smith", "Stratford"],
        correctAnswer:"Stratford"
    },
    {
        question: "What sport does Kat play?",
        answers: ["basketball", "soccer", "volleyball", "football"],
        correctAnswer:"soccer"
    },
    {
        question: "How much was Patrick paid by Joey to take Kat to prom?",
        answers: ["$300", "$100", "$255", "$200"],
        correctAnswer:"$300"
    },
    {
        question: "Who does Bianca originally want to go out with?",
        answers: ["Cameron", "Patrick", "Joey", "Micheal"],
        correctAnswer:"Joey"
    },
 
    {
        question: "What language did Cameron pretend to know so he could tutor Bianca and get to know her?",
        answers: ["Spanish","German","Mandarin", "French"],
        correctAnswer:"French"
    },
    {
        question: "What do Kat and Patrick do after she gets him out of detention",
        answers: ["swimming", "paint-balling", "mini-golfing", "ice-skating"],
        correctAnswer: "paint-balling"
    },
    {
        question: "What is Mr. Stratford's job?",
        answers: ["mechanic", "peditrician", "OB/GYN", "podiatrist"],
        correctAnswer:"OB/GYN"
    },
];


let currentQuestionIndex = 0;
let score = 0;

document.getElementById('click').addEventListener('click', startQuiz);

function startQuiz() {
    //make the startbutton work by clicking
    const startButton = document.getElementById("click");
    //hide the start button after clicked
    startButton.style.display = "none"; 
    //Show the first question after clicking the start button
    showQuestion(); 
}

function showQuestion() {
    //gets question-container from HTML and assigns it into question container
    const questionContainer = document.getElementById("question-container");
    //gets current question from array (questions) based on currentQuestionIndex
    const currentQuestion = questions[currentQuestionIndex];

    //if statement to check if there is a current question, if there is then it will display the question and answer buttons
    if (currentQuestion) {
         // Create two rows of two buttons each
         const buttonRows = Array.from({ length: 2 }, (_, rowIndex) => {
            return `<div class="button-row">
                        ${currentQuestion.answers.slice(rowIndex * 2, (rowIndex + 1) * 2).map(answer => `<button onclick="checkAnswer(this, '${answer}')">${answer}</button>`).join('')}
                    </div>`;
        }).join('');

        //p elements shows the question text, div holds all of the answer buttons
        //map function generates button for each answer
        //onclick calls the checkanswer button
        //this is referring to the button, $(answer) enters the answer text into the button
        questionContainer.innerHTML = `
            <p>${currentQuestion.question}</p>
            <div class="answersContainer">
                <div class="answer-buttons">
                    ${currentQuestion.answers.map(answer => `<button onclick="checkAnswer(this, '${answer}')">${answer}</button>`).join('')}
                </div>
            </div>
        `;
        //insures that container is visible
        questionContainer.style.display = "block";
        //calls result at the end of the quiz to show how many you got right
    } else {
        showResult();
    }
}

function checkAnswer(button, selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    
    //If the answer is correct, add 1 to the score
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        button.classList.add('correct');
        //mark incorrect if clicked on wroung button
    } else {
        button.classList.add('incorrect');
    }

    // Disable all buttons after an answer is selected
    const buttons = document.querySelectorAll('.answer-buttons button');
    buttons.forEach(btn => btn.disabled = true);

    currentQuestionIndex++;
    setTimeout(showQuestion, 1000); // Show the next question after a delay
}

function showResult() {
    //gets the HTML element with the id question-container and assigns it into question container
    const questionContainer = document.getElementById("question-container");
    //calculates percentage
    const percentage = Math.round((score / questions.length) * 100);
    //writes out the score in percentage
    questionContainer.innerHTML = `<p>Your score: ${percentage}%</p>`;
}