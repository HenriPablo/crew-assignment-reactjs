export { filterPersons, assignPersonsToAss }

/** START LOAD PEOPLE */
let filterPersons = (type, persons) => {
    var x =[];

    for( let i = 0; i < persons.length; i++ ){
        if( persons[i]["roles"].includes( type ))
        {
            x.push( persons[i]);
        }
    }
    return x;
};

let assignPersonsToAss = (role, ass, persons, nk) => {
    for (let i = 0; i < ass.length; i++) {
        if (ass[i].assignmentKey === nk)
        {
            ass[i].assignedPersons = persons;
            ass[i].assignedRole = role;
        }
    }

    //console.log("ass in assignPersonsToAss: ", ass);
    return ass;
};
