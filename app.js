var tarefas = [];



function enviar() {
  var input = document.getElementById("input").value;

  if (input !== "") {
    tarefas.push(input);
    console.log(tarefas);
    adicionarTarefas();
    limparInput();
    localStorage.setItem('valoresDeTarefas', JSON.stringify(tarefas));
  
    
  } else {
    console.log("nao deu");
  }
}


function limparInput() {
  document.getElementById("input").value = "";
}

function adicionarTarefas() {
  const divContainer = document.getElementById("card");

  divContainer.innerHTML = ""; // Limpa o conteúdo da div

  console.log(tarefas);
  function criarNovaDiv(tarefa) {
    const novaDiv = document.createElement("div");
    novaDiv.setAttribute("class", "card");

    const divBody = document.createElement("div");
    divBody.setAttribute("class", "card-body pt-3");
    divBody.innerHTML = tarefa;

    const iconeExcluir = document.createElement("i");
    iconeExcluir.setAttribute("class", "fa fa-trash");
    iconeExcluir.setAttribute("aria-hidden", "true");
    iconeExcluir.setAttribute("id", "excluir");

    const iconeConcluido = document.createElement("i");
    iconeConcluido.setAttribute("class", "fa fa-check");
    iconeConcluido.setAttribute("aria-hidden", "true");
    iconeConcluido.setAttribute("id", "concluido");

    divBody.appendChild(iconeExcluir);
    divBody.appendChild(iconeConcluido);
    novaDiv.appendChild(divBody);

    return novaDiv;
  }

  for (let i = 0; i < tarefas.length; i++) {
    const novaDiv = criarNovaDiv(tarefas[i]);
    divContainer.appendChild(novaDiv);
  }

  const botoesExcluir = document.querySelectorAll("#excluir");
  botoesExcluir.forEach((botao) => {
    botao.addEventListener("click", excluirTarefa);
  });

  const botoesConcluir = document.querySelectorAll("#concluido");
  botoesConcluir.forEach((botao) => {
    botao.addEventListener("click", concluirTarefa);
  });
  
  localStorage.setItem('valoresDeTarefas', JSON.stringify(tarefas));
}
document.addEventListener("keypress", function(e) {
  if(e.key === 'Enter') {
  
      var btn = document.querySelector("#botao");
    
    btn.click();
  
  }
});
function excluirTarefa(event) {
  const iconeExcluir = event.target;
  const divBody = iconeExcluir.parentNode.parentNode;
  const tarefa = divBody.innerText;
  const index = tarefas.indexOf(tarefa);
  tarefas.splice(index, 1);
  localStorage.setItem('valoresDeTarefas', JSON.stringify(tarefas));
  console.log(tarefas);
  divBody.parentNode.removeChild(divBody);
  
  
}

function concluirTarefa(event) {
  const iconeConcluido = event.target;
  const divBody = iconeConcluido.parentNode;
  const tarefa = divBody.innerHTML;

  divBody.style.textDecoration = "line-through";

  setTimeout(() => {
    divBody.parentNode.removeChild(divBody);
    const index = tarefas.indexOf(tarefa);
    tarefas.splice(index, 1);
    localStorage.setItem('valoresDeTarefas', JSON.stringify(tarefas));
    console.log(tarefas);
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function() {
  const tarefasLocalStorage = JSON.parse(localStorage.getItem('valoresDeTarefas'));
  if (tarefasLocalStorage) {
    tarefas = tarefasLocalStorage;
    adicionarTarefas();
  }
});
