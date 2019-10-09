import React, { Component } from "react";
import { connect } from "react-redux";
import { ModalDialog } from "../ModalDailog";

const mapStateToProps = state => {
    return {
        roles: state.roles,
        count: state.count,
        ass: state.ass,
        nextKey: state.nextKey,
        assigned: state.assigned,
        showModal: state.showModal,
        messages: state.messages
    };
};

// Action
const addAssignment = {
    type: "assign",
    payload: "ang",
    ass: [],
    nextKey: 0,
};

const modal = {
    type: "showModal",
    showModal: true,
    x:0
}

let closeModal = (e) =>{

}

// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
    return {
        createAssignment: function(nk, props) {
            if(props.assigned === 4){
                modal.type = "showModal";
                modal.showModal = true;
                modal.x = new Date().getTime();
                return dispatch(modal);
            }
            else {
                addAssignment.nextKey = nk;
                addAssignment.ass = {
                    assignmentKey: nk,
                    assignedRole: null,
                    assignedPerson: null
                };
                return dispatch(addAssignment);
            }
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
                        onClick={() => this.props.createAssignment(this.props.nextKey, this.props)}
                        className="btn btn-primary assign-btn"
                    >
                        {this.props.messages.btnLbls.createAssignmentBtnLbl}
                    </button>
                    <ModalDialog/>

                </div>
            );
        }
    }
);
