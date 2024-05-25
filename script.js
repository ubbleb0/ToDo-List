document.getElementById('addTaskButton').addEventListener('click', addTask);

let currentTaskElement = null;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Veuillez entrer une tâche.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    li.innerHTML = `
        <div class="d-flex align-items-center">
            <input type="checkbox" class="task-check mr-3">
            <span class="task-text">${taskText}</span>
        </div>
        <div class="buttons">
            <button class="btn btn-warning btn-sm edit">Modifier</button>
            <button class="btn btn-danger btn-sm delete">Supprimer</button>
        </div>
    `;

    li.querySelector('.delete').addEventListener('click', () => showDeleteModal(li));
    li.querySelector('.edit').addEventListener('click', () => showEditModal(li));
    li.querySelector('.task-check').addEventListener('change', () => toggleDone(li));

    taskList.appendChild(li);
    taskInput.value = '';
}

function showDeleteModal(task) {
    currentTaskElement = task;
    $('#deleteModal').modal('show');
}

function showEditModal(task) {
    currentTaskElement = task;
    document.getElementById('editTaskInput').value = task.querySelector('.task-text').textContent;
    $('#editModal').modal('show');
}

function deleteTask() {
    currentTaskElement.remove();
    $('#deleteModal').modal('hide');
}

function editTask() {
    const newTaskText = document.getElementById('editTaskInput').value.trim();
    if (newTaskText !== '') {
        currentTaskElement.querySelector('.task-text').textContent = newTaskText;
    }
    $('#editModal').modal('hide');
}

function toggleDone(task) {
    task.classList.toggle('done');
}
// ANNULER ET X
function hideEditModal() {
    $('#editModal').modal('hide');
}

function hideDeleteModal() {
    $('#deleteModal').modal('hide');
}

document.getElementById('editModal').querySelector('.modal-footer .btn-secondary').addEventListener('click', hideEditModal);
document.getElementById('editModal').querySelector('.modal-header .close').addEventListener('click', hideEditModal);
document.getElementById('deleteModal').querySelector('.modal-footer .btn-secondary').addEventListener('click', hideDeleteModal);
document.getElementById('deleteModal').querySelector('.modal-header .close').addEventListener('click', hideDeleteModal);


document.getElementById('confirmDeleteButton').addEventListener('click', deleteTask);
document.getElementById('saveEditButton').addEventListener('click', editTask);

