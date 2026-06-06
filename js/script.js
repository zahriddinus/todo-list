"use strict";

const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".list");
const elBtnWrapper = document.querySelector(".btns-wrapper");
const elBtnsAll = document.querySelector(".btns-all");
const elBtnCompleted = document.querySelector(".btns-completed");
const elBtnUncompleted = document.querySelector(".btns-uncompleted");

const todos = [];
elBtnsAll.textContent = `All ${todos.length}`;

elList.addEventListener("click", (evt) => {
  const deleteBtnId = evt.target.dataset.deleteId * 1;
  const foundDeleteId = todos.findIndex((todo) => todo.id === deleteBtnId);

  if (evt.target.matches(".delete-btn")) {
    todos.splice(foundDeleteId, 1);

    elList.innerHTML = null;
    renderTodos(todos, elList);
  } else if (evt.target.matches(".chekbox-btn")) {
    const todoCheckboxIdId = evt.target.dataset.chekboxId * 1;
    const foundCheckboxId = todos.find((todo) => todo.id === todoCheckboxIdId);

    foundCheckboxId.isCompleted = !foundCheckboxId.isCompleted;

    elList.innerHTML = null;
    renderTodos(todos, elList);
  }
});

elBtnWrapper.addEventListener("click", (evt) => {
  if (evt.target.matches(".btns-all")) {
    // elBtnsAll.textContent = `All ${todos.length}`;

    elList.innerHTML = null;
    renderTodos(todos, elList);
  } else if (evt.target.matches(".btns-completed")) {
    const todosCompleted = todos.filter((todo) => todo.isCompleted === true);

    // elBtnCompleted.textContent = `Completed ${todosCompleted.length}`;

    elList.innerHTML = null;
    renderTodos(todosCompleted, elList);
  } else if (evt.target.matches(".btns-uncompleted")) {
    const todosUncompleted = todos.filter((todo) => todo.isCompleted === false);

    // elBtnUncompleted.textContent = `Uncompleted ${todosUncompleted.length}`;

    elList.innerHTML = null;
    renderTodos(todosUncompleted, elList);
  }
});

const renderTodos = function (todosArr, htmlElement) {
  elBtnsAll.textContent = `All ${todos.length}`;

  const todosIsCompleted = todosArr.filter(
    (todo) => todo.isCompleted === true,
  ).length;

  const todosUncompleted = todosArr.filter(
    (todo) => todo.isCompleted === false,
  ).length;

  elBtnCompleted.textContent = `Completed ${todosIsCompleted > 0 ? todosIsCompleted : todos.length - todosUncompleted}`;

  elBtnUncompleted.textContent = `Uncompleted ${todosUncompleted > 0 ? todosUncompleted : todos.length - todosIsCompleted}`;

  todosArr.forEach((todo) => {
    const newLi = document.createElement("li");
    const newCheckbox = document.createElement("input");
    const newDeleteBtn = document.createElement("button");

    newLi.textContent = todo.title;
    newDeleteBtn.textContent = "Delete";
    newCheckbox.type = "checkbox";

    newDeleteBtn.classList.add("delete-btn");
    newCheckbox.classList.add("chekbox-btn");

    newDeleteBtn.dataset.deleteId = todo.id;
    newCheckbox.dataset.chekboxId = todo.id;

    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newLi.classList.add("text-decoration-line-through");
    }

    htmlElement.appendChild(newLi);
    newLi.appendChild(newCheckbox);
    newLi.appendChild(newDeleteBtn);
  });
};

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputValue = elInput.value;

  const todo = {
    title: inputValue,
    id: todos[todos.length - 1]?.id + 1 || 0,
    isCompleted: false,
  };

  todos.push(todo);

  elInput.value = null;
  elList.innerHTML = null;

  renderTodos(todos, elList);
});
