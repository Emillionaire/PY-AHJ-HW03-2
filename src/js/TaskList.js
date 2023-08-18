import AllTasks from "./AllTasks"

export default class TaskList {
    run () {
        const allTasks = new AllTasks()
        allTasks.init()
    }
}
