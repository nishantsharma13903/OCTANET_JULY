let todo_items = [];
let count = 0;
let img = document.querySelector('.task-img-cont');

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
    delete: false,
  };
  todo_items.push(todo);
  renderTodo(todo);
  count++;
  img.style.display = "none";
}

const form = document.querySelector(".form-container");
form.addEventListener("submit", (event) => {
  // Prevent to refresh page on submission of form.
  event.preventDefault();
  const input = document.querySelector(".task-input");
  let text = input.value;

  if (text != "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});

function renderTodo(todo) {
  const list = document.querySelector(".task-list");
  // Creating todo
  const node = document.createElement("li");
  node.classList.add("task-card");
  node.id = todo.id;

  let div1 = document.createElement('div');
  div1.classList.add('tc1');

  let inp = document.createElement("input");
  inp.type = "checkbox";

  inp.oninput = function () {
    toggleCheck(node.id);
  };

  let label = document.createElement("label");
  label.innerText = todo.text;

  let div2 = document.createElement('div');
  div2.classList.add('tc2');

  let del = document.createElement("button");
  let trash = document.createElement('i');
  trash.classList.add("fa");
  trash.classList.add("fa-trash");
  del.onclick = function () {
    toggleDelete(node.id);
  };

  let edit = document.createElement("button");
  let edit_icon = document.createElement('i');
  edit_icon.classList.add("fa");
  edit_icon.classList.add("fa-edit");
  edit.onclick = function () {
    editTask(node.id);
  };

  div1.appendChild(inp);
  div1.appendChild(label);
  node.appendChild(div1);

  del.appendChild(trash);
  edit.appendChild(edit_icon);
  div2.appendChild(del);
  div2.appendChild(edit);
  node.appendChild(div2);

  list.appendChild(node);
}

// Checking Checkbox
function toggleCheck(node_id) {
  for (let i = 0; i < todo_items.length; i++) {
    let div1 = document.getElementById(node_id).childNodes[0];
    let text = div1.childNodes[1];
    if (todo_items[i].id == node_id) {
      todo_items[i].checked = !todo_items[i].checked;
      if (todo_items[i].checked) {
        text.style.textDecoration = "line-through";
      } else {
        text.style.textDecoration = "none";
      }
    }
  }
}

// toggle delete
function toggleDelete(node_id) {
  const list = document.querySelector(".task-list");
  let node = document.getElementById(node_id);
  for (let i = 0; i < todo_items.length; i++) {
    if (todo_items[i].id == node_id) {
      todo_items[i].delete = !todo_items[i].delete;
      list.removeChild(node);
    }
  }
  count--;
  if(count == 0){
    img.style.display = "block";
  }
}

function editTask(node_id) {
  let div1 = document.getElementById(node_id).childNodes[0];
  let text = div1.childNodes[1];
  text.contentEditable = "true";
  text.style.borderBottom = "1px solid red";
  text.onfocus = function () {
    text.style.outline = "none";
  };
  text.onblur = function () {
    text.contentEditable = "false";
    text.style.borderBottom = "none";
    let edit_text = text.innerText;
    for(let i = 0; i < todo_items.length; i++){
      if(todo_items[i].id == node_id){
        todo_items[i].text = edit_text;
      }
    }
  };
}
