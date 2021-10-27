function store(){
  let inputEmail= document.getElementById("email");
  localStorage.setItem("email", inputEmail.value);
  let inputName= document.getElementById("fName");
  localStorage.setItem("fName",inputName.value);
 }

//SETUP
const data = {
  labels: ['Partida 1', 'Partida 2', 'Partida 3', 'Partida 4', 'Partida 5'],
        datasets: [{
            label: 'Tus puntuaciones',
            data: [7, 4, 3, 5, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
};

//CONFIG

const config = {
  type: 'bar',
  data,
  options: {
      height: 300,
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
  };

//RENDER
let myChart = new Chart (
  document.getElementById('myChart'),
  config
);

// let graphic = document.getElementById('myChart');
// let myChart = new Chart(graphic, {
    
// });
// const labels = [
//     'Partida 1',
//     'Partida 2',
//     'Partida 3',
//     'Partida 4',
//     'Partida 5',
//   ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Mis puntuaciones',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 7],
    }]
  };
  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );









