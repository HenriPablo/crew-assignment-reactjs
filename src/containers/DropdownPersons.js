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
const pSelection = {
    type: "personSelection",
    filterBy: "",
    filteredType: "",
    ass: [],
    value: null,
    props: null
};

var updatePersonSelection = (ass, persons, nk) => {
    for (let i = 0; i < ass.length; i++) {
        if (ass[i].assignmentKey === nk) {
            ass[i].assignedPersons = persons;
        }
    }
    //console.log("ass in updatePersonSelection: ", ass);
    return ass;
};

// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
    return {
        triggerChange: function(value, props) {
            pSelection.value = value;
            pSelection.props = props;
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
            let y = [];
            console.log( "this.props at top of buildDropdownOptions: ", this.props );
            /** add default person to dropdown by preference value */
            if(
                /** initoal app load */
                this.props.preferences.alwaysRenderSelf.value === true &&
                this.props.ass.length === 1
                && this.props.ass[0].assignedPerson !== null
                // check if the role selection matches roles of the default person
                // maybe someone has changed the PIC role to something else
                && this.props.ass[0].assignedPerson.roles.includes( this.props.ass[0].assignedRole )

            )
            {
                console.log("1st IF");
                y.push(<option
                    key={this.props.ass[0].assignedPerson.id}
                    value={this.props.ass[0].assignedPerson.id}
                    >{this.props.ass[0].assignedPerson.first_name} {this.props.ass[0].assignedPerson.last_name}</option>);
            }
            else
            {
                console.log(" in 'ELSE' BEFORE LOOP props: ", this.props );
                let p = this.props;
                let a = this.props.ass;
                for (let i = 0; i < a.length; i++) {

                    if( p.preferences.alwaysRenderSelf.value === true && p.personsKey === 0 && a[i].assignmentKey === 0 ){
                        console.log(" in 2nd 'IF' INSIDE LOOP p: ", p );
                        y.push(
                            <option
                                key={this.props.ass[i].assignedPerson.id}
                                value={this.props.ass[i].assignedPerson.id}>
                                {this.props.ass[i].assignedPerson.first_name} {this.props.ass[i].assignedPerson.last_name}
                            </option>);
                    }
                    else if(
                        ( typeof a[i].assignedPersons !== "undefined" && p.personsKey > 0 && a[i].assignmentKey > 0 )
                         ||
                        ( typeof a[i].assignedPersons !== "undefined" && p.personsKey === 0 && a[i].assignmentKey === 0 && p.preferences.alwaysRenderSelf.value === false )
                    )
                    {
                        console.log(" in 2nd 'ELSE if' inside LOOP props: p", p );
                        if( p.personsKey === a[i].assignmentKey){
                            console.log(" in 3rd 'IF' INSIDE LOOP A: ", a );
                            for( let ii = 0; ii < a[i].assignedPersons.length; ii++ ){
                                y.push(<option
                                    key={this.props.ass[i].assignedPersons[ii].id}
                                    value={this.props.ass[i].assignedPersons[ii].id}
                                >{this.props.ass[i].assignedPersons[ii].first_name} {this.props.ass[i].assignedPersons[ii].last_name}</option>);
                            }
                        }
                    }
                }// end for loop
            } // end else
            return y;
        }

        selectedPerson(){
            if( this.props.personsKey === 0 && this.props.ass[this.props.personsKey].assignedPerson != null ){
                //console.log("this.props.ass[this.props.personsKey].assignedPerson.id: ", this.props.ass[this.props.personsKey].assignedPerson.id)
                return this.props.ass[this.props.personsKey].assignedPerson.id;
            } else { return "" }
        }

        render() {
            //console.log("this.props in RENDER() DRPD PERSONS: ", this.props);
            return (
                <select
                    id={"person-select-" + this.props.personsKey}
                    name={"person-select-" + this.props.personsKey}
                    defaultValue={ this.selectedPerson() }
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
