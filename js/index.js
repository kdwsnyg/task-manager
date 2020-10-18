//加载任务数据
function loadTasksData() {
  showAllTasks();
  countTaskStatus();
}

//显示单项任务
function showTaskItem(task, index = task.index) {
  let listRow = renderTask(task, index);
  let tbody = document.querySelector('tbody');
  tbody.appendChild(listRow);
}

//显示所有任务
function showAllTasks() {
  clearTaskElements();

  let allTasks = getAllTasks();
  if (allTasks) {
    allTasks.forEach(task => {
      showTaskItem(task);
    })
  }
}

//显示指定状态的任务
function showSpecifiedStatusTasks(taskStatus) {
  let allTasks = getAllTasks();
  if(allTasks) {
    let resultTasks = allTasks.filter(task => task.status === taskStatus);
    resultTasks.forEach((task, index) => {
      showTaskItem(task, index+1);
    })
  }
}

//显示所有Active状态任务
function showActiveTasks() {
  clearTaskElements();
  showSpecifiedStatusTasks('Active');
}

//显示所有Padding状态任务
function showPaddingTasks() {
  clearTaskElements();
  showSpecifiedStatusTasks('Padding');
}

//显示所有Closed状态任务
function showClosedTasks() {
  clearTaskElements();
  showSpecifiedStatusTasks('Closed');
}

//统计各状态任务并显示在导航栏
function countTaskStatus() {
  let allTasks = getAllTasks();
  let totalAmount = allTasks.length;

  let allTasksAmount = document.getElementById('allTasksAmount');
  allTasksAmount.textContent = totalAmount;

  let activeCount = 0;
  let paddingCount = 0;
  let closedCount = 0;
  allTasks.forEach(task => {
    switch (task.status) {
      case 'Active':
        activeCount++;
        break;
      case 'Padding':
        paddingCount++;
        break;
      case 'Closed':
        closedCount++;
        break;
    }
  });

  let activeTasksAmount = document.getElementById('activeTasksAmount');
  activeTasksAmount.textContent = activeCount;
  let paddingTasksAmount = document.getElementById('paddingTasksAmount');
  paddingTasksAmount.textContent = paddingCount;
  let closedTasksAmount = document.getElementById('closedTasksAmount');
  closedTasksAmount.textContent = closedCount;
  
  let activeTasksPercent = document.getElementById('activeTasksPercent');
  let paddingTasksPercent = document.getElementById('paddingTasksPercent');
  let closedTasksPercent = document.getElementById('closedTasksPercent');
  if(totalAmount) {
    activeTasksPercent.textContent = `${Math.round(activeCount / totalAmount * 100)}%`;
    paddingTasksPercent.textContent = `${Math.round(paddingCount / totalAmount * 100)}%`;
    closedTasksPercent.textContent = `${Math.round(closedCount / totalAmount * 100)}%`;
  }else {
    activeTasksPercent.textContent = '0%';
    paddingTasksPercent.textContent = '0%';
    closedTasksPercent.textContent = '0%';
  }
}

//显示包含搜索关键词的任务
function showSearchTasks(searchContent) {
  let allTasks = getAllTasks();
  
  if(allTasks) {
    let resultTasks = allTasks.filter(task => task.name.includes(searchContent.trim()));
    resultTasks.forEach((task, index) => {
      showTaskItem(task, index+1);
    })
  }
}

//搜索任务
function searchTasks() {
  clearTaskElements();

  let searchText = document.getElementById('searchText');
  showSearchTasks(searchText.value);
}
