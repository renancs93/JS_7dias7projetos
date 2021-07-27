// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

// Functions
function showQuestion(){
  if(questions[currentQuestion]){
    
    let q = questions[currentQuestion];
    
    // Refresh progress bar
    let pct = Math.floor((currentQuestion / questions.length) * 100);
    document.querySelector('.progress--bar').style.width = `${pct}%`;

    document.querySelector('.scoreArea').style.display = 'none';
    document.querySelector('.questionArea').style.display = 'block';

    // Set Question
    document.querySelector('.question').innerHTML = `${currentQuestion+1} - ${q.question}`;
    
    // Set Options
    let optionsHtml = '';
    for(let i in q.options){
      optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
    }
    document.querySelector('.options').innerHTML = optionsHtml;

    // Add events options
    document.querySelectorAll('.options .option').forEach(item =>{
      item.addEventListener('click', optionClickEvent);
    });

  }
  else{
    finishQuiz();
  }
}

function optionClickEvent(e){
  let clickedOption = parseInt(e.target.getAttribute('data-op'));

  // refresh correct awswers
  if(questions[currentQuestion].answer === clickedOption){
    correctAnswers++;
  }
  
  // Next Question
  currentQuestion++;
  showQuestion();
}

function finishQuiz(){
  let points = Math.floor((correctAnswers / questions.length) * 100);

  if(points < 30){
    document.querySelector('.scoreText1').innerHTML = 'Tá ruim hein?!';
    document.querySelector('.scorePct').style.color = '#FF0000';
  }
  else if(points >= 30 && points < 70){
    document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
    document.querySelector('.scorePct').style.color = '#FFF000';
  }
  else if(points >= 70){
    document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
    document.querySelector('.scorePct').style.color = '#0D630D';
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
  document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${correctAnswers} questões.`;
  
  document.querySelector('.scoreArea').style.display = 'block';
  document.querySelector('.questionArea').style.display = 'none';
  document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent(){
  correctAnswers = 0;
  currentQuestion = 0;

  showQuestion();
}