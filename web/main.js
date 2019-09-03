"use strict";

var columns = [document.getElementById("feed_zero"), document.getElementById("feed_one"), document.getElementById("feed_two")];
columns.map(function (column) {
  return column.children.length === 1 ? column.classList.add("center_all") : column.classList.remove("center_all");
});
