const taskContainer = document.querySelector('.task-container');
//fetch data
const showTasks = async () => {
    const { data } = await axios.get('/api/v1/tasks');
    try {
        let tasks = data.data.map(task => {
            return `<div class="task" id="${task._id}">
                <p class="task-description" style="text-decoration:${task.completed ? "line-through" : "none"};">${task.name}</p>
                <div class="btn-group">
                    <a href="task.html?id=${task._id}" class="edit" contenteditable="false"><i class="fa-solid fa-pen-to-square"></i></a>
                    <a class="delete fa-solid fa-trash"></a>
                </div>
            </div>`
        })
        taskContainer.innerHTML = tasks.join('')
    } catch (err) {
        taskContainer.innerHTML = `<h1 style="color:red">Cannot Fetch data</h1>`
    }
}
showTasks();

const input = document.querySelector('input')
const submitBtn = document.querySelector('.submit')
const responseAlert = document.querySelector('.response-alert');

submitBtn.addEventListener('click', async () => {
    const inputValue = input.value;
    if (inputValue.length < 1) {
        alert("Please Enter a value");
        return;
    }
    const { data } = axios.post('/api/v1/tasks', { name: inputValue })
    input.value = "";
    location.reload();
})


//delete the task
taskContainer.addEventListener('click', async (e) => {
    const e1 = e.target
    if (e1.classList.contains('delete')) {
        const taskId = e1.parentNode.parentNode.id;
        const deleteTask = await axios.delete(`/api/v1/tasks/${taskId}`);
        location.reload();
    }
})