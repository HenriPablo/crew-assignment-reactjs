// Reducer
//import roles from "./data/roles.json";
import persons from "../data/people2.json";
import plane from "../data/plane";
import messages from "../data/messages";
//import preferences from "../data/preferences"

const counter = (state, action) => {
    //console.log("state: ", state);
    console.log("action in REDUCER: ", action);

    // let getDefaultPerson = function(){
    //     //return preferences.alwaysRenderSelf.defaultPerson; //persons.self;
    //     for( let i = 0; i < persons.length; i++ ){
    //         console.log( "reducer persons[i]: ", persons[i]);
    //         if( persons[i].self === "true" ){
    //             console.log( "reducer persons[i]: ", persons[i]);
    //             return persons[i];
    //         }
    //     }
    // }


    // let defaultAssigment = function(x){
    //     let defaultAss = [];
    //     if( typeof x != "undefined" && x.alwaysRenderSelf.value === true){
    //         //console.log('trying to create a deafult assignment')
    //         console.log("getDefaultPerson(x): ", getDefaultPerson(x) );
    //         defaultAss = [{
    //             "assignedPerson": getDefaultPerson(x),
    //             "assignedPersons": getDefaultPerson(x),// { [preferences.alwaysRenderSelf.defaultPerson] : persons.self },
    //             "assignedRole": x.alwaysRenderSelf.defaultRole, //getDefaultRole(x),
    //             "assignmentKey": 0
    //         }]
    //     }
    //     console.log("defaultAss in DEFAULTASSIGMENT() in reducer");
    //     console.log(defaultAss)
    //     return defaultAss;
    //
    // }

    /**
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

    let getA = function (a1, a2, a3 ) {
        let a = [];
        if(typeof a1 != "undefined" && a1 != null ){ //&& a1.size > 0
            a.push( a1);
        }
        if(typeof a2 != "undefined" &&  a2 !=null ){
            a.push( a2);
        }
        if(typeof a3 != "undefined" &&  a3 != null && a3.size > 0){
            a.push( a3 );
        }
        return  a;
    }
     */

    if (state === undefined) {
        return {
            roles: null,
            persons: persons,
            messages: messages,
            preferences: {},
            selectionType: "",
            count: 0,//getCount(),
            ass:[],// defaultAssigment(),
            nextKey: 0,//getNextKey(),
            filterBy: "",
            /** marker updated in Roles and Persons dropdowns to force re-render of those elements  */
            x: new Date().getTime(),
            maxAssignments: plane.seats,
            assigned: 0,//getAssigned()
            showModal: false
        }
    }



    switch (action.type) {

        // case "START_AJAX_INIT":
        //      console.log("hi from START_AJAX_INIT in Reducer");
        //      console.log( "Action in START_AJAX_INIT reducer: ", action );
        //      return{
        //          ...state
        //      }

        case "AJAX_INIT_DONE":
             // console.log("hi from AJAX_INIT_DONE in Reducer");
              console.log( "in CASE - Action in AJAX_INIT_DONE reducer: ", action );
             return{
                 ...state,
                 preferences: action.bigJ.preferences,
                 ass:  action.bigJ.ass /*, ...state.ass*/ ,
                 count: action.bigJ.count,
                 nextKey: action.bigJ.nextKey,
                 assigned : action.bigJ.assigned
             }


        /** THIS ONE NEEDS TO GET PREFERENCES AND ROLES */
        case "assign":
            //console.log("jsonPreferences in reducer - ASSIGN", action.jsonPreferences)

            let z =
             {
                ...state,
                //preferences: action.jsonPreferences,
                count: state.count + 1,
                nextKey: state.count + 1,
                //ass: getA(action.ass, ...state.ass, defaultAssigment(action.jsonPreferences) ),
                 ass: [ action.ass, ...state.ass],
                 assigned: state.assigned + 1,
                showModal: state.showModal
            }
            //console.log("z in ASSIGN action:");
            //console.log( z );
            return z;

        case 'GET_ROLES' :
            return {
                ...state,
                loading: true
            };


        case 'ROLES_RECEIVED' :
            console.log( "STATE in CASE 'ROLES_RECIVED': ", ...state );
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