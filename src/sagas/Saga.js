import { put, takeLatest, all } from 'redux-saga/effects';


/** LOAD ROLES */
function* fetchRoles() {
    const json = yield fetch('http://localhost:3000/ajax-test.json' , {headers : {'Content-Type': 'application/json','Accept': 'application/json'}})
        .then( response => response.json());

    yield put({ type: 'ROLES_RECEIVED', json: json });
}

function* actionWatcher(){
    yield  takeLatest("GET_ROLES",   fetchRoles );
}

/** LOAD PEOPLE */
function* fetchPeople(action){

    console.log( "action in Saga - fetchPeople method: ", action );

    const json = yield fetch('http://localhost:3000/ajax-people.json' , {headers : {'Content-Type': 'application/json','Accept': 'application/json'}})
        .then( response => response.json());

    yield put( { type:'PEOPLE_RECEIVED', json: json });
}

function* selectPeopleActionWatcher(){

    //console.log("action in SAGA: ", action );
    yield takeLatest("SELECT_ROLE", fetchPeople );
}

export default function* rootSaga(){
    yield all([
        actionWatcher(),
        selectPeopleActionWatcher()
    ]);
}