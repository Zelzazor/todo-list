import { format } from 'date-fns';

const ToDo = (title, description, duedate, priority, notes, checked) => {

    let dueDate = format(duedate, 'PPPP');

    const getDate = () => {
        return dueDate;
    }

    const setDate = (newDate) => {
        dueDate = format(newDate, 'PPPP');
    }

    const getChecked = () => {
        return checked;
    }

    const changeCheck = () => {
        checked = !checked;
    }

    return { title, description, priority, notes, getDate, setDate, getChecked, changeCheck };

}

export { ToDo };
