const block1 = $("#block1");
const block2 = $("#block2");
let mask = document.querySelector('.mask')
window.addEventListener('load', () => {
	mask.classList.add('hide');
	setTimeout(() => {
		mask.remove();
	}, 600);
});
let mask2 = document.querySelector('.mask2')
window.addEventListener('load', () => {
	mask2.classList.add('hides');
	setTimeout(() => {
		mask2.remove();
	}, 1800);
});
$("#close-modal-btn").click(() => {
	removeStyleAlert();
	$("#modal").hide();
});
$(document).ready(function() {
	showorders();
	$('#default-open').trigger('click');
});

function showApprove() {
	if (document.getElementById('reserved')) {
		document.getElementById("approve-btn").style.display = 'block';
	} else {
		document.getElementById("approve-btn").style.display = 'none';
	}
}

function myDropdown() {
	const button = document.getElementById('filter-btn');
	const shows = document.getElementById('myDropdown');
	if (shows.classList.toggle("show")) {
		button.textContent = 'Закрыть';
	} else {
		button.textContent = 'Сортировка';
	}
}

function openprofile() {
	document.getElementById('orders').style.display = 'none';
	document.getElementById('admin-profile').style.display = 'block';
	document.getElementById('bids').style.display = 'none';
	document.getElementById('coworkers').style.display = 'none';
	document.getElementById('clients').style.display = 'none';
	document.getElementById('order-stat').style.display = 'none';
	document.getElementById('spec-stat').style.display = 'none';
}

function showorders() {
	prepareOrderPage(null, null, null, null);
	document.getElementById('admin-profile').style.display = 'none';
	document.getElementById('orders').style.display = 'block';
	document.getElementById('bids').style.display = 'none';
	document.getElementById('coworkers').style.display = 'none';
	document.getElementById('clients').style.display = 'none';
	document.getElementById('order-stat').style.display = 'none';
	document.getElementById('spec-stat').style.display = 'none';
}

function showorderstat() {
	getOrderAnalytics();
	document.getElementById('order-stat').style.display = 'block';
	document.getElementById('admin-profile').style.display = 'none';
	document.getElementById('bids').style.display = 'none';
	document.getElementById('coworkers').style.display = 'none';
	document.getElementById('clients').style.display = 'none';
	document.getElementById('orders').style.display = 'none';
	document.getElementById('spec-stat').style.display = 'none';
}
function showspecstat() {
	getWorkerAnalytics();
	document.getElementById('spec-stat').style.display = 'block';
	document.getElementById('order-stat').style.display = 'none';
	document.getElementById('admin-profile').style.display = 'none';
	document.getElementById('bids').style.display = 'none';
	document.getElementById('coworkers').style.display = 'none';
	document.getElementById('clients').style.display = 'none';
	document.getElementById('orders').style.display = 'none';
}

function prepareOrderPage(workerId, status, deadline, cash) {
	getOrders(workerId, status, deadline, cash);
	setWorkersForFilter();
}

function showbids() {
	getBids();
	document.getElementById('admin-profile').style.display = 'none';
	document.getElementById('bids').style.display = 'block';
	document.getElementById('orders').style.display = 'none';
	document.getElementById('coworkers').style.display = 'none';
	document.getElementById('clients').style.display = 'none';
	document.getElementById('order-stat').style.display = 'none';
	document.getElementById('spec-stat').style.display = 'none';
}

function showcoworkers() {
	getCoworkers();
	doExtendCardStaff();
	document.getElementById('admin-profile').style.display = 'none';
	document.getElementById('bids').style.display = 'none';
	document.getElementById('orders').style.display = 'none';
	document.getElementById('coworkers').style.display = 'block';
	document.getElementById('clients').style.display = 'none';
	document.getElementById('order-stat').style.display = 'none';
	document.getElementById('spec-stat').style.display = 'none';
}
function showclients() {
	getBlockableClients();
	doExtendCardStaff();
	document.getElementById('admin-profile').style.display = 'none';
	document.getElementById('bids').style.display = 'none';
	document.getElementById('orders').style.display = 'none';
	document.getElementById('coworkers').style.display = 'none';
	document.getElementById('clients').style.display = 'block';
	document.getElementById('order-stat').style.display = 'none';
	document.getElementById('spec-stat').style.display = 'none';
}

function getBlockableClients() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/all_clients', {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			response.json().then((data) => {
				const CLIENTS = data;
				const CLIENT_INFO = client => `<div class="container" id="client-${client.userId}">
        <div class="bid-box">
            <div class="bid-info-head">
                <div class="bid-name">
                    <h3 >${client.name}, KЛИЕНТ №${client.userId}</h3>
                </div>
            </div>

            <div class="section-item item">

                <div class="bid-info-neck">
                    <div class="bid-name" id="coworker-border1">
                        <label>Клиент</label>
                    </div>

                    <div class="bid-info3">
                        <button class="item-button" onclick="changeText2(this)">Профиль</button>
                    </div>
                </div>

                <div class="item-content"> <!-- этот элемент будет плавно менять высоту -->
                    <div class="item-body">
                        <div class="bid-info" id="coworker-info">
                            <label  class="performer-surname" >${client.surname}</label>
                            <label  class="performer-name" >${client.name}</label>
                        </div>


                        <div class="bid-info-main">

                            <div class="bid-list">
                                <div class="bid-name">
                                    <label class="performer-info" >Телеграм:</label>
                                </div>

                                <div class="bid-info2">
                                    <label class="performer-info">${client.messenger}</label>
                                </div>
                            </div>

                        </div>

                        <div class="bid-info-main">

                            <div class="bid-list">
                                <div class="bid-name">
                                    <label class="performer-info">Email:</label>
                                </div>

                                <div class="bid-info2">
                                    <label class="performer-info">${client.email}</label>
                                </div>
                            </div>

                        </div>

                        <div class="bid-info-main">

                            <div class="bid-list">
                                <div class="bid-name">
                                    <label class="performer-info">Информация о клиенте:</label>
                                </div>

                                <div class="bid-info2">
                                    <label class="performer-info">${client.info}</label>
                                </div>
                            </div>

                        </div>

                        <div class="bid-info-footer">
                        	<div class="footer-btns">
                        <button  class="deny"  type="submit" onclick="blockUser('${client.userId}', 'client')">Заблокировать</button>
                        </div>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    </div>`;
				document.querySelector('#clients').innerHTML = '';
				document.querySelector('#clients').insertAdjacentHTML('beforeend', CLIENTS.map(client => CLIENT_INFO(client)).join(''));
				doExtendCardStaff();
			});
		} else {
			console.log("BAAAAAD");
		}
	});
}
function getCoworkers() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/all_coworkers', {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			response.json().then((data) => {
				const WORKERS = data;
				const WORKER_INFO = worker => `<div class="container" id="coworker-${worker.userId}">
        <div class="bid-box">
            <div class="bid-info-head">
                <div class="bid-name">
                    <h3 >${worker.name}, СОТРУДНИК №${worker.id}</h3>
                </div>
                <div class="bid-info2">
                    <label class="coworker-status" >${worker.status}</label>
                </div>
            </div>

            <div class="section-item item">

                <div class="bid-info-neck">
                    <div class="bid-name" id="coworker-border1">
                        <label >Монтажер</label>
                    </div>

                    <div class="bid-info3">
                        <button class="item-button" onclick="changeText2(this)">Профиль</button>
                    </div>
                </div>

                <div class="item-content"> <!-- этот элемент будет плавно менять высоту -->
                    <div class="item-body">
                        <div class="bid-info" id="coworker-info">
                            <label  class="performer-surname" >${worker.surname}</label>
                            <label  class="performer-name" >${worker.name}</label>
                        </div>


                        <div class="bid-info-main">

                            <div class="bid-list">
                                <div class="bid-name">
                                    <label class="performer-info" >Телеграм:</label>
                                </div>

                                <div class="bid-info2">
                                    <label class="performer-info">${worker.messenger}</label>
                                </div>
                            </div>

                        </div>

                        <div class="bid-info-main">

                            <div class="bid-list">
                                <div class="bid-name">
                                    <label class="performer-info">Email:</label>
                                </div>

                                <div class="bid-info2">
                                    <label class="performer-info">${worker.email}</label>
                                </div>
                            </div>

                        </div>

                        <div class="bid-info-main">

                            <div class="bid-list">
                                <div class="bid-name">
                                    <label class="performer-info">Портфолио:</label>
                                </div>

                                <div class="bid-info2">
                                    <label class="performer-info">${worker.portfolio}</label>
                                </div>
                            </div>

                        </div>

                        <div class="bid-info-footer">
                        	<div class="footer-btns">
                        <button  class="deny"  type="submit" onclick="blockUser('${worker.userId}', 'coworker')" >Заблокировать</button>
                        </div>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    </div>`;
				document.querySelector('#coworkers').innerHTML = '';
				document.querySelector('#coworkers').insertAdjacentHTML('beforeend', WORKERS.map(worker => WORKER_INFO(worker)).join(''));
				doExtendCardStaff();
			});
		} else {
			console.log("BAAAAAD");
		}
	});
}

function moreinfo() {
	height = document.getElementById('bid1').style.height = '150px';
	if (height == '150px') {
		document.getElementById('bid1').style.height = '500px';
	}
}

function getUserData() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/profile_client', {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(response => {
		if (response.ok) {
			return response.json();
		}
		throw new Error('Ошибка соединения');
	}).then(data => {
		const userCard = document.createElement('div');
		userCard.classList.add('user-card');
		userCard.innerHTML = `
  <h2>${data.name} ${data.surname}</h2>
  <p><strong>Email:</strong> ${data.email}</p>
  <p><strong>Чат:</strong> ${data.messenger}</p>
`;
		document.body.appendChild(userCard);
	}).catch(error => {
		console.error('Произошла ошибка:', error);
	});
}

function modal2Click(orderId) {
	console.log(orderId);
	getOrderInfo(orderId);
	$("#modal2").show();
}

function modal2Close() {
	document.querySelector("#order-info-tmp").remove();
	$("#modal2").hide();
}

function removeStyleAlert() {
	var list = $("#create-order-form")[0].querySelectorAll(':invalid');
	for (var item of list) {
		item.removeAttribute("style");
	}
}
$(".colorable").click(() => {
	removeStyleAlert();
});
$("#create-order-btn").click(() => {
	if ($("#create-order-form")[0].checkValidity()) {
		createOrder();
	} else {
		var list = $("#create-order-form")[0].querySelectorAll(':invalid');
		for (var item of list) {
			item.setAttribute("style", "background-color: red;");
		}
		alert("All wrong!");
		return;
	};
});

function doExtendCardStaff() { // Структура страницы загружена
	const smoothHeight = (itemSelector, buttonSelector, contentSelector) => { // объявляем основную функцию, которая принимает в качестве параметров селекторы элемента, кнопки внутри элемента и блока с контентом
		const items = document.querySelectorAll(itemSelector) // находим все элементы по переданному селектору в параметре itemSelector и записываем в константу items
		if (!items.length) return // если таких элементов нет, прекращаем выполнение функции
		items.forEach(el => { // для каждого элемента
			const button = el.querySelector(buttonSelector); // находим кнопку и записываем в константу button
			const content = el.querySelector(contentSelector); // находим блок с контентом и записываем в константу content
			button.addEventListener('click', () => { // при клике на кнопку
				if (el.dataset.open !== 'true') { // если значение data-атрибута open у элемента не равно 'true' и блок с контентом еще не отображен
					el.dataset.open = 'true' // тогда устанавливаем значение 'true'
					content.style.maxHeight = `${content.scrollHeight}px` // и блоку с контентом устанавливаем inline-свойсво max-height со вычисленным значением полной высоты этого блока
				} else { // если блок с контентом отображен и значение data-атрибута open у элемента равно 'true'
					el.dataset.open = 'false' // тогда устанавливаем значение 'false'
					content.style.maxHeight = '' // и сбрасываем ранее установленное inline-свойсво max-height
				}
			})
			const onResize = () => { // объявляем функцию onResize, которая будет корректировать значение inline-свойства max-height при изменении размеров окна браузера
				if (el.dataset.open === 'true') { // если значение data-атрибута open у элемента равно 'true' (коректировать высоту нужно только если блок контента отображен)
					if (parseInt(content.style.maxHeight) !== content.scrollHeight) { // если текущее значение inline-свойства max-height у блока контента не равно полной высоте
						content.style.maxHeight = `${content.scrollHeight}px` // только тогда блоку с контентом корректируем значение inline-свойсва max-height
					}
				}
			}
			window.addEventListener('resize', onResize) // вызываем функцию onResize при изменении размеров окна браузера
		})
	}
	smoothHeight('.section-item', '.item-button', '.item-content') // вызываем основную функцию smoothHeight и передаем в качестве параметров  необходимые селекторы
}
document.addEventListener('DOMContentLoaded', () => function() {
	showorders();
	doExtendCardStaff();
});

function changeText(ev) {
	console.log(ev);
	if (ev.getAttribute('data-show') === "true") {
		ev.innerText = "Подробнее"
		ev.setAttribute('data-show', "false");
	} else {
		ev.innerText = "Скрыть"
		ev.setAttribute('data-show', "true");
	}
}

function changeText2(ev) {
	if (ev.getAttribute('data-show') === "true") {
		ev.innerText = "Профиль"
		ev.setAttribute('data-show', "false");
	} else {
		ev.innerText = "Скрыть"
		ev.setAttribute('data-show', "true");
	}
}

function myDropdown() {
	const button = document.getElementById('filter-btn');
	const shows = document.getElementById('myDropdown');
	if (shows.classList.toggle("show")) {
		button.textContent = 'Закрыть';
	} else {
		button.textContent = 'Сортировка';
	}
	display = document.getElementById("dropdown-child-worker").style.display;
	display1 = document.getElementById("dropdown-child-status").style.display;
	display2 = document.getElementById("dropdown-child-transactions").style.display;
	display3 = document.getElementById("dropdown-child-deadline").style.display;
	if (display == 'block' || display1 == 'block' || display2 == 'block' || display3 == 'block') {
		document.getElementById("dropdown-child-worker").style.display = 'none';
		document.getElementById("dropdown-child-status").style.display = 'none';
		document.getElementById("dropdown-child-transactions").style.display = 'none';
		document.getElementById("dropdown-child-deadline").style.display = 'none';
	}
}

function openWorker() {
	document.getElementById("dropdown-child-worker").style.display = 'block';
	document.getElementById("dropdown-child-status").style.display = 'none';
	document.getElementById("dropdown-child-transactions").style.display = 'none';
	document.getElementById("dropdown-child-deadline").style.display = 'none';
}

function openStatus() {
	document.getElementById("dropdown-child-status").style.display = 'block';
	document.getElementById("dropdown-child-worker").style.display = 'none';
	document.getElementById("dropdown-child-transactions").style.display = 'none';
	document.getElementById("dropdown-child-deadline").style.display = 'none';
}

function openPay() {
	document.getElementById("dropdown-child-transactions").style.display = 'block';
	document.getElementById("dropdown-child-status").style.display = 'none';
	document.getElementById("dropdown-child-worker").style.display = 'none';
	document.getElementById("dropdown-child-deadline").style.display = 'none';
}

function openDeadline() {
	document.getElementById("dropdown-child-deadline").style.display = 'block';
	document.getElementById("dropdown-child-status").style.display = 'none';
	document.getElementById("dropdown-child-worker").style.display = 'none';
	document.getElementById("dropdown-child-transactions").style.display = 'none';
}

function getBids() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/all_bids', {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			response.json().then((data) => {
				const BIDS = data;
				const BID_INFO = bid => `<div class="container" id="bid-${bid.workerId}">
        <div class="bid-box">
            <div class="bid-info-head">
                <div class="bid-name">
                    <h3 >Заявка № ${bid.id}</h3>
                </div>
                <div class="bid-info2">
                    <label class="price" >${bid.surname}</label>
                </div>
            </div>

            <div class="section-item item">

                <div class="bid-info-neck">
                    <div class="bid-name" id="bid-border1">
                        <label >Монтажер</label>
                    </div>

                    <div class="bid-info3">
                        <button class="item-button" onclick="changeText(this)">Подробнее</button>
                    </div>
                </div>

                <div class="item-content"> <!-- этот элемент будет плавно менять высоту -->
                    <div class="item-body">
                        <div class="bid-info" id="bid-info">
                            <label for="performer-surname" class="performer-surname" >${bid.surname}</label>
                            <label for="performer-name" class="performer-name" >${bid.name}</label>
                        </div>

                    </div>

                    <div class="item-body">
                        <div class="order-info">
                            <label for="worker-surname" class="status-main" >На рассмотрении</label>
                        </div>
                    </div>


                    <div class="bid-info-main">

                        <div class="bid-list">
                            <div class="bid-name">
                                <label class="performer-info" >Телеграм:</label>
                            </div>

                            <div class="bid-info2">
                                <label class="performer-info">${bid.messenger}</label>
                            </div>
                        </div>

                    </div>

                    <div class="bid-info-main">

                        <div class="bid-list">
                            <div class="bid-name">
                                <label class="performer-info">Email:</label>
                            </div>

                            <div class="bid-info2">
                                <label class="performer-info">${bid.email}</label>
                            </div>
                        </div>

                    </div>


                    <div class="bid-info-main">

                        <div class="bid-list">
                            <div class="bid-name">
                                <label class="performer-info">Портфолио:</label>
                            </div>

                            <div class="bid-info2">
                                <label class="performer-info">${bid.portfolio}</label>
                            </div>
                        </div>

                    </div>

                    <div class="bid-info-footer">

                        <div class="footer-btns">
                        <button  class="deny"  type="submit" onclick="cancelBid('${bid.workerId}')" >Отклонить</button>
                            <button  class="approve"  type="submit" onclick="approveBid('${bid.workerId}')" >Принять</button>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    </div>`;
				document.querySelector('#bids').innerHTML = '';
				document.querySelector('#bids').insertAdjacentHTML('beforeend', BIDS.map(bid => BID_INFO(bid)).join(''));
				doExtendCardStaff();
			});
		} else {
			console.log("BAAAAAD");
		}
	});
}

function getOrders(workerId, status, deadline, cash) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let filterDto = {
		"workerId": workerId,
		"status": status,
		"projectDeadLine": deadline,
		"cash": cash
	}
	let request = new Request('/filtered_orders', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(filterDto)
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			response.json().then((data) => {
				const ORDERS = data.orders;
				console.log(ORDERS);
				const ORDER_INFO = order => `<div class="container" >
            <div class="order-box">
                <div class="order-info-head">
                    <div class="order-name">
                        <h3 >Заказ № ${order.id}</h3>
                    </div>
                    <div class="order-info2">
                        <label class="price" >До ${order.deadline} | Cоздан ${order.createdDate}</label>
                    </div>
                </div>

                <div class="section-item item">
                    <div class="order-info-neck">
                        <div class="order-name" id="order-border1">
                            <label  onclick="getWorkerShort('${order.workerId}')">${order.workerName}</label>
                        </div>

                        <div class="order-info3">
                            <button class="item-button" onclick="changeText(this)">Подробнее</button>
                        </div>
                    </div>

                    <div class="item-content">
                        <!-- этот элемент будет плавно менять высоту -->

                        <div class="item-body">
                            <div class="order-info">
                                <label for="worker-surname" class="worker-surname" >Заказчик:</label>
                                <label for="worker-surname" class="worker-name" onclick="getClientContact('${order.ownerId}')" >${order.ownerName}</label>

                            </div>
                            
            

                            <div class="item-body">
                                <div class="order-info">
                                    <label for="worker-surname" class="status-main" >${mapStatusToText(order.status)}</label>
                                    <button  class="approve"  type="submit" ${order.status ==="BOOKED" ? "" : "hidden"} onclick="approveBook('${order.orderId}')" >Одобрить</button>
                                </div>
                            </div>

                            <div class="order-info-main">

                                <div class="order-list">
                                    <div class="order-name">
                                        <label class="worker-info" >Формат:</label>
                                    </div>

                                    <div class="order-info2">
                                        <label class="worker-info">${order.videoFormat}</label>
                                    </div>

                                </div>
                                ${bookedSelect(order)}

                            </div>


                            <div class="order-info-main">

                                <div class="order-list">
                                    <div class="order-name">
                                        <label class="worker-info" >Количество камер:</label>
                                    </div>

                                    <div class="order-info2">
                                        <label class="worker-info">${order.cameras}</label>
                                    </div>
                                </div>

                            </div>

                            <div class="order-info-main">

                                <div class="order-list">
                                    <div class="order-name">
                                        <label class="worker-info">Ссылка на материалы:</label>
                                    </div>

                                    <div class="order-info2">
                                        <a class="worker-info" ${order.linkMat === null ? "" : "href=\"" + order.linkMat + "\""} target="_blank">${order.linkMat === null ? "Нет" : "Перейти"}</a>
                                    </div>
                                </div>

                            </div>

                            <div class="order-info-main">

                                <div class="order-list">
                                    <div class="order-name">
                                        <label class="worker-info">Техническое задание:</label>
                                    </div>

                                    <div class="order-info2">
                                        <a class="worker-info" ${order.taskLink === null ? "" : "href=\"" + order.taskLink + "\""} target="_blank">${order.taskLink === null ? "Нет" : "Перейти"}</a>
                                    </div>
                                </div>

                            </div>
                            
                            <div class="order-info-main">
                            	<div class="order-list">
                            		<div class="order-name">
                            			${order.linkResult === null ? "" : "<label class=\"worker-info\" for=\"pravki-form\">Ссылка на результат: </label>"}
                            		</div class="order-info2">
                            		<div>
                            			${order.linkResult === null ? "" : "<a class=\"worker-info\" id=\"pravki-form\" target=\"_blank\" href=\"" + order.linkResult + "\">Перейти</a>"}
                            		</div>
                            	</div>
							</div>

                            <div class="order-info-main">

                                <div class="order-list">
                                    <div class="order-name">
                                        <label class="worker-info">Цветокоррекция:</label>
                                    </div>

                                    <div class="order-info2">
                                        <label class="worker-info">${mapBooleanToText(order.color)}</label>
                                    </div>
                                </div>

                            </div>
                            <div class="order-info-main">

                                <div class="order-list">
                                    <div class="order-name">
                                        <label class="worker-info">Нарезать вертикальные видео:</label>
                                    </div>

                                    <div class="order-info2">
                                        <label class="worker-info">${order.cutVertical}</label>
                                    </div>
                                </div>

                            </div>
                            <div class="order-info-main">

                                <div class="order-list">
                                    <div class="order-name">
                                        <label class="worker-info">Субтитры:</label>
                                    </div>

                                    <div class="order-info2">
                                        <label class="worker-info">${mapBooleanToText(order.subtles)}</label>
                                    </div>
                                </div>

                            </div>
                            <div class="order-info-main">

                                <div class="order-list">
                                    <div class="order-name">
                                        <label class="worker-info">Тизер:</label>
                                    </div>

                                    <div class="order-info2">
                                        <label class="worker-info">${mapBooleanToText(order.videoTeaser)}</label>
                                    </div>
                                </div>

                            </div>
                            <div class="order-info-main">

                                <div class="order-list">
                                    <div class="order-name">
                                        <label class="worker-info">Хронометраж:</label>
                                    </div>

                                    <div class="order-info2">
                                        <label class="worker-info">${order.videoTime}</label>
                                    </div>
                                </div>

                            </div>

                            <div class="order-info-footer">

                                <div class="footer-btns">

                                    <button  class="approve"  type="submit" onclick="showPaymentModal('${order.orderId}', '${order.orderPrice}', '${order.workerPrice}')" >Изменить статус</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>`;
				document.querySelector('#orders').innerHTML = '<div class="filter">\n' + '            <button onclick="myDropdown()" class="drop-btn" id="filter-btn">Сортировка</button>\n' + '        </div>\n' + '\n' + '        <div class="dropdown">\n' + '            <div class="dropdown-content" id="myDropdown">\n' + '                <div class="dropdown-filter1" id="dropdown-worker-filter">\n' + '                    <label for="worker-filter" class="filter-label">По исполнителю:</label>\n' + '                    <select class="form-styling" name="" id="worker-filter">\n' + '                        <option  value="" selected>Не выбрано</option>\n' + '                    </select>\n' + '                </div>\n' + '                <div class="dropdown-filter1">\n' + '                    <label for="status-filter" class="filter-label">По статусу:</label>\n' + '                    <select class="form-styling" name="" id="status-filter">\n' + '                        <option value="" selected>Не выбрано</option>\n' + '                        <option value="NEW">Новый</option>\n' + '                        <option value="BOOKED">Забронирован</option>\n' + '                        <option value="WORK">В работе</option>\n' + '                        <option value="COMPLETED">Завершен исполнителем</option>\n' + '                        <option value="ACCEPT">Принят заказчиком</option>\n' + '                        <option value="CANCELLATION">Отказ</option>\n' + '                    </select>\n' + '                </div>\n' + '                <div class="dropdown-filter1">\n' + '                    <label for="cash-filter" class="filter-label">По оплате:</label>\n' + '                    <select class="form-styling" name="" id="cash-filter">\n' + '                        <option value="" selected>Не выбрано</option>\n' + '                        <option value="WAITING">Ожидает оплаты</option>\n' + '                        <option value="PREPAYMENT">Внесена предоплата</option>\n' + '                        <option value="EXTRAPAYMENT">Внесена доплата</option>\n' + '                        <option value="FULL">Оплачен</option>\n' + '                    </select>\n' + '                </div>\n' + '                <div class="dropdown-filter1">\n' + '                    <label for="deadline-filter" class="filter-label">По дедлайну:</label>\n' + '                    <input class="form-styling" type="date" name="deadline" id="deadline"/>\n' + '                </div>\n' + '\n' + '                <div class="dropdown-filter2">\n' + '                    <button onclick="filterOrders()" class="approve" id="search-btn">Поиск</button>\n' + '                </div>\n' + '\n' + '            </div>\n' + '\n' + '\n' + '        </div>';
				document.querySelector('#orders').insertAdjacentHTML('beforeend', ORDERS.map(order => ORDER_INFO(order)).join(''));
				doExtendCardStaff();
			});
		} else {
			console.log("BAAAAAD");
		}
	});
}

function bookedSelect(order) {
	const FILL_OPTIONS = pair => `<option value="${pair.key}">${pair.value}</option>`;
	const OPTIONS = order.bookedBy.map(order => FILL_OPTIONS(order)).join('');
	const select = `<select class="form-styling3" name="" id="reserved-select-${order.orderId}"  type="" ${order.status ==="BOOKED" ? "" : "hidden"}>
                        <option value="" selected>Не выбран:</option>
                        ${OPTIONS}
                    </select>`;
	return select;
}

function getClientContact(userId) {
	if (userId === null) {
		return;
	} else {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json; charset=utf-8');
		let request = new Request(`/user_contact?user_id=${userId}`, {
			method: 'GET',
			headers: headers
		});
		fetch(request).then(function(response) {
			if (response.ok) {
				response.json().then(data => {
					document.getElementById('client-name').innerHTML = data.userName;
					document.getElementById('client-surname').innerHTML = data.userSurname;
					document.getElementById('client-content1').innerHTML = data.userEmail;
					document.getElementById('client-content2').innerHTML = data.messenger;
				})
				document.location = "#modal3";
			} else {
				alert("Не удалось связаться с сервером!")
				console.log("BAAAAAD");
			}
		});
	}
}

function getWorkerAnalytics() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request(`/worker_analytics`, {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			response.json().then(data => {
				$('#stat-spec-tbody').empty();
				for (var item of data.items) {
					console.log(item);
					let trow = `<tr>
                <td class="help-col">${item.worker}</td>
                <td class="help-col">${item.status}</td>
                <td class="help-col">${item.orderDone}</td>
                <td class="help-col">-</td>
                <td class="help-col">${mapNullToLine(item.rubSelf)}</td>
                <td class="help-col">${mapNullToLine(item.usdSelf)}</td>
                <td class="help-col">${mapNullToLine(item.azSelf)}</td>
                <td class="help-col">${mapNullToLine(item.rubPlatform)}</td>
                <td class="help-col">${mapNullToLine(item.usdPlatform)}</td>
                <td class="help-col">${mapNullToLine(item.azPlatform)}</td>
            </tr>`;
					$('#stat-spec-tbody').append(trow);
				}
			})
		} else {
			alert("Не удалось связаться с сервером!")
			console.log("BAAAAAD");
		}
	});
}
function mapNullToLine(string) {
	return string === null ? '-' : string;
}

function getOrderAnalytics() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request(`/order_analytics`, {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			response.json().then(data => {
				document.getElementById('all-orders').innerHTML = data.allOrders;
				document.getElementById('new-orders').innerHTML = data.newOrders;
				document.getElementById('in-process').innerHTML = data.inProgress;
				document.getElementById('completed').innerHTML = data.completed;
				document.getElementById('accepted').innerHTML = data.accepted;
				document.getElementById('refusal').innerHTML = data.refusal;
			})
		} else {
			alert("Не удалось связаться с сервером!")
			console.log("BAAAAAD");
		}
	});
}


function getWorkerShort(workerId) {
	if (workerId === null) {
		return;
	} else {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json; charset=utf-8');
		let request = new Request(`/worker_contact?worker_id=${workerId}`, {
			method: 'GET',
			headers: headers
		});
		fetch(request).then(function(response) {
			if (response.ok) {
				response.json().then(data => {
					document.getElementById('worker-name').innerHTML = data.userName;
					document.getElementById('worker-surname').innerHTML = data.userSurname;
					document.getElementById('worker-content1').innerHTML = data.userEmail;
					document.getElementById('worker-content2').innerHTML = data.messenger;
				})
				document.location = "#modal4";
			} else {
				alert("Не удалось связаться с сервером!")
				console.log("BAAAAAD");
			}
		});
	}
}

function approveBid(workerId) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/approve_bid?worker_id=' + workerId, {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			document.querySelector("#bid-" + workerId).remove();
		} else {
			alert("Не удалось связаться с сервером!")
			console.log("BAAAAAD");
		}
	});
}
function cancelBid(workerId) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/cancel_bid?worker_id=' + workerId, {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			document.querySelector("#bid-" + workerId).remove();
		} else {
			alert("Не удалось связаться с сервером!")
			console.log("BAAAAAD");
		}
	});
}

function blockUser(userId, role) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/block_user?user_id=' + userId, {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			document.querySelector("#" + role + "-" + userId).remove();
		} else {
			alert("Не удалось связаться с сервером!")
			console.log("BAAAAAD");
		}
	});
}

function approveBook(orderId) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let workerId = $("#reserved-select-" + orderId).val();
	let request = new Request(`/book_with_status?order_id=${orderId}&worker_id=${workerId}`, {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			document.location.reload();
			console.log("GREAAAAAT");
		} else {
			alert("Не удалось связаться с сервером!")
			console.log("BAAAAAD");
		}
	});
}

function sendPaymentInfo(orderId) {
	let headers = new Headers();
	let paymentDto = {
		"paymentStatus": $('#payment-status').val(),
		"orderPrice": $('#order-price').val(),
		"workerPrice": $('#worker-price').val(),
		"orderStatus": $('#order-status').val()
	}
	console.log(paymentDto);
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request(`/payment_info?order_id=${orderId}`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(paymentDto)
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			$('#modal').hide();
			document.location.reload();
			console.log("GREAAAAAT");
		} else {
			alert("Не удалось связаться с сервером!")
			console.log("BAAAAAD");
		}
	});
}

function showPaymentModal(orderId, orderPrice, workerPrice) {
	document.getElementById('order-price').value = mapEmptyable(orderPrice);
	document.getElementById('worker-price').value = mapEmptyable(workerPrice);
	$('#modal').show();
	document.getElementById('payment-confirm-btn').remove()
	document.getElementById('confirm-btn-block').insertAdjacentHTML('beforeend', `<button class="btn-logout" id="payment-confirm-btn"
                                                                            type="submit"
                                                                            onClick="sendPaymentInfo('${orderId}')">Сохранить</button>`);
}

function closePayment() {
	$('#modal').hide();
}

function changeStatus(orderId, status) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request(`/change_status?order_id=${orderId}&status=${status}`, {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			document.location.reload();
			console.log("GREAAAAAT");
		} else {
			alert("Не удалось связаться с сервером!")
			console.log("BAAAAAD");
		}
	});
}

function setWorkersForFilter() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request(`/select_workers`, {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			response.json().then((data) => {
				const workers = data
				document.querySelector("#worker-filter").remove();
				var selectDiv = document.querySelector("#dropdown-worker-filter");
				selectDiv.insertAdjacentHTML("beforeend", '<select class="form-styling" name="" id="worker-filter">\n' + '                        <option  value="" selected>Не выбрано</option>\n' + '                    </select>');
				$.each(workers, function(i, item) {
					$('#worker-filter').append($('<option>', {
						value: item.workerId,
						text: item.fullname
					}));
				});
				console.log("GREAAAAAT");
			});
		} else {
			alert("Не удалось связаться с сервером!")
			console.log("BAAAAAD");
		}
	});
}

function filterOrders() {
	let workerId = $("#worker-filter").val();
	if (workerId === "") {
		workerId = null;
	}
	let status = $("#status-filter").val();
	if (status === "") {
		status = null;
	}
	let deadline = $("#deadline").val();
	if (deadline === "") {
		deadline = null;
	}
	let cash = $("#cash-filter").val();
	if (cash === "") {
		cash = null;
	}
	prepareOrderPage(workerId, status, deadline, cash);
}

function mapStatusToText(status) {
	let map = new Map();
	map.set("NEW", "НОВЫЙ");
	map.set("WORK", "В РАБОТЕ");
	map.set("COMPLETED", "ЗАВЕРШЕН ИСПОЛНИТЕЛЕМ");
	map.set("ACCEPT", "ПРИНЯТ ЗАКАЗЧИКОМ");
	map.set("BOOKED", "ЗАБРОНИРОВАН");
	map.set("CANCELLATION", "ОТКАЗ");
	return map.get(status);
}

function mapEmptyable(string) {
	console.log(string);
	return string === 'null' ? '' : string;
}

function mapBooleanToText(boolean) {
	return boolean ? 'ДА' : 'НЕТ';
}

var tds = document.querySelectorAll('td');
    for (var i = 0; i < tds.length; i++) {
        tds[i].addEventListener('click', function func() {
        var input = document.createElement('input');
        input.value = this.innerHTML;
        this.innerHTML = '';
        this.appendChild(input);

        var td = this;
        input.addEventListener('blur', function(){
            td.innerHTML = this.value;
            td.addEventListener('click', func);
        })
        this.removeEventListener('click', func);
        });
    }
