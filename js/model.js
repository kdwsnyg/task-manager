
//关闭任务面板，同时删除已填写的内容
function closeTaskPanel() {
  let taskName = document.getElementById('taskName');
  taskName.value = '';

  let taskDeadline = document.getElementById('taskDeadline');
  taskDeadline.value = '';

  let taskDescript = document.getElementById('taskDescript');
  taskDescript.value = '';

  let model = document.getElementById('model');
  model.classList.remove('model-appear');
}

//检查任务信息是否填写
function checkTaskInform(...informs) {
  let hasNoContent = false;
  
  informs.forEach((inform) => {
    if(!(inform.value && inform.value.trim())) {
      hasNoContent = true;
      inform.classList.add('has-no-content');
    }else {
      inform.classList.remove('has-no-content');
    }
  })

  return hasNoContent;
}

//渲染任务列表
function renderList(taskObj) {
  let newRow = document.createElement('tr');
  newRow.classList.add('task-row');

  let taskNumTd = document.createElement('td');
  taskNumTd.classList.add('task-num-col');
  taskNumTd.textContent = taskObj.index;
  newRow.appendChild(taskNumTd);

  let taskNameTd = document.createElement('td');
  taskNameTd.classList.add('task-name-col');
  taskNameTd.textContent = taskObj.name;
  newRow.appendChild(taskNameTd);

  let taskDesTd = document.createElement('td');
  taskDesTd.classList.add('task-des-col');
  taskDesTd.textContent = taskObj.description;
  newRow.appendChild(taskDesTd);

  let taskDeadTd = document.createElement('td');
  taskDeadTd.classList.add('task-dead-col');
  taskDeadTd.textContent = taskObj.deadline;
  newRow.appendChild(taskDeadTd);

  let taskStatusTd = document.createElement('td');
  taskStatusTd.classList.add('task-status-col', 'status-act');
  taskStatusTd.textContent = taskObj.status;
  newRow.appendChild(taskStatusTd);

  let taskOperaTd = document.createElement('td');
  taskOperaTd.classList.add('task-opera-col');

  let deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'operate-row-btn');

  let deleteBtnImg = document.createElement('img');
  deleteBtnImg.setAttribute('src', 'images/delete.svg');
  deleteBtnImg.setAttribute('alt', 'delete');
  deleteBtn.appendChild(deleteBtnImg);
  taskOperaTd.appendChild(deleteBtn);

  let updateBtn = document.createElement('button');
  updateBtn.classList.add('btn', 'operate-row-btn');

  let updateBtnImg = document.createElement('img');
  updateBtnImg.setAttribute('src', 'images/update.svg');
  updateBtnImg.setAttribute('alt', 'update');
  updateBtn.appendChild(updateBtnImg);
  taskOperaTd.appendChild(updateBtn);

  newRow.appendChild(taskOperaTd);

  let tbody = document.querySelector('tbody');
  tbody.appendChild(newRow);
}

//新增任务
function addNewTask() {
  let newTask = {};
  newTask.status = 'Active';
  
  let taskName = document.getElementById('taskName');
  newTask.name = taskName.value;
  
  let taskDeadline = document.getElementById('taskDeadline');
  newTask.deadline = taskDeadline.value;
  
  let taskDescript = document.getElementById('taskDescript');
  newTask.description = taskDescript.value;

  if(checkTaskInform(taskName, taskDeadline, taskDescript)) {
    return;
  }

  let allTasks = getAllTasks() ? getAllTasks() : [];
  allTasks.push(newTask);
  newTask.index = allTasks.indexOf(newTask) + 1;

  saveAllTasks(allTasks);
  closeTaskPanel();
  renderList(newTask);
}