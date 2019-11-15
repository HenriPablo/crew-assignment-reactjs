import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        countValue: state.count,
        ass: state.ass
    };
};

const deleteAss = (deleteKey, ass) => {

    var x = ass.filter(function(item) {
        return parseInt(item.assignmentKey) !== parseInt(deleteKey);
    });
    return x;
};

// Action

const deleteAssignment = {
    //type: "deleteAssignment",
    type: "DELETE_ASSIGNMENT",
    payload: "bob",
    ass: null,
    newAss: [],
    deleteKey: null
};

// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
    return {
        deleteAssignment: function(deleteKey, ass) {
            console.log( "deleteAssignment hit in DELETE BUTTON")
            deleteAssignment.ass = ass;
            //deleteAssignment.newAss = deleteAss(deleteKey, ass);
            deleteAssignment.payload = deleteKey;
            deleteAssignment.deleteKey = deleteKey;
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
                    {/*<span> X delete key: {this.props.deleteKey} </span>*/}
                </button>
            );
        }
    }
);
