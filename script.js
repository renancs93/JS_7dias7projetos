const listProjects = [
  {
    name: "Bateria",
    path: "projeto1_BateriaJS/",
    screen: "projeto1.PNG"
  },
  {
    name: "Relógio",
    path: "projeto2_RelogioAnalogico/",
    screen: "projeto2.PNG"
  },
  {
    name: "Clima",
    path: "projeto3_Clima/",
    screen: "projeto3.PNG"
  },
  {
    name: "Jogo da Velha",
    path: "projeto4_JogoVelha/",
    screen: "projeto4.PNG"
  },
  {
    name: "Canvas",
    path: "projeto5_Canvas/",
    screen: "projeto5.PNG"
  },
  {
    name: "Quiz",
    path: "projeto6_Quiz/",
    screen: "projeto6.PNG"
  },
  {
    name: "Drag-and-Drop",
    path: "projeto7_DragAndDrop/",
    screen: "projeto7.PNG"
  }
]

window.addEventListener('load', function() {
  loadProject();
  setZoom();
})

function setZoom(){

  document.querySelectorAll('.card').forEach((card) =>{
    
    card.addEventListener('mouseover', (e)=>{
      let parent = e.currentTarget.parentNode;
      parent.classList.add('zoom');
    });
    

    card.addEventListener('mouseleave', (e)=>{
      let parent = e.currentTarget.parentNode;
      parent.classList.remove('zoom');
    });
  })
  

}

function loadProject(){
  let html = "";
  let container = document.querySelector('.container');

  listProjects.forEach((item)=>{
    html += `
      <div class="project">
        <div class="card">
          <a class="link" href="${item.path}">
            <img class="screen" src="./screenshots/${item.screen}" />
          </a>
        </div>
        <label class="name">${item.name}</label>
      </div>`
  })

  container.innerHTML = html;

}