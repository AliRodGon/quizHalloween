

const getQuestions = async ()=> {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    const data = await response.json();
    const finalData = data.results.map((element) => {
      const arr = [];
      arr.push(element.correct_answer);
       const arrRespuestas = element.incorrect_answers.concat(arr);
       const responseOne = {
         reponse: arrRespuestas[0],
         value: false,
       }
       const responseTwo = {
        reponse: arrRespuestas[1],
        value: false,
      }
      const responseThree = {
        reponse: arrRespuestas[2],
        value: false,
      }
      const responseFour = {
        reponse: arrRespuestas[3],
        value: true,
      }
      const arrRespuestasChecked = []
      arrRespuestasChecked.push (responseOne,responseTwo,responseThree,responseFour)
      
      return {
        pregunta: element.question,
        repuestas: arrRespuestasChecked,
      };
    });
    return finalData;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
  }
}
getQuestions().then((finalObject) => {
   
   console.log(finalObject)

});

const shuffleArray = (array) =>{
  array = array.sort(() => Math.random() - 0.5)
  shuffleArray(finalObject)
}



