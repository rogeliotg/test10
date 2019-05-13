import React from 'react';
import Tooltip from 'react-tooltip-lite';

export default class TOOLTIP extends React.Component {
 /*OJO: el tipContentHover sirve para mantener el tooltip mientras el ratón pasa por encima, permitiendo click en links internos al tooltip html*/
 componentDidCatch(error, info) {
  // Display fallback UI
  this.setState({ hasError: false });
  // You can also log the error to an error reporting service
  console.log("ERror de TOOLTIP, cuidado que no sea dentro sino en Tooltip: "+error);
  console.log("info: "+info);
 }

  render () {
    var t = this.props.tooltiphtml;
    return this.props.tactil ?
      <Tooltip className={this.props.className} content={t}  id="tooltip" arrowSize={5} tipContentHover
       eventOn="onClick" eventOff="onMouseOut" hoverDelay={2500} useHover={false}>
        {this.props.children}</Tooltip>
        :
        <Tooltip className={this.props.className} content={t}  id="tooltip" arrowSize={5} tipContentHover>
        {this.props.children}</Tooltip>;
  }
}
