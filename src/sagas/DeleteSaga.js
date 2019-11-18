import {put, takeLatest} from "@redux-saga/core/effects";
export {deleteAssignmentWatcher}

const deleteAss = (deleteKey, ass) => {

    var x = ass.filter(function(item) {
        return parseInt(item.assignmentKey) !== parseInt(deleteKey);
    });
    return x;
};

function* deleteAssignment( action ) {

    //console.log("deleteAssignment() called in DELETE SAGA")
    action.newAss = deleteAss(action.deleteKey, action.ass)

    const json = action;

    yield put({ type:"ASSIGNMENT_DELETED", json:json });
}

function* deleteAssignmentWatcher(){
    //console.log("deleteAssignmentWatcher() called in DELETE SAGA")
    yield takeLatest("DELETE_ASSIGNMENT", deleteAssignment);
}