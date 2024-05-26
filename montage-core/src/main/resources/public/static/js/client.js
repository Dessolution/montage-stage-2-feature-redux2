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
document.addEventListener("DOMContentLoaded", function() {
	getOwnedOrders();
});
$("#close-modal-btn").click(() => {
	removeStyleAlert();
	$("#modal").hide();
});

function getOwnedOrders() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/owned_orders', {
		method: 'GET',
		headers: headers
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			/*  const container = document.querySelector('.container');
			  container.style.display = 'block';*/
			response.json().then((data) => {
				console.log(data);
				const ORDERS = data.ownedOrders;
				const ORDER_BLOCK = item => `<div class="container" >
                                <div class="order-main">
                                    <div class="order-info-main">
                                        <div class="order-name">
                                            <h3 >${item.name}</h3>
                                        </div>
                                    <div class="order-info2">
                                        <label  class="price">${item.status} | СОЗДАН ${item.createdDate}</label>
                                    </div>
                                </div>
                                <div class="order-info-main">
                                    <div class="order-name" id="order-border">
                                    	<label for="text">Ваш заказ взял:</label>
                                        <label for="text" onclick="getWorkerShort('${item.workerId}')">${mapWorkerToText(item.worker)}</label>
                                    </div>
                                    <div class="order-info2">
                                        <button  class="btn-logout usual-button" type="submit" ${item.status === "ЗАВЕРШЕН ИСПОЛНИТЕЛЕМ" ? "" : "hidden"} onclick="openPravkiModel('${item.orderId}', '${item.linkResult}')">Принять работу</button>
                                        <button  class="btn-logout usual-button" type="submit" id="more" onclick="modal2Click('${item.orderId}', false);hideBtn();">Подробнее</button>
                                        <button  class="btn-correct" type="submit" ${item.status === "НОВЫЙ" ? "" : "hidden"} onclick="modal2Click('${item.orderId}', true);showBtn();">Редактировать</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
				document.querySelector(".orders").insertAdjacentHTML('beforeend', ORDERS.map(item => ORDER_BLOCK(item)).join(''));
			});
		} else {
			console.log("BAAAAAD");
		}
	});
}

function openPravkiModel(orderId, link) {
	document.getElementById('pravki-inner').remove();
	const PRAVKI = (orderId) => `
<div class="modal-window cyan" id="pravki-inner" xmlns="http://www.w3.org/1999/html">
                <h2>Принять работу</h2>
<div className="order-info">
        <label id="pravki">Правки (опционально, если нужно вернуть заказ в работу)</label>
        <textarea class="pravki-modal" name="info" id="pravki-about" cols="30" rows="10"></textarea>
    </div>
    ${link === null ? "/n" : "<label id=\"pravki\">Ссылка на результат</label><a class=\"form-styling marginal\" target=\"_blank\" href=\"" + link + "\" >Перейти</a>"}
    <div className="confirm">
        <div className="confirm-btn">
            <button class="btn-otmena" id="pravki-btn" onClick="modal4Close()">Отмена</button>
            <button class="recover-btn" id="pravki-btn" onClick="sendPravki('${orderId}', false)">Принять</button>
            <button class="recover-btn" id="pravki-btn" onClick="sendPravki('${orderId}', true)">Вернуть</button>
        </div>
    </div>
</div>`;
	document.getElementById('pravki-modal-cell').insertAdjacentHTML("beforeend", PRAVKI(orderId));
	$('#modal4').show();
}

function modal4Close() {
	$('#modal4').hide();
}

function sendPravki(orderId, isPravki) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let pravki = {
		'orderId': orderId,
		'isPravki': isPravki,
		'pravki': document.getElementById('pravki-about').value
	}
	let request = new Request('/send_pravki', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(pravki)
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			modal4Close();
			document.location.reload();
		} else {
			console.log("BAAAAAD");
		}
	});
}

function getOrderInfo(orderId, edit) {
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
				const MODAL_INFO = order => (`<div id="insertable_order_info"><h2>Основные параметры монтажа</h2>
                    <div class="order-menu">
                        <form id="create-order-form">
                        <div class="order-info" id="block1">
                        	${order.linkResult === null ? "" : "<label id=\"pravki-form\">Ссылка на результат</label>"}
                     		${order.linkResult === null ? "" : "<a class=\"form-styling change-type\" target=\"_blank\" href=\"" + order.linkResult + "\">Перейти</a>"}
                
                        	
                            <label for="name" >Имя (Или ФИО)</label>
                            <input class="form-styling change-type" id="name-input" type="text" name="name" value="${order.fullName}" ${edit ? "" : "readonly"}/>

                            <label for="number-messenger" >Номер телефона для связи в месседжерах <br> (Whatsapp, Telegram)</label>
                            <input class="form-styling change-type" id="number-messenger" type="tel" name="phone" value="${order.phone}" ${edit ? "" : "readonly"}/>

                            <label for="backup-communication"> Резервный способ связи (например, ник в телеграм)</label>
                            <input class="form-styling change-type" id="backup-com" type="text" name="linkmat" value="${order.extraContact}" ${edit ? "" : "readonly"}/>

                            <label for="to-materials" id="to-materials">Ссылка на материалы (Яндекс.диск, Google drive и т.д.)</label>

                            ${linkOrInput(edit, order.videoLink, 'video-link', 'linkmat')}

                            <label for="format">Выбранный формат вашего видео</label>
                               <select class="change-type" name="format" id="format" ${edit ? "" : "disabled"}>
                                   <option value="PODCAST">Видеоподкаст, интервью</option>
                                   <option value="LESSON">Видеоурок, видеолекция, "говорящая голова"</option>
                                   <option value="REELS">Вертикальные видео (Reels, Shorts)</option>
                                   <option value="LED">Запись на прозрачной LED-доске</option>
                                   <option value="OTHER">Другое</option>
                               </select>

                            <label for="cameras">Количество камер на съемках </label>
                                <select name="cameras" id="cameras" ${edit ? "" : "disabled"}>
                                    <option selected value="ONE">1 камера</option>
                                    <option value="TWO">2 камеры</option>
                                    <option value="THREE">3 камеры</option>
                                    <option value="FOUR">4 камеры</option>
                                    <option value="FIVE">5 камер</option>
                                </select>

                            <label for="chrono">Хронометраж готового видео (ЧЧ:мм)</label>
                            <input class="form-styling" type="time" name="сhrono" id="chrono" value="${order.chrono}" ${edit ? "" : "readonly"}/>

                            <label for="deadline">Дедлайн проекта (до какой даты необходим готовый ролик)</label>
                            <input class="form-styling" type="date" name="deadline" id="deadline" value="${order.deadline}" ${edit ? "" : "readonly"}/>

                            <label for="tech-task" id="tech-task-label">Техническое задание (с чёткими таймингами и/или сценариями, если есть в наличии)</label>
                            ${linkOrInput(edit, order.taskLink, 'tech-task', 'tasklink')}

                            <div class="choosebox" id="choosebox-order-${order.orderId}" >

                                <div class="choose" style="display: flex; justify-content: space-between; width: 100%; min-height: 50px;"  ${edit ? "" : "onclick=\"return false;\""}>

                                    <label for="color-choose" id="color-choose">Цветокоррекция</label>
                                    <label class="checkbox style-e" style="display: inline-block; position: relative; padding-left: 50px;cursor: pointer; -webkit-user-select: none;-moz-user-select: none; -ms-user-select: none;user-select: none;margin-right: 15px;">
                                        <input type="checkbox" id="choosebox-color-info" />
                                        <div class="checkbox__checkmark"></div>
                                    </label>

                                </div>

                                 <label for="cut-reels">Нарезать вертикальные видео (REELS)</label>
                                <select name="cut-reels" id="cut-reels" required ${edit ? "" : "disabled"}>
                                    <option selected value="NONE">Нет</option>
                                    <option value="LESS_TWO">1-2</option>
                                    <option value="LESS_FOUR">3-4</option>
                                    <option value="MORE_FIVE">5+</option>
                                </select>

                                <div class="choose" style="display: flex; justify-content: space-between; width: 100%; min-height: 50px;" ${edit ? "" : "onclick=\"return false;\""}>

                                    <label for="subtitles" id="subtitles">Субтитры для вертикального видео</label>
                                    <label class="checkbox style-e" style="display: inline-block; position: relative; padding-left: 50px;cursor: pointer; -webkit-user-select: none;-moz-user-select: none; -ms-user-select: none;user-select: none;margin-right: 15px;">
                                        <input type="checkbox" id="choosebox-subtitles-info"/>
                                        <div class="checkbox__checkmark"></div>
                                    </label>

                                </div>

                                <div class="choose" style="display: flex; justify-content: space-between; width: 100%; min-height: 50px;" ${edit ? "" : "onclick=\"return false;\""}>
                                     <label for="subtitles" id="teaser">Тизер (Нарезка интересных моментов в начале ролика)</label>
                                     <label class="checkbox style-e" style="display: inline-block; position: relative; padding-left: 50px;cursor: pointer; -webkit-user-select: none;-moz-user-select: none; -ms-user-select: none;user-select: none;margin-right: 15px;">
                                     <input type="checkbox" id="teaser-edit"/>
                                     <div class="checkbox__checkmark"></div>
                                     </label>
                                </div>


                            </div>


                        </div>



                        </form>
                    </div>

                    </div>`);
				if (document.getElementById('insertable_order_info') != null) {
					document.getElementById('insertable_order_info').remove();
				}
				console.log(document.getElementById('order-info-full'));
				document.getElementById('order-info-full').insertAdjacentHTML('afterbegin', MODAL_INFO(ORDER));
				mapNonStringValues(ORDER);
			});
		} else {
			console.log("BAAAAAD");
		}
	});
}

function linkOrInput(edit, link, elemId, name) {
	if (edit) {
		return `<input class="form-styling" type="text" id="${elemId + "-edit"}" name="${name}" value="${link}" required/>`;
	} else {
		return `<a target="_blank" class="form-styling change-type" type="text" name="linkmat"
                            id="${elemId}" ${link === null? "" : "href=\"" + link + "\""}>${link === null ? "Нет" : "Перейти"  }
                            </a>`;
	}
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
	$('#save-btn').attr("onclick", 'updateOrder(\'' + order.orderId + '\')');
}

function openprofile() {
	getUserData();
	document.getElementById('orders').style.display = 'none';
	document.getElementById('order-btn').style.display = 'none';
	document.getElementById('client-profile').style.display = 'block';
}

function showorders() {
	document.getElementById('client-profile').style.display = 'none';
	document.getElementById('orders').style.display = 'block';
	document.getElementById('order-btn').style.display = 'block';
}

function modalShow() {
	$("#modal").addClass('modal-box-in');
	$("#modal").show();
}

function modalClose() {
	$("#modal").removeClass('modal-box-in');
	$("#modal").addClass('modal-box-out');
	$("#modal").hide();
	removeStyleAlert();
}

function createOrder() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let orderDto = {
		'fullName': block1.find('[name="name"]').val(),
		'phone': block1.find('[name="tel"]').val(),
		'extraContact': block1.find('[name="client-chat"]').val(),
		'videoLink': block1.find('[name="linkmat"]').val(),
		'videoFormat': $('#format-crt').val(),
		'cameraCount': $('#cameras-crt').val(),
		'chrono': $('#chrono-crt').val(),
		'deadline': $('#deadline-crt').val(),
		'taskLink': block1.find('[name="tasklink"]').val(),
		'colorCorrection': $("#color-check").is(":checked") ? "true" : "false",
		'cuttingVerticalVideo': $('#cut-reels-crt').val(),
		'videoSubtitles': $("#sub-check").is(":checked") ? "true" : "false",
		'teaser': $("#teaser").is(":checked") ? "true" : "false"
	};
	console.log(orderDto);
	let request = new Request('/order_create', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(orderDto)
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			document.location = '#close';
			document.location.reload();
			console.log("200 response");
		} else {
			console.log("BAAAAAD");
		}
	});
}

function updateOrder(orderId) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let orderDto = {
		'fullName': $('#name-input').val(),
		'phone': $('#number-messenger').val(),
		'extraContact': $('#backup-com').val(),
		'videoLink': $('#video-link-edit').val(),
		'videoFormat': $('#format').val(),
		'cameraCount': $('#cameras').val(),
		'chrono': $('#chrono').val(),
		'deadline': $('#deadline').val(),
		'taskLink': $('#tech-task-edit').val(),
		'colorCorrection': $("#choosebox-color-info").is(":checked") ? "true" : "false",
		'cuttingVerticalVideo': $('#cut-reels').val(),
		'videoSubtitles': $("#choosebox-subtitles-info").is(":checked") ? "true" : "false",
		'teaser': $("#teaser-edit").is(":checked") ? "true" : "false"
	};
	let request = new Request('/order_update?order_id=' + orderId, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(orderDto)
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			document.location = '#close';
			document.location.reload();
			console.log("200 response");
		} else {
			console.log("BAAAAAD");
		}
	});
}

function showUserInfo(userId) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let request = new Request('/user_contact?user_id=' + userId, {
		method: 'GET',
		headers: headers,
	});
	fetch(request).then(function(response) {
		if (response.ok) {} else {
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
				document.location = "#modal8";
			} else {
				alert("Исполнитель на ваш заказ еще не назначен.")
				console.log("BAAAAAD");
			}
		});
	}
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
				$('#client-name').val(data.userName);
				$('#client-surname').val(data.userSurname);
				$('#client-content1').val(data.userEmail);
				$('#client-content3').val(data.userMessenger);
				$('#client-content4').val(data.userChannel);
				$('#client-content5').val(data.userDescription);
			});
		} else {
			console.error('Произошла ошибка:', error);
		}
	});
}

function profileEditable() {
	$('#client-name').removeAttr('readonly');
	$('#client-surname').removeAttr('readonly');
	$('#client-content1').removeAttr('readonly');
	$('#client-content2').removeAttr('readonly');
	$('#client-content3').removeAttr('readonly');
	$('#client-content4').removeAttr('readonly');
	$('#client-content5').removeAttr('readonly');
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
		"name" : $('#client-name').val(),
		"surname": $('#client-surname').val(),
		"email": $('#client-content1').val(),
		"password": $('#client-content2').val(),
		"messenger": $('#client-content3').val(),
		"channel": $('#client-content4').val(),
		"description": $('#client-content5').val()
	};
	let request = new Request('/update_profile', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(updateDto)
	});
	fetch(request).then(function(response) {
		if (response.ok) {
			alert("Успешно!");
			$('#client-name').attr('readonly', true);
			$('#client-surname').attr('readonly', true);
			$('#client-content1').attr('readonly', true);
			$('#client-content2').attr('readonly', true);
			$('#client-content3').attr('readonly', true);
			$('#client-content4').attr('readonly', true);
			$('#client-content5').attr('readonly', true);
			$('#client-content6').attr('readonly', true);
			$('#client-content7').attr('readonly', true);

			$('#save-profile-btn').attr('hidden', true);
			$('#edit-profile-btn').removeAttr('hidden');
			document.location.reload();
		} else {
			alert("Не удалось связаться с сервером!");
			console.error('Произошла ошибка:', error);
		}
	});
}

function mapWorkerToText(worker) {
	return worker === null ? "Не назначен" : worker;
}

function hideBtn() {
	document.getElementById('save-btn').style.display = 'none';
}

function showBtn() {
	document.getElementById('save-btn').style.display = 'block';
}

function modal2Click(orderId, edit) {
	console.log(orderId);
	console.log(edit);
	getOrderInfo(orderId, edit);
	$("#modal2").show();
}

function modal2Close() {
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

function checkLink(link) {
	return /\bhttps?:\/\/.*?\.[a-z]{2,4}\b\S*/g.test(link);
}
function checkLinks() {
	if (!checkLink($("#link-mat").val())) {
		alert("Некорректная ссылка на материалы, проверьте формат ссылки.");
		return false;
	}
	if ($("#tech-task-inp").val() && !checkLink($("#tech-task-inp").val())) {
		alert("Некорректная ссылка на техническое задание, проверьте формат ссылки.");
		return false;
	}

}

$("#confirm-btn").click(() => {
	if ($("#create-order-form")[0].checkValidity()) {
		if (!checkLinks()) {
			return
		};
		createOrder();
	} else {
		var list = $("#create-order-form")[0].querySelectorAll(':invalid');
		for (var item of list) {
			item.classList.add("colorable");
			item.setAttribute("style", "background-color: #be0c36;");
		}
		alert("Не заполнены обязательные поля к заказу!");
		return;
	};
});