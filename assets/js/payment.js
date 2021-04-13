let local_data = JSON.parse(localStorage.getItem("data"));
const paymentParent = document.querySelector(".payment-sidebar__items");

const paymentProducts = (img, title, price, quantity) => {
	return `
    <tr class="payment-sidebar__item">
        <td class="payment-sidebar__img">
            <span class="payment-sidebar__quantity">${quantity}</span>
            <img src="${img}" alt="" />
        </td>
        <td class="payment-sidebar__name">${title}</td>
        <td class="payment-sidebar__price"><span>${price * quantity} сом</span></td>
    </tr>
    `;
};

for (let key in local_data) {
	paymentParent.insertAdjacentHTML(
		"afterbegin",
		paymentProducts(local_data[key][2], local_data[key][0], local_data[key][1], local_data[key][3])
	);
}

let totalPrice = 0;
for (let key in local_data) {
	totalPrice += local_data[key][1] * local_data[key][3];
}
document.querySelector(".payment-sidebar__cost--total").innerHTML = `${totalPrice} сом`;
