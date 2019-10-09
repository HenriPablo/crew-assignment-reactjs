import React, { Component } from "react";
import { connect } from "react-redux";
import Assignment from "./Assignment";
import { getRoles } from "../actions";

const mapStateToProps = state => {
    //console.log("state in mapStateToProps in Ass container: ", state);
    return {
        roles: state.roles,
        nextKey: state.count,
        count: state.count,
        ass: state.ass,
        preferences: state.preferences
    };
};

// Map Redux actions to component props
const mapDispatchToProps = {
    getRoles: getRoles,
};

const connectedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
);

export const AssignmentsContainer = connectedContainer(
    class extends Component {
        buildAssignments = () => {
            console.log("this.props.roles === null: ", this.props.roles === null);

            if( this.props.roles === null ){
                this.props.getRoles();
                return null;
            }

            var x = [];
            Object.keys(this.props.ass).forEach(item => {
                //console.log("item in Ass container: ", item);
                x.push(
                    <Assignment
                        key={this.props.ass[item].assignmentKey}
                        deleteKey={this.props.ass[item].assignmentKey}
                        count={this.props.ass[item].assignmentKey}
                    />
                );
            });
            return x;
        };

        render() {
            if (this.props.count > 0) {
                return (
                    <div  className={"assignmentContainer"} key={"assContainer123"}>
                        {this.buildAssignments()}
                    </div>
                );
            } else {
                return <p className={"no-assignments-mgs"}>No assighemnts to show</p>;
            }
        }
    }
);
export default AssignmentsContainer;
