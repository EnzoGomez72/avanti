const compraInicio = document.getElementById ("compraInicio");

document.addEventListener('DOMContentLoaded', () => {

    if (compraInicio) {
      listarProductosStock();
      cargarCarritoDesdeLocalStorage();
    }
});

function listarProductosStock(){

    fetch('../data.json')
        .then((datos) => datos.json())
        .then((productos) => {
                productos.forEach((producto) => {
                const nuevoProducto = document.createElement('div');
                nuevoProducto.classList.add('card');
                nuevoProducto.innerHTML= `
                <div>
                    <img class="card-image" src="${producto.img}" alt="remera ocho black">
                </div>
                <div>
                    <h3 class="card-title" >${producto.nombre}</h3>
                    <p class="card-price" >$ ${producto.precio}</p>
                    <button class="btn agregarAlCarrito" id="${producto.id}">Agregar Al Carrito</button>
                </div>
            `;
                compraInicio.appendChild(nuevoProducto);
                nuevoProducto.getElementsByTagName("button")[0].addEventListener("click", ()=>agregarAlCarrito(producto))
                });
        }) 
};

function agregarAlCarrito(producto) {
    let carrito = obtenerCarritoDeLocalStorage();
    const repeat = carrito.find((repeatProducto) => repeatProducto.id === producto.id);
    if(repeat) { repeat.cantidad ++;
    } else{
        carrito.push(producto);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    popupToastify();
  }
  
  function obtenerCarritoDeLocalStorage() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito 
  }
  

  function cargarCarritoDesdeLocalStorage() {
    let carrito = obtenerCarritoDeLocalStorage();
  }

  function popupToastify() {

    Toastify({
       text: `Producto agregado al carrito`,
       className: "info",
       duration: 1500,
       oldestFirst: true,
       escapeMarkup: true,
       offset: {
         x: 20, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
         y: 100 // vertical axis - can be a number or a string indicating unity. eg: '2em'
       },
       style: {
         background: "#161516",
         
       }
     }).showToast();   }