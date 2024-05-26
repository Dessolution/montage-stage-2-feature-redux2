$(function() {
	$(".btn").click(function() {
		$(".form-signin").toggleClass("form-signin-left");
		$(".form-signup").toggleClass("form-signup-left");
		$(".frame").toggleClass("frame-long");
		$(".signup-inactive").toggleClass("signup-active");
		$(".signin-active").toggleClass("signin-inactive");
		$(".forgot").toggleClass("forgot-left");
		$(this).removeClass("idle").addClass("active");
	});
});


$(function() {
	$(".btn-signup").click(function() {
		$(".nav").toggleClass("nav-up");
		$(".form-signup-left").toggleClass("form-signup-down");
		$(".success").toggleClass("success-left");
		$(".frame").toggleClass("frame-short");
		validateAndSignUp();
	});
});

function animateSignIn() {
	$(".btn-animate").toggleClass("btn-animate-grow");
	$(".welcome").toggleClass("welcome-left");
	$(".cover-photo").toggleClass("cover-photo-down");
	$(".frame").toggleClass("frame-short");
	$(".profile-photo").toggleClass("profile-photo-down");
	$(".btn-goback").toggleClass("btn-goback-up");
	$(".forgot").toggleClass("forgot-fade");
	document.getElementById('box').style.transition = 'all 1.5s ease 0.55s';
	document.getElementById('box').style.height = '350px';
	document.getElementById('box').style.background = ' #be0c36';
	document.getElementById('anima').style.display = 'block';
}

function openbox(box) {
	document.getElementById('box2').style.display = 'none';
	document.getElementById('hello').style.display = 'none';
	document.getElementById('box').style.display = 'block';
}

function openroles(roles) {
	const checkbox = document.getElementById('checkbox1');
	document.getElementById('checks').hidden = true;
	if (checkbox.checked) {
		document.getElementById(roles).style.display = 'block';
		document.getElementById('box').style.height = '1200px';
	} else {
		document.getElementById(roles).style.display = 'none';
		document.getElementById('checks').hidden = false;
		document.getElementById('box').style.height = '1000px';
	}
}

function sign(sign) {
	document.getElementById('box').style.height = '575px';
}

function signof(signof) {
	const checkbox = document.getElementById('checkbox1');
	if (checkbox.checked) {
		document.getElementById('box').style.height = '1200px';
	} else {
		document.getElementById('box').style.height = '1000px';
	}
}
$("#checkbox1").click(function() {
	openroles('roles');
});
$("#sign").click(function() {
	sign('sign');
});
$("#signup-off").click(function() {
	signof('signof');
});
$("#mainbtn").click(function() {
	openbox('box');
});
$("#create-order-main").click(function() {
	openorder('box2');
});

function closeorder() {
	document.getElementById('box2').style.display = 'none';
	document.getElementById('hello').style.display = 'block';
	document.getElementById('box').style.display = 'none';
}

function openorder() {
	document.getElementById('box2').style.display = 'block';
	document.getElementById('hello').style.display = 'none';
	document.getElementById('box').style.display = 'none';
}
$("#cancel-btn").click(function() {
	closeorder('box2');
});

function signUP() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let loginDto = {
		'firstname': $(".form-signup").find('[name="firstname"]').val(),
		'surname': $(".form-signup").find('[name="surname"]').val(),
		'username': $(".form-signup").find('[name="username"]').val(),
		'password': $(".form-signup").find('[name="password"]').val(),
		'messenger': $(".form-signup").find('[name="telegram"]').val(),
		'socials': $(".form-signup").find('[name="socials"]').val(),
		'isWorker': document.getElementById("checkbox1").checked,
		'info': $(".form-signup").find('[name="info"]').val(),
		'portfolio': $(".form-signup").find('[name="portfolio-area"]').val(),
		'role': $(".form-signup").find('[name="role"]').val(),
		'language': $(".form-signup").find('[name="languages"]').val(),
		'cash': $(".form-signup").find('[name="cash"]').val()
	};
	console.log(loginDto);
	let request = new Request('/register', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(loginDto)
	});
	//вот здесь анимация
	fetch(request).then(function(response) {
		if (response.status === 200) {
			animateSignIn();
			setTimeout(() => document.location.reload(), 3200);
			console.log("GOOOOOD")
		} else if (response.status === 202) {
			alert("Регистрация успешна, ожидайте одобрения администратором!")
			document.location.reload();
		} else if (response.status === 422) {
			alert("Пользователь с таким email уже существует!");
		} {
			console.log("BAAAAAD")
		}
	});
}

$(".multiple-select").select({
	placeholder: "Select a state"
});
document.addEventListener("DOMContentLoaded", function(event) {
	const searchParams = new URLSearchParams(window.location.search);
	if (searchParams.has("blocked") && searchParams.get("blocked").startsWith("true")) {
		alert("Ваша заявка на регистрацию отклонена!")
	}
	if (searchParams.has("approved") && searchParams.get("approved").startsWith("false")) {
		alert("Ваша заявка еще на рассмотрении!")
	}
	if (searchParams.has("authenticate") && searchParams.get("authenticate").startsWith("error")) {
		alert("Не удалось войти в сервис, неправильные логин или пароль!")
	}
});

function validateAndSignUp() {
	if (!$("#form-signup")[0].checkValidity()) {
		var list = $("#form-signup")[0].querySelectorAll(':invalid');
		for (var item of list) {
			item.classList.add("colorable");
			item.setAttribute("style", "background-color:  #be0c36;");
		}
		alert("Не заполнены обязательные поля к заказу!");
		return;
	} else {
		signUP();
	}
}

function createOrderAndSignUp() {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8');
	let orderDto = {
		'fullName': $('#name').val(),
		'phone': $('#phone').val(),
		'email': $('#email').val(),
		'password': $('#password-2').val(),
		'extraContact': $('#client-chat').val(),
		'videoLink': $('#video-link').val(),
		'videoFormat': $('#format').val(),
		'cameraCount': $('#cameras').val(),
		'chrono': $('#chrono').val(),
		'deadline': $('#deadline').val(),
		'taskLink': $('#tech-task-inp').val(),
		'colorCorrection': $("#color-check").is(":checked") ? "true" : "false",
		'cuttingVerticalVideo': $('#cut-reels').val(),
		'videoSubtitles': $("#sub-check").is(":checked") ? "true" : "false",
		'teaser': $("#teaser").is(":checked") ? "true" : "false"
	};
	console.log(orderDto);
	let request = new Request('/create_and_sign_up', {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(orderDto)
	});
	fetch(request).then(function(response) {
		if (response.status === 200) {
			alert("Получили ваш заказ, можете войти в личный кабинет с помощью вашего пароля и Email!")
			console.log("200 response");
			document.location.reload();
		} else if (response.status === 422) {
			alert("Пользователь с таким Email уже существует!");
		} else {
			console.log("BAAAAAD");
		}
	});
}
$(".colorable").click(() => {
	removeStyleAlert();
});
function checkLink(link) {
	return /\bhttps?:\/\/.*?\.[a-z]{2,4}\b\S*/g.test(link);
}
function checkLinks() {
	if (!checkLink($("#video-link").val())) {
		alert("Некорректная ссылка на материалы, проверьте формат ссылки.");
		return false;
	}
	if ($("#tech-task-inp").val() && !checkLink($("#tech-task-inp").val())) {
		alert("Некорректная ссылка на техническое задание, проверьте формат ссылки.");
		return false;
	}
	return true;
}
$("#confirm-btn").click(() => {
	if ($("#create-order-form")[0].checkValidity()) {
		if (!checkLinks()) {
			return;
		};
		createOrderAndSignUp();
	} else {
		var list = $("#create-order-form")[0].querySelectorAll(':invalid');
		for (var item of list) {
			item.classList.add("colorable");
			item.setAttribute("style", "background-color:  #be0c36;");
		}
		alert("Не заполнены обязательные поля к заказу!");
		return;
	};
});

