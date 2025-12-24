import projectClass from "./project.js"
import todoClass from "./todo.js"
import Storage from "./storage.js"

const appController = (function(){
    let projects = [];
    let activeProject = null;

    const createProject = (title) => {
        const newProject = new projectClass(title);
        projects.push(newProject);
        save();
        return newProject;
    }

    const getProjects = () => {
        return projects;
    }

    const setActiveProject = (project) => {
        activeProject = project;
    }

    const save = () => {
        Storage.saveProjects(projects);
    }

    const getActiveProject = () => activeProject;

    const init = () => {

        const storedProjects = Storage.loadProjects();
        if(storedProjects){
            projects = storedProjects;
            setActiveProject(projects[0]);
        }
        else{
            const defaultProject = createProject("Default project");
            projects.push(defaultProject);
            setActiveProject(defaultProject);
        }
    }

    const addTodo = (name, description, date, prio) => {
        const todo = new todoClass(name, description, date, prio);
        activeProject.addTodo(todo);
        save();
        return todo;
    }

    const deleteTodo = (todoId) =>{
        activeProject.deleteTodo(todoId);
        save();
        return;

    }

    const editTodo = (todoId, name, description, date, prio) => {
        var todoEdit = activeProject.getTodo(todoId);
        todoEdit.title = name;
        todoEdit.description = description;
        todoEdit.dueDate = date;
        todoEdit.priority = prio;
    }
    const resetData = () => {
        Storage.reset()
        projects = [];
        activeProject = null;
        init();
    }


    return {
        createProject,
        getProjects,
        setActiveProject,
        getActiveProject,
        init,
        addTodo,
        deleteTodo,
        editTodo,
        resetData
    };
})();

export default appController;