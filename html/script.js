// Sample initial columns and tasks
const initialColumns = {
    "todo": "Todo",
    "in-progress": "In-Progress",
    "review": "Review",
    "done": "Done",
    "closed": "Closed"
};

// This will hold the current state of tasks for each column
const taskState = {
    "todo": ["Task 1", "Task 2", "Task 3"],
    "in-progress": [],
    "review": [],
    "done": [],
    "closed": []
};

// Dynamically create the columns and populate tasks
const board = document.getElementById('board');
const columnSelect = document.getElementById('column-select');

function createBoard() {
    // Clear the board and the column select options
    board.innerHTML = '';
    columnSelect.innerHTML = '';

    // Loop through each column to dynamically create it
    for (const columnId in initialColumns) {
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('column');
        columnDiv.setAttribute('id', columnId);

        const columnTitle = document.createElement('h3');
        columnTitle.innerText = initialColumns[columnId];
        columnDiv.appendChild(columnTitle);

        // Add tasks to the column
        taskState[columnId].forEach(taskText => {
            const taskDiv = createTaskElement(taskText);
            columnDiv.appendChild(taskDiv);
        });

        // Add drag/drop event listeners to the column
        addDragAndDropListeners(columnDiv);

        // Append the column to the board
        board.appendChild(columnDiv);

        // Add the column to the select dropdown
        const option = document.createElement('option');
        option.value = columnId;
        option.innerText = initialColumns[columnId];
        columnSelect.appendChild(option);
    }
}

// Create task DOM element
function createTaskElement(taskText) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.setAttribute('draggable', 'true');
    taskDiv.innerText = taskText;

    // Add drag event listeners to the task
    taskDiv.addEventListener('dragstart', () => {
        taskDiv.classList.add('dragging');
    });

    taskDiv.addEventListener('dragend', () => {
        taskDiv.classList.remove('dragging');
    });

    return taskDiv;
}

// Add drag and drop listeners to columns
function addDragAndDropListeners(column) {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
        column.classList.add('dragover');
    });

    column.addEventListener('dragleave', () => {
        column.classList.remove('dragover');
    });

    column.addEventListener('drop', () => {
        column.classList.remove('dragover');
        const draggedTask = document.querySelector('.dragging');
        column.appendChild(draggedTask);

        // Update the taskState to reflect the new position
        const sourceColumnId = draggedTask.parentNode.id;
        const targetColumnId = column.id;

        taskState[sourceColumnId] = taskState[sourceColumnId].filter(
            task => task !== draggedTask.innerText
        );
        taskState[targetColumnId].push(draggedTask.innerText);
    });
}

// Adding new tasks
document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskText = document.getElementById('new-task-input').value;
    const selectedColumn = columnSelect.value;

    if (taskText && selectedColumn) {
        // Create and append the new task
        const taskDiv = createTaskElement(taskText);
        document.getElementById(selectedColumn).appendChild(taskDiv);

        // Update task state
        taskState[selectedColumn].push(taskText);

        // Clear the input field
        document.getElementById('new-task-input').value = '';
    }
});

// Initialize the board with initial data
createBoard();
