

import React from 'react';
//import ReactDOM from 'react-dom';
import ErrorBoundary from './ErrorBoundary';
import JSONTree from "react-json-tree";
import { isWithStatement } from '@babel/types';

//var _ = require('lodash'); //cambio underscore por lodash, mas rapido completo y com menos bugs import _ from 'underscore';
//var s = require("underscore.string");
export default class DEVELOPER extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.allStorage = this.allStorage.bind(this);
        this.platformData = this.platformData.bind(this);
      }
    platformData() {
        if (this.state.platformData) return this.state.platformData;
        var aux = {
          characterSet: document.characterSet,
          userAgent: navigator.userAgent,
          cookieEnabled: navigator.cookieEnabled,
          languages: navigator.languages,
          maxTouchPoints: navigator.maxTouchPoints,
          screenwidth: window.screen.width,
          screenheight: window.screen.height,
          inwinw: window.innerWidth,
          inwinh: window.innerHeight,
          platform: navigator.platform
        };
        this.setState({ platformData: aux });
        return aux;
    }
    allStorage() {
        var archive = {}, // Notice change here
          keys = Object.keys(localStorage),
          i = keys.length;

        while (i--) {
          archive[keys[i]] = this.truncate(localStorage.getItem(keys[i]));
        }
        return archive;
    }
    truncate(s) {
        if (s.length < 255) return s;
        return s.substring(0, 255) + "...";
    }
    render() {
        var style = {
            maxWidth: '30%',
            position: 'fixed',
            right: '0px',
            top: '0px',
            backgroundColor: 'white'
        }
        return ( <ErrorBoundary>
            {this.props.totalstate.mode === "DEVELOPER" &&
                    (<div style={style}>
                        <JSONTree data={this.props.totalstate} theme={this.props.theme} />
                        <JSONTree data={this.platformData()} theme={this.props.theme} />
                        <JSONTree data={this.allStorage()} theme={this.props.theme} />
                         <h2 classname={"App-link"} onClick={this.props.changeMode.bind('INFO')} >HIDE</h2>
                    </div>)
            }
        </ErrorBoundary>);
    }
}