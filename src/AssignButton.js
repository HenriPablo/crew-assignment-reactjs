import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        count: state.count,
        ass: state.ass,
        nextKey: state.nextKey
    };
};

// Action
const addAssignment = {
    type: "assign",
    payload: "ang",
    ass: [],
    nextKey: 0
};

// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
    return {
        createAssignment: function(nk) {
            addAssignment.nextKey = nk;
            addAssignment.ass = {
                //["assignment" + (nk )]:
                //{
                assignmentKey: nk,
                assignedRole: null,
                assignedPerson: null
            };
            //}

            //console.log("addAssignment", addAssignment.ass);

            return dispatch(addAssignment);
        }
    };
};

const connectedButton = connect(
    mapStateToProps,
    mapDispatchToProps
);

export const AssignButton = connectedButton(
    class extends Component {
        render() {
            return (
                <div>
                    <button
                        onClick={() => this.props.createAssignment(this.props.nextKey)}
                        className="btn btn-primary assign-btn"
                    >
                        Assign +{" "}
                    </button>
                    <p>Assignments: {this.props.count}</p>
                </div>
            );
        }
    }
);
