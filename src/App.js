import React, { PureComponent } from 'react'
import './App.css'
import { Input, Select, Form, Button } from 'antd'
import {getAllMeals} from './server'
import {submitMeal} from './server'
import {deleteMeal} from './server'

export default class App extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      hasError: false,
      name: '',
      breakfast: '',
      lunch: '',
      bar: '',
      results: []
    }
  }

  // Run this functions on load
  async componentDidMount(){
    const allMeals =  await getAllMeals()
    const data = allMeals.map((data) => {
    return  {...data.doc}
  })
    this.setState({results: data})
  }
  
  
  render () {
    const data = this.state.results
    const { Option } = Select
    
    return (
      
      <div className='App'>
        <h1>
          Welcome to the Filed Menu Options
        </h1>
        <h3>
          Tell Sarah what you want tomorrow
        </h3>

        <div className='form'>
          <Form onSubmit={this.onSubmit}>
            <Form.Item>
              <Input style={{ width: 500 }}
                placeholder='Enter your name'
                value={this.state.name}
                onChange={(event) => this.setState({ name: event.target.value })}
              />
            </Form.Item>
            <Select
              style={{ width: 200 }}
              placeholder='Select Breakfast'
              onChange={(event) => this.setState({ breakfast: event })}
            >
              <Option value='Pancakes'>Pancakes</Option>
              <Option value='Bread-and-egg'>Bread and egg</Option>
              <Option value='Indomie'>Indomie</Option>
              <Option value='Moi-Moi'>Moi-Moi and oats</Option>
              <Option value='Yam-and-Potatoes'>Yam and Potatoes</Option>
            </Select>

            <Select
              style={{ width: 200 }}
              placeholder='Select Lunch'
              onChange={(event) => this.setState({ lunch: event })}
              >
              <Option value='Egusi'>Poundo and Egusi</Option>
              <Option value='Ogbono'>Poundo and Ogbono</Option>
              <Option value='Okro'>Poundo and Okro</Option>
              <Option value='White'>Poundo and White soup</Option>
              <Option value='Kuskus'>Kus-Kus</Option>
              <Option value='Jollof-rice'>Jollof Rice</Option>
              <Option value='Fried-rice'>Fried Rice</Option>
              <Option value='Rice-and-beans'>Rice and Beans</Option>
              <Option value='Yam-potatoes-and-beans'>Yam, Potatoes and Beans</Option>
              <Option value='Porridge'>Porridge</Option>
              <Option value='Spaghetti'>Spaghetti</Option>
            </Select>
            <Select
              style={{ width: 200 }}
              placeholder='Select Bar for Dinner'
              onChange={(event) => this.setState({ bar: event })}
              >
              <Option value='Kj-grill'>KJ -grill</Option>
              <Option value='Secrets-gardens'>Secret Gardens</Option>
              <Option value='Drinks'>Drinks</Option>
              <Option value='Pizza'>Pizza and Ice cream</Option>
            </Select> 

            <Button htmlType='submit'>Submit</Button>

          </Form>

          <div className='lists'>
            <table>
               <tr>
                <th>Name</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Bar</th>
                <th></th>
              </tr>
            {data.map((item, index) => 
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.breakfast}</td>
                <td>{item.lunch}</td>
                <td>{item.bar}</td>
                <td><Button onClick = {(e)=> this.onDelete(index)}>Delete</Button></td>
              </tr>
              )}
              </table>
             </div>
        </div>
      </div>
    )
  }
  onSubmit = (e) => { 
    e.preventDefault()
    var name = this.state.name
    var breakfast = this.state.breakfast
    var lunch = this.state.lunch
    var bar = this.state.bar
    if(name === '' || breakfast === '' || lunch === '' || bar === ''){
      alert('Fill form completely')
    }
    else
    submitMeal({name, breakfast, lunch, bar})
    this.setState({name:'', breakfast:'', lunch:'', bar:''})
    window.location.reload(false)
  }

  onDelete = (index) => {
    alert('Are you sure you want to delete your record, This action cant be undone')
    deleteMeal(this.state.results[index])
    window.location.reload(false)
  }

}
