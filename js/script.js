"use strict";

const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elInputTime = document.querySelector(".input-time");
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
    elList.innerHTML = null;
    renderTodos(todos, elList);
  } else if (evt.target.matches(".btns-completed")) {
    const todosCompleted = todos.filter((todo) => todo.isCompleted);

    elList.innerHTML = null;
    renderTodos(todosCompleted, elList);
  } else if (evt.target.matches(".btns-uncompleted")) {
    const todosUncompleted = todos.filter((todo) => !todo.isCompleted);

    elList.innerHTML = null;
    renderTodos(todosUncompleted, elList);
  }
});

const renderTodos = function (todosArr, htmlElement) {
  elBtnsAll.textContent = `All ${todos.length}`;

  const todosIsCompleted = todosArr.filter((todo) => todo.isCompleted).length;

  const todosIsUncompleted = todosArr.filter(
    (todo) => !todo.isCompleted,
  ).length;

  elBtnCompleted.textContent = `Completed ${todosIsCompleted > 0 ? todosIsCompleted : todos.length - todosIsUncompleted}`;

  elBtnUncompleted.textContent = `Uncompleted ${todosIsUncompleted > 0 ? todosIsUncompleted : todos.length - todosIsCompleted}`;

  todosArr.forEach((todo) => {
    const newLi = document.createElement("li");
    const newDivLeft = document.createElement("div");
    const newP = document.createElement("p");
    const newTime = document.createElement("span");
    const newDivRight = document.createElement("div");
    const newCheckbox = document.createElement("input");
    const newDeleteBtn = document.createElement("button");

    newLi.setAttribute(
      "class",
      "py-2 mx-1 row d-flex justify-content-between border-bottom border-2 border-warning",
    );
    newDivLeft.setAttribute("class", "col-9 px-0 fs-5");
    newP.textContent = todo.title;
    newP.setAttribute("class", "item-title m-0 d-inline-block fw-normal lh-sm");
    newTime.textContent = ` ( ${todo.time} )`;
    newTime.setAttribute("class", "fw-semibold text-danger");
    newDivRight.setAttribute(
      "class",
      "item-decs-wrapper col-3 px-0 d-flex align-items-center justify-content-end",
    );
    newCheckbox.type = "checkbox";
    newCheckbox.setAttribute("class", "item-input me-2");
    newDeleteBtn.textContent = "Delete";
    newDeleteBtn.setAttribute("class", "py-1 btn btn-outline-danger");

    newDeleteBtn.classList.add("delete-btn");
    newCheckbox.classList.add("chekbox-btn");

    newDeleteBtn.dataset.deleteId = todo.id;
    newCheckbox.dataset.chekboxId = todo.id;

    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newLi.classList.add("text-decoration-line-through");
    }

    htmlElement.appendChild(newLi);
    newLi.appendChild(newDivLeft);
    newDivLeft.appendChild(newP);
    newP.appendChild(newTime);
    newLi.appendChild(newDivRight);
    newDivRight.appendChild(newCheckbox);
    newDivRight.appendChild(newDeleteBtn);
  });
};

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputValue = elInput.value;
  const inputTimeValue = elInputTime.value;

  const todo = {
    title: inputValue,
    time: inputTimeValue,
    id: todos[todos.length - 1]?.id + 1 || 0,
    isCompleted: false,
  };

  todos.push(todo);

  elInput.value = null;
  elInputTime.value = null;
  elList.innerHTML = null;

  renderTodos(todos, elList);
});
