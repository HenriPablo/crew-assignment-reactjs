// Reducer
import roles from "./data/roles.json";
import persons from "./data/people.json";

const counter = (state, action) => {
    console.log("state: ", state);
    console.log("action: ", action);

    if (state === undefined) {
        return {
            roles: roles,
            persons: persons,
            selectionType: "",
            count: 0,
            ass: [],
            nextKey: 0,
            filterBy: ""
            //filteredPersons: {}
        };
    }

    switch (action.type) {
        case "assign":
            return {
                ...state,
                count: state.count + 1,
                nextKey: state.count + 1, // action.nextKey,
                ass: [action.ass, ...state.ass]
            };

        case "dropdownSelection":
            return {
                ...state,
                // filteredType - if 'roles' return filtered PERSONS
                //filteredPersons: action.filteredPersons,
                ass: action.ass, //action.ass,
                x: action.x + 1
            };

        case "personSelection":
            return {
                ...state,
                ass: action.ass, //action.ass, //action.ass
                x: action.x + 1
            };

        case "deleteAssignment":
            return {
                ...state,
                //count: state.count - 1,
                ass: action.newAss
            };

        default:
            return state;
    }
};

export default counter;
