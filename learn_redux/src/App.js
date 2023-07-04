import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions";

function App() {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged)
  const dispatch = useDispatch();

  const Add = function() {
    dispatch(increment(5));
  }

  const Del = function() {
    dispatch(decrement());
  }

  return (
    <div className="App">
      <h1>counter: {counter}</h1>
      <button onClick={Add}>+</button>
      <button onClick={Del}>-</button>
      {isLogged ? <h3>valuable information i shouldn't see</h3>:""}
      
    </div>
  );
}

export default App;
