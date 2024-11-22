// Telegram Web App API
const tg = window.Telegram?.WebApp || {};
tg.expand();

const user = tg.initDataUnsafe?.user || {};
const userId = user.id || "Неизвестен";
const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

// Функция перехода между страницами
function goToPage(page) {
  window.location.href = page;
}

// На странице профиля отображаем информацию
if (window.location.pathname.includes("profile.html")) {
  const userIdElement = document.getElementById("user-id");
  const orderHistoryElement = document.getElementById("order-history");

  userIdElement.textContent = userId;
  orderHistoryElement.innerHTML = orderHistory.length
    ? orderHistory.map(order => `<li>${order}</li>`).join("")
    : "<li>Заказов пока нет.</li>";
}

// Добавление товаров в историю покупок
if (window.location.pathname.includes("index.html")) {
  document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", () => {
      const productName = button.previousElementSibling.previousElementSibling.textContent;
      orderHistory.push(productName);
      localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
      alert(`Вы купили: ${productName}`);
    });
  });
}
