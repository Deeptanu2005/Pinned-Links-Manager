let links = JSON.parse(localStorage.getItem("links")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function renderLinks() {
  const educationalContainer = document.getElementById("educational-links");
  const professionalContainer = document.getElementById("professional-links");
  const favoriteContainer = document.getElementById("favorite-links");
  const favheadContainer = document.getElementById("fav-head");

  educationalContainer.innerHTML = "";
  professionalContainer.innerHTML = "";
  favoriteContainer.innerHTML = "";

  let hasEducationalLinks = false;
  let hasProfessionalLinks = false;
  let hasFavoriteLinks = false;

  if (links.length === 0) {
    educationalContainer.innerHTML =
      "<p>No educational links added. Please add some.</p>";
    professionalContainer.innerHTML =
      "<p>No professional links added. Please add some.</p>";
    favoriteContainer.style.display = "none";
    favheadContainer.style.display = "none";
    return;
  }

  links.forEach((link) => {
    const linkItem = createLinkHTML(link);
    if (favorites.some((fav) => fav.url === link.url)) {
      favoriteContainer.appendChild(linkItem);
      hasFavoriteLinks = true;
    } else {
      if (link.category === "educational") {
        educationalContainer.appendChild(linkItem);
        hasEducationalLinks = true;
      } else if (link.category === "professional") {
        professionalContainer.appendChild(linkItem);
        hasProfessionalLinks = true;
      }
    }
  });

  if (!hasEducationalLinks) {
    educationalContainer.innerHTML =
      "<p>No educational links added. Please add some.</p>";
  }
  if (!hasProfessionalLinks) {
    professionalContainer.innerHTML =
      "<p>No professional links added. Please add some.</p>";
  }
  if (!hasFavoriteLinks) {
    favoriteContainer.style.display = "none";
    favheadContainer.style.display = "none";
  } else {
    favoriteContainer.style.display = "block";
    favheadContainer.style.display = "block";
  }
}

function createLinkHTML(link) {
  const linkItem = document.createElement("div");
  linkItem.classList.add("link-item");

  const icon = document.createElement("img");
  icon.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${link.url}`;
  icon.alt = link.title;

  const title = document.createElement("a");
  title.href = link.url;
  title.textContent = link.title;
  title.target = "_blank";

  const favoriteButton = document.createElement("button");
  const removeLinkButton = document.createElement("button");

  favoriteButton.classList.add("favorite-button");
  favoriteButton.style.marginLeft = "10px";


  removeLinkButton.style.padding = "8px";
  removeLinkButton.style.backgroundColor = "transparent";
  removeLinkButton.style.border = "none";
  removeLinkButton.style.color = "#ff0000";
  removeLinkButton.style.fontSize = "18px";
  removeLinkButton.style.cursor = "pointer";
  removeLinkButton.style.transition = "color 0.3s ease";

  removeLinkButton.addEventListener("mouseenter", function () {
    removeLinkButton.style.color = "#ff6666";
  });

  removeLinkButton.addEventListener("mouseleave", function () {
    removeLinkButton.style.color = "#ff0000";
  });

  if (favorites.some((fav) => fav.url === link.url)) {
    favoriteButton.style.display = "none";
    favoriteButton.classList.add("active");
    
    removeLinkButton.style.marginLeft = "auto";
  } else {
    favoriteButton.textContent = "Add to Favorites";
    removeLinkButton.style.position = "default";
  }
  favoriteButton.onclick = () => toggleFavorite(link);

  removeLinkButton.textContent = "X";

  removeLinkButton.onclick = () => removeLink(link);

  linkItem.appendChild(icon);
  linkItem.appendChild(title);
  linkItem.appendChild(favoriteButton);
  linkItem.appendChild(removeLinkButton);

  return linkItem;
}

function addLink() {
  const newLinkInput = document.getElementById("new-link");
  const newNameInput = document.getElementById("new-name");
  const newCategoryInput = document.getElementById("new-category");

  const url = newLinkInput.value.trim();
  const name = newNameInput.value.trim();
  const category = newCategoryInput.value.trim();

  if (url && name && category) {
    const newLink = { url, title: name, category };
    links.push(newLink);
    localStorage.setItem("links", JSON.stringify(links));
    newLinkInput.value = "";
    newNameInput.value = "";
    newCategoryInput.value = "";
    renderLinks();
  } else {
    alert("Please fill all fields: URL, Name, and Category.");
  }
}

function toggleFavorite(link) {
  if (confirm(`Are you sure you want to add "${link.title}" to favorites?`)) {
    const index = favorites.findIndex((fav) => fav.url === link.url);
    if (index === -1) {
      favorites.push(link);
    } else {
      favorites.splice(index, 1);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderLinks();
  }
}

function removeLink(link) {
  if (confirm(`Are you sure you want to remove "${link.title}"?`)) {
    links = links.filter((item) => item.url !== link.url);
    favorites = favorites.filter((item) => item.url !== link.url);
    localStorage.setItem("links", JSON.stringify(links));
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderLinks();
  }
}

document.getElementById("search").addEventListener("input", function () {
  const filter = this.value.trim().toLowerCase();
  const links = document.querySelectorAll(".link-item");
  links.forEach((link) => {
    const title = link.querySelector("a").textContent.toLowerCase();
    if (title.includes(filter)) {
      link.style.display = "";
    } else {
      link.style.display = "none";
    }
  });
});

renderLinks();

