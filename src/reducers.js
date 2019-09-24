// Reducer
//import roles from "./data/roles.json";
import roles from "./data/roles2.json"

//import persons from "./data/people.json";
import persons from "./data/people2.json";

import plane from "./data/plane";
import messages from "./data/messages";
import preferences from "./data/preferences"


const counter = (state, action) => {
    //console.log("state: ", state);
    //console.log("action: ", action);

    let loadRoles = function(){
        /**
         * some guildes:
         *      https://www.thegreatcodeadventure.com/react-redux-tutorial-part-iii-async-redux/
         *      https://blog.jscrambler.com/asynchronous-operations-in-react-redux/
         *      http://mkumaran.net/2019/bestWayToDoAsyncInReactJsUsingHooks/
         *
         *      https://redux.js.org/advanced/async-actions
         */

    }

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
            roles: roles,
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

        case "dropdownSelection":
            return {
                ...state,
                ass: action.ass,
                x: new Date().getTime()
            };

        case "personSelection":
            return {
                ...state,
                ass: action.ass,
                x: new Date().getTime()
            };

        case "deleteAssignment":
            return {
                ...state,
                ass: action.newAss,
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