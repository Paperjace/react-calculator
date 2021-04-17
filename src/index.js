import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Button(props) {
  return <div className={props.className} onClick={props.onClick}>{props.buttonDisplay}</div>
}

function LCDDisplay(props) {
  return <div className="lcdDisplay">{props.display}</div>  
}

class Calculator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      displayNums: ['0'],
      cache: [],
      result: 0,
      isAwaitingNextNumber: false,
      isFloat: false,
      currentOperator: ''
    }
  }

  clear = () => {
    this.setState({
      displayNums:[0],
      cache: [],
      result: 0,
      isAwaitingNextNumber: false,
      isFloat: false
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
    if(this.state.isAwaitingNextNumber) return

    if(!this.state.isAwaitingNextNumber) {
      const formattedNumber = this.state.displayNums.join('')
      const newFloat = parseFloat(formattedNumber)
      const newResult = this.state.result + newFloat
      
      return this.setState({
        displayNums: newResult,
        cache: ['0'],
        result: newResult,
        currentOperator: '+'
      })
    }
    
    const newOperation = this.state.cache.concat("+")

    this.setState({
      isAwaitingNextNumber: true,
      displayNums: newOperation,
      cache: newOperation,
      currentOperator: '+'
    })
  }

  equals = () => {
  
  }

  numpad = (number) => {
    const newNumber = this.state.cache.concat(number)

    if(this.state.isAwaitingNextNumber && this.state.isFloat){
      newNumber.splice(0, 0, '.')
    }

    this.setState({
      displayNums: newNumber,
      cache: newNumber,
      isAwaitingNextNumber: false
    })   
  }

  decimal = () => {
    if(this.state.isFloat) return

    if(this.state.isAwaitingNextNumber) {
      this.setState({
        displayNums:['.'],
        cache:['.'],        
        isFloat: true
      })      
    } else {
      this.setState({
        displayNums:this.state.displayNums.concat('.'),       
        cache:this.state.displayNums.concat('.'),
        isFloat: true
      })      
    }
  }

  render() {
    return (
      <div className="container">
        
        
        <LCDDisplay display={this.state.displayNums}/>


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