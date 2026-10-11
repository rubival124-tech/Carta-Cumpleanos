
/* =====================================
   1. LOCALIZAR LAS ESCENAS
===================================== */

const escenas = document.querySelectorAll(".escena");

function mostrarEscena(id) {
    escenas.forEach(function(escena) {
        escena.classList.remove("activa");
    });

    document.getElementById(id).classList.add("activa");
}

/* =====================================
   2. BOTÓN PARA ABRIR LA CARTA
===================================== */

const botonAbrir = document.getElementById("abrir-carta");
const sobre = document.querySelector(".sobre");

botonAbrir.addEventListener("click", function() {
    // Evita que se pulse varias veces durante la animación.
    botonAbrir.disabled = true;

    // Inicia la animación del sobre.
    sobre.classList.add("abierto");

    // Espera a que la sorpresa comience a revelarse.
    setTimeout(function() {
        mostrarEscena("escena-bienvenida");
        botonAbrir.disabled = false;
        sobre.classList.remove("abierto");
    }, 1500);
});


/* =====================================
   3. PASAR A LOS MENSAJES
===================================== */

document.getElementById("continuar-mensajes").addEventListener("click", function() {
    indiceMensaje = 0;

    textoMensaje.textContent = mensajes[indiceMensaje];

    progresoMensaje.textContent =
        `Mensaje ${indiceMensaje + 1} de ${mensajes.length}`;

    mostrarEscena("escena-mensajes");
});

/* =====================================
   4. MENSAJES PROGRESIVOS
===================================== */

const mensajes = [
    "Mary, hoy quiero desearte un cumpleaños lleno de momentos bonitos y razones sinceras para sonreír. Siempre me ha sorprendido la rapidez con la que comprendes las cosas, esa inteligencia con la que encuentras soluciones y la facilidad con la que consigues conectar con personas tan distintas. Son cualidades que admiro de ti y que hacen que sea fácil reconocer todo lo que puedes aportar a quienes te rodean.",

    "Pero hay algo que me parece especialmente valioso: esos momentos en los que, detrás de tu capacidad y tu fortaleza, también se asoma tu lado más sensible. Creo que no siempre necesitamos tener respuestas para todo ni mostrarnos fuertes en cada circunstancia. También hay belleza en poder ser vulnerables, en permitirnos sentir y en recordar que no tenemos que poder con todo por nuestra cuenta. Deseo que la vida te regale espacios donde puedas sentir tranquilidad, ser tú misma y recibir el mismo cariño y comprensión que tantas veces puedes ofrecer a los demás.",

    "Hay detalles pequeños que terminan guardando un significado especial. A veces pienso en el girasol que te regalé y en la piedra que tú me diste: dos objetos sencillos que, cada uno a su manera, quedaron ligados a un recuerdo bonito. Para este nuevo año de vida, le pido a Dios que cuide tu camino, te conceda salud, serenidad y fortaleza, y te permita disfrutar de las cosas buenas que has construido. Que nunca te falten motivos para florecer, personas con quienes compartir tus alegrías y fe para atravesar los días difíciles. Que la Virgen te acompañe y que Dios siga guiando cada uno de tus pasos. ¡Feliz cumpleaños, Mary! Que este nuevo capítulo te traiga mucha paz y momentos que hagan feliz a tu corazón. ♡"
];


let indiceMensaje = 0;

const textoMensaje = document.getElementById("texto-mensaje");
const progresoMensaje = document.getElementById("progreso-mensaje");
const botonSiguiente = document.getElementById("siguiente-mensaje");

botonSiguiente.addEventListener("click", function() {
    indiceMensaje++;

    if (indiceMensaje < mensajes.length) {
        textoMensaje.textContent = mensajes[indiceMensaje];

        progresoMensaje.textContent =
            `Mensaje ${indiceMensaje + 1} de ${mensajes.length}`;
                        
 textoMensaje.classList.remove("revelar");
void textoMensaje.offsetWidth;
textoMensaje.classList.add("revelar");

    } else {
        mostrarEscena("escena-final");
    }
});

/* =====================================
   5. VOLVER AL PRINCIPIO
===================================== */

const botonVolver = document.getElementById("volver-inicio");

botonVolver.addEventListener("click", function() {
    indiceMensaje = 0;

    textoMensaje.textContent = mensajes[0];
    progresoMensaje.textContent = "Mensaje 1 de 3";

    mostrarEscena("escena-sobre");
});


/* =====================================
   6. PÉTALOS FLOTANTES
===================================== */

/* =====================================
   6. PETALOS FLOTANTES
===================================== */

const contenedorPetalos = document.getElementById("petalos-container");

if (contenedorPetalos) {
    const movimientoReducido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!movimientoReducido) {
        function crearPetalo() {
            const petalo = document.createElement("span");
            petalo.classList.add("petalo");

            const tamano = Math.random() * 9 + 7;
            const duracion = Math.random() * 5 + 7;
            const desplazamiento = Math.random() * 180 - 90;
            const rotacion = Math.random() * 900 - 450;
            const opacidad = Math.random() * 0.35 + 0.45;

            petalo.style.left = Math.random() * 100 + "vw";
            petalo.style.setProperty("--tamano", tamano + "px");
            petalo.style.setProperty("--duracion", duracion + "s");
            petalo.style.setProperty(
                "--desplazamiento",
                desplazamiento + "px"
            );
            petalo.style.setProperty("--rotacion", rotacion + "deg");
            petalo.style.setProperty("--opacidad", opacidad);

            contenedorPetalos.appendChild(petalo);

            petalo.addEventListener("animationend", function () {
                petalo.remove();
            }, { once: true });
        }

        // Pequeña lluvia inicial
        for (let i = 0; i < 12; i++) {
            setTimeout(crearPetalo, i * 350);
        }

        // Caída continua
        setInterval(crearPetalo, 450);
    }
} else {
    console.error(
        "No se encontró #petalos-container. Revisa el index.html."
    );
}


const cancion = document.getElementById("cancion");
const botonMusica = document.getElementById("musica");

const botonInicio = document.getElementById("iniciar-experiencia");

botonInicio.addEventListener("click", async function () {
    try {
        await cancion.play();
        cancion.volume = 0.5;
        botonMusica.textContent = "Ⅱ Pausar música";
        botonInicio.textContent = "♫ Música activada";
        botonInicio.disabled = true;
    } catch (error) {
        console.error("No se pudo iniciar la música:", error);
        botonInicio.textContent = "Intentar de nuevo";
    }
});

botonMusica.textContent = "▶ Reproducir música";

botonMusica.addEventListener("click", async function () {
    if (cancion.paused) {
        try {
            await cancion.play();
            botonMusica.textContent = "Ⅱ Pausar música";
        } catch (error) {
            console.error("No se pudo reproducir la canción:", error);
            botonMusica.textContent = "▶ Intentar reproducir";
        }
    } else {
        cancion.pause();
        botonMusica.textContent = "▶ Reproducir música";
    }
});


/* Polvo de estrellas para los recuerdos de Mary */

const escenaFinal = document.getElementById("escena-final");
const contenedoresPolvo = document.querySelectorAll(".polvo-estrellas");

let intervaloEstrellas = null;

function crearParticula() {
    if (!escenaFinal || !escenaFinal.classList.contains("activa")) {
        return;
    }

    const contenedoresDisponibles = Array.from(contenedoresPolvo);

    if (contenedoresDisponibles.length === 0) {
        return;
    }

    const contenedor = contenedoresDisponibles[
        Math.floor(Math.random() * contenedoresDisponibles.length)
    ];

    const particula = document.createElement("span");
    particula.classList.add("particula-luminosa");

    particula.style.left = Math.random() * 90 + 5 + "%";

    const duracion = 2.5 + Math.random() * 2;
    particula.style.setProperty("--duracion", duracion + "s");

    const tamano = 2 + Math.random() * 3;
    particula.style.width = tamano + "px";
    particula.style.height = tamano + "px";

    contenedor.appendChild(particula);

    setTimeout(function () {
        particula.remove();
    }, duracion * 1000);
}

function iniciarPolvoEstrellas() {
    if (intervaloEstrellas !== null) {
        return;
    }

    crearParticula();
    intervaloEstrellas = setInterval(crearParticula, 250);
}

function detenerPolvoEstrellas() {
    if (intervaloEstrellas !== null) {
        clearInterval(intervaloEstrellas);
        intervaloEstrellas = null;
    }

    contenedoresPolvo.forEach(function (contenedor) {
        contenedor.replaceChildren();
    });
}

if (escenaFinal) {
    const observadorEscena = new MutationObserver(function () {
        if (escenaFinal.classList.contains("activa")) {
            iniciarPolvoEstrellas();
        } else {
            detenerPolvoEstrellas();
        }
    });

    observadorEscena.observe(escenaFinal, {
        attributes: true,
        attributeFilter: ["class"]
    });
}
