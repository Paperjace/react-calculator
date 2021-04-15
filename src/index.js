import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Button(props) {
  return <div className={props.className} onClick={props.onClick}>{props.buttonDisplay}</div>
}

function LCDDisplay(props) {
  return <div className="lcdDisplay">{props.memory}</div>  
}

class Calculator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      memory: ['0']
    }
  }

  clear = () => {
    this.setState({
      memory: [0]
    })
  }

  divide = () => {
    alert('you clicked DIVIDE')
  }

  multiply = () => {
    alert('you clicked MULTIPLY')
  }

  subtract = () => {
    alert('you clicked SUBTRACT')
  }

  add = () => {
    alert('you clicked ADD')
  }

  equals = () => {
    alert('you clicked EQUALS')
  }

  numpad = (number) => {
    this.setState({
      memory:this.state.memory.concat(number)
    })
  }

  render() {
    return (
      <div className="container">
        <LCDDisplay memory={this.state.memory}/>
        <Button className="buttonClear" buttonDisplay="clear" onClick={this.clear}/>
        <Button className="buttonPrimary" buttonDisplay="1" onClick={() => this.numpad(1)}/>
        <Button className="buttonPrimary" buttonDisplay="2" onClick={() => this.numpad(2)}/>
        <Button className="buttonPrimary" buttonDisplay="3" onClick={() => this.numpad(3)}/>
        <Button className="buttonSecondary" buttonDisplay="/" onClick={this.divide}/>

        <Button className="buttonPrimary" buttonDisplay="4" onClick={() => this.numpad(4)}/>
        <Button className="buttonPrimary" buttonDisplay="5" onClick={() => this.numpad(5)}/>
        <Button className="buttonPrimary" buttonDisplay="6" onClick={() => this.numpad(6)}/>
        <Button className="buttonSecondary" buttonDisplay="*" onClick={this.multiply}/>

        <Button className="buttonPrimary" buttonDisplay="7" onClick={() => this.numpad(7)}/>
        <Button className="buttonPrimary" buttonDisplay="8" onClick={() => this.numpad(8)}/>
        <Button className="buttonPrimary" buttonDisplay="9" onClick={() => this.numpad(9)}/>
        <Button className="buttonSecondary" buttonDisplay="-" onClick={this.subtract}/>

        <Button className="buttonPrimary" buttonDisplay="." onClick={() => this.numpad(".")}/>
        <Button className="buttonPrimary" buttonDisplay="0" onClick={() => this.numpad(0)}/>
        <Button className="buttonPrimary" buttonDisplay="=" onClick={this.equals}/>
        <Button className="buttonSecondary" buttonDisplay="+" onClick={this.add}/>        
      </div>
    )
  }  
}

// ========================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);