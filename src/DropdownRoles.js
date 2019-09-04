import React, { Component } from "react";
import { connect } from "react-redux";

var filterPersons = (type, persons) => {
    var x = {};
    //console.log("persons: ", persons);
    //console.log("object.keys:", Object.keys(persons));

    Object.keys(persons).forEach(item => {
        //console.log("item: ", item);
        if (persons[item].includes(type)) {
            x[item] = persons[item];
        }
    });
    //console.log("filtered persons: ", x);
    return x;
};

var assignPersonsToAss = (role, ass, persons, nk) => {
    for (let i = 0; i < ass.length; i++) {
        if (ass[i].assignmentKey === nk) {
            ass[i].assignedPersons = persons;
            ass[i].assignedRole = role;
        }
    }

    //console.log("ass in assignPersonsToAss: ", ass);
    return ass;
};

const mapStateToProps = state => {
    return {
        countValue: state.count,
        ass: state.ass,
        roles: state.roles,
        persons: state.persons,
        preferences: state.preferences,
        //filteredPersons: state.filteredPersons,
        nextKey: state.nextKey,
        x: state.x
    };
};

// Action
const dropdownSelection = {
    type: "dropdownSelection",
    filterBy: "",
    filteredType: "",
    ass: [],
    x: 0
};

// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
    return {
        triggerChange: function(event, value, buildDropdown, persons, props) {
            dropdownSelection.filterBy = value;
            dropdownSelection.filteredByData = buildDropdown;
            let x = filterPersons(value, persons);

            dropdownSelection.ass = assignPersonsToAss(
                value,
                props.ass,
                x,
                props.rolesKey //nextKey - 1
            );
            dropdownSelection.x = new Date().getTime();

            //console.log("dropdown selection: ", dropdownSelection);
            return dispatch(dropdownSelection);
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
            Object.keys(this.props.roles).forEach(item => {
                // console.log("[item][0]: ", [item][0] );
                // console.log("[this.props.preferences.alwaysRenderSelf.defaultRole][0]: ", [this.props.preferences.alwaysRenderSelf.defaultRole][0] )
                // console.log("this.props.preferences.alwaysRenderSelf.value === true: ", this.props.preferences.alwaysRenderSelf.value === true)
                // console.log("this.props.preferences.alwaysRenderSelf.defaultRole == item[0]: ", [this.props.preferences.alwaysRenderSelf.defaultRole][0] == [item][0]);

                //TODO: rework this using the [0] assignment if we have one
                //if( this.props.preferences.alwaysRenderSelf.value === true && [this.props.preferences.alwaysRenderSelf.defaultRole][0] == [item][0]){
                //    y.push(<option key={[item][0]} selected={"selected"} value={[item][0]}>{[item][0]}</option>);
                //} else {
                    y.push(<option key={[item][0]} value={[item][0]}>{[item][0]}</option>);
               // }

            });
            return y;
        }

        selectedRole(){
            if( this.props.rolesKey === 0 ){
                return this.props.ass[this.props.rolesKey].assignedRole;
            } else {return ""}
        }

        render() {
            console.log("PROPS in ROLES DROPDOWN: ", this.props);

            return (
                <select
                    id={"role-select-" + this.props.rolesKey}
                    name={"role-select-" + this.props.rolesKey}
                    defaultValue={ this.selectedRole() }
                    onChange={event =>
                        this.props.triggerChange(
                            event,
                            event.target.value,
                            this.props.buildDropdown,
                            this.props.persons,
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
