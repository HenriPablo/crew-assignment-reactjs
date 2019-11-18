// Reducer
//import roles from "./data/roles.json";
import persons from "../data/people2.json";
import plane from "../data/plane";
import messages from "../data/messages";
import preferences from "../data/preferences"

const counter = (state, action) => {
    //console.log("state: ", state);
    console.log("action in REDUCER: ", action);

    let getDefaultPerson = function(){
        //return preferences.alwaysRenderSelf.defaultPerson; //persons.self;
        for( let i = 0; i < persons.length; i++ ){
            //console.log( "reducer persons[i]: ", persons[i]);
            if( persons[i].self === "true" ){
                //console.log( "reducer persons[i]: ", persons[i]);
                return persons[i];
            }
        }
    }

    let getDefaultRole = function(){
        return preferences.alwaysRenderSelf.defaultRole; //roles.pic;
    }

    let defaultAssigment = function(){
        if( preferences.alwaysRenderSelf.value === true){
            //console.log('trying to create a deafult assignment')
            return [{
                "assignedPerson": getDefaultPerson(),
                "assignedPersons": getDefaultPerson(),// { [preferences.alwaysRenderSelf.defaultPerson] : persons.self },
                "assignedRole": getDefaultRole(),
                "assignmentKey": 0
            }]
        } else {
        return [];
        }
    }

    let getAssigned = function(){
        if( preferences.alwaysRenderSelf.value === true){
            return 1;
        } else { return 0; }
    }

    // advance the nextKey if we're rendering a default assignment with pre-selected values on the first page load
    let getNextKey = function(){
        if( preferences.alwaysRenderSelf.value === true){
            return 1;
        } else {
            return  0;
        }
    }

    let getCount = function(){
        if(preferences.alwaysRenderSelf.value === true ){
            return 1;
        } else { return 0 }
    }

    if (state === undefined) {
        return {
            roles: null,
            persons: persons,
            messages: messages,
            preferences: preferences,
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
        case "assign":
            return {
                ...state,
                count: state.count + 1,
                nextKey: state.count + 1,
                ass: [action.ass, ...state.ass],
                assigned: state.assigned + 1,
                showModal: state.showModal
            };

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