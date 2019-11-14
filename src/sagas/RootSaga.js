import { put, takeLatest, all } from 'redux-saga/effects';
import {selectPeopleActionWatcher}  from './PeopleSaga';
import {actionWatcher} from './RoleSaga';
import {deleteAssignmentWatcher} from "./DeleteSaga";

export default function* rootSaga(){
    yield all([
        actionWatcher(),
        selectPeopleActionWatcher(),
        deleteAssignmentWatcher()
    ]);
}
