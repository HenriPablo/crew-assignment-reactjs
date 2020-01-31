// Reducer
//import roles from "./data/roles.json";
import persons from "../data/people2.json";
import plane from "../data/plane";
import messages from "../data/messages";


const counter = (state, action) => {
    console.log("action in REDUCER: ", action);

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

        case "AJAX_INIT_DONE":
              return{
                 ...state,
                 preferences: action.bigJ.preferences,
                  ass: action.bigJ.ass,
                 count: action.bigJ.count,
                 nextKey: action.bigJ.nextKey,
                 assigned : action.bigJ.assigned
             }


        /** THIS ONE NEEDS TO GET PREFERENCES AND ROLES */
        case "assign":

             return {
                ...state,
                count: state.count + 1,
                nextKey: state.count + 1,
                 ass: [ action.ass, ...state.ass],
                 assigned: state.assigned + 1,
                showModal: state.showModal
            }

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