import React, { Component } from "react";
import { connect } from "react-redux";
import { selectRole } from "../actions";

// var filterPersons = (type, persons) => {
//     var x =[];
//     for( let i = 0; i < persons.length; i++ ){
//
//         if( persons[i]["roles"].includes( type ))
//         {
//             x.push( persons[i]);
//         }
//     }
//     return x;
// };

// var assignPersonsToAss = (role, ass, persons, nk) => {
//     for (let i = 0; i < ass.length; i++) {
//         if (ass[i].assignmentKey === nk) {
//             ass[i].assignedPersons = persons;
//             ass[i].assignedRole = role;
//         }
//     }
//
//     //console.log("ass in assignPersonsToAss: ", ass);
//     return ass;
// };

const mapStateToProps = state => {
    return {
        countValue: state.count,
        ass: state.ass,
        roles: state.roles,
        persons: state.persons,
        preferences: state.preferences,
        nextKey: state.nextKey,
        x: state.x
    };
};

// Action
const dropdownSelection = {
    type: "SELECT_ROLE",
    filterBy: "",
    filteredType: "",
    ass: [],
    x: 0,
    persons: null,
    rolesKey:null
};

// Map Redux actions to component props
//const mapDispatchToProps = dispatch => {
const mapDispatchToProps = dispatch => {
    //selectRole : selectRole(props)
    //return
    //dispatch(selectRole)
    return {

        //selectRole: selectRole(),
        //triggerChange : (event, value) => selectRole
        //selectRole : selectRole

        triggerChange: function(/*event,*/ value, /*buildDropdown,persons,*/  props) {
            dropdownSelection.filterBy = value;
            dropdownSelection.persons = props.persons;
            dropdownSelection.rolesKey = props.rolesKey;
            //dropdownSelection.filteredByData = buildDropdown;
            return dispatch(dropdownSelection);//{type:"SELECT_ROLE"},
            //return dispatch(selectRole);
        }
    };
};



const connectedDropdownSelect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export const DropdownRoles = connectedDropdownSelect(
    class extends Component {

        buildDropdownOptions() {
            let y = [];
            for( let i = 0; i < this.props.roles.length; i++){
                y.push( <option key={this.props.roles[i]["id"]} value={this.props.roles[i]["id"]}>{this.props.roles[i]["role"]}</option> )
            }
            return y;
        }

        selectedRole(){
            if( this.props.rolesKey === 0 ){
                return this.props.ass[this.props.rolesKey].assignedRole;
            } else {return ""}
        }



        render() {
            //console.log("PROPS in ROLES DROPDOWN: ", this.props);

            return (
                <select
                    id={"role-select-" + this.props.rolesKey}
                    name={"role-select-" + this.props.rolesKey}
                    defaultValue={ this.selectedRole() }
                    onChange={event =>
                        this.props.triggerChange(
                        //this.send(
                            /*event,*/
                            event.target.value,
                            //this.props.buildDropdown,
                            /*this.props.persons,*/
                            this.props
                        )
                    }
                    className={this.props.customClassNames}
                >
                    <option>{this.props.emptyDefaultOption}</option>
                    {this.buildDropdownOptions()}
                </select>
            );
        }
    }
);

export default DropdownRoles;
