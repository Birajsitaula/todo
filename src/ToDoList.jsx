import React, { useState } from "react";
import { Form, Container, Button, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FaPlus, FaTrash } from "react-icons/fa";

const ToDoList = () => {
  const initialData = JSON.parse(localStorage.getItem("todoList")) || [];

  const [todoList, settodoList] = useState([...initialData]);
  const [text, setText] = useState("");

  const addTodo = () => {
    settodoList([
      ...todoList,
      {
        data: text,
        Date: new Date().toLocaleString().split(",")[0],
        isDone: false,
      },
    ]);
    setText("");
    localStorage.setItem(
      "todoList",
      JSON.stringify([
        ...todoList,
        {
          data: text,
          Date: new Date().toLocaleString().split(",")[0],
          isDone: false,
        },
      ])
    );
    localStorage.setItem("text", "");
  };

  const toggleTodoCompletion = (idx) => {
    const newTodo = todoList.map((todo, index) =>
      index === idx ? { ...todo, isDone: !todo.isDone } : todo
    );
    settodoList(newTodo);
  };

  const remove = (idx) => {
    const response = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (response) {
      const newTodo = todoList.filter((_, index) => {
        return index !== idx;
      });
      settodoList(newTodo);
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

      <Button onClick={addTodo}>
        <FaPlus /> <label className="ms-2"> Add</label>
      </Button>
      <br />
      <br />

      {todoList.length > 0
        ? todoList.map((todo, index) => {
            return (
              <Row>
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
                    {" "}
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
                  />
                </Col>
              </Row>
            );
          })
        : "No todo list"}
    </Container>
  );
};

export default ToDoList;
