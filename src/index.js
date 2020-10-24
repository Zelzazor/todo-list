import { Project } from './Project';

const Projects = (() => {

    let projects = [];

    if (localStorage.hasOwnProperty("projects")) {
        let retrievedProjects = JSON.parse(localStorage.getItem("projects"));
        retrievedProjects.forEach(project => {
            projects.push(Project(project.title, project.description));
            if (localStorage.hasOwnProperty(project.title)) {
                let retrievedTodos = JSON.parse(localStorage.getItem(project.title));
                retrievedTodos.forEach(ToDo => {
                    projects[projects.length - 1].addToDo(ToDo.title, ToDo.description, ToDo.dueDate, ToDo.priority, ToDo.notes, ToDo.checked);
                });
            }

        });

    }


    const addProject = (title, description) => {
        projects.push(Project(title, description));
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    const editProject = (index, title, description) => {
        projects[index].title = title;
        projects[index].description = description;
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    const getAllProjects = () => {
        return projects;
    }

    const removeProject = (index) => {
        localStorage.removeItem(projects[index].title);
        projects.splice(index, 1);
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    return { addProject, getAllProjects, removeProject, editProject };
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
                todos.appendChild(ToDosDOM(project, index));
            });
            projectsDOM.appendChild(projectDOM);
        });

    }

    const ToDosDOM = (project, index) => {
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

        return bar;
    }


    const ProjectFieldsDOM = (project, index) => {
        let wrap = document.createElement("div");
        wrap.classList.add("project-options");
        let title = document.createElement("h1");
        title.textContent = project.title;
        let btnEdit = document.createElement("button");
        let btnDelete = document.createElement("button");
        btnEdit.id = "btnEdit";
        btnDelete.id = "btnDelete";
        btnEdit.textContent = "Edit";
        btnDelete.textContent = "Delete";

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

        btnEdit.addEventListener("click", () => {
            const projectsDOM = document.querySelector(".list-projects");
            while (projectsDOM.firstChild) {
                projectsDOM.removeChild(projectsDOM.lastChild);
            }
            document.querySelector("#btnAddProject").classList.add("hidden");
            document.querySelector("#btnBackProject").classList.remove("hidden");
            projectsDOM.appendChild(EditProjectDOM(project, index));
        });

        wrap.appendChild(title);
        wrap.appendChild(btnEdit);
        wrap.appendChild(btnDelete);
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
        btnSubmit.addEventListener("click", (e) => {
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
        });
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
        btnSubmit.addEventListener("click", (e) => {
            if (txtTitle.value !== "" && txtDescription.value !== "") {
                Projects.addProject(txtTitle.value, txtDescription.value);
                ManipulateDOM.reloadProjects();
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

    const eventsListeners = () => {
        const btnAddProject = document.querySelector("#btnAddProject");
        const btnBack = document.querySelector("#btnBackProject");
        btnAddProject.addEventListener("click", (e) => {
            const projectsDOM = document.querySelector(".list-projects");
            while (projectsDOM.firstChild) {
                projectsDOM.removeChild(projectsDOM.lastChild);
            }
            e.target.classList.add("hidden");
            btnBack.classList.remove("hidden");
            projectsDOM.appendChild(createNewProjectDOM());

        });
        btnBack.addEventListener("click", (e) => {
            e.target.classList.add("hidden");
            btnAddProject.classList.remove("hidden");
            ManipulateDOM.reloadProjects();
        });
    }
    return { reloadProjects, eventsListeners }
})();


ManipulateDOM.reloadProjects();
ManipulateDOM.eventsListeners();