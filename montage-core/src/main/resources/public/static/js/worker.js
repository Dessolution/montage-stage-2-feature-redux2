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
$(document).ready(function() {
	$('#default-open').trigger('click');
});
$("#close-modal-btn").click(() => {
	removeStyleAlert();
	$("#modal").hide();
});

function modal6Close() {
	$('#modal6').hide();
}

function openprofile() {
	getUserData();
	document.getElementById('worker-profile').style.display = 'block';
	document.getElementById('orders').style.display = 'none';
	document.getElementById('free-orders').style.display = 'none';
}

function getUserData() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/my_profile', {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			response.json().then((data) => {
				console.log(data);
				$('#worker-name').val(data.userName);
				$('#worker-surname').val(data.userSurname);
				$('#worker-content1').val(data.userEmail);
				$('#worker-content2').val(data.password);
				$('#worker-content3').val(data.userMessenger);
				// $('#worker-content4').val(data.userRole);
				$(`#worker-content5 option[value='${data.userLang}']`).prop('selected', true);
				$(`#worker-content6 option[value='${data.userPaymentMethod}']`).prop('selected', true);
				$('#worker-content7').val(data.userPortfolio);
			});
		} else {
			console.error('Произошла ошибка:', error);
		}
	});
}

function profileEditable() {
	$('#worker-name').removeAttr('readonly');
	$('#worker-surname').removeAttr('readonly');
	$('#worker-content1').removeAttr('readonly');
	$('#worker-content2').removeAttr('readonly');
	$('#worker-content3').removeAttr('readonly');
	$('#worker-content4').removeAttr('readonly');
	$('#worker-content5').removeAttr('readonly');
	$('#worker-content6').removeAttr('readonly');
	$('#worker-content7').removeAttr('readonly');
	$('#save-profile-btn').removeAttr('hidden');
	$('#edit-profile-btn').attr('hidden', true);
}

function saveProfile() {
	if ($("#profile-form")[0].checkValidity()) {
		updateProfile();
	} else {
		alert("Не заполнены обязательные поля к заказу!");
	}
}

function updateProfile() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let updateDto = {
		"name" : $('#worker-name').val(),
		"surname": $('#worker-surname').val(),
		"email": $('#worker-content1').val(),
		"password": $('#worker-content2').val(),
		"messenger": $('#worker-content3').val(),
		"language": $('#worker-content5').val(),
		"payment": $('#worker-content6').val(),
		"portfolio": $('#worker-content7').val()
	};
	let request = new Request('/update_profile', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(updateDto)
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			alert("Успешно!");
			$('#worker-name').attr('readonly', true);
			$('#worker-surname').attr('readonly', true);
			$('#worker-content1').attr('readonly', true);
			$('#worker-content2').attr('readonly', true);
			$('#worker-content3').attr('readonly', true);
			$('#worker-content4').attr('readonly', true);
			$('#worker-content5').attr('readonly', true);
			$('#worker-content6').attr('readonly', true);
			$('#worker-content7').attr('readonly', true);

			$('#save-profile-btn').attr('hidden', true);
			$('#edit-profile-btn').removeAttr('hidden');
			document.location.reload();
		} else {
			alert("Не удалось связаться с сервером!");
			console.error('Произошла ошибка:', error);
		}
	});
}


function showorders() {
	document.getElementById('orders').innerHTML = '';
	getOwnedWorkerOrders()
	document.getElementById('worker-profile').style.display = 'none';
	document.getElementById('orders').style.display = 'block';
	document.getElementById('free-orders').style.display = 'none';
}

function freeorders() {
	document.getElementById('free-orders').innerHTML = '';
	getPossibleOrders();
	document.getElementById('free-orders').style.display = 'block';
	document.getElementById('orders').style.display = 'none';
	document.getElementById('worker-profile').style.display = 'none';
}

function getOrderInfo(orderId) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/order_info?order_id=' + orderId, {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			response.json().then((data) => {
				const ORDER = data;
				console.log(ORDER);
				const MODAL_INFO = order => `<div class="order-menu" id="order-info-tmp">
                                        <h3>Информация о заказе</h3>
                                        <div class="order-info" id="block1">
                        <div class="order-info" id="block1">
                            <label for="pravki" >${order.pravki === null ? '' : 'Правки (заказ не принят клиентом)'}</label>
                                                                                <textarea class="form-styling" style="min-height: 100px" name="pravki" id="pravki" readonly ${order.pravki != null ? '' : 'hidden'} >${order.pravki}</textarea>

                            <label for="name" >Имя (Или ФИО)</label>
                            <input class="form-styling change-type" id="name-input" type="text" name="name" value="${order.fullName}" readonly/>

                            <label for="number-messenger" >Номер телефона для связи в месседжерах <br> (Whatsapp, Telegram)</label>
                            <input class="form-styling change-type" id="number-messenger" type="tel" name="phone" value="${order.phone}" readonly/>

                            <label for="backup-communication"> Резервный способ связи (например, ник в телеграм)</label>
                            <input class="form-styling change-type" id="backup-com" type="text" name="linkmat" value="${order.extraContact}" readonly/>

                            <label for="to-materials" id="to-materials">Ссылка на материалы (Яндекс.диск, Google drive и т.д.)</label>
                            <a  class="form-styling change-type" type="text" name="linkmat" target="_blank"
                                id="video-link" ${order.videoLink === null? "" : "href=\"" + order.videoLink + "\""}>${order.videoLink === null ? "Нет" : "Перейти"  }
                            </a>

                            <label for="format">Выбранный формат вашего видео</label>
                               <select class="change-type" name="format" id="format" disabled>
                                   <option value="PODCAST">Видеоподкаст, интервью</option>
                                   <option value="LESSON">Видеоурок, видеолекция, "говорящая голова"</option>
                                   <option value="REELS">Вертикальные видео (Reels, Shorts)</option>
                                   <option value="LED">Запись на прозрачной LED-доске</option>
                                   <option value="OTHER">Другое</option>
                               </select>

                            <label for="cameras">Количество камер на съемках </label>
                                <select name="cameras" id="cameras" disabled>
                                    <option selected value="ONE">1 камера</option>
                                    <option value="TWO">2 камеры</option>
                                    <option value="THREE">3 камеры</option>
                                    <option value="FOUR">4 камеры</option>
                                    <option value="FIVE">5 камер</option>
                                </select>

                            <label for="cut-reels">Нарезать вертикальные видео (REELS)</label>
                                <select name="cut-reels" id="cut-reels" disabled>
                                    <option selected value="NONE">Нет</option>
                                    <option value="LESS_TWO">1-2</option>
                                    <option value="LESS_FOUR">3-4</option>
                                    <option value="MORE_FIVE">5+</option>
                                </select>

                            <label for="chrono">Хронометраж готового видео </label>
                            <input class="form-styling" type="time" name="сhrono" id="chrono" value="${order.chrono}" readonly/>

                            <label for="deadline">Дедлайн проекта (до какой даты необходим готовый ролик)</label>
                            <input class="form-styling" type="date" name="deadline" id="deadline" value="${order.deadline}" readonly/>

                            <label for="tech-task" id="tech-task-label">Техническое задание (с чёткими таймингами и/или сценариями, если есть в наличии)</label>
                            <a  class="form-styling change-type" type="text" name="linkmat" target="_blank"
                                id="tech-task" ${order.taskLink === null? "" : "href=\"" + order.taskLink + "\""}>${order.taskLink === null ? "Нет" : "Перейти"  }
                            </a>

                            <div class="choosebox" id="choosebox-order-${order.orderId}">
                            <div class="choose" onclick="return false;">

                                    <label for="color-choose" id="color-choose">Цветокоррекция</label>
                                    <label class="checkbox style-e" style="display: inline-block; position: relative; padding-left: 50px;cursor: pointer; -webkit-user-select: none;-moz-user-select: none; -ms-user-select: none;user-select: none;margin-right: 15px;">
                                        <input type="checkbox" id="choosebox-color-info" />
                                        <div class="checkbox__checkmark"></div>
                                    </label>

                                </div>

                                <div class="choose" onclick="return false;">

                                    <label for="subtitles" id="subtitles">Субтитры</label>
                                    <label class="checkbox style-e" style="display: inline-block; position: relative; padding-left: 50px;cursor: pointer; -webkit-user-select: none;-moz-user-select: none; -ms-user-select: none;user-select: none;margin-right: 15px;">
                                        <input type="checkbox" id="choosebox-subtitles-info"/>
                                        <div class="checkbox__checkmark"></div>
                                    </label>

                                </div>

                                <div class="choose" onclick="return false;"}>
                                     <label for="subtitles" id="teaser">Тизер</label>
                                     <label class="checkbox style-e" style="display: inline-block; position: relative; padding-left: 50px;cursor: pointer; -webkit-user-select: none;-moz-user-select: none; -ms-user-select: none;user-select: none;margin-right: 15px;">
                                     <input type="checkbox" id="teaser-edit"/>
                                     <div class="checkbox__checkmark"></div>
                                     </label>
                                </div>

                            </div>





                                                   <div class="order-info2">
                                                       <button  class="btn-logout usual-button" type="submit" id="take-order" ${order.workerId == null ? '' : 'hidden'}
                         onclick="bookOrder('${orderId}')" >Взять заказ</button>
                                        </div>
                                                </div>
                                            </div>`;
				if (document.querySelector("#order-info-tmp") != null) {
					document.querySelector("#order-info-tmp").remove();
				}
				document.querySelector('#confirm-block').insertAdjacentHTML('beforebegin', MODAL_INFO(ORDER));
				mapNonStringValues(ORDER);
			});
		} else {
			console.log("BAAAAAD");
		}
	});
}

function mapNonStringValues(order) {
	$('#choosebox-color-info').removeAttr('checked');
	if (order.colorCorrection) {
		$('#choosebox-color-info').attr('checked', 'checked');
	}
	$('#choosebox-subtitles-info').removeAttr('checked');
	if (order.videoSubtitles) {
		$('#choosebox-subtitles-info').attr('checked', 'checked');
	}
	$('#teaser-edit').removeAttr('checked');
	if (order.teaser) {
		$('#teaser-edit').attr('checked', 'checked');
	}
	$('#format option[value=' + order.videoFormat + ']').attr("selected", '');
	$('#cameras option[value=' + order.cameraCount + ']').attr("selected", '');
	$('#cut-reels option[value=' + order.cuttingVerticalVideo + ']').attr("selected", '');
}

function bookOrder(orderId) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let bookOrderDto = {
		'orderId': orderId
	};
	let request = new Request('/order_book', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(bookOrderDto)
	});
	fetch(request).then(function(response) {
		if (response.status === 200) {
			alert("Ваша заявка принята. Ожидайте одобрения. После одобрения Заказ появится в разделе \"Заказы в работе\".")
			document.location = '#close';
			document.location.reload();
			console.log("200 response");
		} else {
			console.log("BAAAAAD");
		}
	});
}

function modal2Click(orderId) {
	document.location = "#modal2";
	getOrderInfo(orderId);
	document.getElementById("modal2").show();
}

function modal2Close() {
	document.querySelector("#order-info-tmp").remove();
	$("#modal2").hide();
}

function getOwnedWorkerOrders() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/owned_orders', {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			response.json().then((data) => {
				console.log(data);
				const ORDERS = data.ownedOrders;
				if (ORDERS == null) {
					const message = '<div class="empty-order">\n' + '        \n' + '                <h4 class="empty-text">У вас еще нет заказов в работе</h4>\n' + '        \n' + '    </div>';
					document.querySelector(".orders").insertAdjacentHTML('beforeend', message);
				} else {
					const ORDER_BLOCK = item => `<div class="container">
                               <div class="order-main">
                                   <div class="order-info-main">
                                       <div class="order-name">
                                           <h3 >${item.name}</h3>
                                       </div>
                                   <div class="order-info2">
                                       <label for="text" id="summa">До ${item.deadline} | Создан ${item.createdDate}</label>
                                   </div>
                               </div>

                               <div class="order-info-main">
                                   <div class="order-name" id="order-border">
                                       <label for="text" id="pravki-text" >${item.status}${item.pravki != null && item.status === "В РАБОТЕ" ? ', ЕСТЬ ПРАВКИ' : ''}</label>
                                   </div>
                                   <div class="order-info2">
                                       <button  id="finish-work-btn" class="btn-logout usual-button" type="submit" ${item.status === "В РАБОТЕ" ? "" : "hidden"} onclick="finishWithLink('${item.orderId}')">Завершить работу</button>\n
                                       <button  class="btn-logout usual-button" type="submit" onclick="modal2Click('${item.orderId}')">Подробнее</button>
                                       <button  class="btn-logout usual-button" type="submit" id="pravki-btn" onclick="modal2Click('${item.orderId}')">Правки</button>
                                   </div>           </div>
                            </div>
                            </div>`;
					document.querySelector(".orders").insertAdjacentHTML('beforeend', ORDERS.map(item => ORDER_BLOCK(item)).join(''));
				}
			});
		} else {
			console.log("BAAAAAD");
		}
	});
}

function finishWithLink(orderId) {
	document.getElementById('link-result-input').remove();
	document.getElementById('confirm-btn-div').remove();
	const LINK = '<div class="order-info" id="link-result-input">\n' + '<label for="text">Cсылка на результат работы</label>\n' + '<input required class="form-styling" type="text" id="link_result" required/>\n' + '</div>';
	const BUTTONS = orderId => `<div class="confirm-btn" id="confirm-btn-div">
                        <button  class="btn-logout" id="submit-finish" onclick="sendLink('${orderId}')" >Завершить</button>
                        <button  class="btn-logout" id="cancel-finish" onclick="modal6Close()" >Закрыть</button>

                    </div>`;
	document.getElementById('confirm-block-finish').insertAdjacentHTML("beforebegin", LINK);
	document.getElementById('confirm-block-finish').insertAdjacentHTML('afterbegin', BUTTONS(orderId));
	$('#modal6').show();
}

function sendLink(orderId) {
	let headers = new Headers();
	let link = $('#link_result').val();
	if (link === '' || link === null || link === ' ') {
		alert("Ссылка на результат работы обязательна!");
		return;
	}
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/send_link?order_id=' + orderId + '&link=' + link, {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			modal6Close();
			alert("Ссылки на результат работы доступны заказчику!");
			document.location.reload();
		} else {
			console.log("BAAAAAD");
		}
	});
}



function mapBooleanToText(boolean) {
	return boolean ? 'ДА' : 'НЕТ';
}

function getPossibleOrders() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/possible_orders', {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.status === 200) {
			response.json().then((data) => {
				console.log(data);
				const ORDERS = data.ownedOrders;
				if (ORDERS == null) {
					const message = '<div class="empty-order">\n' + '        \n' + '                <h3 class="empty-text">У вас слишком много заказов в работе, новые заказы будут доступны после завершения текущих</h3>\n' + '        \n' + '\n' + '\n' + '    </div>';
					document.querySelector("#free-orders").insertAdjacentHTML('beforeend', message);
				} else {
					const ORDER_BLOCK = item => '<div class="container">\n' + '            <div class="order-main">\n' + '                <div class="order-info-main">\n' + '                    <div class="order-name">\n' + '                        <h3 >' + item.name + '</h3>\n' + '                    </div>\n' + '                \n' + '                <div class="order-info2">\n' + '                    <label for="text" id="summa">До ' + item.deadline + '</label>\n' + '                </div>\n' + '            </div>\n' + '\n' + '            <div class="order-info-main">\n' + '                <div class="order-name" id="order-border">\n' + '                    <label for="text" >' + item.additionalInfo + '</label>\n' + '                </div>\n' + '                <div class="order-info2">' + '                    <button  class="btn-logout usual-button" type="submit" onclick="modal2Click(\'' + item.orderId + '\')">Подробнее</button>\n' + '                </div>\n' + '            </div>\n' + '        </div>\n' + '    </div>';
					document.querySelector("#free-orders").insertAdjacentHTML('beforeend', ORDERS.map(item => ORDER_BLOCK(item)).join(''));
				}
			});
		} else if (response.status === 202) {
			alert("Нет доступных заказов!");
		} else {
			console.log("BAAAAAD");
		}
	});
}
/*
function check () {
if (document.getElementById('pravki-text').value == 'В РАБОТЕ, ЕСТЬ ПРАВКИ') document.getElementById('pravki-btn').style.display = 'block';
};*/