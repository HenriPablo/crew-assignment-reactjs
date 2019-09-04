import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

/** https://www.npmjs.com/package/react-html-parser */
import ReactHtmlParser from "react-html-parser";

const mapStateToProps = state => {
    return{
        showModal: state.showModal,
        messages: state.messages,
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
            //console.log("props in modal: ", this.props );
            return (

                <Modal show={this.props.showModal} onHide={() => this.props.modalAction(this.props)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.messages.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{ReactHtmlParser(this.props.messages.body)}</Modal.Body>

                    <Modal.Footer>
                        <Button onClick={ () => this.props.modalAction(this.props)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }
);