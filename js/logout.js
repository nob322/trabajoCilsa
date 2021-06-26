function cerrarSesion(){
    sessionStorage.removeItem("datos");
    sessionStorage.removeItem('movimientos');
    sessionStorage.removeItem('tarjetas');
    location.replace('../index.html');
}

const imagen = document.querySelector("#imagen_cerrar_sesion");
imagen.addEventListener("mousemove",cambiarImagen);
imagen.addEventListener("mouseout",regresarImagen);

function cambiarImagen(){
 imagen.src="../iconos/cerrar_session.png"
}
function regresarImagen(){
 imagen.src="../iconos/power_settings_new.png"
}
