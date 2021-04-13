const cartBtn = document.querySelectorAll(".card__cart-btn");
const subtotalPrice = document.querySelector(".offcanvas__subtotal");
const cartQuantity = document.querySelector(".header-action__cartQuantity");
const addedItems = document.querySelector(".added-item");
let price = 0;

const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, "");
};
const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
};

// получить/сохранить в localStorage==============================================================
const getCardData = () => {
	return JSON.parse(localStorage.getItem("data"));
};
const setCardData = (items) => {
	localStorage.setItem("data", JSON.stringify(items));
	return false;
};

// удаление/добавление==============================================================
const plusFullPrice = (currentPrice, quantity = 1) => {
	return (price += currentPrice * quantity);
};
const minusFullPrice = (currentPrice, quantity) => {
	return (price -= currentPrice * quantity);
};

// показать количество==============================================================
const printQuantity = () => {
	let local_data = getCardData();
	let counter = 0;
	for (let key in local_data) {
		counter += local_data[key][3];
	}
	cartQuantity.innerHTML = counter;
};
printQuantity();

// показать полную цену==============================================================
const printFullPrice = () => {
	let local_data = getCardData();
	let TotalPrice = 0;
	for (let key in local_data) {
		TotalPrice += local_data[key][1] * local_data[key][3];
	}
	subtotalPrice.textContent = `${normalPrice(TotalPrice)} сом`;
};
printFullPrice();
// удаление из корзины==============================================================
const deleteProduct = (productParent) => {
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector(".added-item__price").textContent));
	let quantity = productParent.querySelector(".added-item__quantity").textContent;

	minusFullPrice(currentPrice, quantity);
	printFullPrice();
	productParent.remove();
	printQuantity();
};

// создаем карту в корзине==============================================================
const generateCartProduct = (img, title, price, quantity, id) => {
	return `
        <li class="offcanvas__cart-item added-item__list" data-id="${id}">
            <div class="added-item__content">
                <a href="" class="added-item__img"><img src="${img}" alt="" /></a>
                <div class="added-item__detail">
                    <a href="" class="added-item__link">${title}</a>
                    <span class="added-item__price">${price} сом</span>
                    <span class="added-item__info">Dimension: 40x60cm</span>
					<div class="added-item__info"><span>Qty: </span><span class="added-item__quantity">${quantity}</span></div>
                </div>
            </div>
            <button class="added-item__dismiss">
                <i class="fa fa-times added-item__delete"></i>
            </button>
        </li>
    `;
};

// кнопка добавление в корзину==============================================================
cartBtn.forEach((el) => {
	el.addEventListener("click", (e) => {
		let self = e.currentTarget;
		self.disabled = true;

		let local_data = getCardData() || {};
		let parent;
		self.closest(".card") == null ? (parent = self.closest(".card--list")) : (parent = self.closest(".card"));
		let id = parent.dataset.id;
		let img = parent.querySelector(".card__img").getAttribute("src");
		let title = parent.querySelector(".card__description").textContent;
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector(".card__price--current").textContent));

		e.preventDefault();

		if (local_data.hasOwnProperty(id)) {
			// если такой товар уже в корзине, то добавляем +1 к его количеству
			local_data[id][3] += 1;
		} else {
			// если товара в корзине еще нет, то добавляем в объект
			local_data[id] = [title, priceNumber, img, 1];
		}
		if (!setCardData(local_data)) {
			self.disabled = false;
		}
		printQuantity();
	});
});

// при открытии корзины==============================================================
const openCard = () => {
	var local_data = getCardData(), // вытаскиваем все данные корзины
		totalItems = "";
	// если что-то в корзине уже есть, начинаем формировать данные для вывода
	if (local_data == 0) {
		addedItems.innerHTML = `<li class = 'added-item__empty-cart'><span>cart is empty</span><img src='https://cdn.shopify.com/s/files/1/0132/3116/1408/files/cart.png?13612'></li>`;
	} else if (Object.keys(local_data).length == 0) {
		addedItems.innerHTML = `<li class = 'added-item__empty-cart'><span>cart is empty</span><img src='https://cdn.shopify.com/s/files/1/0132/3116/1408/files/cart.png?13612'></li>`;
	} else {
		for (let items in local_data) {
			totalItems += generateCartProduct(
				local_data[items][2],
				local_data[items][0],
				local_data[items][1],
				local_data[items][3],
				items
			);

			addedItems.innerHTML = totalItems;
			plusFullPrice(local_data[items][1], local_data[items][3]);
			printFullPrice();
			printQuantity();
		}
	}
};

document.querySelector("#cart-icon").addEventListener("click", openCard);

//  переход=======================================================
const sendRequest = document.querySelector(".offcanvas__cart-button");
sendRequest.onclick = () => (window.location.href = "../../pages/cart.html");

//  удаление из корзины=======================================================
addedItems.addEventListener("click", (e) => {
	if (e.target.classList.contains("added-item__delete")) {
		let local_data = getCardData();

		for (let id in local_data) {
			if (e.target.closest(".added-item__list").getAttribute("data-id") === id) {
				delete local_data[id];
				setCardData(local_data);
			}
		}
		deleteProduct(e.target.closest(".added-item__list"));
	}
});
