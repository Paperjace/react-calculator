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
      num1: [],
      num2: [],
      numDisplay: [0],      
      result: [], // Updated when equals is pressed.
      isAwaitingNextNumber: true, // When true, a new number is built in the display. Also used for various conditionals.
      isFloat: false, // Number contains a decimal.
      currentOperator: '' // The arithmetic operation to be performed.
    }
  }

  operations = {
    '*' : (a, b) => { return a * b },
    '/' : (a, b) => { return a / b },
    '+' : (a, b) => { return a + b },
    '-' : (a, b) => { return a - b }
  }

  clear = () => {
    this.setState({
      num1: [],
      num2: [],
      numDisplay:[0],      
      result: [],
      isAwaitingNextNumber: true,
      isFloat: false,
      currentOperator: ''
    })
  }

  mathOperation = (thisOperator) => {
    // Join array of numbers together to make a single string of numbers.  Then use parseFloat() to make it a real integer/float number.
    const formattedNumDisplay = this.state.numDisplay.join('')
    const numDisplayFloat = parseFloat(formattedNumDisplay)

    // Only update this.state.operator if previous pressed button was an operator
    if(this.state.isAwaitingNextNumber) {
      return this.setState({
        currentOperator: thisOperator
      })
    }

    // Handle first time pressing operator button
    if(!this.state.isAwaitingNextNumber && this.state.currentOperator.length <= 0){
      return this.setState({
        currentOperator: thisOperator,
        num1: [numDisplayFloat],
        isAwaitingNextNumber: true,
        isFloat: false
      })
    }

    // Calculate previous operation and prepare for next incoming number
    if(!this.state.isAwaitingNextNumber) {
      let finalResult = this.operations[this.state.currentOperator](this.state.num1[0],numDisplayFloat)

      if (finalResult.toString().length > 8 ) finalResult = finalResult.toExponential(8)

      return this.setState({
        numDisplay: [finalResult],
        num1: [finalResult],
        currentOperator: thisOperator,
        isAwaitingNextNumber: true
      })
    }
  }

  equals = () => {
    // Handle when equals button is pressed consecutively
    if(this.state.isAwaitingNextNumber){
      // When operator button was the last button, prevent equals button from executing
      if(this.state.result.length <= 0) return

      // Calculate answer
      let finalResult = this.operations[this.state.currentOperator](this.state.result[0],this.state.num2[0])
      
      // If answer is longing than 8 characters, convert to exponential as truncation
      if (finalResult.toString().length > 8 ) finalResult = finalResult.toExponential(8)

      this.setState({
        num1: this.state.result,
        numDisplay: [finalResult],
        result: [finalResult],
        isAwaitingNextNumber: true
      })
    }

    // Handle first equals button press
    if (!this.state.isAwaitingNextNumber && this.state.currentOperator.length > 0) {

      // Join array of numbers together to make a single string of numbers.  Then use parseFloat() to make it a real integer/float number.
      const formattedNum1 = this.state.num1.join('')
      const num1Float = parseFloat(formattedNum1)

      const formattedNumDisplay = this.state.numDisplay.join('')
      const numDisplayFloat = parseFloat(formattedNumDisplay)

      // Calculate answer
      let finalResult = this.operations[this.state.currentOperator](num1Float,numDisplayFloat)
      
      // If answer is longing than 8 characters, convert to exponential as truncation
      if (finalResult.toString().length > 8 ) finalResult = finalResult.toExponential(8)

      this.setState({
        num1: [num1Float],
        num2: [numDisplayFloat],
        numDisplay: [finalResult],
        result: [finalResult],
        isAwaitingNextNumber: true
      })
    }
  }

  numpad = (number) => {
    let newNumber
    let clearState = {}

    // If a non-number was previously pressed, start concatenating a new set of numbers.  Otherwise, concatenate to what's in the display.
    if (this.state.isAwaitingNextNumber) {
      newNumber = []
    } else {
      newNumber = this.state.numDisplay
    }
    
    // Limit input to 8 digits
    if (this.state.numDisplay.length <= 8) {
      newNumber = newNumber.concat(number)
    }

    // If equals button was previously pressed, clear all state.
    if (this.state.result.length > 0) {
      console.log(this.state.result.length)
      clearState = {
        num1: [],
        num2: [],
        result: [],
        isFloat: false,
        currentOperator: ''
      }
    }

    this.setState({
      numDisplay: newNumber,
      isAwaitingNextNumber: false,
      ...clearState
    })   
  }

  decimal = () => {
    // If decimal was pressed once for current number, return immediately. Effectively disables decimal button.
    if (this.state.isFloat) return 
    
    // Start next number with a decimal if operator button was previously pressed.
    if(this.state.isAwaitingNextNumber) {
      return this.setState({
        numDisplay:['.'],
        isFloat: true,
        isAwaitingNextNumber: false
      })      
    }

    this.setState({
      numDisplay:this.state.numDisplay.concat('.'),       
      isFloat: true
    })
  }

  render() {
    return (
      <div className="container">
        <LCDDisplay display={this.state.numDisplay}/>

        <Button className="buttonClear" buttonDisplay="clear" onClick={this.clear}/>
        <Button className="buttonPrimary" buttonDisplay="1" onClick={() => this.numpad(1)}/>
        <Button className="buttonPrimary" buttonDisplay="2" onClick={() => this.numpad(2)}/>
        <Button className="buttonPrimary" buttonDisplay="3" onClick={() => this.numpad(3)}/>
        <Button className="buttonSecondary" buttonDisplay="÷" onClick={(e) => this.mathOperation('/', e)}/>

        <Button className="buttonPrimary" buttonDisplay="4" onClick={() => this.numpad(4)}/>
        <Button className="buttonPrimary" buttonDisplay="5" onClick={() => this.numpad(5)}/>
        <Button className="buttonPrimary" buttonDisplay="6" onClick={() => this.numpad(6)}/>
        <Button className="buttonSecondary" buttonDisplay="x" onClick={(e) => this.mathOperation('*', e)}/>

        <Button className="buttonPrimary" buttonDisplay="7" onClick={() => this.numpad(7)}/>
        <Button className="buttonPrimary" buttonDisplay="8" onClick={() => this.numpad(8)}/>
        <Button className="buttonPrimary" buttonDisplay="9" onClick={() => this.numpad(9)}/>
        <Button className="buttonSecondary" buttonDisplay="-" onClick={(e) => this.mathOperation('-', e)}/>

        <Button className="buttonPrimary" buttonDisplay="." onClick={this.decimal}/>
        <Button className="buttonPrimary" buttonDisplay="0" onClick={() => this.numpad(0)}/>
        <Button className="buttonPrimary" buttonDisplay="=" onClick={this.equals}/>
        <Button className="buttonSecondary" buttonDisplay="+" onClick={(e) => this.mathOperation('+', e)}/>        
      </div>
    )
  }  
}

// ========================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);