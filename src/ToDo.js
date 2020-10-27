

const ToDo = (title, description, duedate, priority, notes, checked) => {
    if(!(duedate instanceof Date)){
        duedate = new Date(duedate);
    }

    const getDate = () => {
        return duedate;
    }

    const setDate = (newDate = new Date()) => {
        if(duedate instanceof Date){
            duedate = newDate;
        }
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
