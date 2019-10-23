import React from "react";
import { useState } from "react";

export default class password extends React.Component {
  render() {
    const [input, setInput] = useState(""); // '' is the initial state value
    return (
      <div>
        <label>Please specify:</label>
        <input value={input} onInput={e => setInput(e.target.value)} />
      </div>
    );
  }
}
