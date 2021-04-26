document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#todo");
  const todoList = document.querySelector("#todo-list");
  const addButton = document.querySelector("#add-button");
  let keyCount = 0;

  const addElement = (newData) => {
    const item = document.createElement("div");
    const checkbox = document.createElement("input");
    const text = document.createElement("span");
    const button = document.createElement("button");

    // 체크박스 클릭
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", (event) => {
      item.style.textDecoration = event.target.checked ? "line-through" : "";
    });

    // 제거하기 버튼 클릭
    const key = keyCount;
    button.textContent = "제거하기";
    button.style.margin = "5px 10px";
    button.addEventListener("click", () => removeTodo(key));

    text.textContent = newData;
    item.setAttribute("data-key", key);
    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(button);
    todoList.appendChild(item);
  }

  const addTodo = () => {
    newData = input.value.trim();
    if (newData === "") return;

    // add element
    addElement(newData)

    // add data
    let data = JSON.parse(localStorage.getItem("todo"));
    data = data ? [...data, newData] : [newData];
    localStorage.setItem("todo", JSON.stringify(data));

    keyCount += 1;
    input.value = "";
  };

  const removeTodo = (key) => {
    // remove element
    const item = document.querySelector(`[data-key="${key}"]`);
    todoList.removeChild(item);

    // remove data
    let data = JSON.parse(localStorage.getItem("todo"));
    data = data.filter((v) => v !== item.children[1].textContent);
    localStorage.setItem("todo", JSON.stringify(data));
  };

  // 추가하기 버튼 클릭
  addButton.addEventListener("click", addTodo);
  input.addEventListener("keyup", (event) => {
    const ENTER = 13;
    if (event.keyCode === ENTER) addTodo();
  });

  // show
  const showData = () => {
    const data = JSON.parse(localStorage.getItem("todo"));
    if (!data) return;

    data.forEach(element => {
      addElement(element)
    });
  };
  showData();
});
