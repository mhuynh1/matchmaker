import "./style";
import { Component, render } from "preact";
import Board from "./Board";

export default class App extends Component {
  render(props, { results = [] }) {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
