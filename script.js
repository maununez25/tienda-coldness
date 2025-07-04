

let indice = 0;
const imagenes = document.querySelectorAll('.carrusel img');
function moverCarrusel(direccion) {
indice += direccion;
if (indice < 0) {
 indice = imagenes.length - 1;
} else if (indice >= imagenes.length) {
 indice = 0;
}
const desplazamiento = -indice * 480;
imagenes.forEach(img => {
 img.style.transform = `translateX(${desplazamiento}px)`;
});
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
function toggleCarrito() {
const carrito = document.getElementById('carrito');
carrito.style.display = carrito.style.display === 'none' ? 'block' : 'none';
}

function agregarAlCarrito(producto, precio, tallaId, cantidadId) {
const talla = document.getElementById(tallaId).value;
const cantidad = parseInt(document.getElementById(cantidadId).value);
carrito.push({ producto, precio, talla, cantidad });
actualizarCarrito();
//alert("Producto agregado al carrito");
 // Mostrar alerta visual
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
localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito en localStorage
}

// Cargar el carrito desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
carrito = JSON.parse(localStorage.getItem('carrito')) || [];
actualizarCarrito();
});

// Ocultar el carrito al hacer clic fuera de él
document.addEventListener('click', function(event) {
const carrito = document.getElementById('carrito');
const botonCarrito = document.querySelector('.boton-carrito');
if (!carrito.contains(event.target) && !botonCarrito.contains(event.target)) {
 carrito.style.display = 'none';
}
});

function cerrarAlerta() {
    document.getElementById("miAlerta").style.display = "none";
}
// alerta carrito
function mostrarAlerta() {
    const alerta = document.getElementById("miAlerta");
    alerta.style.display = "flex"; // o "block" según tu diseño
  
    // Cierre automático después de 3 segundos (opcional)
    setTimeout(() => {
      alerta.style.display = "none";
    }, 10000);
  }
  
  function cerrarAlerta() {
    document.getElementById("miAlerta").style.display = "none";
  }
  

  //sec cant
 
  function sumarCantidad() {
    const input = document.getElementById("cantidad1");
    let valor = parseInt(input.value);
    if (valor < parseInt(input.max)) input.value = valor + 1;
  }
  
  function restarCantidad() {
    const input = document.getElementById("cantidad1");
    let valor = parseInt(input.value);
    if (valor > parseInt(input.min)) input.value = valor - 1;
  }
  
  