export default class Pinnedtasks {
    #pinnedTasksList = []
    constructor () {
        this.pinnedTasksContainerEl = document.querySelector('.pinned-tasks-container')
        this.pinnedTasksText = document.querySelector('.pinned-tasks-text')
    }

    addPinnedTask (task) {
        this.pinnedTasksContainerEl.appendChild(task)
        this.addTask(task)
        this.pinnedTasksText.hidden = true
    }

    addTask (task) {
        this.#pinnedTasksList.push(task)
    }

    removePinnedTask (task) {
        this.pinnedTasksContainerEl.removeChild(task)
        this.#pinnedTasksList.splice(this.#pinnedTasksList.indexOf(task), 1)
        if (this.#pinnedTasksList.length === 0) {
            this.pinnedTasksText.hidden = false
        }
    }
}
