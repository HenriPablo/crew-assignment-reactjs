import React, { Component } from "react";
import { connect } from "react-redux";

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
const pSelection = {
    type: "personSelection",
    filterBy: "",
    filteredType: "",
    //filteredPersons: [],
    ass: [],
    x: 1
};

var updatePersonSelection = (ass, persons, nk) => {
    for (let i = 0; i < ass.length; i++) {
        if (ass[i].assignmentKey === nk) {
            ass[i].assignedPersons = persons;
        }
    }
    console.log("ass in updatePersonSelection: ", ass);
    return ass;
};

// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
    return {
        triggerChange: function(value, props) {
            let x = {};
            for (let i = 0; i < props.ass.length; i++) {
                if (
                    props.ass[i].assignmentKey === props.nextKey - 1 &&
                    props.ass[i].assignedPersons !== null
                ) {
                    x = props.ass[i].assignedPersons;
                }
            }
            //dropdownSelection.filteredPersons = x;
            pSelection.x = pSelection.x + 1;
            pSelection.ass = updatePersonSelection(props.ass, x, props.nextKey - 1);
            console.log("pSelection.ass: ", pSelection.ass);

            //console.log("dropdown selection: ", dropdownSelection);
            return dispatch(pSelection);
        }
    };
};

const connectedDropdownSelect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export const DropdownPersons = connectedDropdownSelect(
    class extends Component {
        buildDropdownOptions() {
            console.log("props in DROPDOWN PERSONS:", this.props);
            let x = {};
            //console.log("this.props.ass.length: ", this.props.ass.length);
            for (let i = 0; i < this.props.ass.length; i++) {
                // console.log(
                //   "this.props.ass[i].assignmentKey === (this.props.nextKey - 1): ",
                //   this.props.ass[i].assignmentKey === this.props.nextKey - 1
                // );
                if (
                    this.props.ass[i].assignmentKey === this.props.personsKey &&
                    this.props.ass[i].assignedPersons !== null
                ) {
                    console.log(
                        "this.props.ass[i].assignedPersons: ",
                        this.props.ass[i].assignedPersons
                    );
                    x = this.props.ass[i].assignedPersons;
                }
            }
            let y = [];
            console.log("x in DROPDOWN PERSONS: ", x);
            if (typeof x !== "undefined") {
                Object.keys(x /*this.props.filteredPersons*/).forEach(item => {
                    y.push(<option>{[item][0]}</option>);
                });
            }

            return y;
        }

        render() {
            console.log("this.props in RENDER() DRPD PERSONS: ", this.props);
            return (
                <select
                    onChange={event =>
                        this.props.triggerChange(event.target.value, this.props)
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

export default DropdownPersons;
