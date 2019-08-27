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
    //filteredPersons: {},
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
            //dropdownSelection.filteredPersons = x;
            dropdownSelection.ass = assignPersonsToAss(
                value,
                props.ass,
                x,
                props.nextKey - 1
            );
            dropdownSelection.x = dropdownSelection.x + 1;

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
                y.push(<option>{[item][0]}</option>);
            });
            return y;
        }

        render() {
            //console.log("PROPS in ROLES DROPDOWN: ", this.props);
            return (
                <select
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
