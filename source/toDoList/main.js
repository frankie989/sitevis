// Форма
// Список задач
const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    title: 'Будильник.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
     title:'Завтрак.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    title: 'Физ нагрузка',
  },
 
];

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#583cb3',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#583cb3',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#3b15b9',
      '--default-btn-border-color': '#3b15b9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#53e0bf',
      '--default-btn-border-color': '#53e0bf',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };
  let lastSelectedTheme = 'default';

  // Elemnts UI
  const listContainer = document.querySelector(
    '.tasks__list',
  );
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const themeSelect = document.getElementById('themeSelect');

  // Events
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeletehandler);
  themeSelect.addEventListener('change', onThemeSelectHandler);

  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error('Передайте список задач!');
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id, title } = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'tasks__item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2',
      'list-style-position',
            
    );
    li.setAttribute('data-task-id', _id);

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'lighter';
    span.style.textAlign = 'center';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Del';
    deleteBtn.classList.add('btn', 'btn-outline-danger', 'ml-auto', 'delete-btn');

    li.appendChild(span);
    li.appendChild(deleteBtn);
   
    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
   
    if (!titleValue) {
      alert('Пожалуйста введите Задачу');
      return;
    }

    const task = createNewTask(titleValue);
    const listItem = listItemTemplate(task);
    listContainer.appendChild(listItem);
    form.reset();
  }

  function createNewTask(title) {
    const newTask = {
      title,
            completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  function onDeletehandler({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
    }
  }

  function onThemeSelectHandler(e) {
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(
      `Вы действительно хотите изменить тему: ${selectedTheme}`,
    );
    if (!isConfirmed) {
      themeSelect.value = lastSelectedTheme;
      return;
    }
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
  }

  function setTheme(name) {
    const selectedThemObj = themes[name];
    Object.entries(selectedThemObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
})(tasks);



// Добавляем возможность перетаскивания  


const tasksListElement = document.querySelector(`.tasks__list`);
const taskElements = tasksListElement.querySelectorAll(`.tasks__item`);

for (const task of taskElements) {
  task.draggable = true;
}

tasksListElement.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
});

tasksListElement.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`);
});

const getNextElement = (cursorPosition, currentElement) => {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
  
  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;
  
  return nextElement;
};

tasksListElement.addEventListener(`dragover`, (evt) => {
  evt.preventDefault();
  
  const activeElement = tasksListElement.querySelector(`.selected`);
  const currentElement = evt.target;
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(`tasks__item`);
    
  if (!isMoveable) {
    return;
  }
  
  const nextElement = getNextElement(evt.clientY, currentElement);
  
  if (
    nextElement && 
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  ) {
    return;
  }
		
	tasksListElement.insertBefore(activeElement, nextElement);
});


