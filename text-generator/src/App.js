import React, { Component } from 'react';
import './App.css';
import Output from './Components/Output';
import Select from './Components/Controls/Select';
import Text from './Components/Controls/Text';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paras: 4,
      format: true,
      text: ''
    }
  }

  componentWillMount(){
    this.getSampleText();
  }

  getSampleText(){
    axios.get('https://baconipsum.com/api?paras='+this.state.paras+'&format='+this.state.format)
    .then((response) => {
      this.setState({text: response.data.text}, function(){
        console.log(this.state);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  showFormat(x){
    this.setState({format:x}, this.getSampletext);
  }

  changeParas(number){
    this.setState({paras:number}, this.getSampleText);
  }

  render() {
    return (
      <div className="App container">
        <h1 className="text-center"> ReactJS sample text generator</h1>
        <hr/>
        <hr/>
        <form className="form-inline">
          <div className="form-group">
            <label> Paragraphs: </label>
            <Text value={this.state.paras} onChange={this.changeParas.bind(this)}/>
          </div>
          <div className="form-group">
            <label> Include Format:</label>
            <Select value={this.state.format} onChange={this.showFormat.bind(this)}/>
          </div>
        </form>
        <br/> <br/>
        <Output value={this.state.text }/>
      </div>
    );
  }
}

export default App;
