import React, {Component} from 'react';
import './App.css';

import {Container, Row, Col, Button, Form, FormGroup, FormControl} from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";

class App extends Component {

  constructor() {
    super();
    this.state = {
        userInput: '',
        items: [],
    };
  }

componentWillMount() {
    const localStorageItem = JSON.parse(localStorage.getItem('items'));

    if (localStorageItem) {
      this.setState({
          items: localStorageItem
      });
    }
}

componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('items', JSON.stringify(nextState.items));
}

onChange = (e) => {
    this.setState({
        userInput : e.target.value
    });
}

addItem = (e) => {
  e.preventDefault();

  if (this.state.userInput !== "") {
    this.setState({
        userInput : '',
        items: [...this.state.items, this.state.userInput]
    });
  }
}

deleteItem(item) {

    const arrayItems = this.state.items;
    const index = arrayItems.indexOf(item);
    arrayItems.splice(index, 1);
    this.setState({
        items: arrayItems
    });
}

renderTodos() {
    return this.state.items.map((item) => {
        return (
            <div key={item} className="list-item" style={{textAlign: 'left'}}>
                <span>{item}</span>
                <span className="icon-close" onClick={this.deleteItem.bind(this, item)}>
                  <IoMdClose />
                </span>
            </div>
        );
    });
}

render() {
  const counter = this.state.items.length;
    return (
        <div className="todolist-container">
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={12} md={8}>
                <h1>To-Do List Manager</h1>
                <h2>Number of tasks : {counter}</h2>
                <Form>
                  <FormGroup>
                      <FormControl
                          type="text"
                          value={this.state.userInput}
                          placeholder="Write your task"
                          onChange={this.onChange}
                      />
                      <br/>
                      <Button variant="primary" type="submit" onClick={this.addItem}>Add Task</Button>
                  </FormGroup>
                </Form>
              </Col>
              <Container className="container-list-todo">
                <ul className="list-todo">
                    <li>{this.renderTodos()}</li>
                </ul>
                </Container>
            </Row>
          </Container>
        </div>
    );
}
}

export default App;
