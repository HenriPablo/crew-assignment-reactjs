import {put, takeLatest} from "@redux-saga/core/effects";
import persons from "../data/people2";
export {assignActionWatcher}

function* fetchAssign( action ) {
    console.log("action at TOP OF ASSIGN SAGA: ", action );
    let getDefaultPerson = function(persons){
        //return preferences.alwaysRenderSelf.defaultPerson; //persons.self;
        for( let i = 0; i < persons.length; i++ ){
            console.log( "reducer persons[i]: ", persons[i]);
            if( persons[i].self === "true" ){
                console.log( "reducer persons[i]: ", persons[i]);
                return persons[i];
            }
        }
    }

    let defaultAssigment = function( prefs, people ){
        let defaultAss = [];
        if( typeof prefs != "undefined" && prefs.alwaysRenderSelf.value === true){
            //console.log('trying to create a deafult assignment')
            console.log("getDefaultPerson(x): ", getDefaultPerson(people) );
            defaultAss = [{
                "assignedPerson": getDefaultPerson(people),
                "assignedPersons": getDefaultPerson(prefs),// { [preferences.alwaysRenderSelf.defaultPerson] : persons.self },
                "assignedRole": prefs.alwaysRenderSelf.defaultRole, //getDefaultRole(x),
                "assignmentKey": 0
            }]
        }
        console.log("defaultAss in DEFAULTASSIGMENT() in reducer");
        console.log(defaultAss)
        return defaultAss;

    }


    /** in LRAVEL this one needs to be initialized with a proper yield fetch */

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

    if( jsonPreferences.alwaysRenderSelf.value == true){
        const peopleJson = yield fetch('http://localhost:3000/ajax-people.json?roleId=89' , {headers : {'Content-Type': 'application/json','Accept': 'application/json'}})
            .then( response => response.json());

        console.log("peopleJson in ASSIGN SAGA: ", peopleJson )
        action.ass.push( defaultAssigment( jsonPreferences, peopleJson) );
    }


    console.log("action ASSIGN SAGA: ", action);

    yield put( {type: 'ASSIGN',jsonPreferences: jsonPreferences, action:action});
}

function* assignActionWatcher() {
    yield takeLatest("START_ASSIGN", fetchAssign );
}