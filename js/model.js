
//显示任务面板
function showTaskPanel() {
  let model = document.getElementById('model');
  model.classList.add('model-appear');
}

//关闭任务面板，恢复默认值
function closeTaskPanel() {
  let model = document.getElementById('model');
  model.classList.remove('model-appear');

  let taskForm = document.getElementById('taskForm');
  taskForm.classList.remove('disappear');

  let panelIcon = document.getElementById('panelIcon');
  panelIcon.setAttribute('src', 'images/model_add_icon.svg');

  let panelTitle = document.getElementById('panelTitle');
  panelTitle.textContent = 'New A Task';

  let taskName = document.getElementById('taskName');
  taskName.value = '';
  taskName.classList.remove('has-no-content');

  let taskDeadline = document.getElementById('taskDeadline');
  taskDeadline.value = '';
  taskDeadline.classList.remove('has-no-content');

  let taskDescript = document.getElementById('taskDescript');
  taskDescript.value = '';
  taskDescript.classList.remove('has-no-content');

  let statusContainer = document.getElementById('statusContainer');
  statusContainer.classList.add('disappear');

  let askIfDelete = document.getElementById('askIfDelete');
  askIfDelete.classList.add('disappear');
  askIfDelete.textContent = '';

  let confirmBtn = document.getElementById('confirmBtn');
  confirmBtn.onclick = createTaskItem;
}

//检查任务信息是否填写
function checkTaskInform(...informs) {
  let hasNoContent = false;

  informs.forEach((inform) => {
    if (!(inform.value && inform.value.trim())) {
      hasNoContent = true;
      inform.classList.add('has-no-content');
    } else {
      inform.classList.remove('has-no-content');
    }
  })

  return hasNoContent;
}

//渲染任务列表
function renderTask(taskObj) {
  let listRow = document.createElement('tr');
  listRow.classList.add('task-listRow');

  let taskNumTd = document.createElement('td');
  taskNumTd.classList.add('task-num-col');
  taskNumTd.textContent = taskObj.index;
  listRow.appendChild(taskNumTd);

  let taskNameTd = document.createElement('td');
  taskNameTd.classList.add('task-name-col');
  taskNameTd.textContent = taskObj.name;
  listRow.appendChild(taskNameTd);

  let taskDesTd = document.createElement('td');
  taskDesTd.classList.add('task-des-col');
  taskDesTd.textContent = taskObj.description;
  listRow.appendChild(taskDesTd);

  let taskDeadTd = document.createElement('td');
  taskDeadTd.classList.add('task-dead-col');
  taskDeadTd.textContent = taskObj.deadline;
  listRow.appendChild(taskDeadTd);

  let taskStatusTd = document.createElement('td');
  switch (taskObj.status) {
    case 'Active':
      taskStatusTd.classList.add('task-status-col', 'status-act');
      break;
    case 'Padding':
      taskStatusTd.classList.add('task-status-col', 'status-pad');
      break;
    case 'Closed':
      taskStatusTd.classList.add('task-status-col', 'status-close');
      break;
  }
  taskStatusTd.textContent = taskObj.status;
  listRow.appendChild(taskStatusTd);

  let taskOperaTd = document.createElement('td');
  taskOperaTd.classList.add('task-opera-col');

  let deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'operate-row-btn');
  deleteBtn.setAttribute('onclick', `deleteTask(${taskObj.index - 1})`);

  let deleteBtnImg = document.createElement('img');
  deleteBtnImg.setAttribute('src', 'images/delete.svg');
  deleteBtnImg.setAttribute('alt', 'delete');
  deleteBtn.appendChild(deleteBtnImg);
  taskOperaTd.appendChild(deleteBtn);

  let updateBtn = document.createElement('button');
  updateBtn.classList.add('btn', 'operate-row-btn');
  updateBtn.setAttribute('onclick', `updateTask(${taskObj.index - 1})`);

  let updateBtnImg = document.createElement('img');
  updateBtnImg.setAttribute('src', 'images/update.svg');
  updateBtnImg.setAttribute('alt', 'update');
  updateBtn.appendChild(updateBtnImg);
  taskOperaTd.appendChild(updateBtn);

  listRow.appendChild(taskOperaTd);

  return listRow;
}

//加载任务项到页面
function loadTaskItem(task) {
  let listRow = renderTask(task);
  let tbody = document.querySelector('tbody');
  tbody.appendChild(listRow);
}

//加载所有任务到页面
function loadAllTasks() {
  let allTasks = getAllTasks();

  if (allTasks) {
    getAllTasks().forEach((task) => {
      loadTaskItem(task);
    })
  }
}

//创建任务项
function createTaskItem() {
  let taskName = document.getElementById('taskName');
  let taskDeadline = document.getElementById('taskDeadline');
  let taskDescript = document.getElementById('taskDescript');

  let taskItem = {};
  taskItem.name = taskName.value;
  taskItem.deadline = taskDeadline.value;
  taskItem.description = taskDescript.value;
  taskItem.status = 'Active';

  if (checkTaskInform(taskName, taskDeadline, taskDescript)) {
    return;
  }

  let allTasks = getAllTasks() ? getAllTasks() : [];
  allTasks.push(taskItem);
  taskItem.index = allTasks.indexOf(taskItem) + 1;

  saveAllTasks(allTasks);
  closeTaskPanel();
  loadTaskItem(taskItem);
}

//显示修改任务信息面板
function showUpdatePanel() {
  let panelIcon = document.getElementById('panelIcon');
  panelIcon.setAttribute('src', 'images/model_update_icon.svg');

  let panelTitle = document.getElementById('panelTitle');
  panelTitle.textContent = 'Update A Task';

  let statusContainer = document.getElementById('statusContainer');
  statusContainer.classList.remove('disappear');

  showTaskPanel();
}

//修改任务信息
function updateTask(index) {
  let allTasks = getAllTasks();
  let taskObj = allTasks[index];

  let taskName = document.getElementById('taskName');
  taskName.value = taskObj.name;

  let taskDeadline = document.getElementById('taskDeadline');
  taskDeadline.value = taskObj.deadline;

  let taskDescript = document.getElementById('taskDescript');
  taskDescript.value = taskObj.description;

  let activeStatus = document.getElementById('active');
  let paddingStatus = document.getElementById('padding');
  let closedStatus = document.getElementById('closed');
  switch (taskObj.status) {
    case 'Active':
      activeStatus.checked = true;
      break;
    case 'Padding':
      paddingStatus.checked = true;
      break;
    case 'Closed':
      closedStatus.checked = true;
      break;
  }

  showUpdatePanel();

  let confirmBtn = document.getElementById('confirmBtn');
  confirmBtn.onclick = function () {
    taskObj.name = taskName.value;
    taskObj.deadline = taskDeadline.value;
    taskObj.description = taskDescript.value;

    if (activeStatus.checked) {
      taskObj.status = 'Active';
    } else if (paddingStatus.checked) {
      taskObj.status = 'Padding';
    } else if (closedStatus.checked) {
      taskObj.status = 'Closed';
    }

    if (checkTaskInform(taskName, taskDeadline, taskDescript)) {
      return;
    }

    saveAllTasks(allTasks);
    closeTaskPanel();

    clearTaskElements();
    loadAllTasks();
  }
}

//显示删除任务面板
function showDeletePanel(task) {
  let taskForm = document.getElementById('taskForm');
  taskForm.classList.add('disappear');

  let panelIcon = document.getElementById('panelIcon');
  panelIcon.setAttribute('src', 'images/model_delete_icon.svg');

  let panelTitle = document.getElementById('panelTitle');
  panelTitle.textContent = 'Delete Task';

  let askIfDelete = document.getElementById('askIfDelete');
  askIfDelete.classList.remove('disappear');
  askIfDelete.textContent = `Do you confirm to delete task: "${task.name}" ?`;

  showTaskPanel();
}

// 删除指定任务
function deleteTask(index) {
  let allTasks = getAllTasks();
  let task = allTasks[index];

  showDeletePanel(task);

  let confirmBtn = document.getElementById('confirmBtn');
  confirmBtn.onclick = function () {
    allTasks.splice(index, 1);
    allTasks.forEach((task, value) => {
      task.index = value + 1;
    })

    saveAllTasks(allTasks);
    closeTaskPanel();
    
    clearTaskElements();
    loadAllTasks();
  }

}

//清除页面中所有任务元素
function clearTaskElements() {
  let tbody = document.querySelector('tbody');
  let taskElements = tbody.children;
  for (let i = taskElements.length - 1; i >= 0; i--) {
    tbody.removeChild(taskElements[i]);
  }
}