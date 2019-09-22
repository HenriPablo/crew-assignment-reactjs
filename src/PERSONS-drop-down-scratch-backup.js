//console.log("Build PERSONS Dropdown Options")
/** add default person to dropdown by preference value */
//console.log("this.props.preferences.alwaysRenderSelf.value: ", this.props.preferences.alwaysRenderSelf.value);
//console.log("this.props.personsKey: ", this.props.personsKey );
//console.log("this.props.personsKey === 0: ", this.props.personsKey === 0 );
//console.log("this.props.ass[0].assignedPerson !== null: ", this.props.ass[0].assignedPerson !== null);
//console.log("this.props.ass[0].assignmentKey: ", this.props.ass[0].assignmentKey);

if(
    /** initoal app load */
    this.props.preferences.alwaysRenderSelf.value === true && this.props.ass.length === 1
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
    //console.log( "\n1st ELSE - props BEFORE loop in persons: ", this.props.ass )
    console.log("BEFORE LOOP props: ", this.props );
    for (let i = 0; i < this.props.ass.length; i++) {
        //console.log("1st LOOP");
        //console.log("LOOP COUNT: ", i );
        //console.log("typeof this.props.ass[i].assignedPersons: ", typeof this.props.ass[i].assignedPersons);
        console.log("LOOP COUNT: " + i + " this.props.ass[" + i + "]: ", this.props.ass[i]);


        //console.log("this.props.ass[i].assignedPerson !== null: ", this.props.ass[i].assignedPerson !== null)
        //console.log("this.props.ass[i].assignedPerson: ", this.props.ass[i].assignedPerson )
        //console.log( "this.props.ass[i].assignmentKey: ", this.props.ass[i].assignmentKey );

        //console.log('typeof this.props.ass[i].assignedPersons !== "undefined": ', typeof this.props.ass[i].assignedPersons !== "undefined")
        //else
        if (
            this.props.ass[i].assignmentKey > 0 &&
            //     this.props.ass[i].assignmentKey === this.props.personsKey &&
            //     this.props.ass[i].assignedPersons !== null
            //&& this.props.ass[i].assignedPersons !== null
            //    && this.props.ass[i].assignedPerson !== null
            //    && this.props.ass[i].assignedPerson.self !== "true"
            typeof this.props.ass[i].assignedPersons !== "undefined"
        )
        {
            console.log("2ND IF");
            //console.log("props in 2ND IF: ", this.props)

            /** THS RUNS WHEN SELECTING A PERSON AFTER ROLE SELECTION AFTER ASSIGN BUTTON CLICK */
            for( let ii = 0; ii < this.props.ass[i].assignedPersons.length; ii++ ){

                console.log("2ND LOOP: this.props.ass[i].assignmentKey: ", this.props.ass[i].assignmentKey)

                //if( typeof this.props.ass[i].assignedPersons !== "undefined" && this.props[i].assignmentKey !== 0 ){
                y.push(<option
                    key={this.props.ass[i].assignedPersons[ii].id}
                    value={this.props.ass[i].assignedPersons[ii].id}
                >{this.props.ass[i].assignedPersons[ii].first_name} {this.props.ass[i].assignedPersons[ii].last_name}</option>);
                //}
            }
        }
        else if ( this.props.ass[i].assignmentKey === 0  /*&& this.props.ass[i].assignedPerson !== null*/){
            console.log('ELSE IF 5')
            y.push(<option key={this.props.ass[i].assignedPerson.id} value={this.props.ass[i].assignedPerson.id}>{this.props.ass[i].assignedPerson.first_name}</option>);
        }

    }// end for loop
} // end else


