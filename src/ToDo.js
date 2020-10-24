import { format } from 'date-fns';

const ToDo = (title, description, duedate, priority, notes, checked) => {
    if (duedate instanceof Date) {
        duedate = format(duedate, 'PPPP');
    }


    const getDate = () => {
        return duedate;
    }

    const setDate = (newDate) => {
        duedate = format(newDate, 'PPPP');
    }

    const getChecked = () => {
        return checked;
    }

    const changeCheck = () => {
        checked = !checked;
    }

    return { title, description, priority, notes, duedate, checked, getDate, setDate, getChecked, changeCheck };

}

export { ToDo };
