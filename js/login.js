function login() {

    let correo = document.getElementById("correo").value;
    let password = document.getElementById("password").value;

    let usuario = JSON.parse(
        localStorage.getItem("usuario_" + correo)
    );

    if (usuario && usuario.password === password) {

        localStorage.setItem("sesion", correo);

        const transition =
            document.getElementById("transition");

        transition.classList.add("active");

        setTimeout(() => {
            window.location.href = "home.html";
        }, 800);

    } else {

        alert("Correo o contraseña incorrectos");

    }
}


/* EFECTO 3D DE LA TARJETA */

const card = document.querySelector(".glass-card");

card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = (x - centerX) / 15;
    const rotateX = (centerY - y) / 15;

    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)
    `;
});

card.addEventListener("mouseleave", () => {

    card.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
    `;
});
