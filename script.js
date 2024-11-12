const darkIcon = document.querySelector('.dark')
const lightIcon = document.querySelector('.light')
const body = document.querySelector('body')
const bgImg = document.querySelector('.bg-img')
const inputBox = document.querySelector('.input-box')
const todoLists = document.querySelector('.todo-lists')
const todoInput = document.querySelector('#todo-input')
const lines = document.querySelectorAll('.line')
const circles = document.querySelectorAll('.circle-1')
const inputCircle = document.querySelector('.circle')
const deleteIcons = document.querySelectorAll('.delete-todo')
const btn2 = document.querySelector('.btns-2')
const btnHover = document.querySelectorAll('.btns-dark')
const clearCompleted = document.querySelector('.clear-completed')
const form = document.querySelector('form')
const itemLeft = document.querySelector('.item-left')
const completedBtn = document.querySelectorAll('.completed-btn')
const allBtn = document.querySelectorAll('.all-btn')
const activeBtn = document.querySelectorAll('.active-btn')


const todosArr = []

// toggling between dark and light mode
lightIcon.addEventListener('click', () => {
    darkIcon.classList.remove('hidden')
    lightIcon.classList.add('hidden')
    localStorage.setItem('isLightModeEnabled', 'true')
    lightMode()
})

darkIcon.addEventListener('click', () => {
    darkIcon.classList.add('hidden')
    lightIcon.classList.remove('hidden')
    localStorage.setItem('isLightModeEnabled', 'false')
    darkMode()
})

function lightMode() {
    body.classList.add('light-bg')
    bgImg.classList.add('bg-img-light')
    bgImg.classList.remove('bg-img')
    inputBox.classList.add('light-bg', 'light-text', 'box-light')
    inputBox.classList.remove('box-dark')
    todoLists.classList.add('light-bg', 'light-text', 'box-light')
    todoLists.classList.remove('box-dark')
    todoInput.classList.remove('dark-text')
    inputCircle.classList.remove('small-bg-dark')
    inputCircle.classList.add('small-bg-light')
    deleteIcons.forEach((deleteIcon) => {
        deleteIcon.classList.remove('delete-icon-dark')
        deleteIcon.classList.add('delete-icon-light')
    })
    btn2.classList.add('light-bg', 'light-text', 'box-light')
    btn2.classList.remove('box-dark')
    btnHover.forEach((hover) => {
        hover.classList.add('btns-light')
        hover.classList.remove('btns-dark')
    })
    clearCompleted.classList.add('btns-light')
    clearCompleted.classList.remove('btns-dark')
}

function darkMode() {
    body.classList.remove('light-bg')
    bgImg.classList.remove('bg-img-light')
    bgImg.classList.add('bg-img')
    inputBox.classList.remove('light-bg', 'light-text', 'box-light')
    inputBox.classList.add('box-dark')
    todoLists.classList.remove('light-bg', 'light-text', 'box-light')
    todoLists.classList.add('box-dark')
    todoInput.classList.add('dark-text')
    inputCircle.classList.add('small-bg-dark')
    inputCircle.classList.remove('small-bg-light')
    deleteIcons.forEach((deleteIcon) => {
        deleteIcon.classList.add('delete-icon-dark')
        deleteIcon.classList.remove('delete-icon-light')
    })
    btn2.classList.remove('light-bg', 'light-text', 'box-light')
    btn2.classList.add('box-dark')
    btnHover.forEach((hover) => {
        hover.classList.remove('btns-light')
        hover.classList.add('btns-dark')
    })
    clearCompleted.classList.remove('btns-light')
    clearCompleted.classList.add('btns-dark')
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isLightModeEnabled') === 'true') {
        darkIcon.classList.remove('hidden')
        lightIcon.classList.add('hidden')
        localStorage.setItem('isLightModeEnabled', 'true')
        lightMode()
    } else {
        darkIcon.classList.add('hidden')
        lightIcon.classList.remove('hidden')
        localStorage.setItem('isLightModeEnabled', 'false')
        darkMode()
    }
})

// adding todos to the page
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const todos = document.createElement('div')
    todos.classList.add('todos', 'active', 'todos-display')
    todos.setAttribute('draggable', 'true')

    const circle1 = document.createElement('div')
    circle1.classList.add('circle-1', 'small-bg-dark', 'circle-1-dark')

    const checkIcon = document.createElement('i')
    checkIcon.classList.add('ri-check-line', 'check-icon')

    const todoText = document.createElement('div')
    todoText.classList.add('todo-work')

    const deleteIcon = document.createElement('i')
    deleteIcon.setAttribute('type', 'button')
    deleteIcon.classList.add('ri-close-large-line', 'delete-todo', 'delete-icon-dark')

    const line = document.createElement('div')
    line.classList.add('line', 'small-bg-dark')

    todoLists.insertBefore(line, todoLists.firstChild)
    todoLists.insertBefore(todos, todoLists.firstChild)

    todos.append(circle1, todoText, deleteIcon)
    circle1.append(checkIcon)

    todoText.innerText = todoInput.value;

    todoInput.value = ''

    todosArr.push(todos)
    itemLefts()

    // dark and light mode in checkbox and lines
    lightIcon.addEventListener('click', () => {
        line.classList.remove('small-bg-dark')
        line.classList.add('small-bg-light')

        circle1.classList.remove('small-bg-dark', 'circle-1-dark')
        circle1.classList.add('small-bg-light', 'circle-1-light')
    })

    darkIcon.addEventListener('click', () => {
        line.classList.add('small-bg-dark')
        line.classList.remove('small-bg-light')

        circle1.classList.add('small-bg-dark', 'circle-1-dark')
        circle1.classList.remove('small-bg-light', 'circle-1-light')
    })

    if (localStorage.getItem('isLightModeEnabled') === 'true') {
        line.classList.remove('small-bg-dark')
        line.classList.add('small-bg-light')

        circle1.classList.remove('small-bg-dark', 'circle-1-dark')
        circle1.classList.add('small-bg-light', 'circle-1-light')
    } else {
        line.classList.add('small-bg-dark')
        line.classList.remove('small-bg-light')

        circle1.classList.add('small-bg-dark', 'circle-1-dark')
        circle1.classList.remove('small-bg-light', 'circle-1-light')
    }

    // make the completed todo dashed and bg of the check box
    circle1.addEventListener('click', () => {
        circle1.classList.toggle('circle-bg')
        circle1.classList.toggle('no-hover') // removing hover after click on checkbox.
        checkIcon.classList.toggle('check-icon-show')
        todoText.classList.toggle('todos-text-completed')
        todos.classList.toggle('completed')
    })

    // removing todo on click of delete icon
    deleteIcon.addEventListener('click', (e) => {
        e.preventDefault();

        const nextLine = todos.nextElementSibling;
        if (nextLine) {
            nextLine.remove();
        }
        todos.remove();
        const index = todosArr.indexOf(todos);
        if (index !== -1) {
            todosArr.splice(index, 1);
        }
        itemLefts()
    });

});

// completed
completedBtn.forEach((comp)=>{
    comp.addEventListener('click', () => {
        todosArr.forEach((todo) => {
            if (!todo.classList.contains('completed')) {
                todo.classList.remove('todos-display')
                todo.nextElementSibling.classList.add('hidden');
                todo.classList.add('hidden');
            } else if (todo.classList.contains('hidden')) {
                todo.nextElementSibling.classList.remove('hidden');
                todo.classList.remove('hidden');
                todo.classList.add('todos-display')
            }
        })
        comp.classList.add('btns-color')
        comp.previousElementSibling.classList.remove('btns-color')
        comp.previousElementSibling.previousElementSibling.classList.remove('btns-color')
    })
})


// all
allBtn.forEach((all)=>{
    all.addEventListener('click', () => {
        todosArr.forEach((todo) => {
            todo.classList.add('todos-display')
            todo.nextElementSibling.classList.remove('hidden');
            todo.classList.remove('hidden');
        })
        all.nextElementSibling.nextElementSibling.classList.remove('btns-color')
        all.nextElementSibling.classList.remove('btns-color')
        all.classList.add('btns-color')
    })
})

// active
activeBtn.forEach((active)=>{
    active.addEventListener('click', () => {
        todosArr.forEach((todo) => {
            if (todo.classList.contains('completed')) {
                todo.classList.remove('todos-display')
                todo.nextElementSibling.classList.add('hidden');
                todo.classList.add('hidden');
            } else if (todo.classList.contains('hidden')) {
                todo.nextElementSibling.classList.remove('hidden');
                todo.classList.remove('hidden');
                todo.classList.add('todos-display')
            }
        })
        active.nextElementSibling.classList.remove('btns-color')
        active.classList.add('btns-color')
        active.previousElementSibling.classList.remove('btns-color')
    })
})


// clearing the completed on clicking completed

clearCompleted.addEventListener('click', () => {
    for (let i = todosArr.length - 1; i >= 0; i--) {
        const todo = todosArr[i];
        const nextLine = todo.nextElementSibling;

        if (todo.classList.contains('completed')) {
            if (nextLine) nextLine.remove();
            todo.remove();
            todosArr.splice(i, 1);
        }
    }
    itemLefts()
});

// setting the items left dynamically
function itemLefts(){
    itemLeft.innerText = `${todosArr.length} items left`
}

