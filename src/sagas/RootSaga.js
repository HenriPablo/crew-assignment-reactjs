import { put, takeLatest, all } from 'redux-saga/effects';
import {selectPeopleActionWatcher}  from './PeopleSaga';
import {actionWatcher} from './RoleSaga';
import {deleteAssignmentWatcher} from "./DeleteSaga";
import {triggerInitAjaxDataActionWatcher} from "./DoAjaxInitSaga";

export default function* rootSaga(){
     yield all[
         triggerInitAjaxDataActionWatcher(),
         actionWatcher(),
         selectPeopleActionWatcher(),
         deleteAssignmentWatcher()
     ];

}