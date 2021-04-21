const productsParent = document.querySelector(".cart-table__body");

let local_data = JSON.parse(localStorage.getItem("data"));

// добавление продукта=================================================================
const products = (img, title, price, quantity, id) => {
	return `
    <tr data-id="${id}">
        <td class="cart-table__img">
            <img src="../${img}" alt="" />
        </td>
        <td class="cart-table__name">${title}</td>
        <td class="cart-table__price"><span>${price}</span><span> сом</span></td>
        <td class="cart-table__quantity">
            <div class="quantity">
                <input type="number" min="1" max="10" step="1" value="${quantity}" />
                <div class="quantity__buttons">
                    <div class="quantity__button quantity__button--up">
                        <i class="fa fa-plus"></i>
                    </div>
                    <div class="quantity__button quantity__button--down">
                        <i class="fa fa-minus"></i>
                    </div>
                </div>
            </div>
        </td>
        <td class="cart-table__total"><span class="price-count" data-price="${price}">${price * quantity}</span><span> сом</span></td>
        <td class="cart-table__action">
            <a href=""><i class="fa fa-pencil-alt"></i></a>
            <a href="##"><i class="fa fa-times cart-table__remove"></i></a>
        </td>
    </tr>
    `;
};

for (let key in local_data) {
	productsParent.insertAdjacentHTML(
		"afterbegin",
		products(local_data[key][2], local_data[key][0], local_data[key][1], local_data[key][3], key)
	);
}

// удаление продукта=================================================================
const deleteCartProduct = (productParent) => {
	productParent.remove();
};

productsParent.addEventListener("click", (e) => {
	if (e.target.classList.contains("cart-table__remove")) {
		for (let id in local_data) {
			if (e.target.closest("tr").getAttribute("data-id") === id) {
				delete local_data[id];
				localStorage.setItem("data", JSON.stringify(local_data));
			}
		}
		deleteCartProduct(e.target.closest("tr"));
	}
});

document.querySelector("#clear-cart").addEventListener("click", () => localStorage.clear());

// количество товаров=================================================================
$(document).ready(function () {
	function change($tr, val) {
		let $input = $tr.find(".quantity input");
		let count = 1;

		$input.val($input.val() == 0 ? 1 : (count = parseInt($input.val()) + val));
		count = count < 1 ? 1 : count;
		$input.val(count);

		// set localStorage
		local_data[$tr.data("id")][3] = count;
		localStorage.setItem("data", JSON.stringify(local_data));

		let $price = $tr.find(".price-count");
		$price.text(count * $price.data("price"));
	}
	//  плюс/минус один товар
	$(".quantity__button--down").click(function () {
		change($(this).closest("tr"), -1);
	});
	$(".quantity__button--up").click(function () {
		change($(this).closest("tr"), 1);
	});
	$(".quantity input").on("input", function () {
		let $price = $(this).closest("tr").find(".price-count");
		if (this.value < 0) {
			this.value = 1;
		} else if (this.value == 0) {
			local_data[$(this).closest("tr").data("id")][3] = +this.value + 1;
			localStorage.setItem("data", JSON.stringify(local_data));
		} else {
			$price.text(this.value * $price.data("price"));
			// set localStorage
			local_data[$(this).closest("tr").data("id")][3] = +this.value;
			localStorage.setItem("data", JSON.stringify(local_data));
		}
	});
});
