import PinnedTasks from "./PinnedTasks"

export default class AllTasks {
    #allTasksList = []

    constructor () {
        this.inputEl = document.querySelector('.search')
        this.warningEl = document.querySelector('.warning')
        this.allTasksText = document.querySelector('.all-tasks-text')
        this.allTasksFilterText = document.querySelector('.all-tasks-filter-text')
        this.formEl = document.querySelector('.search-form')
        this.allTasksContainerEl = document.querySelector('.all-tasks-container')
        this.pinnedTasksContainerEl = document.querySelector('.pinned-tasks-container')
        this.pinnedTasks = new PinnedTasks()
    }

    init () {
        this.allTasksHandlers()
    }

    allTasksHandlers () {
        this.allTasksContainerEl.addEventListener('click', this.moveToPinnedTasks.bind(this))
        this.pinnedTasksContainerEl.addEventListener('click', this.moveToAllTasks.bind(this))
        this.inputEl.addEventListener('input', this.filterElements.bind(this))
        this.formEl.addEventListener('submit', this.createNewTask.bind(this))
    }

    createNewTask (e) {
        e.preventDefault()
        if (this.inputEl.value.trim()) {
            this.warningEl.hidden = true
            const newTaskEl = document.createElement('li')
            newTaskEl.classList.add('task')

            const taskText = document.createElement('span')
            taskText.textContent = this.inputEl.value

            const taskCheckbox = document.createElement('input')
            taskCheckbox.type = 'checkbox'
            taskCheckbox.classList.add('task-checkbox')

            newTaskEl.appendChild(taskText)
            newTaskEl.appendChild(taskCheckbox)

            this.addNewTask(newTaskEl)
            this.inputEl.value = ''
            this.filterElements()
        } else {
            this.warningEl.hidden = false
        }
    }

    addNewTask (task) {
        this.allTasksContainerEl.appendChild(task)
        this.addTask(task)
        this.allTasksText.hidden = true
    }

    addTask (task) {
        this.#allTasksList.push(task)
    }

    moveToPinnedTasks (e) {
        if (e.target.classList.contains('task-checkbox')) {
            const task = e.target.closest('.task')
            this.allTasksContainerEl.removeChild(task)
            this.pinnedTasks.addPinnedTask(task)
            this.#allTasksList.splice(this.#allTasksList.indexOf(task), 1)
            if (this.#allTasksList.length === 0) {
                this.allTasksText.hidden = false
            }
        }
    }

    moveToAllTasks (e) {
        if (e.target.classList.contains('task-checkbox')) {
            const task = e.target.closest('.task')
            this.pinnedTasks.removePinnedTask(task)
            this.addNewTask(task)
            this.filterElements()
        }
    }

    filterElements () {
        if (!this.inputEl.value.trim()) {
            this.#allTasksList.forEach(el => {
                el.hidden = false
                this.allTasksFilterText.hidden = true
            })
        } else {
            let counter = 0
            this.#allTasksList.forEach(el => {
                if (el.textContent.toLowerCase().startsWith(this.inputEl.value.toLowerCase())) {
                    el.hidden = false
                } else {
                    el.hidden = true
                    counter++
                }
            })
            if (this.#allTasksList.length && counter === this.#allTasksList.length) {
                this.allTasksFilterText.hidden = false
            } else {
                this.allTasksFilterText.hidden = true
            }
        }
    }
}
