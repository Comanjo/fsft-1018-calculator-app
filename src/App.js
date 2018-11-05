import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

const Values = styled.section`
  padding: 6px;
  background: #cdcdcd;
`

const Operations = styled(Values)`
  background: #e6e6e6;
`

const Calculation = styled(Values)`

`

const Title = styled.h3`
  margin: 0;
  padding: 0;
`

const Input = styled.input`
  padding: 3px;
  margin: 3px;
  border: 1px solid black;
  font-size: 15px;
`

const Select = styled.select`
  padding: 3px;
  border: 1px solid black;
  font-size: 15px;
`

const AddNumber = styled.button`
  padding: 6px;
  margin: 6px;
  border: 1px solid black;
  font-size: 20px;
`

const Calculate = styled.button`
  padding: 6px;
  border: 1px solid #666;
  background: #666;
  color: white;
  font-size: 15px;
`

class App extends Component {
  
  state = {
    numbers: [],
    current: 0,
    operation: 'addition',
    
  }
  
  
  handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`https://calculator-api-uwxhfxknwl.now.sh`, {
      method: 'POST',
      body: JSON.stringify({ values: this.state.numbers, operation: this.state.operation }),
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
    
    this.setState({ response })
  }
  
  
  render() {
    
    // const numbers = range(0, this.state.numbers, 1)
    
    const { numbers, current, operation, response } = this.state
    
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <Values>
            <Title>Values</Title>
            {numbers.map((n, index) => <span key={index}>{n}</span>)}
            <Input
              type="number"
              onChange={e => this.setState({ current: e.target.value })} value={current}
            />
            <AddNumber
              type="button"
              onClick={e => this.setState({ numbers: [...numbers, parseInt(current)], current: 0 })}
            >+</AddNumber>
          </Values>
          <Operations>
            <Title>Operation</Title>
            <Select value={operation} onChange={e => this.setState({ operation: e.target.value })}>
              <option value="addition">Addition</option>
              <option value="subtraction">Subtraction</option>
            </Select>
          </Operations>
          <Calculation>
            <Calculate type="submit">Calculate</Calculate>
          </Calculation>
          
          {response ? (<h3>Response: {response}</h3>) : null}
        </form>
      </Fragment>
    )
  }
}

export default App
