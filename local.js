const name = 'valor';
localStorage.setItem('valor', name);

// Salvando um valor no localStorage

// Verificando se o valor existe antes de logar no console
const valorItem = localStorage.getItem('valor');
if (valorItem !== null) {
    console.log(valorItem);
} else {
    console.log("Item 'valor' não encontrado no localStorage.");
}

// Salvando um objeto no localStorage
localStorage.setItem('pessoa', JSON.stringify({ name: 'cliente' }));

// Verificando se o objeto existe antes de fazer o parse
const pessoaItem = localStorage.getItem('name');
if (pessoaItem !== null) {
    console.log(JSON.parse(pessoaItem));
} else {
    console.log("Item 'name' não encontrado no localStorage.");
}

console.log(localStorage.getItem('valor'));

localStorage.setItem('pessoa', JSON.stringify({name: 'cliente'}));

console.log(JSON.parse(localStorage.getItem('name')));

// Abaixo, testes do funcionamento do LocalStorage
localStorage.clear();  // Limpa todos os itens do localStorage
localStorage.setItem('valor', 'valor');  // Define o valor novamente
console.log(localStorage.getItem('valor'));  // Deve exibir 'valor'

localStorage.setItem('teste', 'funciona');
console.log(localStorage.getItem('teste'));  // Deve exibir 'funciona'

const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentEditIndex = null;
let filteredTasks = [];

function renderTasks(filteredTasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.name} - ${task.date} - ${task.priority}
            <button onclick="editTask(${index})">Editar</button>
        `;
        taskList.appendChild(li);
    });
    if (!taskList) {
        console.error("Elemento 'task-list' não encontrado.");
        return;
    }
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;
        taskList.appendChild(li);
    });
}

function editTask(index) {
    currentEditIndex = index;
    const task = tasks[index];
    document.getElementById("editName").value = task.name;
    document.getElementById("editDate").value = task.date;
    document.getElementById("editPriority").value = task.priority;
    document.getElementById("editModal").style.display = "block";
}

function saveEdit() {
    const name = document.getElementById("editName").value;
    const date = document.getElementById("editDate").value;
    const priority = document.getElementById("editPriority").value;

    // Atualiza a tarefa no array e no localStorage
    tasks[currentEditIndex] = { name, date, priority };
    localStorage.setItem("tasks", JSON.stringify(tasks));

    closeModal();
    renderTasks();
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

function filterTasks(status) {
    console.log("Filtrando tarefas com status:", status);
    const filteredTasks = tasks.filter(task => {
        if (status === 'all') {
            return true;
        } else {
            return task.completed === (status === 'completed');
        }
    });
    console.log("Tarefas filtradas:", filteredTasks);
    renderTasks(filteredTasks);
}

renderTasks(tasks);

// Filtra por status
document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.getElementById('filter-button');
    if (filterButton) {
        let currentStatus = 'all';
 
        filterButton.addEventListener('click', () => {
            currentStatus = currentStatus === 'all' ? 'completed' : currentStatus === 'completed' ? 'pending' : 'all';
            console.log("Status atual: ", currentStatus);
            filterTasks(currentStatus);
        });
 
        filterButton.classList.add('active');
    } else {
        alert("Elemento filterButton não encontrado.");
    }
 }); 

function filterTasksByPriority(priority) {
    const filteredTasks = tasks.filter(task => task.priority === priority);
    renderTasks(filteredTasks);
}

// Filtra por prioridade
document.addEventListener('DOMContentLoaded', () => {
    const filterPriorityButton = document.getElementById('filter-priority-button');
    
    if (filterPriorityButton) {
        let currentPriority = 'all';

        filterPriorityButton.addEventListener('click', () => {
            currentPriority = currentPriority === 'all' ? 'high' 
                           : currentPriority === 'high' ? 'medium' 
                           : currentPriority === 'medium' ? 'low' 
                           : 'all';

            if (currentPriority === 'all') {
                renderTasks(tasks);  // Exibe todas as tarefas
            } else {
                filterTasksByPriority(currentPriority);  // Exibe tarefas da prioridade atual
            }
        });

        filterPriorityButton.classList.add('active');
    } else {
        alert("Elemento filterPriorityButton não encontrado.");
    }
});

// Seleciona o botão pelo ID
const botaoAdicionar = document.getElementById('adicionarTarefa');

// Adiciona um evento de clique ao botão
botaoAdicionar.addEventListener('click', function() {
    // Obtém o valor do campo de entrada da tarefa
    const tarefa = document.getElementById('tarefaInput').value;

    // Verifica se a tarefa não está vazia
    if (tarefa.trim() !== "") {
        // Exibe uma mensagem no console
        console.log(`Tarefa "${tarefa}" foi adicionada!`);
        
        // Limpa o campo de entrada após adicionar a tarefa
        document.getElementById('tarefaInput').value = '';
    } else {
        console.log("Por favor, insira uma tarefa.");
    }
});