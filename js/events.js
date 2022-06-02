
function capturarStorage(){
    return JSON.parse(localStorage.getItem("carrito")) || []
}

function guardarStorage(array){
    localStorage.setItem("carrito", JSON.stringify(array))
}

function agregarAlCarrito(id) {
    let carrito = capturarStorage()
    if (estaEnCarrito(id)){
        incrementarCant(id)
    } else {
        let productoEncontrado = dataTelefonos.find(celular=>celular.id==id)
        carrito.push({...productoEncontrado, cantidad: 1})
        guardarStorage(carrito)
        mostrarCarrito()
    }
    mostrarCarrito()
    console.log(carrito)
    mostrarTotalCarrito()
}

function incrementarCant(id) {
    let carrito = capturarStorage()
    const indice = carrito.findIndex(celular => celular.id==id)
    carrito[indice].cantidad++
    guardarStorage(carrito)
    mostrarCarrito()
    mostrarTotalCarrito()
}

function restarCant(id) {
    let carrito = capturarStorage();
    const index = carrito.findIndex((e) => e.id == id); // busco la posicion del objeto
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--; //segun la posicion le resto uno a cantidad
      guardarStorage(carrito);
      mostrarCarrito();
      mostrarTotalCarrito();
    } else {
        Swal.fire({
            title: `¿Desea eliminar ${carrito[index].marca} ${carrito[index].modelo} del carrito de compras?`,
            icon: 'question',
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = Swal.getConfirmButton() && eliminarProductoCarrito(id)
                Swal.fire(
                    'Su producto fue eliminado correctamente',
                )
            }
        }
    )}
}

function estaEnCarrito(id){
    let carrito = capturarStorage()
    return carrito.some(e=>e.id==id)
}

function eliminarProductoCarrito(id) {
    let carrito = capturarStorage()
    //filtramos y hacemos que nos devuelva todo menos el id buscado
    let resultado = carrito.filter(celular => celular.id != id)
    guardarStorage(resultado)
    console.log(resultado)
    mostrarCarrito()
    mostrarTotalCarrito()
}

botonPedidoRealizado.addEventListener('click', () => {
    if (estaVacio()) {
        Swal.fire({
            icon: 'error',
            title: 'El carrito esta vacío',
            text: 'Agrega al menos un producto para realizar un pedido',
        }) 
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Pedido realizado con éxito',
            confirmButtonText: 'Aceptar',
        })
        localStorage.clear();
        mostrarCarrito();
        mostrarTotalCarrito();
    }
})

function estaVacio() {
    if (capturarStorage() == "") {
        return true
    } else {
        return false
    }
}


