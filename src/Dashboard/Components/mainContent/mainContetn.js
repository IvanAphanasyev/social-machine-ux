import React, { useEffect, useState } from "react";
import "./mainContent.scss";

const MainContent = props => {
  const [wss, setWss] = useState(null);
  const [message, setMessage] = useState(null);
  useEffect(() => console.log("main updated"));

  const close = () => {
    if (!wss) return;
    wss.close();
  };
  const connect = () => {
    if (!wss || wss.readyState === WebSocket.CLOSED) {
      console.log("opening websoket");

      const ws = new WebSocket("ws://localhost:7777/ws");
      ws.onopen = () => {
        console.log("connected");
      };
      ws.onmessage = evt => {
        const received = evt.data;
        //setMessage(received);
        console.log(received);
        setMessage(received);
      };
      ws.onclose = () => {
        console.log("disconnected");
        setMessage("disconnected");
        // automatically try to reconnect on connection loss
      };
      ws.onerror = err => {
        console.log(err);
        setMessage("error");
      };
      setWss(ws);
    } else {
      console.log("wss still open");
    }
  };
  return (
    <div className="mainContent">
      <button className="start" onClick={connect}>
        Start
      </button>
      <div>{message}</div>
      <button onClick={close}>1232131</button>
      <button
        onClick={() => {
          if (!wss || wss.readyState === WebSocket.CLOSED) {
            console.log("wss closed, try to connect");
            connect();
          } else {
            console.log("wss still work");
          }
        }}
      >
        check
      </button>
      <button
        onClick={() =>
          wss
            ? wss.send("{ login: '12313132', password: '123353' }")
            : console.log("wss not open")
        }
      >
        send message
      </button>
      <div>
        <button>prev</button>
        <button>next</button>
      </div>
    </div>
  );
};
export default MainContent;
