const modal = document.getElementById("input_modal");
const columns = Array.prototype.slice.call(
  document.getElementsByClassName("grid_column")
);
const buttons = Array.prototype.slice.call(
  document.getElementsByClassName("feed_add_icon")
);

// Center add buttons if the columns are empty.
columns.map(column =>
  column.children.length === 1
    ? column.classList.add("center_all")
    : column.classList.remove("center_all")
);

// Toggle the modal
buttons.map(button =>
  button.addEventListener("click", () => {
    modal.classList.add("modal");
    document
      .getElementById("input_modal_exit")
      .addEventListener("click", () => modal.classList.remove("modal"));
  })
);
