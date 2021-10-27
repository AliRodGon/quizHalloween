// VARIABLES
let score = 0;
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
    sortArray(finalObject);
    printQA(finalObject);
    verifyAnswer(finalObject);
});
const sortArray = finalObject => {
    console.log('funciona');
    return finalObject[0].answers.sort(() => Math.random() - 0.5);
};
const printQA = finalObject => {
    const containerHTML = document.querySelector('.flex__container');
    finalObject.forEach(element => {
        element.forEach((answers, i) => {
            const html = `
            <h2 class="question" id="question">${element.question}</h2>
            <section class="grid__container">
                <div class="answer__container answer__container--green">
                    <p class="answer">${answers.answer}</p>
                </div>
                <div class="answer__container answer__container--red">
                     <p class="answer">${answers.answer}</p>
                </div>
                <div class="answer__container answer__container--yellow">
                    <p class="answer">${answers.answer}</p>
                </div>
                <div class="answer__container answer__container--blue">
                    <p class="answer">${answers.answer}</p>
                </div>
            </section>
            `;
            containerHTML.insertAdjacentHTML('beforeend', html);
        });
    });
    /*const html = `
    <h2 class="question" id="question">${finalObject[0].question}</h2>
    <section class="grid__container">
        <div class="answer__container answer__container--green">
            <p class="answer">${finalObject[0].answers[0].answer}</p>
        </div>
        <div class="answer__container answer__container--red">
             <p class="answer">${finalObject[0].answers[1].answer}</p>
        </div>
        <div class="answer__container answer__container--yellow">
            <p class="answer">${finalObject[0].answers[2].answer}</p>
        </div>
        <div class="answer__container answer__container--blue">
            <p class="answer">${finalObject[0].answers[3].answer}</p>
        </div>
    </section>
    `;
    containerHTML.insertAdjacentHTML('beforeend', html);*/
};
const verifyAnswer = finalObject => {
    const answerGreen = document.querySelector('.answer__container--green');
    const answerRed = document.querySelector('.answer__container--red');
    const answerYellow = document.querySelector('.answer__container--yellow');
    const answerBlue = document.querySelector('.answer__container--blue');
    answerGreen.addEventListener('click', () => {
        
        if (finalObject[0].answers[0].value) {
            alert('Correcto');
            score += 1;
            console.log(score);
        } else {
            alert('Incorrecto');
        }
    });
    answerRed.addEventListener('click', () => {
        if (finalObject[0].answers[1].value) {
            alert('Correcto');
            score += 1;
            console.log(score);
        } else {
            alert('Incorrecto');
        }
    });
    answerYellow.addEventListener('click', () => {
        if (finalObject[0].answers[2].value) {
            alert('Correcto');
            score += 1;
            console.log(score);
        } else {
            alert('Incorrecto');
        }
    });
    answerBlue.addEventListener('click', () => {
        if (finalObject[0].answers[3].value) {
            alert('Correcto');
            score += 1;
            console.log(score);
        } else {
            alert('Incorrecto');
        }
    });
};