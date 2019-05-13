import React from 'react';
import './App.css';
import SWIPETRISTATE from '../src/components/SWIPETRISTATE';
import DEVELOPER from '../src/components/DEVELOPER';
import {size} from "./Util.js"
export default class App extends React.Component {
    constructor(props) {
      super(props);
      /*I don't have time to rewrite with Redux, sorry*/
      this.state = {
        page: this.props.page ? this.props.page : 0,  //Keep it simple (KISS), no need for React router and several pages. Single Page Web Apps +cordova is the way to go for mobile
          //page 0: intro, pages 1-10 questions, page 11: results
        questions: [],
        responses: {},
        nq: this.props.nq ? this.props.nq : 10,
        mode: 'INFO',
        countMode: 0,
      };
      this.handlePageChange = this.handlePageChange.bind(this);
      this.handleResponse = this.handleResponse.bind(this);
      this.loadQuestions = this.loadQuestions.bind(this);
      this.sumCorrect = this.sumCorrect.bind(this);
      this.count3 = this.count3.bind(this);
      this.changeMode = this.changeMode.bind(this);
    }
    count3() {  /*3 clicks on title opens the DEVELOPER helper*/
      var c = this.state.countMode;
      c += 1;
      if (c === 3) {
        this.setState({countMode: 3, mode: 'DEVELOPER'});
      } else {
        this.setState({countMode: c});
      }
    }
    changeMode(m) {
      this.setState({countMode: m==='DEVELOPER' ? 3 : 0, mode: m});
    }
    sumCorrect() {
      var c = 0;
      for (var z in this.state.responses) {
        if (this.state.responses.hasOwnProperty(z)) {
          var b = this.state.responses[z];
          if (b === this.state.questions[z].correct_answer) {
            c += 1;
          }
        }
      }
      return c;
    }
    loadQuestions(i) {
      return fetch('https://opentdb.com/api.php?amount=' + i + '&difficulty=medium&type=boolean')
        .then(response => response.json())
        .then(data => this.setState({ questions: data.results }));

    }
    componentDidMount() {
      //fecth data from server while user reads page 0, no need for spin
      this.loadQuestions(this.state.nq);
    }
    handlePageChange(i, evt) {
      if (i === 100) { //new test, ask for new questions from server
        this.loadQuestions(this.state.nq);
        i = 1;
      }
      console.log("new page to state: " + i);
      this.setState({
        page: i
      })
    }
    handleResponse(i, b, evt) {
      console.log("saving response: " + (i-1)+"  "+b);
      var r = this.state.responses;
      r[i-1] = b ? "True" : "False"; //save string to compare with questions.correct_answer
      this.setState({
        responses: r,
        page: i+1
      })
    }
    render() {
      var rows = [];
      for (var i = 0; i <size(this.state.responses); i++) {
        var q = this.state.questions[i];
        rows.push(<small className="flexContainer"><span dangerouslySetInnerHTML={{ __html: (i + 1) + ": " + q.question }} />
          <span className={q.correct_answer !== this.state.responses[i] ? "red" : "green"}>
          &nbsp;&nbsp;&nbsp;{q.correct_answer.toUpperCase()}</span><br/></small>);
      }
      var p = this.state.page;
      return ( <div className = "App">
        <header className = "App-header">

        {p === 0 && <div><p  onClick={this.count3}> Welcome to the Trivia Challenge! </p><br></br><br></br>
            <p>You will be presented with {this.state.nq} True of False questions.</p></div>}

        {p === 0 && <div><p></p><p>Can you score 100%?</p></div>}
          {/* don't show BEGIN button until questions arrive from server */}
        {p === 0 && this.state.questions.length>0 && <div className="App-link" onClick={this.handlePageChange.bind(this, 1)}> BEGIN </div>}

        {/*p > 0 && p<11 && <div><p></p><p>{this.state.questions[p-1].category}</p></div> }
          {p > 0 && p < 11 && <div><p></p><p className="flexContainer" dangerouslySetInnerHTML={{ __html: p+": "+this.state.questions[p-1].question }}/></div> }
        {p > 0 && p < 11 && <div className="flexContainer"><span className="App-link flexStart" onClick={this.handleResponse.bind(this, p-1, false)}> FALSE </span>
        <span className="App-link flexEnd" onClick={this.handleResponse.bind(this, p-1, true)}> TRUE </span></div>*/}

          {p > 0 && p <= this.state.nq && <SWIPETRISTATE falsetrue={true} counter={p} text={p + ": " + this.state.questions[p - 1].question}
            title={this.state.questions[p - 1].category} handleResponse={this.handleResponse}></SWIPETRISTATE>}

        {p === this.state.nq+1 && <div><p> You scored </p><p>{this.sumCorrect()} / {size(this.state.responses)}</p><br /></div>}
        {p === this.state.nq+1 && <div>{rows}</div>}
        {p === this.state.nq+1 && <p></p>}
        {p === this.state.nq+1 &&  <div className="App-link" onClick={this.handlePageChange.bind(this, 100)}> NEW TEST </div>}



        </header>
        <DEVELOPER changeMode={this.changeMode} totalstate={this.state}/>
        </div>
      );
    }
  }