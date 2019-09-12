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

// Read feeds and set cards
const readFeed = async (feed, subreddit) => {
  const res = await fetch(
    `https://www.reddit.com/r/${subreddit}/top/.json?count=20`
  );
  const data = await res.json();
  console.log(data);
  data.data.children.forEach(post => {
    feed.innerHTML += `<div class="feed_column_post">
       <img src="${post.data.thumbnail}" />
       <div class="feed_column_post_info">
         <a href="https://www.reddit.com/u/${post.data.author}" target="_blank" class="feed_column_post_info_tag">/u/${post.data.author}</a>
         <a href="https://www.reddit.com${post.data.permalink}" target="_blank" class="feed_column_post_info_tag">${post.data.title}</a>
       </div>
     </div>`;
  });
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
  // Create the icons
  feeds.forEach((v, i) => createIcon(i));
  // Check the state.
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < feeds.length; j++) {
      if (feeds[j].id === state[i].columnName) {
        feeds[j].firstChild.remove();
        readFeed(feeds[j], state[i].feedSubreddit);
      }
    }
  }
}

init();
