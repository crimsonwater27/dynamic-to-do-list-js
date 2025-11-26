document.addEventListener('DOMContentLoaded', function() {

    const addButton = document.getElementById('addButton');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('taskItem');

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        removeButton.onclick = function() {
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
            }
            saveTasks();
            taskList.removeChild(li);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

    function loadTasks() {
        tasks.forEach(function(task) {
            createTaskElement(task);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        tasks.push(taskText);
        saveTasks();
        createTaskElement(taskText);
        taskInput.value = '';
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();

});



