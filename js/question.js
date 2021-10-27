// PROYECTO QUIZZ DE HALLOWEEN UTILIZANDO LA API DE OPENTDB

// -------------- VARIABLES --------------
let score = 0;
let addId = 1;
const containerHTML = document.querySelector('.flex__container');

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
        ></i>
    </section>
    <a href="./home.js" class="play__again">Play again</a>
    `;
    containerHTML.insertAdjacentHTML('beforeend', htmlFinal);
};

// -------------- FUNCIÓN QUE VALIDA LAS RESPUESTAS--------------
const verifyAnswer = finalObject => {
    const answerContainer = document.querySelectorAll('.answer__container');
    answerContainer.forEach(div => {
        div.addEventListener('click', e => {
            e.preventDefault();
            if (addId > 9) {
                if (div.id === 'true') {
                    score += 1;
                    alert('Correcto');
                    containerHTML.innerHTML = null;
                    printResults();
                } else {
                    alert('Incorrecto');
                    containerHTML.innerHTML = null;
                    printResults();
                }
            } else {
                if (div.id === 'true') {
                    score += 1;
                    addId += 1;
                    alert('correcto');
                    document.querySelector(`#question${addId}`).style.display =
                        'block';
                    document.querySelector(
                        `#question${addId - 1}`
                    ).style.display = 'none';
                    console.log(addId);
                } else {
                    addId += 1;
                    alert('incorrecto');
                    document.querySelector(`#question${addId}`).style.display =
                        'block';
                    document.querySelector(
                        `#question${addId - 1}`
                    ).style.display = 'none';
                    console.log(addId);
                }
            }
            console.log(`Puntuación: ${score}`);
            document.querySelector('#progressCount').textContent = addId;
            document.querySelector('#scoreCount').textContent = score;
        });
    });
};
