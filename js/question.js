// PROYECTO QUIZZ UTILIZANDO LA API DE OPENTDB Y FIRESTORE

// -------------- VARIABLES --------------
let score = 0;
let addId = 1;
const containerHTML = document.querySelector('.flex__container');

// -------------- INICIALIZAR FIREBASE Y FIRESTORE--------------
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js';
import {
    getFirestore,
    addDoc,
    collection,
    getDoc,
    getDocs,
    query,
    where,
} from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js';

const firebaseConfig = {
    apiKey: 'AIzaSyBZx0Cu8tns0mr1lXagWCz1OgRU9nTaxAk',
    authDomain: 'quiz-alicia-ricardo.firebaseapp.com',
    projectId: 'quiz-alicia-ricardo',
    storageBucket: 'quiz-alicia-ricardo.appspot.com',
    messagingSenderId: '1020175504483',
    appId: '1:1020175504483:web:342d72c8b2ed6df4205456',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// -------------- FUNCIÓN ASÍNCRONA PARA OBTENER DATOS DE LA API --------------
const getQuestions = async () => {
    try {
        const response = await fetch(
            'https://opentdb.com/api.php?amount=10&type=multiple'
        );
        const data = await response.json();
        const finalData = data.results.map(element => {
            const arr = [];
            arr.push(element.correct_answer);
            const answersArray = element.incorrect_answers.concat(arr);
            const answerOne = {
                answer: answersArray[0],
                value: false,
            };
            const answerTwo = {
                answer: answersArray[1],
                value: false,
            };
            const answerThree = {
                answer: answersArray[2],
                value: false,
            };
            const answerFour = {
                answer: answersArray[3],
                value: true,
            };
            const arrRespuestasChecked = [];
            arrRespuestasChecked.push(
                answerOne,
                answerTwo,
                answerThree,
                answerFour
            );
            return {
                question: element.question,
                answers: arrRespuestasChecked,
            };
        });
        return finalData;
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
};
getQuestions().then(finalObject => {
    printQA(finalObject);
    verifyAnswer(finalObject);
});

// -------------- FUNCIÓN QUE DESORDENA EL ARRAY DE RESPUESTAS --------------
const sortArray = finalObject => {
    finalObject.forEach(element => {
        return element.answers.sort(() => Math.random() - 0.5);
    });
};

// -------------- FUNCIÓN QUE IMPRIME LAS PREGUNTAS Y RESPUESTAS EN EL HTML --------------
const printQA = finalObject => {
    sortArray(finalObject);
    finalObject.forEach((element, i) => {
        const html = `
    <div id='question${i + 1}'>
        <h2 class="question" id="question">${element.question}</h2>
        <section class="grid__container">
            <div class="answer__container answer__container--green" id="${
                element.answers[0].value ? 'true' : 'false'
            }">
                <p class="answer">${element.answers[0].answer}</p>
            </div>
            <div class="answer__container answer__container--red" id="${
                element.answers[1].value ? 'true' : 'false'
            }">
                <p class="answer">${element.answers[1].answer}</p>
            </div>
            <div class="answer__container answer__container--yellow" id="${
                element.answers[2].value ? 'true' : 'false'
            }">
                <p class="answer">${element.answers[2].answer}</p>
            </div>
            <div class="answer__container answer__container--blue" id="${
                element.answers[3].value ? 'true' : 'false'
            }">
                <p class="answer">${element.answers[3].answer}</p>
            </div>
    </div>
    `;
        containerHTML.insertAdjacentHTML('beforeend', html);
    });
    document.querySelector('#question1').style.display = 'block';
};

// -------------- FUNCIÓN QUE VALIDA LAS RESPUESTAS--------------
const verifyAnswer = () => {
    const answerContainer = document.querySelectorAll('.answer__container');
    answerContainer.forEach(div => {
        div.addEventListener('click', e => {
            e.preventDefault();
            if (addId > 9) {
                if (div.id === 'true') {
                    score += 1;
                    swal({
                        title: 'Right answer!',
                        text: 'You have finished the quiz',
                        icon: 'success',
                        button: 'Finish quiz',
                    }).then(() => {
                        containerHTML.innerHTML = null;
                        printResults();
                    });
                } else {
                    swal({
                        title: 'Wrong answer!',
                        text: 'You have finished the quiz',
                        icon: 'error',
                        button: 'Finish quiz',
                    }).then(value => {
                        containerHTML.innerHTML = null;
                        printResults();
                    });
                }
            } else {
                if (div.id === 'true') {
                    score += 1;
                    addId += 1;
                    swal({
                        title: 'Right answer!',
                        text: 'You are awesome!',
                        icon: 'success',
                        button: 'Next question',
                    }).then(() => {
                        document.querySelector(
                            `#question${addId}`
                        ).style.display = 'block';
                        document.querySelector(
                            `#question${addId - 1}`
                        ).style.display = 'none';
                    });
                } else {
                    addId += 1;
                    swal({
                        title: 'Wrong answer!',
                        text: 'Better luck on the next question',
                        icon: 'error',
                        button: 'Next question',
                    }).then(() => {
                        document.querySelector(
                            `#question${addId}`
                        ).style.display = 'block';
                        document.querySelector(
                            `#question${addId - 1}`
                        ).style.display = 'none';
                    });
                }
            }
            document.querySelector('#progressCount').textContent = addId;
            document.querySelector('#scoreCount').textContent = score;
        });
    });
};

// -------------- FUNCIÓN QUE IMPRIME EL RESULTADO FINAL --------------

const printResults = () => {
    const htmlFinal = `
    <section class="final__results">
        <h2 class="final__title">Final Score:</h2>
        <p class="final__score">${score}</p>
        <i
            class="em em-tada"
            aria-role="presentation"
            aria-label="PARTY POPPER"
        ></i><br>
        <input type="text" class="name__input" placeholder="Your name"><br>
        <input type="button" value="Submit" class="name__submit">
    </section>
    `;
    containerHTML.insertAdjacentHTML('beforeend', htmlFinal);
    saveScore();
};

// -------------- FUNCIÓN PARA GUARDAR DATOS EN FIRESTORE --------------
const saveScore = () => {
    const playerName = document.querySelector('.name__input');
    const submitBtn = document.querySelector('.name__submit');
    submitBtn.addEventListener('click', () => {
        if (playerName.value) {
            addDoc(collection(db, 'players'), {
                name: playerName.value,
                score: score,
            }).then(() => {
                location.href = '../index.html';
            });
        } else {
            swal('You must introduce your name');
        }
    });
};
