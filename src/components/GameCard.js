import React from "react";

function countDown() {
  var timer = setInterval(timeUp, 5000);
}

function timeUp() {
  return null;
}

export default function GameCard(props) {
  return (
    <React.Fragment>
      {!timeUp()} ? (<div>{props.question.question}</div>
      <div
        value={props.question.option_1}
        onClick={event => {
          props.changeFunction(props.question.option_1);
        }}
      >
        {props.question.option_1}
      </div>
      <div
        value={props.question.option_2}
        onClick={event => {
          props.changeFunction(props.question.option_2);
        }}
      >
        {props.question.option_2}
      </div>
      <div
        value={props.question.option_3}
        onClick={event => {
          props.changeFunction(props.question.option_3);
        }}
      >
        {props.question.option_3}
      </div>
      <div
        value={props.question.option_4}
        onClick={event => {
          props.changeFunction(props.question.option_4);
        }}
      >
        {props.question.option_4}
      </div>
      ) : (
      <div
        onClick={event => {
          props.changeFunction("timeout");
        }}
      ></div>
      )
    </React.Fragment>
  );
}
