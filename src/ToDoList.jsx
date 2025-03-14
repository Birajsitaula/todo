import React, { useState } from "react";
import { Form, Container, Button, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FaPlus, FaTrash } from "react-icons/fa";

const ToDoList = () => {
  const initialData = JSON.parse(localStorage.getItem("todoList")) || [];

  const [todoList, setTodoList] = useState([...initialData]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;

    const newTodoList = [
      ...todoList,
      {
        data: text,
        Date: new Date().toLocaleString().split(",")[0],
        isDone: false,
      },
    ];

    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    setText("");
  };

  const toggleTodoCompletion = (idx) => {
    const newTodo = todoList.map((todo, index) =>
      index === idx ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodoList(newTodo);
    localStorage.setItem("todoList", JSON.stringify(newTodo));
  };

  const remove = (idx) => {
    const response = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (response) {
      const newTodo = todoList.filter((_, index) => index !== idx);
      setTodoList(newTodo);
      localStorage.setItem("todoList", JSON.stringify(newTodo));
    }
  };

  return (
    <Container className="mb-3 text-center">
      <h1>Todo List App</h1>
      <Form.Control
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && addTodo()}
        placeholder="Enter a todo"
      />
      <br />

      <Button onClick={addTodo} disabled={!text.trim()}>
        <FaPlus /> <label className="ms-2"> Add</label>
      </Button>
      <br />
      <br />

      {todoList.length > 0 ? (
        todoList.map((todo, index) => (
          <Row key={index}>
            <Col xs={10}>
              <Alert
                variant={todo.isDone ? "danger" : "success"}
                className="text-start"
                style={{
                  cursor: "pointer",
                  textDecoration: todo.isDone ? "line-through" : "none",
                }}
                onClick={() => toggleTodoCompletion(index)}
              >
                {todo.data}
                <br />
                <small> {todo.Date} </small>
              </Alert>
            </Col>

            <Col className="mt-4">
              <FaTrash
                size="40"
                color="red"
                onClick={() => remove(index)}
                style={{ cursor: "pointer" }}
              />
            </Col>
          </Row>
        ))
      ) : (
        <Alert variant="info">No todo items</Alert>
      )}
    </Container>
  );
};

export default ToDoList;
