import React, { Component } from "react";
//import { connect } from "react-redux";
import { DeleteAssignmentBtn } from "./DeleteAssignmentBtn";
import { DropdownRoles } from "./DropdownRoles";
import { DropdownPersons } from "./DropdownPersons";

class Assignment extends Component {
    render() {
        return (
            <div
                key={this.props.count}
                className={"assignment d-flex justify-content-sm-between"}
            >

                <DropdownRoles
                    emptyDefaultOption={"Select a Role"}
                    customClassNames={"custom-select select-role"}
                    buildDropdown={"roles"}
                    rolesKey={this.props.count}
                />

                <DropdownPersons
                    emptyDefaultOption={"Select a Person"}
                    customClassNames={"custom-select select-person"}
                    buildDropdown={"persons"}
                    personsKey={this.props.count}
                />

                <DeleteAssignmentBtn deleteKey={this.props.count} />
            </div>
        );
    }
}
export default Assignment;
