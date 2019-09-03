"use strict";

var modal = document.getElementById("input_modal");
var columns = Array.prototype.slice.call(document.getElementsByClassName("grid_column"));
var buttons = Array.prototype.slice.call(document.getElementsByClassName("feed_add_icon")); // Center add buttons if the columns are empty.

columns.map(function (column) {
  return column.children.length === 1 ? column.classList.add("center_all") : column.classList.remove("center_all");
}); // Toggle the modal

buttons.map(function (button) {
  return button.addEventListener("click", function () {
    modal.classList.add("modal");
    document.getElementById("input_modal_exit").addEventListener("click", function () {
      return modal.classList.remove("modal");
    });
  });
});
