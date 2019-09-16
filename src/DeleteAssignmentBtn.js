import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        countValue: state.count,
        ass: state.ass
    };
};

const deleteAss = (deleteKey, ass) => {
    //console.log("deleteKey in deleteAss: ", deleteKey);
    //console.log("ass in deleteAss: ", ass);

    var x = ass.filter(function(item) {
        return parseInt(item.assignmentKey) !== parseInt(deleteKey);
    });
    //console.log("x in deleteAss: ", x);
    return x;
};

// Action
const deleteAssignment = {
    type: "deleteAssignment",
    payload: "bob",
    newAss: []
};

// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
    return {
        deleteAssignment: function(deleteKey, ass) {
            //console.log("ass param in deleteAssignment: ", ass);
            deleteAssignment.newAss = deleteAss(deleteKey, ass);
            //console.log("newAss in delte btn: ", deleteAssignment.newAss);
            deleteAssignment.payload = deleteKey;
            return dispatch(deleteAssignment);
        }
    };
};

const connectedDeleteButton = connect(
    mapStateToProps,
    mapDispatchToProps
);

export const DeleteAssignmentBtn = connectedDeleteButton(
    class extends Component {
        render() {
            //console.log("delete next key in delete button: ", this.props.count);
            return (
                <button
                    key={this.props.count}
                    className={"btn btn-danger btn-sm"}
                    onClick={() =>
                        this.props.deleteAssignment(this.props.deleteKey, this.props.ass)
                    }
                >
                    <strong>X</strong>
                    {/* X delete key: {this.props.deleteKey} */}
                </button>
            );
        }
    }
);
