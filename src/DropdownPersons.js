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
    //filteredPersons: [],
    ass: [],
    x: 0
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
            pSelection.x = new Date().getTime();//pSelection.x + 1;
            pSelection.ass = updatePersonSelection(props.ass, x, props.nextKey - 1);
            //console.log("pSelection.ass: ", pSelection.ass);
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
            //console.log("props in DROPDOWN PERSONS:", this.props);
            let x = {};
            let y = [];

            console.log("this.props.ass.length: ", this.props.ass.length);
            console.log("this.props.ass: ", this.props.ass)

            /** add default person to dropdown by preference value */
            if( this.props.preferences.alwaysRenderSelf.value === true && this.props.ass.length === 1)
            {
                y.push(<option
                    key={this.props.ass[0].assignedPerson.id}
                    value={this.props.ass[0].assignedPerson.id}
                    >{this.props.ass[0].assignedPerson.first_name} {this.props.ass[0].assignedPerson.last_name}</option>);
            }

            //else if( this.props.)

            else
            {
                console.log("props BEFORE loop in persons: ", this.props.ass )
                for (let i = 0; i < this.props.ass.length; i++) {
                    if (
                        this.props.ass[i].assignmentKey === this.props.personsKey &&
                        this.props.ass[i].assignedPersons !== null
                    )
                    {
                        //x = this.props.ass[i].assignedPersons;

                        y.push(<option
                            key={this.props.ass[i].assignedPersons.id}
                            value={this.props.ass[i].assignedPersons.id}
                        >{this.props.ass[i].assignedPersons.first_name} {this.props.ass[i].assignedPersons.last_name}</option>);
                    }
                    else if( typeof this.props.ass[i].assignedPersons !== "undefined" )
                    {
                        y.push(<option
                            key={this.props.ass[i].assignedPersons.id}
                            value={this.props.ass[i].assignedPersons.id}
                        >{this.props.ass[i].assignedPersons.first_name} {this.props.ass[i].assignedPersons.last_name}</option>);
                    }
                }

                if (typeof x !== "undefined") {

                    //console.log("X in typeof x !== \"undefined\" in PERSONS: ",  x );
                    //Object.keys( x ).forEach(item => {
                        //console.log("ITEM: ", item)
                       // y.push(<option key={x.id} value={x.id}>{x.first_name}</option>);
                    //});

                    //for( )


                }
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
            console.log("this.props in RENDER() DRPD PERSONS: ", this.props);
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
