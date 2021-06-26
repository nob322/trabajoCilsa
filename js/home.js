const datos= JSON.parse(sessionStorage.getItem('datos'))

if  (datos == null ) {
  location.replace('../paginas/401.html')
}

if((datos.usuario==null) && (datos.password==null)){
  location.replace('../paginas/401.html');
}


const cerrar_sesion = document.querySelector("#cerrarSession")
cerrar_sesion.addEventListener('click',cerrarSesionHome);

const nombre= document.querySelector("#nombre")
const apellido= document.querySelector("#apellido")
const email= document.querySelector("#email")
const telefono = document.querySelector("#telefono")
const fecha_nac= document.querySelector("#fecha__nac")
const domicilio_calle= document.querySelector("#domicilio_calle")
const domicilio_numero= document.querySelector("#domicilio_numero")
const estado= document.querySelector("#estado");

nombre.textContent = "NOMBRE: " + datos.nombre;
apellido.textContent = "APELLIDO: " + datos.apellido
email.textContent= "EMAIL: " + datos.email
telefono.textContent = "TELEFONO: " + datos.telefono
fecha_nac.textContent = "FECHA NACIMIENTO: " + datos.fechaNacimiento
domicilio_calle.textContent = "CALLE: " + datos.domicilioCalle
domicilio_numero.textContent = "NUMERO CALLE: "+datos.domicilioNumero
estado.textContent = "ESTADO: "+datos.estado

function cerrarSesionHome() {
  cerrarSesion();
}

