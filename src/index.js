import "core-js/stable";                /* for babel polyfill - IE11 */
import "regenerator-runtime/runtime";   /* for babel polyfill - IE11 */
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from "react-redux";

import createSagaMiddleware from 'redux-saga';

import { AssignButton } from "./containers/AssignButton";
import AssignmentsContainer from "./containers/AssignmentsContainer";
import reducer from "./reducers/reducers";
import "./css/index.css";

import rootSaga from './sagas/RootSaga';

const sagaMiddleware = createSagaMiddleware();

const enhancers = composeWithDevTools(
    applyMiddleware( sagaMiddleware )
);

const store = createStore( reducer, enhancers );
const rootElement = document.getElementById("root");

sagaMiddleware.run(rootSaga);

/**
 * some guides:
 *  REDUX:
 *    https://spectrum.chat/frontend/opinion/named-exports-vs-default-exports-or-both~32c58d5b-9ba0-46b5-b00d-783f2799ddb4
 https://github.com/Apress/pro-react-16/blob/master/20%20-%20Using%20the%20Data%20Store%20APIs/productapp/src/ProductDisplay.js

 */

/**
 * ajax guides:
 *      https://github.com/zalmoxisus/redux-devtools-extension
 *      https://medium.com/@adlusk/a-newbs-guide-to-redux-saga-e597d8e6c486
 *
 * MIDDLEWAREW TUTOTRIAL - scroll down to get it it
 *      https://www.valentinog.com/blog/redux/
 *
 *
 * Best working saga example yet:
 *      https://medium.com/@lavitr01051977/make-your-first-call-to-api-using-redux-saga-15aa995df5b6
 *      https://github.com/Lavitr/React-Redux-SAGA-tutorial-APP/tree/master/src
 */

ReactDOM.render(
    <Provider store={store}>
        <AssignButton />
        <AssignmentsContainer />
    </Provider>,
    rootElement
);
