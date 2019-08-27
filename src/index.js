import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { AssignButton } from "./AssignButton";
import AssignmentsContainer from "./AssignmentsContainer";
import reducer from "./reducers";
import "./index.css";

const store = createStore(reducer);
const rootElement = document.getElementById("root");

/**
 * some guides:
 *  REDUX:
 *    https://spectrum.chat/frontend/opinion/named-exports-vs-default-exports-or-both~32c58d5b-9ba0-46b5-b00d-783f2799ddb4
 https://github.com/Apress/pro-react-16/blob/master/20%20-%20Using%20the%20Data%20Store%20APIs/productapp/src/ProductDisplay.js

 */

ReactDOM.render(
    <Provider store={store}>
        <AssignButton />
        <AssignmentsContainer />
    </Provider>,
    rootElement
);
