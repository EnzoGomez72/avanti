
const agregarAlCarritoButtons = document.querySelectorAll('.agregarAlCarrito');
agregarAlCarritoButtons.forEach((agregarAlCarritoButton) => {
  agregarAlCarritoButton.addEventListener('click', agregarAlCarritoClicked);
});

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    localStorage.removeItem('productos')
    updateShoppingCartTotal();
    appendItems();
  }
  


const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);




function agregarItem({name, price, image}) {
  const productos = JSON.parse(localStorage.getItem('productos'));
  
  const newProducto = {
    id: productos.length,
    name,
    price,
    image
  }
  
  productos.push(newProducto);
  
  localStorage.setItem('productos', JSON.stringify(productos));
  appendItems();
}

function removeShoppingCartItem(id) {
  const productos = JSON.parse(localStorage.getItem('productos'));
  const newItem = productos.filter(producto => producto.id != id);

  localStorage.setItem('productos', JSON.stringify(newItem));
  appendItems();
  updateShoppingCartTotal();
};
function appendItems() {
  let productos = [];

  if (JSON.parse(localStorage.getItem('productos'))) {
    productos = JSON.parse(localStorage.getItem('productos'));
  } else {
    localStorage.setItem('productos', JSON.stringify([]));
  }

  shoppingCartItemsContainer.innerHTML = '';

  productos.forEach(producto => {
    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
          <div class="col-6">
              <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <img src=${producto.image} class="shopping-cart-image">
                  <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${producto.name}</h6>
              </div>
          </div>
          <div class="col-2">
              <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <p class="item-price mb-0 shoppingCartItemPrice">${producto.price}</p>
              </div>
          </div>
          <div class="col-4">
              <div
                  class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                  <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                      value="1">
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


  })
}
appendItems();
updateShoppingCartTotal()

function agregarAlCarritoClicked(e) {
  const button = e.target;
  const item = button.closest('.card');

  const newItem = {
    name: item.querySelector('.card-title').textContent,
    price: item.querySelector('.card-price').textContent,
    image: item.querySelector('.card-image').src,
  }
  console.log(newItem);

  agregarItem(newItem)
  updateShoppingCartTotal()

}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = ` $${total.toFixed(3)}`;
}
