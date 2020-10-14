function saveAllTasks(allTasks) {
  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

function getAllTasks() {
  return JSON.parse(localStorage.getItem('tasks'));
}

function showAllTasks() {
  getAllTasks().forEach((task) => {
    renderList(task);
  })
}