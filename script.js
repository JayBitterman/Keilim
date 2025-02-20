/* script.js */

/* 
  Rules for Tevilah and Beracha based on material:
  - Metal: tevilah required, beracha required.
  - Ceramic: no tevilah, no beracha.
  - Wood: no tevilah, no beracha.
  - Plastic: no tevilah, no beracha.
  - Glass: tevilah required; beracha is disputed (thus marked with a "more information" symbol).
*/

function getStatus(material) {
    let status = {
      tevilah: false,
      beracha: false,
      disputed: false
    };
    
    switch(material) {
      case "Metal":
        status.tevilah = true;
        status.beracha = true;
        break;
      case "Ceramic":
        status.tevilah = false;
        status.beracha = false;
        break;
      case "Wood":
        status.tevilah = false;
        status.beracha = false;
        break;
      case "Plastic":
        status.tevilah = false;
        status.beracha = false;
        break;
      case "Glass":
        status.tevilah = true;
        // Beracha for glass is subject to dispute
        status.disputed = true;
        break;
      default:
        break;
    }
    return status;
  }
  
  // --- Card Creation and Population ---
  const cardsContainer = document.getElementById("cardsContainer");
  
  function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = item.id;
    
    // Create image element
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    card.appendChild(img);
    
    // Card content container
    const content = document.createElement("div");
    content.className = "card-content";
    
    // Title
    const title = document.createElement("h3");
    title.textContent = item.name;
    content.appendChild(title);
    
    // Determine statuses
    const status = getStatus(item.material);
    
    // Tevilah status
    const tevilahP = document.createElement("p");
    tevilahP.innerHTML = "Tevilah: " + (status.tevilah ? '<span style="color: green">✔</span>' : '<span style="color: red">✘</span>');
    content.appendChild(tevilahP);
    
    // Beracha status (only shown if tevilah is required)
    if (status.tevilah) {
      const berachaP = document.createElement("p");
      if (status.disputed) {
        berachaP.innerHTML = "Beracha: " + '<span class="more-info" style="color: orange" title="Halachic Dispute">ⓘ</span>';
      } else {
        berachaP.innerHTML = "Beracha: " + (status.beracha ? '<span style="color: green">✔</span>' : '<span style="color: red">✘</span>');
      }
      content.appendChild(berachaP);
    }
    
    card.appendChild(content);
    
    // Click event to show the detail view for this item
    card.addEventListener("click", function() {
      showDetail(item);
    });
    
    return card;
  }
  
  function populateCards(items) {
    cardsContainer.innerHTML = "";
    items.forEach(item => {
      const card = createCard(item);
      cardsContainer.appendChild(card);
    });
  }
  
  // --- Search Functionality ---
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = itemsData.filter(item => item.name.toLowerCase().includes(searchTerm));
    populateCards(filteredItems);
  });
  
  // --- Detail View Handling ---
  const homeView = document.getElementById("home-view");
  const detailView = document.getElementById("detail-view");
  const detailContent = document.getElementById("detailContent");
  const backButton = document.getElementById("backButton");
  
  function showDetail(item) {
    homeView.classList.remove("active");
    detailView.classList.add("active");
    detailContent.innerHTML = `
      <h2>${item.name}</h2>
      <img src="${item.image}" alt="${item.name}" style="width:100%;max-width:300px;">
      <p>${item.details}</p>
    `;
  }
  
  backButton.addEventListener("click", function() {
    detailView.classList.remove("active");
    homeView.classList.add("active");
  });
  
  // --- Routing for Navigation ---
  function navigateTo(viewId) {
    // Hide all views
    document.querySelectorAll(".view").forEach(view => view.classList.remove("active"));
    // Show the selected view
    document.getElementById(viewId).classList.add("active");
  }
  
  window.addEventListener("hashchange", handleRouting);
  
  function handleRouting() {
    const hash = window.location.hash;
    if (!hash || hash === "#") {
      navigateTo("home-view");
    } else if (hash.startsWith("#material/")) {
      const material = hash.split("/")[1];
      navigateTo("materials-view");
      document.getElementById("materialsContent").innerHTML = `<h2>Material: ${material}</h2><p>Information about ${material} items will be displayed here.</p>`;
    } else if (hash === "#general-laws") {
      navigateTo("general-laws-view");
    } else if (hash === "#multi-material") {
      navigateTo("multi-material-view");
    } else {
      navigateTo("home-view");
    }
  }
  
  // Back buttons for non-home views
  document.getElementById("backButtonMaterials").addEventListener("click", function() {
    window.location.hash = "";
  });
  document.getElementById("backButtonGeneral").addEventListener("click", function() {
    window.location.hash = "";
  });
  document.getElementById("backButtonMulti").addEventListener("click", function() {
    window.location.hash = "";
  });
  
  // --- Initial Setup ---
  populateCards(itemsData);
  handleRouting();
  