const taskId = document.querySelector('#task-id');
const taskName = document.querySelector('#name');
const completed = document.querySelector('#completed');
const formAlert = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');

const fetchData = async () => {
    try {
        let data = await axios.get(`/api/v1/tasks/${id}`);
        data = data.data.data;
        taskId.value = data._id;
        taskName.value = data.name;
        completed.checked = data.completed;
    } catch (err) {
        console.log(err);
    }
}
fetchData();

//updating data

const submitBtn = document.querySelector('.submit');
const backBtn = document.querySelector('#back-btn');
submitBtn.addEventListener('click', async () => {
    const updatedTaskName = taskName.value;
    const updatedCompleted = completed.checked;
    if (updatedTaskName.length < 1) {
        return alert("Task not cannot be empty");
    }
    try {
        const data = await axios.patch(`/api/v1/tasks/${id}`, { name: updatedTaskName, completed: updatedCompleted });
        formAlert.classList.add("success");
        formAlert.innerHTML = "Task Updated successfully.";
    } catch (err) {
        formAlert.classList.add("error");
        formAlert.innerHTML = err.msg;
    }
    backBtn.style.display = "block";
})