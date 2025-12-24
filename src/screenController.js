import appController from "./appController.js"

const screenController = (function(){
    const sideBar = document.querySelector("#sidebar_container");
    var editTodoId = null;

    const projectHeader = document.getElementById("project_header");
    const todoListHeader = document.getElementById("todo_list_header");
    const headerContainer = document.getElementById("header_container");

    const addProjectButton = document.querySelector(".add_project_button");
    const addTodoButton = document.querySelector(".add_todo_button");

    const closeProjectButton = document.querySelector("#close_project_dialog");
    const closeTodoButton = document.querySelector("#close_todo_dialog");

    const projectDialog = document.querySelector("#project_dialog");
    const todoDialog = document.querySelector("#todo_dialog");

    const projectForm = document.querySelector("#project_form");
    const todoForm = document.querySelector("#todo_form");

    const projectListDiv = document.getElementById("project_list");
    const todoListDiv = document.getElementById("todo_list");

    const cleanUpButton = document.createElement("button");
    cleanUpButton.classList.add("add-btn")
    cleanUpButton.setAttribute("id", "clean-up");
    cleanUpButton.textContent="Clean up";

    cleanUpButton.addEventListener("click", () => {
        appController.resetData();
        init();
    })
    


    const updateScreen = () => { 
        projectListDiv.innerHTML = "";
        todoListDiv.innerHTML = "";
        headerContainer.appendChild(cleanUpButton);

        const projects = appController.getProjects();
        const activeProject = appController.getActiveProject();
        
        projectHeader.textContent = activeProject.title;
        todoListHeader.textContent = activeProject.title + " todo items:";

        projects.forEach((project) => {
            const project_card = document.createElement("button");
            project_card.classList.add("project_btn");
            project_card.textContent = project.title;

            if(project === activeProject) {
                project_card.classList.add("active");
                console.log(activeProject.getTodos());


                activeProject.getTodos().forEach((todoItem) => {
                    console.log(todoItem.title);
                    const todo_card = createCard(todoItem);
                    todoListDiv.appendChild(todo_card);
                })
            }
            project_card.addEventListener(("click"), () => {
                appController.setActiveProject(project);
                updateScreen();
            })
            projectListDiv.appendChild(project_card);
        })
    }
      


    

    const init = () => {
        appController.init();
        updateScreen();

        addProjectButton.addEventListener("click", () => projectDialog.showModal());
        addTodoButton.addEventListener("click", () => todoDialog.showModal());

        closeProjectButton.addEventListener("click", () => projectDialog.close());
        closeTodoButton.addEventListener("click", () => todoDialog.close())



        projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.querySelector("#project_name").value;
             if(name){
                const newProject = appController.createProject(name);
                appController.setActiveProject(newProject)
                updateScreen();
                projectForm.reset();
                projectDialog.close();
             }
        });

        todoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const todo_name = document.querySelector("#todo_name");
            const todo_description = document.querySelector("#todo_description");
            const todo_date = document.querySelector("#todo_due_date");
            const todo_priority = document.querySelector("#todo_priority");

            if(editTodoId){
                console.log("test");
                appController.editTodo(
                    editTodoId,
                    todo_name.value,
                    todo_description.value,
                    todo_date.value,
                    todo_priority.value
                );
            }
            else if (todo_name.value && todo_description && todo_date && todo_priority){
                appController.addTodo(
                    todo_name.value,
                    todo_description.value,
                    todo_date.value,
                    todo_priority.value);    
            }
            editTodoId = null;
            updateScreen();
            todoForm.reset();
            todoDialog.close();


        })
    }

        const createCard = (todoItem) =>{
        const html_ele = `
            <div class="todo_info">
                <div class="todo_title">${todoItem.title}</div>
                <div class="todo_description">${todoItem.description}</div>
                <div class="todo_duedate">${todoItem.dueDate}</div>
                <div class="todo_priority">${todoItem.priority}</div>
            </div>
            <div class="todo_actions">
                <button id="todo_delete">X</button>
                <button id="todo_edit">Edit</button>
            </div>
            `
            const card = document.createElement("div");
            card.innerHTML = html_ele;
            card.classList.add("todo_card");

            const editButton = card.querySelector("#todo_edit");
            const deleteButton = card.querySelector("#todo_delete");

            editButton.addEventListener("click", () => {
                editTodoId = todoItem.id;
                
                const todo_name = document.querySelector("#todo_name");
                const todo_description = document.querySelector("#todo_description");
                const todo_date = document.querySelector("#todo_due_date");
                const todo_priority = document.querySelector("#todo_priority");

                todo_name.value = todoItem.title;
                todo_description.value = todoItem.description;
                todo_date.value = todoItem.dueDate;
                todo_priority.value = todoItem.priority;
                todoDialog.showModal();
            })
            deleteButton.addEventListener("click", () => {
                appController.deleteTodo(todoItem.id);
                updateScreen();
            })
            return card;
        };
    return { init };
})();


export default screenController;