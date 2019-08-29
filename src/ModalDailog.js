import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

/** https://www.npmjs.com/package/react-html-parser */
import ReactHtmlParser from "react-html-parser";

const mapStateToProps = state => {
    return{
        showModal: state.showModal,
        x: state.x
    };
};

//Action
const showModal = {
    type: "hideModal",
    //showModal: false,
    x : 0
}



const mapDispatchToProps = dispatch => {
    return {

        modalAction: function (props) {
            if(props.showModal === false ){
                showModal.showModal = false;
            }

            //showModal.showModal = true;
            showModal.x = new Date().getTime();
            return dispatch( showModal );
        }
    }

}

const connectedModal = connect(
    mapStateToProps,
    mapDispatchToProps
)

export const ModalDialog = connectedModal(
    class extends Component {
        render() {
            console.log("props in modal: ", this.props );
            return (
                // this.props.closeModalHandler
                <Modal show={this.props.showModal} onHide={() => this.props.modalAction(this.props)}>
                    <Modal.Header closeButton>
                        {/*<Modal.Title>{this.props.modalTitle}</Modal.Title>*/}
                    </Modal.Header>

                    <Modal.Body>hi</Modal.Body>
                    {/*{ReactHtmlParser(this.props.modalBody)}*/}
                    <Modal.Footer>
                        <Button onClick={ () => this.props.modalAction(this.props)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }
);
//export default ModalDialog;