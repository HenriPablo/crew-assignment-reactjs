import {put, takeLatest} from "@redux-saga/core/effects";
import {createAssignSelfPrefs} from "../utils/AppInitutils";

let getDefaultPerson = function(persons){
    let defautlPerson = {};
    for( let i = 0; i < persons.length; i++ ){
        if( persons[i].self === "true" ){
            defautlPerson = persons[i];
            break;
        }
    }
    return defautlPerson;
}

let defaultAssigment = function( prefs, people ){
    let defaultAss = [];
    if( typeof prefs != "undefined" && prefs.alwaysRenderSelf === true){
        defaultAss = [{
            "assignedPerson": getDefaultPerson(people),
            "assignedPersons": getDefaultPerson(people),// { [preferences.alwaysRenderSelf.defaultPerson] : persons.self },
            "assignedRole": prefs.defaultRole, //getDefaultRole(x),
            "assignmentKey": 0
        }]
    }
    console.log("defaultAss in AJAX_INIT_DONE in saga", defaultAss);
    return defaultAss;

}


function* workFetchInitAjaxData( action ) {
    console.log("action at TOP OF ASSIGN SAGA: ", action );

    /** in LRAVEL this one needs to be initialized with a proper yield fetch */
    action.ass = [];
    action.count = 0;
    action.nextKey = 0;
    action.assigned = 0;

    // const jsonPreferences = {
    //     "alwaysRenderSelf" : {
    //         "value" : true,
    //         "tip" : "Render dropdown selects for Self as pilot and specified role, for example PIC, Student, etc.",
    //         "defaultRole" : "59",
    //         "defaultPerson" : "self"
    //     }
    // }

    const jsonPreferences1 = {
        "alwaysRenderSelf" : true,
        "tip" : "Render dropdown selects for Self as pilot and specified role, for example PIC, Student, etc.",
        "defaultRole" : "59",
        "defaultPerson" : "self"
    }

    const rawPrefs = [
        {
            "id": 102,
            "preference_value": 1,
            "preference_code": "always_render_self",
            "preference_label": "Always Render Self",
            "preference_tip": "Whether or not to assign \"selft\" as the derfault PIC Crewmember on a flight",
            "preferences_group_id": 100
        },
        {
            "id": 103,
            "preference_value": 59,
            "preference_code": "default_role",
            "preference_label": "Default Role",
            "preference_tip": "Default role for the crewmember assigned to a flight by default",
            "preferences_group_id": 100
        },
        {
            "id": 104,
            "preference_value": "self",
            "preference_code": "default_person",
            "preference_label": "Default Person",
            "preference_tip": "Person assigned to flight by default, DEFAULT_ROLE is the role they will perform as a crewmember on the flight",
            "preferences_group_id": 100
        }
    ];

    const rawPrefsDB = [{"id":103,"preference_code":"default_role","preference_label":"Default Role","preference_tip":"Default role for the crewmember assigned to a flight by default","preferences_group_id":100,"preference_value":"59"},{"id":104,"preference_code":"default_person","preference_label":"Default Person","preference_tip":"Person assigned to flight by default, DEFAULT_ROLE is the role they will perform as a crewmember on the flight","preferences_group_id":100,"preference_value":"self"},{"id":102,"preference_code":"always_render_self","preference_label":"Always Render Self","preference_tip":"Whether or not to assign \"selft\" as the derfault PIC Crewmember on a flight","preferences_group_id":100,"preference_value":"1"}]

    // yield fetch('/getPreferencesAjax',
    // {
    //     headers: {
    //         'Content-Type':'application/json', 'Accept':'application/json'
    //     }
    // }).then( response => response.json());

    const jsonPreferences = createAssignSelfPrefs( rawPrefsDB );

    action.count = 0;
    action.nextKey = 0;
    action.assigned = 0;
    action.preferences = jsonPreferences;

    if( jsonPreferences.alwaysRenderSelf == true){
        const peopleJson = yield fetch('http://localhost:3000/ajax-people.json?roleId=89' , {headers : {'Content-Type': 'application/json','Accept': 'application/json'}})
            .then( response => response.json());

        action.ass = defaultAssigment( jsonPreferences, peopleJson);
        action.count = 1;
        action.nextKey = 1;
        action.assigned = 1;
    }

    let bigJ = action;

    yield put( { type: "AJAX_INIT_DONE", bigJ } );
}

export function* triggerInitAjaxDataActionWatcher() {
    yield takeLatest("START_AJAX_INIT" , workFetchInitAjaxData);
}