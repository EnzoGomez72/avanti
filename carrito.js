const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer');

  function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    localStorage.removeItem('carrito')
    updateShoppingCartTotal();
    listarProductosCarrito();
  }
  


const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);


listarProductosCarrito();

function listarProductosCarrito(){
  
    let carrito = obtenerCarritoDeLocalStorage()


  shoppingCartItemsContainer.innerHTML = '';

    carrito.forEach(producto => {
        
        const shoppingCartRow = document.createElement('div');
        const shoppingCartContent = `
        <div class="row shoppingCartItem">
              <div class="col-6">
                  <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                      <img src=${producto.img} class="shopping-cart-image">
                      <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${producto.nombre}</h6>
                  </div>
              </div>
              <div class="col-2">
                  <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                      <p class="item-price mb-0 shoppingCartItemPrice">${producto.precio}  </p>
                  </div>
              </div>
              <div class="col-4">
                  <div
                      class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3"><p class="shopping-cart-quantity-input shoppingCartItemQuantity">${producto.cantidad}</p>
                      
                      <button class="btn btn-danger buttonDelete btn-${producto.id}" type="button">X</button>
                  </div>
              </div>
          </div>`;
          shoppingCartRow.innerHTML = shoppingCartContent;
          shoppingCartItemsContainer.append(shoppingCartRow);
        
          const deleteButton = document.querySelector(`.btn-${producto.id}`);
    
          deleteButton.addEventListener('click', (e) => {
            const id = e.target.id.split('-')[1];
            removeShoppingCartItem(producto.id)})
            
            shoppingCartRow
              .querySelector('.shoppingCartItemQuantity')
              .addEventListener('change', quantityChanged,);
    
updateShoppingCartTotal();

    });

 
}

function obtenerCarritoDeLocalStorage() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito 
  }

function updateShoppingCartTotal() {
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
  let carrito = obtenerCarritoDeLocalStorage()
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)
    shoppingCartTotal.innerHTML = ` $${total}`;
  }

updateShoppingCartTotal();

function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
  }

  function removeShoppingCartItem(id) {
    const productos = JSON.parse(localStorage.getItem('carrito'));
    const newItem = productos.filter(producto => producto.id != id);
  
    localStorage.setItem('carrito', JSON.stringify(newItem));
    updateShoppingCartTotal();
    listarProductosCarrito();
  };