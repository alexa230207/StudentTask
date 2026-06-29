function registrar(){

const usuario={
nombre:nombre.value,
correo:correo.value,
password:password.value
};

localStorage.setItem(
"usuario_"+usuario.correo,
JSON.stringify(usuario)
);

alert("Cuenta creada");

window.location.href="login.html";
}
