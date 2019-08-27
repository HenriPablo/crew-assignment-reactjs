import React, { Component } from "react";
import AssignButton from "./AssignButton";
import { connect } from "react-redux";

//class App extends Component {
// constructor(props) {
//   super(props);
//   this.state = {};
// }
// Map Redux state to component props

// function mapStateToProps(state) {
//   return {
//     countValue: state.count
//   };
// }

// Action
//var increaseAction = { type: "increase" };

// Map Redux actions to component props
// function mapDispatchToProps(dispatch) {
//   return {
//     increaseCount: function() {
//       return dispatch(increaseAction);
//     }
//   };
// }

// The HOC
// var connectedComponent = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AssignButton);

// render() {
//   return (
//     <div className="container">
//     <connect>
//       <AssignButton increaseCount={this.increaseCount} countValue={this.countValue} />
//       </connect>
//     </div>
//   );

//   }
//}

//export default connectedComponent;
//export test ;
