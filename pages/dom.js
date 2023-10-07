//Formulario

function verificarPassword() {

  var inputPassword = document.querySelector("#PasswordOne").value;
  if (inputPassword.length >= 8) {
    console.log("Muy bien");
  }
  else {
    alert("Debes escribir mas de 8 caracteres");
  }
}

function verificarPassword() {

  var inputPassword = document.querySelector("#PasswordTwo").value;
  if (inputPassword.length >= 8) {
    console.log("Muy bien");
  }
  else {
    alert("Debes escribir mas de 8 caracteres");
  }
}

//Carrito de compras

//Base de datos de los productos que se ofrecen en formato Json
const dataBase = [
  {
    id: 1,
    nombre: 'Chunky Cachorros Cordero',
    descripcion: 'Alimento Completo y Balaceado para tu pequeño cachorro',
    precio: 40000,
    imagen: '../images/ConcentradoDos.jpg',
    cantidad: 5
  },
  {
    id: 2,
    nombre: 'Chunky Cachorro Pollo Raza Grande',
    descripcion: 'Alimento Completo y Balaceado para tu pequeño cachorro',
    precio: 60000,
    imagen: '../images/ConcentradoUno.jpg',
    cantidad: 5
  },
  {
    id: 3,
    nombre: 'Chunky Adulto Pequeño',
    descripcion: 'Alimento Completo y Balaceado para tu pequeño Adulto',
    precio: 35000,
    imagen: '../images/ConcentradoCuatro.jpg',
    cantidad: 5
  },
  {
    id: 4,
    nombre: 'Mamá y Cachorro',
    descripcion: 'Pensando en la importancia de la nutrición en los primeros 4 meses de vida de los cachorros',
    precio: 70000,
    imagen: '../images/ConcentradoTres.jpg',
    cantidad: 5
  },
  {
    id: 5,
    nombre: 'Adultos Piel',
    descripcion: 'Agility Gold Piel es un producto diseñado para nutrir la piel y pelaje de perros adultos',
    precio: 80000,
    imagen: '../images/ConcentradoCinco.jpg',
    cantidad: 5
  },
  {
    id: 6,
    nombre: 'Adultos Obesos',
    descripcion: 'Sabemos que el sobrepeso y la obesidad son condiciones que afectan la salud y la calidad de vida',
    precio: 100000,
    imagen: '../images/ConcentradoSiete.jpg',
    cantidad: 5
  },
  {
    id: 7,
    nombre: 'Gatos Adulto Pollo',
    descripcion: 'Es un alimento ideal para gatos adultos que contribuye nutrientes necesarios para su vida diaria.',
    precio: 30000,
    imagen: '../images/ConcentradoDiez.jpg',
    cantidad: 5
  },
  {
    id: 8,
    nombre: 'Gatitos',
    descripcion: 'Es una línea de alimentos súper premium, perfecto para controlar las bolas de pelo de tu gato',
    precio: 40000,
    imagen: '../images/ConcentradoOcho.png',
    cantidad: 5
  },
  {
    id: 9,
    nombre: 'Gatitos Pollo',
    descripcion: 'Linea de pollo para gatitos. Ideal también para hembras en etapa de gestación y Lactancia.',
    precio: 45000,
    imagen: '../images/ConcentradoOnce.jpg',
    cantidad: 5
  }
];

let shoppingCart = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcart = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMemptyButton = document.querySelector('#boton-vaciar');
const DOMacceptButton = document.querySelector('#boton-comprar');

// Funciones

/**
* Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
*/
function renderProducts() {
  dataBase.forEach((info) => {
    // Estructura
    const cardProductDiv = document.createElement('div');
    cardProductDiv.classList.add('card', 'col-sm-3', 'my-2', 'mx-3');
    // Imagen
    const cardImage = document.createElement('img');
    cardImage.classList.add('card-img-top');
    cardImage.setAttribute('src', info.imagen);
    cardImage.width = 60;
    cardImage.height = 300;
    // Titulo
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'text-center');
    cardTitle.textContent = info.nombre;
    //Descripcion
    const cardDescription = document.createElement('p');
    cardDescription.classList.add('card-description', 'text-center');
    cardDescription.textContent = info.descripcion;
    // Body
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');
    // Precio
    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card-text');
    cardPrice.textContent = `${divisa} ${info.precio}`;
    // Boton 
    const cardButton = document.createElement('button');
    cardButton.classList.add('btn', 'btn-warning');
    cardButton.textContent = 'Agregar Al carrito';
    cardButton.setAttribute('marcador', info.id);
    cardButton.addEventListener('click', addProductToCart);
    // Insertamos
    cardBodyDiv.appendChild(cardImage);
    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardDescription);
    cardBodyDiv.appendChild(cardPrice);
    cardBodyDiv.appendChild(cardButton);
    cardProductDiv.appendChild(cardBodyDiv);
    DOMitems.appendChild(cardProductDiv);
  });
}

/**
* Evento para añadir un producto al carrito de la compra
*/
function addProductToCart(evento) {
  // Obtener el ID del producto desde el botón
  const idProducto = evento.target.getAttribute('marcador');

  // Buscar el producto en la base de datos por su ID
  const productInDataBase = dataBase.find((producto) => producto.id == idProducto);

  // Verificar si hay suficiente stock
  if (productInDataBase.cantidad > 0) {
    // Agregar el producto al carrito
    shoppingCart.push(idProducto);

    // Actualizar la cantidad en la base de datos
    productInDataBase.cantidad--;

    // Actualizar el carrito
    renderCart();
  } else {
    alert('No hay más unidades de este producto');
  }
}

/**
* Dibuja todos los productos guardados en el carrito
*/
function renderCart() {
  // Vaciamos todo el html
  DOMcart.textContent = '';
  // Quitamos los duplicados
  const carritoSinDuplicados = [...new Set(shoppingCart)];
  // Generamos los Nodos a partir de carrito
  carritoSinDuplicados.forEach((item) => {
    // Obtenemos el item que necesitamos de la variable base de datos
    const miItem = dataBase.filter((itemBaseDatos) => {
      // ¿Coincide las id? Solo puede existir un caso
      return itemBaseDatos.id === parseInt(item);
    });
    // Cuenta el número de veces que se repite el producto
    const numeroUnidadesItem = shoppingCart.reduce((total, itemId) => {
      // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
      return itemId === item ? total += 1 : total;
    }, 0);
    // Creamos el nodo principal del item del carrito
    const nodeItemCart = document.createElement('li');
    nodeItemCart.classList.add('list-group-item', 'text-right', 'mx-2');
    nodeItemCart.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio}`;
    //Contenerdor para imagen
    const containerImage = document.createElement('div');
    containerImage.classList.add('carrito-imagen');
    // Crear imagen del producto
    const imagenProducto = document.createElement('img');
    imagenProducto.src = miItem[0].imagen;
    imagenProducto.width = 40; // Establece el tamaño deseado
    containerImage.appendChild(imagenProducto);
    // Boton de eliminar
    const deleteButtonCart = document.createElement('button');
    deleteButtonCart.classList.add('btn', 'btn-danger', 'mx-5');
    deleteButtonCart.textContent = 'Eliminar';
    deleteButtonCart.style.marginLeft = '1rem';
    deleteButtonCart.dataset.item = item;
    deleteButtonCart.addEventListener('click', deleteItemCart);
    // Mezclamos nodos
    nodeItemCart.appendChild(containerImage);
    nodeItemCart.appendChild(imagenProducto);
    nodeItemCart.appendChild(deleteButtonCart);
    DOMcart.appendChild(nodeItemCart);
  });
  // Renderizamos el precio total en el HTML
  DOMtotal.textContent = calculateTotal();
}

/**
* Evento para borrar un elemento del carrito
*/
function deleteItemCart(evento) {
  // Obtenemos el producto ID que hay en el botón pulsado
  const id = evento.target.dataset.item;

  // Buscar el índice del primer producto con el ID en el carrito
  const index = shoppingCart.indexOf(id);

  // Verificar si el producto existe en el carrito
  if (index !== -1) {
    // Eliminar una unidad del producto del carrito
    shoppingCart.splice(index, 1);

    // Buscar el producto en la base de datos por su ID
    const productoEnBaseDeDatos = dataBase.find((producto) => producto.id == id);

    // Incrementar la cantidad en la base de datos solo si aún hay unidades disponibles
    if (productoEnBaseDeDatos.cantidad < 5) {
      productoEnBaseDeDatos.cantidad++;
    }

    // Renderizar el carrito actualizado
    renderCart();
  }
}

/**
* Calcula el precio total teniendo en cuenta los productos repetidos
*/
function calculateTotal() {
  // Recorremos el array del carrito 
  return shoppingCart.reduce((total, item) => {
    // De cada elemento obtenemos su precio
    const miItem = dataBase.filter((itemBaseDatos) => {
      return itemBaseDatos.id === parseInt(item);
    });
    // Los sumamos al total
    return total + miItem[0].precio;
  }, 0).toFixed(2);
}


function AcceptPurchase() {
  // Limpiamos los productos guardados
  shoppingCart = [];
  // Renderizamos los cambios
  renderCart();
  alert('Su compra fue realizada con exito');
}

/**
* Varia el carrito y vuelve a dibujarlo
*/
function EmptyCart() {
  // Iterar sobre el carrito para incrementar la cantidad en la base de datos
  shoppingCart.forEach((id) => {
    const productoEnBaseDeDatos = dataBase.find((producto) => producto.id == id);
    if (productoEnBaseDeDatos) {
      productoEnBaseDeDatos.cantidad++;
    }
  });

  // Vaciar el carrito
  shoppingCart = [];

  // Renderizar el carrito vacío
  renderCart();
}

// Eventos
DOMemptyButton.addEventListener('click', EmptyCart);
DOMacceptButton.addEventListener('click', AcceptPurchase);

// Inicio
renderProducts();
renderCart();