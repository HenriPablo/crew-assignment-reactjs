// Reducer
import roles from "./data/roles.json";
import persons from "./data/people.json";
import plane from "./data/plane";
import messages from "./data/messages";
import preferences from "./data/preferences"


const counter = (state, action) => {
    console.log("state: ", state);
    console.log("action: ", action);

    let getDefaultPerson = function(){
        return persons.self;
    }

    let getDefaultRole = function(){
        return roles.pic;
    }

    let defaultAssigment = function(){
        if( preferences.alwaysRenderSelf.value === true){
            console.log('trying to create a deafult assignment')
            return [{
                "assignedPersons": getDefaultPerson(),
                "assignedRole": getDefaultRole()
            }]
        } else {
        return [];
        }
    }

    if (state === undefined) {
        return {
            roles: roles,
            persons: persons,
            messages: messages,
            preferences: preferences,
            selectionType: "",
            count: 0,
            ass: defaultAssigment(),
            nextKey: 0,
            filterBy: "",
            /** marker updated in Roles and Persons dropdowns to force re-render of those elements  */
            x: new Date().getTime(),
            maxAssignments: plane.seats,
            assigned: 0,
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