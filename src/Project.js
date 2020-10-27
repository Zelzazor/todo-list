import { ToDo } from './ToDo';


const Project = (title, description) => {

    let ToDos = [];

    const addToDo = (title, description, dueDate, priority, notes, checked) => {
        ToDos.push(ToDo(title, description, dueDate, priority, notes, checked));
    }
    const getAllToDos = () => {

        return ToDos;
    }
    
    const removeToDo = (index) => {
        ToDos.splice(index, 1);
    }
    
    const getToDo = (index) => {
        return ToDos[index];
    }
    return { title, description, addToDo, getAllToDos, removeToDo, getToDo };
}


export { Project };

