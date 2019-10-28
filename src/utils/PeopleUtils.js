export { updatePersonSelection };

function updatePersonSelection(ass, persons, nk){
    for (let i = 0; i < ass.length; i++) {
        if (ass[i].assignmentKey === nk) {
            ass[i].assignedPersons = persons;
        }
    }
    return ass;
};
