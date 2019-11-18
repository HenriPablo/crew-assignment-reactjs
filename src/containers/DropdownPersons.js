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
            let props = this.props;
            let assignments = this.props.ass;

            let y = [];

            /**
             * @param assignments: list of assignments
             * @param cnt: default counter value
             * @param cnt2: optional counter value
             * @returns {*} option dropdown element
             */
            let makeOptionX = ( assignments, cnt =-1, cnt2 = -1) => {

                let k = null;
                let v = null;
                let l = null;

                if( cnt2 > -1 ){
                    k = assignments[cnt].assignedPersons[cnt2].id;
                    v = assignments[cnt].assignedPersons[cnt2].id;
                    l = assignments[cnt].assignedPersons[cnt2].first_name + " " + assignments[cnt].assignedPersons[cnt2].last_name;
                }
                else
                    {
                        k = assignments[cnt].assignedPerson.id;
                        v = assignments[cnt].assignedPerson.id;
                        l = assignments[cnt].assignedPerson.first_name + " " + assignments[(cnt2 > -1) ? cnt2 : cnt ].assignedPerson.last_name;
                    }

                return <option key={k} value={v}>{l}</option>
            }

            //console.log( "this.props at top of buildDropdownOptions: ", this.props );
            /** add default person to dropdown by preference value */
            if(
                /** initial app load */
                this.props.preferences.alwaysRenderSelf.value === true &&
                this.props.ass.length === 1
                && this.props.ass[0].assignedPerson !== null
                // check if the role selection matches roles of the default person
                // maybe someone has changed the PIC role to something else
                && this.props.ass[0].assignedPerson.roles.includes( this.props.ass[0].assignedRole )

            )
            {
                console.log("1st IF");
                y.push( makeOptionX( assignments, 0 ))
            }
            /** Changing default role on a default assignment */
            else if(
                this.props.preferences.alwaysRenderSelf.value === true &&
                this.props.ass.length === 1 &&
                this.props.preferences.alwaysRenderSelf.defaultRole !== this.props.ass[0].assignedRole &&
                this.props.ass[0].assignedRole !== null
            ){
                //console.log("1st ESLE IF")
                for( let i1 = 0; i1 < assignments.length; i1++ )
                {
                    for( let ii = 0; ii < assignments[i1].assignedPersons.length; ii++ ){
                        y.push(makeOptionX(assignments, i1, ii))
                    }
                }

            }
            else
            {
                console.log(" in 'ELSE' BEFORE LOOP props: ", this.props );
                for (let i = 0; i < assignments.length; i++) {

                    if( props.preferences.alwaysRenderSelf.value === true &&
                        props.personsKey === 0
                        && assignments[i].assignmentKey === 0
                        && assignments[i].assignedPerson.roles.includes(  assignments[i].assignedRole )
                    )
                    {
                        //console.log(" in 2nd 'IF' INSIDE LOOP p: ", props );
                        y.push(makeOptionX( assignments, i ))
                    }

                    else if
                    (
                        ( typeof assignments[i].assignedPersons !== "undefined"
                            && props.personsKey > 0
                            && assignments[i].assignmentKey > 0
                        )
                         ||
                        ( typeof assignments[i].assignedPersons !== "undefined"
                            && props.personsKey === 0
                            && assignments[i].assignmentKey === 0
                            && props.preferences.alwaysRenderSelf.value === false
                        )
                    )
                    {
                        //console.log(" in 2nd 'ELSE if' inside LOOP props: p", props );
                        if( props.personsKey === assignments[i].assignmentKey){
                            //console.log(" in 3rd 'IF' INSIDE LOOP A: ", assignments );
                            for( let ii = 0; ii < assignments[i].assignedPersons.length; ii++ ){
                                y.push(makeOptionX( assignments, i, ii ))
                            }
                        }
                    }

                    else if
                    (
                        typeof assignments[i].assignedPersons !== "undefined"
                        && props.personsKey === 0
                        && assignments[i].assignmentKey === 0
                        && props.preferences.alwaysRenderSelf.value === true
                        && !assignments[i].assignedPerson.roles.includes( assignments[i].assignedRole )
                    )
                    {
                        //console.log(" in LAST  'ELSE-IF' INSIDE LOOP A: ", assignments );
                        for( let ii = 0; ii < assignments[i].assignedPersons.length; ii++ ){
                            y.push(makeOptionX( assignments, i, ii ))
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
