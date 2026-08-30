/* ساخت محصولات */
const products = [];
for (let i = 1; i <= 300; i++) {
  products.push({
    id: i,
    name: `اثر شماره ${i}`,
    image: `images/product${i}.webp`,
    price: `${(i * 10000).toLocaleString('fa-IR')} تومان`,
    description: "توضیحات نمونه برای این محصول."
  });
}

/* رندر لیست */
const productsGrid = document.getElementById("productsGrid");
products.forEach(p => {
  productsGrid.innerHTML += `
    <div class="product-card">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>کد : ${p.id}</p>
      <button onclick="location.hash='product/${p.id}'">مشاهده محصول</button>
    </div>`;
});

/* مخفی‌سازی اولیه: فقط ۱۲ محصول روی موبایل */
function hideExtraProducts() {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card, index) => {
    if (index >= 12) {
      card.classList.add("hidden-product");
    }
  });
}

window.addEventListener("load", hideExtraProducts);

/* دکمه نمایش بیشتر */
document.getElementById("showMoreBtn").addEventListener("click", () => {
  document.querySelectorAll(".hidden-product").forEach(card => {
    card.style.display = "block";
  });
  document.getElementById("showMoreBtn").style.display = "none";
});

/* نمایش محصول */
function showProduct(id) {
  const p = products.find(x => x.id == id);
  if (!p) return;

  document.getElementById("productImage").src = p.image;
  document.getElementById("productTitle").textContent = p.name;
  document.getElementById("productPrice").textContent = p.price;
  document.getElementById("productDescription").textContent = p.description;
  document.getElementById("productCode").textContent = `کد محصول: ${p.id}`;

  document.getElementById("homeView").classList.remove("active");
  document.getElementById("productView").classList.add("active");
}

/* روتینگ با hash */
function router() {
  const hash = location.hash;

  if (!hash || hash === "#") {
    document.getElementById("productView").classList.remove("active");
    document.getElementById("homeView").classList.add("active");
    return;
  }

  if (hash.startsWith("#product/")) {
    const id = hash.split("/")[1];
    showProduct(id);
  }
}

window.addEventListener("hashchange", router);
router();

/* اسکرول */
document.getElementById("scrollToProducts").addEventListener("click", () => {
  document.getElementById("productsSection").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("scrollToFooter").addEventListener("click", () => {
  document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
});

/* سرچ */
document.getElementById("searchBtn").addEventListener("click", () => {
  const code = Number(document.getElementById("searchInput").value);
  const product = products.find(p => p.id === code);
  if (product) {
    location.hash = `product/${product.id}`;
  } else {
    alert("اثری با این کد پیدا نشد.");
  }
});

/* همبرگری */
document.getElementById("hamburgerBtn").addEventListener("click", () => {
  document.getElementById("hamburgerBtn").classList.toggle("active");
});