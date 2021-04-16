import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Button(props) {
  return <div className={props.className} onClick={props.onClick}>{props.buttonDisplay}</div>
}

function LCDDisplay(props) {
  return <div className="lcdDisplay">{props.cache}</div>  
}

class Calculator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      displayNums: [0],
      cache: [],
      result: 0,      
      awaitingNextNumber: false
    }
  }

  clear = () => {
    this.setState({
      displayNums:[0],
      cache: [],
      result: 0,
      awaitingNextNumber: false
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
    const formattedNumber = this.state.displayNums.join('')
    const parsedNumber = parseFloat(formattedNumber)
    const mathResult = this.state.result + parsedNumber
    
    this.setState({
      result: mathResult,
      awaitingNextNumber: true,
      displayNums: mathResult,
      cache: []
    })
  }

  equals = () => {
    alert('you clicked EQUALS')
  }

  numpad = (number) => {
    this.setState({
      displayNums:this.state.cache.concat(number),
      cache:this.state.cache.concat(number),
      awaitingNextNumber: false
    })   
  }

  decimal = () => {
    if(this.state.awaitingNextNumber){
      this.setState({
        displayNums:[],
        cache:[],
        awaitingNextNumber: false
      })
    }

    if(this.state.displayNums.includes('.')) return
    this.setState({
      displayNums:this.state.displayNums.concat('.'),
      // cache:this.state.displayNums.concat('.'),
      awaitingNextNumber: false
    })
  }

  render() {
    return (
      <div className="container">
        <LCDDisplay cache={this.state.displayNums}/>
        <Button className="buttonClear" buttonDisplay="clear" onClick={this.clear}/>
        <Button className="buttonPrimary" buttonDisplay="1" onClick={() => this.numpad(1)}/>
        <Button className="buttonPrimary" buttonDisplay="2" onClick={() => this.numpad(2)}/>
        <Button className="buttonPrimary" buttonDisplay="3" onClick={() => this.numpad(3)}/>
        <Button className="buttonSecondary" operations="/" buttonDisplay="÷" onClick={this.divide}/>

        <Button className="buttonPrimary" buttonDisplay="4" onClick={() => this.numpad(4)}/>
        <Button className="buttonPrimary" buttonDisplay="5" onClick={() => this.numpad(5)}/>
        <Button className="buttonPrimary" buttonDisplay="6" onClick={() => this.numpad(6)}/>
        <Button className="buttonSecondary" operation="*" buttonDisplay="x" onClick={this.multiply}/>

        <Button className="buttonPrimary" buttonDisplay="7" onClick={() => this.numpad(7)}/>
        <Button className="buttonPrimary" buttonDisplay="8" onClick={() => this.numpad(8)}/>
        <Button className="buttonPrimary" buttonDisplay="9" onClick={() => this.numpad(9)}/>
        <Button className="buttonSecondary" operation="-" buttonDisplay="-" onClick={this.subtract}/>

        <Button className="buttonPrimary" buttonDisplay="." onClick={this.decimal}/>
        <Button className="buttonPrimary" buttonDisplay="0" onClick={() => this.numpad(0)}/>
        <Button className="buttonPrimary" buttonDisplay="=" onClick={this.equals}/>
        <Button className="buttonSecondary" operations="+" buttonDisplay="+" onClick={this.add}/>        
      </div>
    )
  }  
}

// ========================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);