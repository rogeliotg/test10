import React, { Component } from 'react';
//import { Card, CardMedia, CardTitle } from 'react-toolbox/lib/card';
import { saveErrorServer } from "../Util.js";

/*const style = {
  width: '350px',
  marginLeft: '20px',
  marginTop: '20px',
  display: 'inline-block'
};*/

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    saveErrorServer(error, info);
  }

  render() {
    if(this.state.hasError) {
      return (<div class="carderror">
      <h3>Sorry Something went wrong!!!</h3><p>Refresh the page or try later</p></div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
