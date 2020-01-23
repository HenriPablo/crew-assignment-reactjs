// Reducer
//import roles from "./data/roles.json";
import persons from "../data/people2.json";
import plane from "../data/plane";
import messages from "../data/messages";
//import preferences from "../data/preferences"

const counter = (state, action) => {
    //console.log("state: ", state);
    console.log("action in REDUCER: ", action);

    let getDefaultPerson = function(){
        //return preferences.alwaysRenderSelf.defaultPerson; //persons.self;
        for( let i = 0; i < persons.length; i++ ){
            console.log( "reducer persons[i]: ", persons[i]);
            if( persons[i].self === "true" ){
                console.log( "reducer persons[i]: ", persons[i]);
                return persons[i];
            }
        }
    }

    let getDefaultRole = function(x){
        console.log("x in getDefaultRole()")
        console.log(x);
        //return x.alwaysRenderSelf.defaultRole;
        return x.alwaysRenderSelf.defaultRole;
    }

    let defaultAssigment = function(x){
        let defaultAss = [];
        if( typeof x != "undefined" && x.alwaysRenderSelf.value === true){
            //console.log('trying to create a deafult assignment')
            defaultAss = [{
                "assignedPerson": getDefaultPerson(x),
                "assignedPersons": getDefaultPerson(x),// { [preferences.alwaysRenderSelf.defaultPerson] : persons.self },
                "assignedRole": getDefaultRole(x),
                "assignmentKey": 0
            }]
        }
        console.log("defaultAss in defaultAssigment() in reducer");
        console.log(defaultAss)
        return defaultAss;

    }

    let getAssigned = function(x){
        if( typeof x != "undefined" && x.alwaysRenderSelf.value === true){
            return 1;
        } else { return 0; }
    }

    // advance the nextKey if we're rendering a default assignment with pre-selected values on the first page load
    let getNextKey = function(x){
        if( typeof x != "undefined" && x.alwaysRenderSelf.value === true){
            return 1;
        } else {
            return  0;
        }
    }

    let getCount = function(x){
        if( typeof x != "undefined" && x.alwaysRenderSelf.value === true ){
            return 1;
        } else { return 0 }
    }

    if (state === undefined) {
        return {
            roles: null,
            persons: persons,
            messages: messages,
            preferences: {},
            selectionType: "",
            count: getCount(),//0,
            ass: defaultAssigment(),
            nextKey: getNextKey(),// 0,
            filterBy: "",
            /** marker updated in Roles and Persons dropdowns to force re-render of those elements  */
            x: new Date().getTime(),
            maxAssignments: plane.seats,
            assigned: getAssigned(),
            showModal: false
        }
    }

    switch (action.type) {

        //case "START_ASSIGN":
            //console.log("hi from START_ASSIGN in Reducer");


        /** THIS ONE NEEDS TO GET PREFERENCES AND ROLES */
        case "ASSIGN":
            console.log("jsonPreferences in reducer - ASSIGN")
            console.log(action.jsonPreferences)
            getDefaultRole(action.jsonPreferences);
            let z =
             {
                ...state,
                preferences: action.jsonPreferences,
                count: state.count + 1,
                nextKey: state.count + 1,
                ass: [action.ass, ...state.ass, defaultAssigment(action.jsonPreferences)],
                assigned: state.assigned + 1,
                showModal: state.showModal
            }
            console.log("z in ASSIGN action:");
            console.log( z );
            return z;

        case 'GET_ROLES' :
            return {
                ...state,
                loading: true
            };


        case 'ROLES_RECEIVED' :
            return {
                ...state,
                roles: action.json,
                loading: false
                //preferences: action.jsonPreferences
            };

        case 'PEOPLE_RECEIVED' :
            return {
                ...state,
                persons: action.json.persons,
                ass: action.json.ass,
                x: new Date().getTime(),
                loading: false
            };

        case "SELECT_PEOPLE":
            return {
                ...state,
                ass: action.ass,
                x: new Date().getTime(),
                loading: true
            };

        case "PERSON_SELECTED":
            return {
                ...state,
                ass: action.json.ass,
                x:new Date().getTime()
            };

        case "ASSIGNMENT_DELETED":
            return {
                ...state,
                ass: action.json.newAss,
                assigned: state.assigned - 1
            };

        case "showModal":
        return {
            ...state,
            showModal: action.showModal
        };
        case "hideModal":
            return {
                ...state,
                showModal: action.showModal
            }

        default:
            return state;
    }
}
export default counter;