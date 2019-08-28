import React, { Component } from "react";
import { connect } from "react-redux";
import ModalDialog from "./ModalDailog";
import ReactDOM from "react-dom";

const mapStateToProps = state => {
    return {
        count: state.count,
        ass: state.ass,
        nextKey: state.nextKey,
        assigned: state.assigned,
        showModal: state.showModal
    };
};

// Action
const addAssignment = {
    type: "assign",
    payload: "ang",
    ass: [],
    nextKey: 0,
    showModal: false

};

let closeModal = (e) =>{

}

// Map Redux actions to component props
const mapDispatchToProps = dispatch => {
    return {
        createAssignment: function(nk, props) {
            if(props.assigned === 4){
                addAssignment.showModal = true;
                addAssignment.showModal = true;
                return dispatch(addAssignment);

                //alert("4 seats already assigned");


                //alert("4 seats already assigned");
                //return false;
            }

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
                        onClick={() => this.props.createAssignment(this.props.nextKey, this.props)}
                        className="btn btn-primary assign-btn"
                    >
                        Assign +{" "}
                    </button>
                    {/*<p>Assignments: {this.props.count}</p>*/}

                    <ModalDialog
                        closeModalHandler={e => closeModal(e)}
                        show={this.props.showModal}
                        modalTitle={"Modal Title"}
                        modalBody={"Assignment at capacity."}
                    />

                </div>
            );
        }
    }
);
