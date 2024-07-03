const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input, #formulario textarea');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,16}$/, // Letras y espacios, pueden llevar acentos.
	paterno: /^[a-zA-ZÀ-ÿ\s]{3,16}$/, // Letras y espacios, pueden llevar acentos.
	materno: /^[a-zA-ZÀ-ÿ\s]{3,16}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{11,11}$/, // 7 a 11 números.
	comentarios: /^.{1,255}$/ // De 1 a 255 caracteres.
}

const campos = {
	nombre: false,
	paterno: false,
	materno: false,
	correo: false,
	telefono: false,
	comentarios: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "paterno":
			validarCampo(expresiones.paterno, e.target, 'paterno');
		break;
		case "materno":
			validarCampo(expresiones.materno, e.target, 'materno');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
		case "comentarios":
			validarCampo(expresiones.comentarios, e.target, 'comentarios');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.nombre && campos.paterno && campos.materno && campos.correo && campos.telefono && campos.comentarios){
		// Enviar email con EmailJS
		emailjs.sendForm('default_service', 'template_2ps6nk8', formulario)
			.then(function(response) {
				console.log('SUCCESS!', response.status, response.text);
				document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
				setTimeout(() => {
					document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
				}, 5000);
			}, function(error) {
				console.log('FAILED...', error);
				document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
			});

		formulario.reset();

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});