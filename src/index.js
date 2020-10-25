import { Project } from './Project';
import { SVG } from './svg';

const LocalDB = (() => {
    const saveProjects = (projects) => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    const saveTodo = (title, ToDos) => {
        localStorage.setItem(title, JSON.stringify(ToDos));
    }

    const getProjects = () => {
        let projects = [];
        if (localStorage.hasOwnProperty("projects")) {
            let retrievedProjects = JSON.parse(localStorage.getItem("projects"));
            retrievedProjects.forEach(project => {
                projects.push(Project(project.title, project.description));
                if (localStorage.hasOwnProperty(project.title)) {
                    let retrievedTodos = JSON.parse(localStorage.getItem(project.title));
                    retrievedTodos.forEach(ToDo => {
                        projects[projects.length - 1].addToDo(ToDo.title, ToDo.description, ToDo.duedate, ToDo.priority, ToDo.notes, ToDo.checked);
                    });
                }

            });

        }
        return projects;
    }

    const removeToDos = (title) => {
        localStorage.removeItem(title);
    }

    return { saveProjects, getProjects, removeToDos, saveTodo };
})();

const Projects = (() => {

    let projects = LocalDB.getProjects();

    const addProject = (title, description) => {
        projects.push(Project(title, description));
        LocalDB.saveProjects(projects);
    }

    const editProject = (index, title, description) => {
        LocalDB.removeToDos(projects[index].title);
        projects[index].title = title;
        projects[index].description = description;
        LocalDB.saveProjects(projects);
        LocalDB.saveTodo(projects[index].title, projects[index].getAllToDos());
    }

    const getAllProjects = () => {
        return projects;
    }

    const addToDoOnProject = (index, title) => {
        projects[index].addToDo(title, "", new Date(), "Low", "", false);
        LocalDB.saveTodo(projects[index].title, projects[index].getAllToDos());

    }

    const getProject = (index) => {
        return projects[index];
    }

    const removeProject = (index) => {
        LocalDB.removeToDos(projects[index].title);
        projects.splice(index, 1);
        LocalDB.saveProjects(projects);
    }

    return { addProject, getAllProjects, removeProject, editProject, getProject, addToDoOnProject };
})();


const ManipulateDOM = (() => {

    const putProjects = () => {
        const projectsDOM = document.querySelector('.list-projects');
        let projects = Projects.getAllProjects();
        projects.forEach((project, index) => {
            let projectDOM = document.createElement("div");
            projectDOM.dataset.id = index;
            projectDOM.classList.add("project");
            let titleDOM = document.createElement("p");
            titleDOM.classList.add("title");
            titleDOM.textContent = project.title;
            let descDOM = document.createElement("p");
            descDOM.classList.add("description");
            descDOM.textContent = project.description;
            projectDOM.appendChild(titleDOM);
            projectDOM.appendChild(descDOM);
            projectDOM.addEventListener("click", () => {
                let projectDetails = document.querySelector(".project-details");
                let todos = document.querySelector(".todos");

                while (projectDetails.firstChild) {
                    projectDetails.removeChild(projectDetails.lastChild);
                }
                while (todos.firstChild) {
                    todos.removeChild(todos.lastChild);
                }
                projectDetails.appendChild(ProjectFieldsDOM(project, index));
                todos.appendChild(todosDOM(index));
                todos.appendChild(barDOM(index));
            })
            projectsDOM.appendChild(projectDOM);
        });

    }

    const todosDOM = (index) => {
        let todowrap = document.createElement("div");
        todowrap.classList.add("todowrap");
        Projects.getProject(index).getAllToDos().forEach((ToDo, index) => {
            let todo = document.createElement("div");
            todo.classList.add("todo");
            switch (ToDo.priority.toLowerCase()) {
                case 'low': todo.classList.add("low-p"); break;
                case 'medium': todo.classList.add("medium-p"); break;
                case 'high': todo.classList.add("high-p"); break;

            }
            let todo_info = document.createElement("div");
            todo_info.classList.add("todo-info");
            let todo_buttons = document.createElement("div");
            todo_buttons.classList.add("todo-btns");
            todo.dataset.id = index;
            let pTitle = document.createElement("p");
            pTitle.classList.add("todo-title");
            pTitle.textContent = ToDo.title;
            let pDescription = document.createElement("p");
            pDescription.classList.add("todo-description");
            pDescription.textContent = ToDo.description;
            let pDate = document.createElement("p");
            pDate.classList.add("todo-date");
            pDate.textContent = ToDo.duedate;
            let btnEdit = document.createElement("button");
            let btnDelete = document.createElement("button");
            btnDelete.id = "btnBorrarToDo";
            btnEdit.id = "btnEditarToDo";
            btnEdit.innerHTML = SVG.editBtn();
            btnDelete.innerHTML = SVG.deleteBtn();
            todo_buttons.appendChild(btnEdit);
            todo_buttons.appendChild(btnDelete);
            todo_info.appendChild(pTitle);
            todo_info.appendChild(pDescription);
            todo_info.appendChild(pDate);
            todo.appendChild(todo_info);
            todo.appendChild(todo_buttons);
            todowrap.appendChild(todo);
        });
        return todowrap;
    }

    const barDOM = (index) => {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        let input = document.createElement("input");
        input.type = "text";
        input.classList.add("text-fixed");
        let buttonAdd = document.createElement("button");
        buttonAdd.classList.add("btn-fixed");
        buttonAdd.textContent = "+";
        bar.appendChild(input);
        bar.appendChild(buttonAdd);
        buttonAdd.addEventListener("click", () => {
            if (input.value !== "") {
                const todos = document.querySelector(".todos");
                Projects.addToDoOnProject(index, input.value);
                while (todos.firstChild) {
                    todos.removeChild(todos.lastChild);
                }
                todos.appendChild(todosDOM(index));
                todos.appendChild(barDOM(index));
            }
            else {
                input.placeholder = "You should introduce something here.";
            }

        })

        return bar;
    }


    const ProjectFieldsDOM = (project, index) => {
        let wrap = document.createElement("div");
        wrap.classList.add("project-options");
        let info = document.createElement("div");
        info.classList.add("project-info");
        let wrapbuttons = document.createElement("div");
        wrapbuttons.classList.add("project-buttons");
        let title = document.createElement("h1");
        title.textContent = project.title;
        let btnEdit = document.createElement("button");
        let btnDelete = document.createElement("button");
        btnEdit.id = "btnEdit";
        btnDelete.id = "btnDelete";
        btnEdit.innerHTML = SVG.editBtn();
        btnDelete.innerHTML = SVG.deleteBtn();

        // Edit Button Action

        btnEdit.addEventListener("click", () => {

            const projectsDOM = document.querySelector(".list-projects");
            document.querySelector("#btnAddProject").classList.add("hidden");
            document.querySelector("#btnBackProject").classList.remove("hidden");
            projectsDOM.replaceChildren(EditProjectDOM(project, index));

        })

        // Delete Button Action

        btnDelete.addEventListener("click", () => {
            Projects.removeProject(index);
            let todos = document.querySelector(".todos");
            while (wrap.firstChild) {
                wrap.removeChild(wrap.lastChild);
            }
            while (todos.firstChild) {
                todos.removeChild(todos.lastChild);
            }
            reloadProjects();
        });
        info.appendChild(title);
        wrapbuttons.appendChild(btnEdit);
        wrapbuttons.appendChild(btnDelete);
        wrap.appendChild(info);
        wrap.appendChild(wrapbuttons);
        return wrap;
    }

    const EditProjectDOM = (project, index) => {
        let form = document.createElement("div");
        form.classList.add("form-add");
        let txtTitle = document.createElement("input");
        let lblTitle = document.createElement("label");
        lblTitle.htmlFor = "txtTitle";
        lblTitle.textContent = "Title:";
        let lblDescription = document.createElement("label");
        lblDescription.htmlFor = "txtDescription";
        lblDescription.textContent = "Description:";
        txtTitle.type = "text";
        txtTitle.id = "txtTitle";
        txtTitle.value = project.title;
        let txtDescription = document.createElement("input");
        txtDescription.type = "text";
        txtDescription.id = "txtDesc";
        txtDescription.value = project.description;
        let btnSubmit = document.createElement("button");
        btnSubmit.textContent = "Edit";
        btnSubmit.classList.add("btn-aside");
        let Error = document.createElement("p");
        Error.classList.add("hidden");
        Error.classList.add("error");
        form.appendChild(lblTitle);
        form.appendChild(txtTitle);
        form.appendChild(lblDescription);
        form.appendChild(txtDescription);
        form.appendChild(btnSubmit);
        form.appendChild(Error);
        btnSubmit.addEventListener("click", () => {
            if (txtTitle.value !== "" && txtDescription.value !== "") {
                Projects.editProject(index, txtTitle.value, txtDescription.value);
                reloadProjects();
                document.querySelector("#btnBackProject").classList.add("hidden");
                document.querySelector("#btnAddProject").classList.remove("hidden");
            }
            else {
                Error.textContent = "ERROR: Fields are still empty";
                Error.classList.remove("hidden");
            }
        })

        return form;
    }

    const createNewProjectDOM = () => {
        let form = document.createElement("div");
        form.classList.add("form-add");
        let txtTitle = document.createElement("input");
        let lblTitle = document.createElement("label");
        lblTitle.htmlFor = "txtTitle";
        lblTitle.textContent = "Title:";
        let lblDescription = document.createElement("label");
        lblDescription.htmlFor = "txtDescription";
        lblDescription.textContent = "Description:";
        txtTitle.type = "text";
        txtTitle.id = "txtTitle";
        let txtDescription = document.createElement("input");
        txtDescription.type = "text";
        txtDescription.id = "txtDesc";
        let btnSubmit = document.createElement("button");
        btnSubmit.textContent = "Create";
        btnSubmit.classList.add("btn-aside");
        let Error = document.createElement("p");
        Error.classList.add("hidden");
        Error.classList.add("error");
        form.appendChild(lblTitle);
        form.appendChild(txtTitle);
        form.appendChild(lblDescription);
        form.appendChild(txtDescription);
        form.appendChild(btnSubmit);
        form.appendChild(Error);

        // Submit Add Button Action
        btnSubmit.addEventListener("click", (e) => {
            if (txtTitle.value !== "" && txtDescription.value !== "") {
                Projects.addProject(txtTitle.value, txtDescription.value);
                reloadProjects();
                document.querySelector("#btnBackProject").classList.add("hidden");
                document.querySelector("#btnAddProject").classList.remove("hidden");
            }
            else {
                Error.textContent = "ERROR: Fields are still empty";
                Error.classList.remove("hidden");
            }
        });
        return form;
    }

    const reloadProjects = () => {
        const projectsDOM = document.querySelector(".list-projects");
        while (projectsDOM.firstChild) {
            projectsDOM.removeChild(projectsDOM.lastChild);
        }
        putProjects();
    }

    const InitialEvents = () => {
        const btnAddProject = document.querySelector("#btnAddProject");
        const btnBack = document.querySelector("#btnBackProject");
        btnAddProject.addEventListener("click", (e) => {
            const projectDOM = document.querySelector(".list-projects");

            e.target.classList.add("hidden");
            btnBack.classList.remove("hidden");
            projectDOM.replaceChildren(createNewProjectDOM());

        });
        btnBack.addEventListener("click", (e) => {
            e.target.classList.add("hidden");
            btnAddProject.classList.remove("hidden");
            reloadProjects();
        });
    }

    const init = () => {
        reloadProjects();
        InitialEvents();
    }

    return { init }
})();


ManipulateDOM.init();