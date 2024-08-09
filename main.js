let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify([]));
} else {
  showElements();
}

//show tasks from local storage when page loads or when adding a new task or delete
function showElements() {
  tasks.innerHTML = "";
  let array = JSON.parse(localStorage.getItem("tasks"));
  array.forEach((el) => {
    let task = document.createElement("div");
    let p = document.createElement("p");
    let del = document.createElement("button");
    task.classList.add("task");
    del.classList.add("delete");
    del.onclick = () => deleteTask(el.id);
    p.textContent = el.title || el;
    del.textContent = "Delete";

    task.append(p, del);
    tasks.append(task);
  });
}

//add task
add.addEventListener("click", () => {
  let value = input.value;
  input.value = "";

  let newTask = {
    id: Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000,
    title: value,
  };

  let array = JSON.parse(localStorage.getItem("tasks"));
  array.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(array));

  showElements();
});

//delete task
function deleteTask(id) {
  let array = JSON.parse(localStorage.getItem("tasks"));
  let arrayAfterDelete = array.filter((el) => {
    return el.id !== id;
  });

  localStorage.setItem("tasks", JSON.stringify(arrayAfterDelete));
  showElements();
}
