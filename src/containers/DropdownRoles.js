import React, { Component } from "react";
import { connect } from "react-redux";

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
const mapDispatchToProps = dispatch => {
    return {
        triggerChange: function( value, props) {
            dropdownSelection.filterBy = value;
            dropdownSelection.persons = props.persons;
            dropdownSelection.rolesKey = props.rolesKey;
            dropdownSelection.ass = props.ass;
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
                            event.target.value,
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
