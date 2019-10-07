import { put, takeLatest, all } from 'redux-saga/effects';

function* fetchRoles() {
    const json = yield fetch('http://localhost:3000/ajax-test.json' , {headers : {'Content-Type': 'application/json','Accept': 'application/json'}})
        .then( response => response.json());
        // .then( message => {
        // console.log("message: ", message);
        // console.log("actionType in saga: ", actionType );
        // console.log("state in saga: ", state )
        // //alert(message.message)
        // }
        // );

        //console.log( 'json in saga: ', json )

        yield put({ type: 'ROLES_RECEIVED', json: json });
    }
    function* actionWatcher(  ){
    //console.log("state in watcher: ", state )
    yield  takeLatest("GET_ROLES",   fetchRoles )
}

export default function* rootSaga(){
    yield all([
        actionWatcher(),
    ]);
}