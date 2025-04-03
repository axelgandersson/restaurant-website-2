class RestaurantWebsite {
  constructor() {
    this.filterButtons = document.querySelectorAll(".menu-filter button");
    this.menuItems = document.querySelectorAll(".menu-item");

    this.setupMenuFiltering();
    this.setupBuffetToggle();
    this.setupPriceList();
    this.setupHamburger();
    this.setupSmoothScroll();
  }

  setupMenuFiltering() {
    this.filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("dataCategory");
        this.menuItems.forEach((item) => {
          item.style.display =
            category === "all" || item.getAttribute("dataCategory") === category
              ? "block"
              : "none";
        });
        console.log(category);
      });
    });
  }

  setupBuffetToggle() {
    this.toggleButton = document.getElementById("toggle-details");
    this.details = document.getElementById("buffet-details");

    this.toggleButton.addEventListener("click", () => {
      this.details.classList.toggle("hidden");
      this.toggleButton.textContent = this.details.classList.contains("hidden")
        ? "Visa mer"
        : "Dölj";
    });
  }

  setupPriceList() {
    this.priceListTable = document.querySelector("#price-list tbody");
    this.totalPrice = 0;

    // Process each menu item and create a corresponding row in the price list
    this.menuItems.forEach((item) => {
      const dishName = item.querySelector("h3").textContent;
      const priceText = item.querySelector("p:nth-of-type(2)").textContent;
      const numericPrice = parseInt(priceText.replace(/[^\d]/g, ""), 10);
      let itemCount = 0;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${dishName}</td>
        <td>${numericPrice} kr</td>
        <td>
          <button class="add-one">+</button>
          <button class="remove-one">-</button>
          <span class="item-count">0</span>
        </td>
      `;

      const addButton = row.querySelector(".add-one");
      const removeButton = row.querySelector(".remove-one");
      const countSpan = row.querySelector(".item-count");

      addButton.addEventListener("click", () => {
        itemCount++;
        this.totalPrice += numericPrice;
        countSpan.textContent = `x${itemCount}`;
        this.updateCartTotal();
      });

      removeButton.addEventListener("click", () => {
        if (itemCount > 0) {
          itemCount--;
          this.totalPrice -= numericPrice;
          countSpan.textContent = `x${itemCount}`;
          this.updateCartTotal();
        }
      });

      this.priceListTable.appendChild(row);
    });

    // Append Total Row after processing all items
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <td><strong>Total:</strong></td>
      <td></td>
      <td id="cart-total">${this.totalPrice} kr</td>
    `;
    this.priceListTable.appendChild(totalRow);
    this.cartTotal = document.getElementById("cart-total");
  }

  updateCartTotal() {
    this.cartTotal.textContent = `${this.totalPrice} kr`;
  }

  setupHamburger() {
    this.hamburger = document.querySelector(".hamburger");
    this.navLinks = document.querySelector(".nav-links");

    this.hamburger.addEventListener("click", () => {
      this.navLinks.classList.toggle("active");
      this.navLinks.style.display = this.navLinks.classList.contains("active")
        ? "block"
        : "none";
    });
  }

  setupSmoothScroll() {
    const navLinksScroll = document.querySelectorAll(".nav-links a");
    navLinksScroll.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.getAttribute("href").slice(1);
        const element = document.getElementById(id);
        if (element) {
          const offsetPosition = element.offsetTop - 100;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new RestaurantWebsite();
});
