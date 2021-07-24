// Initial Data
let square = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('div[data-item]').forEach(item =>{
  item.addEventListener('click', itemClick);
});

// Functions
function itemClick(event){
  let item = event.target.getAttribute('data-item')
  if(playing && square[item] === ''){
    square[item] = player;
    renderSquare();
    togglePlayer();
  }
}

function reset(){
  warning = '';

  let random = Math.floor(Math.random() * 2);
  player = (random === 0)? 'X': 'O';

  // clear
  for(let i in square){
    square[i] = '';
  }

  playing = true;

  renderSquare();
  renderInfo();

}

function renderSquare(){
  for(let i in square){
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = square[i];
  }

  checkGame();
}

function renderInfo(){
  document.querySelector('.vez').innerHTML = player;
  document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer(){
  player = (player === 'X') ? 'O' : 'X';
  renderInfo();
}

function checkGame(){
  if(checkWinnerFor('X')){
    warning = 'Jogador "X" venceu';
    playing = false;
  }
  else if(checkWinnerFor('O')){
    warning = 'Jogador "O" venceu'
    playing = false;
  }
  else if(isFull()){
    warning = 'Deu empate!'
    playing = false;
  }
}

function checkWinnerFor(player){
  
  // Possibilidades de vitória
  const pos = [
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1'
  ];

  for(let w in pos){
    let pArray = pos[w].split(','); // a1, a2, a3

    // Verifica se todas as possibilidades do Array são verdadeiras
    let resWon = pArray.every((option) => square[option] === player);
    if(resWon){
      return true;
    }
  }

  return false;
}

function isFull(){
  for(let i in square){
    if(square[i] === '')
      return false;
  }

  return true;
}