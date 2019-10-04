import { takeLatest } from 'redux-saga/effects';

export default function* watchTypeToListenFor(){
    yield  takeLatest("unassign", workerSaga)
}

export function* workerSaga() {
    //workerSaga code

    let x = ""
    fetch('./ajax-test.json', {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        }).then(
        response => {
            return response.json();
        }
    //).then( crewmembers => {
        ).then( message => {
        console.log("message: ", message)
        alert(message.message)
        //this.setState({crewmembers});
    });
    //alert("hello from -> workerSaga() in Saga.js");
}