let areas = {
  a: null,
  b: null,
  c: null
}

document.querySelectorAll('.item').forEach((item) => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

document.querySelectorAll('.area').forEach((area) => {
  area.addEventListener('dragover', dragOver);
  area.addEventListener('dragleave', dragLeave);
  area.addEventListener('drop', drop);
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

// Functions Item
function dragStart(e) {
  e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {
  e.currentTarget.classList.remove('dragging');
}

// Functions Area
function dragOver(e) {
  if (e.currentTarget.querySelector('.item') === null) {
    e.preventDefault(); // libera o drop no local
    e.currentTarget.classList.add('hover');
  }
}

function dragLeave(e) {
  e.currentTarget.classList.remove('hover');
}

function drop(e) {
  e.currentTarget.classList.remove('hover');

  // Verifica se não existe nenhum item na area
  if (e.currentTarget.querySelector('.item') === null) {
    // Adiciona o item na area, removendo do local anterior
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);

    updateAreas();
  }
}

// Functions Neutro Area
function dragOverNeutral(e) {
  e.preventDefault();
  e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
  e.currentTarget.classList.remove('hover');
}
function dropNeutral(e) {
  e.currentTarget.classList.remove('hover');

  let dragItem = document.querySelector('.item.dragging');
  e.currentTarget.appendChild(dragItem);

  updateAreas();
}

// Logic Functions
function updateAreas(){
  document.querySelectorAll('.area').forEach(area =>{
    let name = area.getAttribute('data-name');

    if(area.querySelector('.item') !== null){
      areas[name] = area.querySelector('.item').innerHTML;
    }
    else{
      areas[name] = null;
    }
  });

  //console.log(areas);
  if(areas.a === '1' && areas.b === '2' && areas.c === '3')
    document.querySelector('.areas').classList.add('correct');
  else
    document.querySelector('.areas').classList.remove('correct');
}