import {updatePersonSelection} from "../utils/PeopleUtils";
import {put, takeLatest} from "@redux-saga/core/effects";
export { selectPeopleActionWatcher }

/** PERSON SELECTION */
function* createPersonAssignment( action ) {

    let action2 = {};
    let x = {};
    for (let i = 0; i < action.props.ass.length; i++) {
        if (
            action.props.ass[i].assignmentKey === action.props.nextKey - 1 &&
            action.props.ass[i].assignedPersons !== null
        ) {
            x = action.props.ass[i].assignedPersons;
        }
    }

    action2.x = new Date().getTime();
    action2.ass = updatePersonSelection(action.props.ass, x, action.props.nextKey - 1);


    console.log( "action in SAGA createPersonAssignment");
    yield put({ type: 'PERSON_SELECTED', json : action2 });
}

function* pSelectionActionWatcher(){
    yield takeLatest("pSelection", createPersonAssignment );
}

/** START LOAD PEOPLE */
var filterPersons = (type, persons) => {
    var x =[];

    for( let i = 0; i < persons.length; i++ ){
        if( persons[i]["roles"].includes( type ))
        {
            x.push( persons[i]);
        }
    }
    return x;
};

var assignPersonsToAss = (role, ass, persons, nk) => {
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

function* fetchPeople(action){
    console.log("Incoming ACTION to saga: ", action );
    /** TEMP  - remove in the Laravel proj. when we can actually get persons via the ajax call */
    const json = yield fetch('http://localhost:3000/ajax-people.json?roleId=89' , {headers : {'Content-Type': 'application/json','Accept': 'application/json'}})
        .then( response => response.json());

    let persons = filterPersons(action.filterBy, action.persons);

    let json2 = null;

    action.ass = assignPersonsToAss(
        action.filterBy,
        action.ass,
        persons,
        action.rolesKey
    );
    action.x = new Date().getTime();
    json2 = action;

    console.log( "action in Saga - fetchPeople method: ", action );

    /** get the proper proper - already filtered by role ID persons */
    //const json = yield fetch('http://localhost:3000/ajax-people.json?roleId=89' , {headers : {'Content-Type': 'application/json','Accept': 'application/json'}})
    //    .then( response => response.json());

    console.log("jason2 in SAGA: ", json2 );
    yield put( { type:'PEOPLE_RECEIVED', json: json2 });
}

function* selectPeopleActionWatcher(){
    yield takeLatest("SELECT_ROLE", fetchPeople );
}
/** END LOAD PEOPLE */
/** END PERSON SELECTION */
