import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Button(props) {
  if(props.buttonDisplay === 'clear'){
    return <div className="buttonClear" onClick={props.onClick}>{props.buttonDisplay}</div>
  }

  if(['÷', 'x','-', '+', '='].indexOf(props.buttonDisplay) +1) {
    return <div className="buttonSecondary" onClick={props.onClick}>{props.buttonDisplay}</div>
  }
  
  return <div className="buttonPrimary" onClick={props.onClick}>{props.buttonDisplay}</div>
}

function LCDDisplay(props) {
  return <div className="lcdDisplay">{props.memory}</div>  
}

class Calculator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      memory: [0]
    }
    
    this.buttonConfig = [
      'clear',
      '1', '2', '3', '÷', 
      '4', '5', '6', 'x', 
      '7', '8', '9', '-', 
      '0', '.', "=", "+"]

    this.buttons = this.buttonConfig.map((config, index) => {

      if(config === 'clear') {
        return <Button key={index} buttonDisplay={config} onClick={this.clear}/>
      }
      if(config === '÷') {
        return <Button key={index} buttonDisplay={config} onClick={this.divide}/>
      }
      if(config === 'x') {
        return <Button key={index} buttonDisplay={config} onClick={this.multiply}/>
      }
      if(config === '-') {
        return <Button key={index} buttonDisplay={config} onClick={this.subtract}/>
      }
      if(config === '+') {
        return <Button key={index} buttonDisplay={config} onClick={this.add}/>
      }
      if(config === '=') {
        return <Button key={index} buttonDisplay={config} onClick={this.sum}/>
      }

      return <Button key={index} buttonDisplay={config} onClick={() => this.numpad(config)}/>
    });
  }

  clear(){
    this.setState({
      memory: []
    })
  }

  divide(){
    alert('you clicked DIVIDE')
  }

  multiply(){
    alert('you clicked MULTIPLY')
  }

  subtract(){
    alert('you clicked SUBTRACT')
  }

  add(){
    alert('you clicked ADD')
  }

  sum(){
    alert('you clicked SUM')
  }

  numpad(number){
    this.setState({
      memory: this.state.memory.concat(number)
    })
  }

  render() {
    return (
      <div className="container">
        <LCDDisplay memory={this.state.memory}/>
        {this.buttons}
      </div>
    )
  }  
}

// ========================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);