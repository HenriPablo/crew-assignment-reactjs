import {put, takeLatest, takeEvery} from "@redux-saga/core/effects";
//export {triggerInitAjaxDataActionWatcher}

let getDefaultPerson = function(persons){
    //return preferences.alwaysRenderSelf.defaultPerson; //persons.self;
    for( let i = 0; i < persons.length; i++ ){
        //console.log( "SAGA persons[i]: ", persons[i]);
        if( persons[i].self === "true" ){
            //console.log( "AJAX_INIT_DONE SAGA persons[i]: ", persons[i]);
            return persons[i];
        }
    }
}

let defaultAssigment = function( prefs, people ){
    let defaultAss = [];
    if( typeof prefs != "undefined" && prefs.alwaysRenderSelf.value === true){
        //console.log('trying to create a deafult assignment')
        console.log("AJAX_INIT_DONE getDefaultPerson(x): ", getDefaultPerson(people) );
        defaultAss = [{
            "assignedPerson": getDefaultPerson(people),
            "assignedPersons": getDefaultPerson(prefs),// { [preferences.alwaysRenderSelf.defaultPerson] : persons.self },
            "assignedRole": prefs.alwaysRenderSelf.defaultRole, //getDefaultRole(x),
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
    const jsonPreferences = {
        "alwaysRenderSelf" : {
            "value" : true,
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


    action.count = 0;
    action.nextKey = 0;
    action.assigned = 0;
    action.preferences = jsonPreferences

    if( jsonPreferences.alwaysRenderSelf.value == true){
        const peopleJson = yield fetch('http://localhost:3000/ajax-people.json?roleId=89' , {headers : {'Content-Type': 'application/json','Accept': 'application/json'}})
            .then( response => response.json());

        console.log("peopleJson in AJAX_INIT_DONE SAGA: ", peopleJson )
//        action.ass.push( defaultAssigment( jsonPreferences, peopleJson) );
        action.ass[0]  = defaultAssigment( jsonPreferences, peopleJson);
        action.count = 1;
        action.nextKey = 1;
        action.assigned = 1;
    }
    let bigJ = action;

    //console.log("action AJAX_INIT_DONE SAGA: ", action);

    //jsonPreferences: jsonPreferences,
    yield put( { type: "AJAX_INIT_DONE", bigJ } );
}

export function* triggerInitAjaxDataActionWatcher(action) {

    // working example:
    //https://stackblitz.com/edit/react-redux-saga-demo

    //console.log("ARGUMENTS IN call to START_AJAX_INIT in triggerInitAjaxDataActionWatcher(): ", arguments)
    yield takeLatest("START_AJAX_INIT" , workFetchInitAjaxData);
    //yield put( { type: "AJAX_INIT_DONE", action:action} );
}