// Menu Filtering
const filterButtons = document.querySelectorAll(".menu-filter button");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("dataCategory");
    menuItems.forEach((item) => {
      if (
        item.getAttribute("dataCategory") === category ||
        category === "all"
      ) {
        item.style.display = "block";
        console.log(category);
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Toggle Lunch Buffet Details
const toggleButton = document.getElementById("toggle-details");
const details = document.getElementById("buffet-details");

toggleButton.addEventListener("click", () => {
  details.classList.toggle("hidden");
  toggleButton.textContent = details.classList.contains("hidden")
    ? "Visa mer"
    : "Dölj";
});

// Populate Price List Table
const priceListTable = document.querySelector("#price-list tbody");
menuItems.forEach((item) => {
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${item.querySelector("h3").textContent}</td>
      <td>${item.querySelector("p:nth-of-type(2)").textContent}</td>
      <td>${item.querySelector("p:nth-of-type(3)").textContent}</td>
    `;
  priceListTable.appendChild(row);
});

// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
