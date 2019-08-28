import React, { Component, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

/** https://www.npmjs.com/package/react-html-parser */
import ReactHtmlParser from "react-html-parser";

class ModalDialog extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.closeModalHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.modalTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body>{ReactHtmlParser(this.props.modalBody)}</Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.closeModalHandler}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default ModalDialog;