// =================== CARRUSEL ===================
let indice = 0;
const imagenes = document.querySelectorAll('.carrusel-inner img');
const carruselInner = document.querySelector('.carrusel-inner');
const carrusel = document.querySelector('.carrusel');

function moverCarrusel(direccion) {
  indice += direccion;
  if (indice < 0) indice = imagenes.length - 1;
  if (indice >= imagenes.length) indice = 0;

  const ancho = carrusel.offsetWidth;
  carruselInner.style.transform = `translateX(-${indice * ancho}px)`;
}

// === Carrusel táctil ===
let inicioX = 0;
let finX = 0;

carrusel.addEventListener('touchstart', e => {
  inicioX = e.touches[0].clientX;
});

carrusel.addEventListener('touchmove', e => {
  finX = e.touches[0].clientX;
});

carrusel.addEventListener('touchend', () => {
  const deltaX = finX - inicioX;
  if (Math.abs(deltaX) > 50) {
    moverCarrusel(deltaX > 0 ? -1 : 1);
  }
  inicioX = 0;
  finX = 0;
});

// =================== CARRITO ===================
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function toggleCarrito() {
  const carritoEl = document.getElementById('carrito');
  carritoEl.style.display = carritoEl.style.display === 'none' ? 'block' : 'none';
}

function agregarAlCarrito(producto, precio, tallaId, cantidadId) {
  const talla = document.getElementById(tallaId).value;
  const cantidad = parseInt(document.getElementById(cantidadId).value);
  carrito.push({ producto, precio, talla, cantidad });
  actualizarCarrito();
  mostrarAlerta();
}

function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.producto} (Talla: ${item.talla}, Cantidad: ${item.cantidad}) - $${(item.precio * item.cantidad).toFixed(2)}`;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('boton-eliminar');
    botonEliminar.onclick = () => eliminarDelCarrito(index);

    li.appendChild(botonEliminar);
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalCarrito.textContent = total.toFixed(2);
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar carrito cargado
document.addEventListener('DOMContentLoaded', () => {
  actualizarCarrito();
});

// Ocultar carrito al hacer clic fuera
document.addEventListener('click', function (event) {
  const carritoEl = document.getElementById('carrito');
  const botonCarrito = document.querySelector('.boton-carrito');
  if (!carritoEl.contains(event.target) && !botonCarrito.contains(event.target)) {
    carritoEl.style.display = 'none';
  }
});

// =================== ALERTA ===================
function mostrarAlerta() {
  const alerta = document.getElementById("miAlerta");
  alerta.style.display = "flex";
  setTimeout(() => {
    alerta.style.display = "none";
  }, 10000);
}

function cerrarAlerta() {
  document.getElementById("miAlerta").style.display = "none";
}

// =================== CANTIDAD ===================
const inputCantidad = document.getElementById('cantidad1');
const mensajeLimite = document.getElementById('mensaje-limite');

function mostrarMensaje(texto) {
  mensajeLimite.textContent = texto;
  mensajeLimite.style.display = 'block';
}

function ocultarMensaje() {
  mensajeLimite.textContent = '';
  mensajeLimite.style.display = 'none';
}

function sumarCantidad() {
  let valor = parseInt(inputCantidad.value);
  if (valor < 10) {
    inputCantidad.value = valor + 1;
    ocultarMensaje();
  } else {
    mostrarMensaje("Solo puedes agregar hasta 10 unidades.");
  }
}

function restarCantidad() {
  let valor = parseInt(inputCantidad.value);
  if (valor > 1) {
    inputCantidad.value = valor - 1;
    ocultarMensaje();
  } else {
    mostrarMensaje("Debes agregar al menos 1 unidad.");
  }
}

inputCantidad.addEventListener('input', () => {
  let valor = parseInt(inputCantidad.value);
  if (valor > 10) {
    inputCantidad.value = 10;
    mostrarMensaje("Máximo permitido: 10 unidades.");
  } else if (valor < 1 || isNaN(valor)) {
    inputCantidad.value = 1;
    mostrarMensaje("Mínimo permitido: 1 unidad.");
  } else {
    ocultarMensaje();
  }
});
