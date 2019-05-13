import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AssertionError } from 'assert';
import { exportAllDeclaration } from '@babel/types';
import { shallow, mount, render, done, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
for (var i = 0; i < 6; i++) {
  it('renders without crashing page ' + i, () => {
    const div = document.createElement('div');
    ReactDOM.render(<App nq={5} page={i} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
}
it('any number of questions correctly loaded',  () => {
  const wrapper = shallow(<App nq={4} />)
  //return wrapper.loadQuestions(4).then(data => {
  //wrapper.setProps({ nq: 4 })
  //console.log(wrapper.state('questions'));
     expect(wrapper.instance().loadQuestions(4)).resolves.toHaveLength(4);
      //done();
    //});
});
