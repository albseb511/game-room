import React from "react";

export default function GameCard(props) {
  return (
    <React.Fragment>
      <div id='quest'>
        
        <div>
             Q.{props.pos + 1}. {' '} {props.question.question}
        </div>
        <div>
            <div class='r-15 blue' onClick={event => {
              props.changeFunction(props.question.option_1)
              }}>
                  {props.question.option_1}
            </div>
            <div class='r-15 purple' value={props.question.option_2}
              onClick={event => {
                props.changeFunction(props.question.option_2);
              }}>
              {props.question.option_2}
            </div>
            <div class='r-15 blue' value={props.question.option_3}
                onClick={event => {
                  props.changeFunction(props.question.option_3);
                }}>
              {props.question.option_3}
            </div>
            <div class='r-15 purple' value={props.question.option_4}
                onClick={event => {
                  props.changeFunction(props.question.option_4);
                }}>
              {props.question.option_4}
            </div>
        </div>
      </div>
    </React.Fragment>
  );
}
