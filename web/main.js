const $ = elem => document.getElementById(elem);
const modal = $("modal");
const modalExitButton = $("modal_exit_button");
const modalFormButton = $("modal_form_button");
const feeds = [$("feed_one"), $("feed_two"), $("feed_three")];

// Add feed
const addFeed = (...feedProps) => {
  const feed = { ...feedProps };
  let state = [];
  if (localStorage.getItem("feeds") !== null) {
    state = JSON.parse(localStorage.getItem("feeds"));
  }
  state.push(feed);
  localStorage.setItem("feeds", JSON.stringify(state));
};

// Close modal
modalExitButton.addEventListener("click", () => (modal.style.display = "none"));

// Open modal for the correct feed column
const openModal = target => {
  (modal.style.display = "flex"),
    modalFormButton.addEventListener("click", () =>
      addFeed(
        target.getAttribute("data-column"),
        $("modal_form_name").value,
        $("modal_form_subreddit").value
      )
    );
};

// Create icons
const createIcon = index => {
  const mapIntToWord = ["one", "two", "three"];
  const icon = document.createElement("i");
  icon.classList.add("fa", "fa-plus-circle", "feed_column_add");
  icon.setAttribute("data-column", `feed_${mapIntToWord[index]}`);
  icon.addEventListener("click", e => openModal(e.target));
  return icon;
};

// Check the feeds
(() => {
  for (let i = 0; i < feeds.length; i++) {
    if (feeds[i].children.length === 0) {
      const icon = createIcon(i);
      feeds[i].appendChild(icon);
      feeds[i].style.justifyContent = "center";
    }
  }
})();
