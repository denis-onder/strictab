const $ = elem => document.getElementById(elem);
const modal = $("modal");
const modalExitButton = $("modal_exit_button");
const modalFormButton = $("modal_form_button");
const feeds = [$("feed_one"), $("feed_two"), $("feed_three")];
const mapIntToWord = ["one", "two", "three"];

// Add feed
const addFeed = (columnName, feedName, feedSubreddit) => {
  const feed = { columnName, feedName, feedSubreddit };
  let state = [];
  if (localStorage.getItem("feeds") !== null) {
    state = JSON.parse(localStorage.getItem("feeds"));
  }
  // Check if the state alerady contains a feed for the specific column
  const filteredState = state.filter(feed => feed.columnName === columnName);
  if (filteredState.length > 0) {
    // TODO: Implement some form of a visual error message rather than logging
    console.log("Column already in use.");
    return;
  }
  state.push(feed);
  localStorage.setItem("feeds", JSON.stringify(state));
  init();
  modal.style.display = "none";
};

// Remove feed
const removeFeed = columnName => {
  const state = JSON.parse(localStorage.getItem("feeds"));
  for (let i = 0; i < state.length; i++) {
    if (state[i].columnName === columnName) {
      state.splice(i, 1);
    }
  }
  localStorage.setItem("feeds", JSON.stringify(state));
  init();
};

// Read feeds and set cards
const readFeed = async (feed, { feedName, feedSubreddit, columnName }) => {
  // Fetch data from the API
  const res = await fetch(
    `https://www.reddit.com/r/${feedSubreddit}/top/.json?count=50`
  );
  const data = await res.json();
  // Add top info banner
  feed.innerHTML = `<div class="feed_column_info"><a class="feed_column_info_tag" href="https://www.reddit.com/r/${feedSubreddit}/" target="_blank">${feedName}</a><i class="fa fa-trash fa-2x feed_column_info_delete" data-column="${columnName}"></i></div>`;
  // Create HTML for the individual posts
  data.data.children.forEach(post => {
    feed.innerHTML += `<div class="feed_column_post">
    <img class="feed_column_post_image" width="100px" height="100px" src="${
      post.data.thumbnail
        ? post.data.thumbnail
        : "http://www.exceptnothing.com/wp-content/uploads/2014/11/Reddit-Logo.png"
    }" />
       <div class="feed_column_post_info">
         <a href="https://www.reddit.com/u/${
           post.data.author
         }" target="_blank" class="feed_column_post_info_tag">/u/${
      post.data.author
    }</a>
         <a href="https://www.reddit.com${
           post.data.permalink
         }" target="_blank" class="feed_column_post_info_tag">${
      post.data.title
    }</a>
       </div>
     </div>`;
  });
  // Fix broken images
  Array.from(document.getElementsByClassName("feed_column_post_image")).forEach(
    img => {
      if (
        img.getAttribute("src") === "self" ||
        img.getAttribute("src") === ""
      ) {
        img.setAttribute(
          "src",
          "http://www.exceptnothing.com/wp-content/uploads/2014/11/Reddit-Logo.png"
        );
      }
    }
  );
  // Add the ability to remove feeds
  const trashCans = document.querySelectorAll(".feed_column_info_delete");
  trashCans.forEach(can =>
    can.addEventListener("click", e =>
      removeFeed(e.target.getAttribute("data-column"))
    )
  );
};

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

// Close modal
modalExitButton.addEventListener("click", () => (modal.style.display = "none"));

// Create icons
const createIcon = index => {
  const icon = document.createElement("i");
  icon.classList.add("fa", "fa-plus-circle", "feed_column_add");
  icon.setAttribute("data-column", `feed_${mapIntToWord[index]}`);
  icon.addEventListener("click", e => openModal(e.target));
  feeds[index].style.justifyContent = "center";
  feeds[index].appendChild(icon);
};

// Initialization: Check the feeds
function init() {
  const state = JSON.parse(localStorage.getItem("feeds")) || [];
  // Create the icons, but clear the innerHTML first.
  feeds.forEach((v, i) => {
    v.innerHTML = "";
    v.classList.add("feed");
    createIcon(i);
  });
  // Check the state.
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < feeds.length; j++) {
      if (feeds[j].id === state[i].columnName) {
        console.log(feeds[j].id, state[i].columnName);
        feeds[j].classList.remove("feed");
        readFeed(feeds[j], state[i]);
      }
    }
  }
}

init();
