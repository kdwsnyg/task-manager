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
  allTasks.forEach(task => {
    showTaskItem(task);
  })

}

//显示指定状态的任务
function showSpecifiedStatusTasks(taskStatus) {
  let allTasks = getAllTasks();
  let resultTasks = allTasks.filter(task => task.status === taskStatus);
  resultTasks.forEach((task, index) => {
    showTaskItem(task, index + 1);
  })
}

//显示所有Active状态任务
function showActiveTasks() {
  clearTaskElements();
  showSpecifiedStatusTasks('Active');
  resetSortBtns();
}

//显示所有Padding状态任务
function showPaddingTasks() {
  clearTaskElements();
  showSpecifiedStatusTasks('Padding');
  resetSortBtns();
}

//显示所有Closed状态任务
function showClosedTasks() {
  clearTaskElements();
  showSpecifiedStatusTasks('Closed');
  resetSortBtns();
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
  if (totalAmount) {
    activeTasksPercent.textContent = `${Math.round(activeCount / totalAmount * 100)}%`;
    paddingTasksPercent.textContent = `${Math.round(paddingCount / totalAmount * 100)}%`;
    closedTasksPercent.textContent = `${Math.round(closedCount / totalAmount * 100)}%`;
  } else {
    activeTasksPercent.textContent = '0%';
    paddingTasksPercent.textContent = '0%';
    closedTasksPercent.textContent = '0%';
  }
}

//显示包含搜索关键词的任务
function showSearchTasks(searchContent) {
  let allTasks = getAllTasks();
  let resultTasks = allTasks.filter(task => task.name.includes(searchContent.trim()));
  resultTasks.forEach((task, index) => {
    showTaskItem(task, index + 1);
  })
}

//搜索任务
function searchTasks() {
  let searchText = document.getElementById('searchText');
  let searchContent = searchText.value;
  if (searchContent && searchContent.trim()) {
    clearTaskElements();
    showSearchTasks(searchContent);
  }
}

//按回车键搜索任务
function searchByTypeEnter(event) {
  if (event.keyCode === 13) {
    searchTasks();
  }
}

//任务排序
function sortTasks(ele, category, upOrDown) {
  resetSortBtns();

  let allTasks = getAllTasks();
  let tbody = document.querySelector('tbody');
  let taskRows = tbody.children;
  let taskNames = [];

  if (category === 'name') {
    for (let i = 0; i < taskRows.length; i++) {
      taskNames.push(taskRows[i].children[1].textContent.toLowerCase());
    }

    switch (upOrDown) {
      case 'up':
        ele.classList.add('sortup-btn-on');
        taskNames.sort();
        break;
      case 'down':
        ele.classList.add('sortdown-btn-on');
        taskNames.sort().reverse();
        break;
    }

    clearTaskElements();
    taskNames.forEach((taskName, index) => {
      allTasks.forEach(task => {
        if (task.name.toLowerCase() === taskName) {
          showTaskItem(task, index + 1);
        }
      })
    })
  } else if (category === 'deadline') {
    let taskDeadlines = [];
    for (let i = 0; i < taskRows.length; i++) {
      taskNames.push(taskRows[i].children[1].textContent);
      taskDeadlines.push(taskRows[i].children[3].textContent.toLowerCase());
    }

    let currentShowTasks = [];
    taskNames.forEach(taskName => {
      allTasks.forEach(task => {
        if (task.name === taskName) {
          currentShowTasks.push(task);
        }
      })
    })

    switch (upOrDown) {
      case 'up':
        ele.classList.add('sortup-btn-on');
        taskDeadlines.sort();
        break;
      case 'down':
        ele.classList.add('sortdown-btn-on');
        taskDeadlines.sort().reverse();
        break;
    }
    taskDeadlines = new Set(taskDeadlines);

    clearTaskElements();

    let index = 0;
    taskDeadlines.forEach(deadlineValue => {
      currentShowTasks.forEach(task => {
        if (task.deadline.toLowerCase() === deadlineValue) {
          showTaskItem(task, index + 1);
          index++;
        }
      })
    })
  } else if (category === 'status') {
    for (let i = 0; i < taskRows.length; i++) {
      taskNames.push(taskRows[i].children[1].textContent);
    }

    let currentShowTasks = [];
    taskNames.forEach(taskName => {
      allTasks.forEach(task => {
        if (task.name === taskName) {
          currentShowTasks.push(task);
        }
      })
    })

    let statusOrder;
    switch (upOrDown) {
      case 'up':
        ele.classList.add('sortup-btn-on');
        statusOrder = ['Active', 'Padding', 'Closed'];
        break;
      case 'down':
        ele.classList.add('sortdown-btn-on');
        statusOrder = ['Closed', 'Padding', 'Active'];
        break;
    }

    clearTaskElements();
    let index = 0;
    statusOrder.forEach(taskStatus => {
      currentShowTasks.forEach(task => {
        if (task.status === taskStatus) {
          showTaskItem(task, index + 1);
          index++;
        }
      })
    })
  }
}

//重置所有排序按钮样式
function resetSortBtns() {
  let sortBtns = document.getElementsByClassName('sort-btn');
  Array.from(sortBtns).forEach(btnEle => {
    btnEle.classList.remove('sortup-btn-on', 'sortdown-btn-on');
  });
}