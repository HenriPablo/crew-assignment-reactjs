import {put, takeLatest} from "@redux-saga/core/effects";
export {assignActionWatcher}

function* fetchAssign() {

    /** in LRAVEL this one needs to be initialized with a proper yield fetch */

    const jsonPreferences = {
        "alwaysRenderSelf" : {
            "value" : false,
            "tip" : "Render dropdown selects for Self as pilot and specified role, for example PIC, Student, etc.",
            "defaultRole" : "59",
            "defaultPerson" : "self"
        }
    }

    // yield fetch('/getPreferencesAjax',
    // {
    //     headers: {
    //         'Content-Type':'application/json', 'Accept':'application/json'
    //     }
    // }).then( response => response.json());

    yield put( {type: 'ASSIGN',jsonPreferences: jsonPreferences});
}

function* assignActionWatcher() {
    yield takeLatest("START_ASSIGN", fetchAssign );
}