import React from "react";

export default function GameCard(props) {
  return (
    <React.Fragment>
      <div
        style={{
          display: "grid",
          width: "1000px",
          gridTemplateRows: "100px, 200px, 200px",
          gridTemplateColumns: "500px 500px",
          border: "1px solid black",
          textAlign: "center"
        }}
      >
        {props.pos + 1}
        <div
          style={{
            gridColumnStart: "1",
            gridColumnEnd: "3",
            // height: "100px",
            margin: "auto",
            width: "1000px",
            textAlign: "center",
            fontSize: "30px"
          }}
        >
          {props.question.question}
        </div>
        <div
          value={props.question.option_1}
          style={{
            height: "100px",
            textAlign: "center",
            background: "teal"
          }}
          onClick={event => {
            props.changeFunction(props.question.option_1);
          }}
        >
          {props.question.option_1}
        </div>
        <div
          value={props.question.option_2}
          style={{
            textAlign: "center",
            background: "teal"
          }}
          onClick={event => {
            props.changeFunction(props.question.option_2);
          }}
        >
          {props.question.option_2}
        </div>
        <div
          value={props.question.option_3}
          style={{
            textAlign: "center",
            background: "teal"
          }}
          onClick={event => {
            props.changeFunction(props.question.option_3);
          }}
        >
          {props.question.option_3}
        </div>
        <div
          value={props.question.option_4}
          style={{
            height: "100px",
            textAlign: "center",
            background: "teal"
          }}
          onClick={event => {
            props.changeFunction(props.question.option_4);
          }}
        >
          {props.question.option_4}
        </div>
      </div>
    </React.Fragment>
  );
}
