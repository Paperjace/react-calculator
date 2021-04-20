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
      displayNums: [0],
      cache: [],
      result: 0,
      isAwaitingNextNumber: false,
      isFloat: false,
      currentOperator: ''
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
      displayNums:[0],
      cache: [],
      result: 0,
      isAwaitingNextNumber: false,
      isFloat: false,
      currentOperator: ''
    })
  }

  mathOperation = (thisOperator) => {
    const formattedNumber = this.state.cache.join('')
    const newFloat = parseFloat(formattedNumber)

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
        cache: [],
        result: newFloat,
        isAwaitingNextNumber: true
      })
    }

    // Calculate previous operation and prepare for next incoming number
    if(!this.state.isAwaitingNextNumber) {
      let finalResult = this.operations[this.state.currentOperator](this.state.result,newFloat)
      
      if (finalResult.toString().length > 8 ) finalResult = finalResult.toExponential(8)

      return this.setState({
        displayNums: [finalResult],
        cache: [],
        result: finalResult,
        currentOperator: thisOperator,
        isAwaitingNextNumber: true
      })
    }
  }

  equals = () => {
    if (!this.state.isAwaitingNextNumber && this.state.currentOperator.length > 0) {
      const formattedNumber = this.state.cache.join('')
      const newFloat = parseFloat(formattedNumber)
      let finalResult = this.operations[this.state.currentOperator](this.state.result,newFloat)
      
      if (finalResult.toString().length > 8 ) finalResult = finalResult.toExponential(8)

      this.setState({
        displayNums: [finalResult],
        result: finalResult
      })
    }
  }

  numpad = (number) => {
    let newNumber = this.state.cache

    if (this.state.displayNums.length <= 8) {
      newNumber = newNumber.concat(number)
    }    

    this.setState({
      displayNums: newNumber,
      cache: newNumber,
      isAwaitingNextNumber: false
    })   
  }

  decimal = () => {
    if(this.state.isAwaitingNextNumber) {
      return this.setState({
        displayNums:['.'],
        cache:['.'],        
        isFloat: true
      })      
    }

    this.setState({
      displayNums:this.state.displayNums.concat('.'),       
      cache:this.state.displayNums.concat('.'),
      isFloat: true
    })
  }

  render() {
    return (
      <div className="container">
        <LCDDisplay display={this.state.displayNums}/>

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