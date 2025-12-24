import toDo from "./todo.js"
import project from "./project.js"

const Storage = (function(){

    const saveProjects = (projects) => {
        localStorage.setItem("todoProjects", JSON.stringify(projects));
        return loadProjects();
    };

    const loadProjects = () => {
        const data = localStorage.getItem("todoProjects");

        if(!data) return null;

        const rawProjects = JSON.parse(data);

        const reconstructed_projects = rawProjects.map(rawProject =>{

            const reconstructed_project = new project(rawProject.title);
            rawProject.todos.map(raw_todo => {
                const reconstructed_todo = new toDo(
                    raw_todo.title,
                    raw_todo.description,
                    raw_todo.dueDate,
                    raw_todo.priority
                );
                reconstructed_todo.id = raw_todo.id;
                reconstructed_project.addTodo(reconstructed_todo);
            })

            return reconstructed_project;
        });

        return reconstructed_projects;
    };

    const reset = () =>{
        localStorage.clear();
    }
    return {
        saveProjects,
        loadProjects,
        reset
    }
})();
export default Storage;