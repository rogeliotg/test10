
import React from 'react';
//import ReactDOM from 'react-dom';
import ErrorBoundary from './ErrorBoundary';
import TOOLTIP from './TOOLTIP';
import Swipe from 'react-easy-swipe';
//var _ = require('lodash'); //cambio underscore por lodash, mas rapido completo y com menos bugs import _ from 'underscore';
//var s = require("underscore.string");
export default class SWIPETRISTATE extends React.Component {

    handleInit() {
        console.log("swipetristate instance has initialised", this.title);
    }

    constructor(props) {
        super(props);

        this.onSwipeLeft = this.onSwipeLeft.bind(this);
        this.onSwipeRight = this.onSwipeRight.bind(this);

    }
   /* onSwipeStart(event) {
        console.log('Start swiping...', event);
      }

      onSwipeMove(position, event) {
        console.log(`Moved ${position.x} pixels horizontally`, event);
        console.log(`Moved ${position.y} pixels vertically`, event);
      }

      onSwipeEnd(event) {
        console.log('End swiping...', event);
      }*/
    onSwipeLeft() {
        this.props.handleResponse(this.props.counter, false);
    }
    onSwipeRight() {
        this.props.handleResponse(this.props.counter, true);
    }
    render () {
        const boxStyle = {
            height: '90%',
            maxWidth: '90%',
            border: '1px solid black',
            background: '#222',
            padding: '20px',
            fontSize: '1em',
            backgroundImage: this.props.urlimg
          };
          //every component is decorated with ErrorBoundary, to aisle react component errors and send to server produced errores for debug
        //just on this test, I will not declared saveErrorServer on main App
        return (
        <ErrorBoundary>
            <Swipe onSwipeLeft={this.onSwipeLeft} onSwipeRight={this.onSwipeRight}>
                <div style={boxStyle}>
                    <p></p><p>{this.props.title}</p>
                    <div><p></p><p className="flexContainer" dangerouslySetInnerHTML={{ __html: this.props.text }}/></div>
                    <div className="flexContainer">
                            <TOOLTIP tooltiphtml={"Swipe left for " + (this.props.falsetrue ? "FALSE" : "NO")}>
                                <span className="App-link flexStart" onClick={this.props.handleResponse.bind(this, this.props.counter, false)}>
                                    {this.props.falsetrue ? "FALSE" : "NO"} </span>
                            </TOOLTIP>
                            <TOOLTIP tooltiphtml={"Swipe right for " + (this.props.falsetrue ? "TRUE" : "YES")}>
                                <span className="App-link flexEnd" onClick={this.props.handleResponse.bind(this, this.props.counter, true)}>
                                    {this.props.falsetrue ? "TRUE" : "YES"} </span>
                            </TOOLTIP>
                    </div>
                </div>
            </Swipe>
        </ErrorBoundary>
        );
  }
}
