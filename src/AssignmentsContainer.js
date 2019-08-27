import React, { Component } from "react";
import { connect } from "react-redux";
import Assignment from "./Assignment";

const mapStateToProps = state => {
    //console.log("state in mapStateToProps in Ass container: ", state);
    return {
        roles: state.roles,
        nextKey: state.count,
        count: state.count,
        ass: state.ass
    };
};

// Action
const deleteAssignment = {
    type: "unassign",
    payload: ["bob"]
};

// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
    return {
        increaseCount: function() {
            return dispatch(deleteAssignment);
        }
    };
};

const connectedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
);

export const AssignmentsContainer = connectedContainer(
    class extends Component {
        buildAssignments = () => {
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
            //console.log("this.props in AssignmentsContainer: ", this.props);

            if (this.props.count > 0) {
                return (
                    <div className={"assignmentContainer"} key={"assContainer123"}>
                        {this.buildAssignments()}
                    </div>
                );
            } else {
                return <p>No assighemnts to show</p>;
            }
        }
    }
);
export default AssignmentsContainer;
