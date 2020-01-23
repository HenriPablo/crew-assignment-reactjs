import { put, takeLatest, all } from 'redux-saga/effects';
import {selectPeopleActionWatcher}  from './PeopleSaga';
import {actionWatcher} from './RoleSaga';
import {deleteAssignmentWatcher} from "./DeleteSaga";
import {assignActionWatcher} from "./AssignSaga";

export default function* rootSaga(){
    yield all([
        assignActionWatcher(),
        actionWatcher(),
        selectPeopleActionWatcher(),
        deleteAssignmentWatcher()
    ]);
}
