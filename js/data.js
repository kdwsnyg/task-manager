function saveAllTasks(allTasks) {
  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

function getAllTasks() {
  let allTasks =  JSON.parse(localStorage.getItem('tasks'));
  return allTasks ? allTasks : [];
}