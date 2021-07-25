const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', () => {
    // change the theme of the website
    document.body.classList.toggle('dark');
});


const inputTarefa = document.querySelector('.inputTarefa');
const btnAdd = document.querySelector('.btnAdd');
const tarefas = document.querySelector('.tarefas');


function makeList() {
    const li = document.createElement('li');
    return li;
}


inputTarefa.addEventListener('keypress', function (e) {
    if(e.keyCode === 13) {
        if(!inputTarefa.value) return;
        makeWork(inputTarefa.value);
    }
});


function clearInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}


function makeBtnDelete(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar essa tarefa');
    li.appendChild(botaoApagar);
}


function makeWork(textoInput) {
    const li = makeList();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    clearInput();
    makeBtnDelete(li);
    saveWorks();
}


btnAdd.addEventListener('click', function() {
    if(!inputTarefa.value || inputTarefa.value === ' ') return;
    makeWork(inputTarefa.value);
});


document.addEventListener('click', function(e) {
    const el = e.target;
    
    if(el.classList.contains('apagar')) {
        el.parentElement.remove();
        saveWorks();
    }

    if(el.classList.contains('feito')) {
        el.parentElement.remove();
        saveWorks();
    }
});


function saveWorks() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}


function addSavedWorks() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        makeWork(tarefa);
    }

}

addSavedWorks();
