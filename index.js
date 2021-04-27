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
    
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", changeCheckDone);
    
    const dataKey = keyCount;
    button.textContent = "제거하기";
    button.style.margin = "5px 10px";
    button.addEventListener("click", () => removeTodo(dataKey));

    text.textContent = newData;
    item.setAttribute("data-key", dataKey);
    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(button);
    todoList.appendChild(item);
  };

  // 추가하기 버튼 클릭
  const addTodo = () => {
    newData = input.value.trim();
    if (newData === "") return;

    // add element
    addElement(newData);

    // save data
    let data = JSON.parse(localStorage.getItem("todo"));
    data = data ? [...data, newData] : [newData];
    localStorage.setItem("todo", JSON.stringify(data));

    keyCount += 1;
    input.value = "";
  };

  // 엔터 키 입력
  const textKeyUp = (evt) => {
    const ENTER = 13;
    if (evt.keyCode === ENTER) addTodo();
  };

  // 체크박스 클릭
  const changeCheckDone = (evt) => {
    evt.target.parentNode.style.textDecoration = evt.target.checked ? "line-through" : "";
  };

  // 제거하기 버튼 클릭
  const removeTodo = (dataKey) => {
    // remove element
    const item = document.querySelector(`[data-key="${dataKey}"]`);
    todoList.removeChild(item);

    // save data
    let data = JSON.parse(localStorage.getItem("todo"));
    data = data.filter((v) => v !== item.children[1].textContent);
    localStorage.setItem("todo", JSON.stringify(data));
  };

  addButton.addEventListener("click", addTodo);
  input.addEventListener("keyup", textKeyUp);
  
  const showData = () => {
    const data = JSON.parse(localStorage.getItem("todo"));
    if (!data) return;

    data.forEach((element) => {
      addElement(element);
    });
  };
  showData(); // load data
});
