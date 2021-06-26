const datos = JSON.parse(sessionStorage.getItem('datos'))

if (datos == null) {
  location.replace('../paginas/401.html')
}

if ((datos.usuario == null) && (datos.password == null)) {
  location.replace('../paginas/401.html');
}
const inputNombre = document.querySelector("#input__nombre");
const inputApellido = document.querySelector("#input__apellido");
const inputDni = document.querySelector("#input__dni");
const inputNroCuenta = document.querySelector("#input__nro-cuenta");
const inputCbu = document.querySelector("#input__cbu");
const inputMonto = document.querySelector("#input__monto");

indice = 0;

inicio();

function inicio() {
  const cerrar_sesion = document.querySelector("#cerrarSession")
  cerrar_sesion.addEventListener('click', cerrarSesionMovimientos);

  const boton_transferencia = document.querySelector("#boton_realiazar_transferencia")
  boton_transferencia.addEventListener('click', agregarTransaccion);

  inputNombre.addEventListener("blur",verificarNombre)
  inputApellido.addEventListener("blur",verificarApellido)
  inputDni.addEventListener("blur",verificarDni)
  inputNroCuenta.addEventListener("blur",verificarNroCuenta)
  inputCbu.addEventListener("blur",verificarCbu)
  inputMonto.addEventListener("blur",verificarMonto)


}
class Transferencia {
  constructor(nombre, apellido, dni, nroCuenta, cbu, monto) {
    this.id;
    this.fechaHora;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.nroCuenta = nroCuenta;
    this.cbu = cbu;
    this.monto = monto;
  }
}

function agregarTransaccion(e) {

  
  e.preventDefault();
  nombre = verificarNombre();
  apellido = verificarApellido();
  dni = verificarDni();
  nroCuenta = verificarNroCuenta();
  monto = verificarMonto();
  cbu = verificarCbu();

  if(nombre && apellido && dni && nroCuenta && monto && cbu){
        
    let miTransferencia  = new Transferencia(inputNombre.value,inputApellido.value,inputDni.value,inputNroCuenta.value,inputCbu.value,inputMonto.value);
    cargarTransferencia(miTransferencia);
  }
}

function cerrarSesionMovimientos() {
  cerrarSesion();
}

function verificarNombre() {
  let nombre = inputNombre.value
  const errorCampoObligatorio = document.querySelector("#campo_obligatorio_nombre")
  if (nombre == "") {
    errorCampoObligatorio.hidden = false;
    setInterval(() => {
      errorCampoObligatorio.hidden = true;
    }, 7000);
    return false;
  }else{
    return true;
  }
}

function verificarApellido() {
  let apellido = inputApellido.value
  const errorCampoObligatorio = document.querySelector("#campo_obligatorio_apellido")
  if (apellido == "") {
    errorCampoObligatorio.hidden = false;
    setInterval(() => {
      errorCampoObligatorio.hidden = true;
    }, 7000);
    return false;
  } else {
    return true;
  }
}

function verificarDni() {
  let dni =  inputDni.value;
  const errorCampoObligatorio = document.querySelector("#campo_obligatorio_dni")
  if (dni == "") {
    errorCampoObligatorio.hidden = false;
    setInterval(() => {
      errorCampoObligatorio.hidden = true;
    }, 7000);
    return false;
  } else {
    return true;
  }
}

function verificarNroCuenta() {
  let cuenta = inputNroCuenta.value
  const errorCampoObligatorio = document.querySelector("#campo_obligatorio_nro-cuenta")
  if (cuenta == "") {
    errorCampoObligatorio.hidden = false;
    setInterval(() => {
      errorCampoObligatorio.hidden = true;
    }, 7000);
    return false;
  } else {
    return true;
  }
}

function verificarCbu() {

  let tamaño = (inputCbu.value).length

  if (this.value == "") {
    const cbuObligatorio = document.querySelector("#campo_obligatorio_cbu");
    cbuObligatorio.hidden = false
    setTimeout(() => {
      cbuObligatorio.hidden = true
    }, 7000);
    return false;
  } else if (tamaño!= 22) {
    const cbuNoValido = document.querySelector("#campo_no_valido_cbu");
    cbuNoValido.hidden = false;
    setTimeout(() => {
      cbuNoValido.hidden = true;
    }, 7000);
    return false;
  } else {
    return true;
  }
}

function verificarMonto() {

  console.log(inputMonto.value);
  let monto = Number(inputMonto.value);
  
  const datos = JSON.parse(sessionStorage.getItem("datos"));
  if (monto == "") {
    const montoObligatorio = document.querySelector("#campo_obligatorio_monto");
    montoObligatorio.hidden = false
    setTimeout(() => {
      montoObligatorio.hidden = true
    }, 7000);
    return false;
  } else if (monto < 0) {
    const montoNoValido = document.querySelector("#campo_no_valido_monto");
    montoNoValido.textContent="No se permiten numeros negativos"
    montoNoValido.hidden = false;
    setTimeout(() => {
      montoNoValido.hidden = true;
    }, 7000);
    return false;
  } else if (monto > 1000000){
    const montoNoValido = document.querySelector("#campo_no_valido_monto");
    montoNoValido.textContent="Transferencias de más de 1M No Permitidas"
    montoNoValido.hidden = false;
    setTimeout(() => {
      montoNoValido.hidden = true;
    }, 7000);
    return false;
  }else if (monto > datos.saldo) {
    const montoInsuficiente = document.querySelector("#monto_insuficiente");
    montoInsuficiente.hidden = false;
    setTimeout(() => {
      montoInsuficiente.hidden = true;
    }, 7000);
    return false;
  } else {
    return true;
  }
}


function cargarTransferencia(objTransferencia){
  
    obtenerIndice();
    objTransferencia.id = indice + 1;
    const hoy = new Date()
    objTransferencia.fechaHora= hoy
    axios({
      method: 'post',
      url: 'https://my-json-server.typicode.com/nob322/trabajoCilsa/transferencias',
      data: objTransferencia
    });
    const datos = JSON.parse(sessionStorage.getItem("datos"));
    datos.saldo -= objTransferencia.monto;
    sessionStorage.setItem("datos",JSON.stringify(datos)); 
    actualizarMonto();
    const exito = document.querySelector("#transaccion_completada");
    exito.hidden = false;
    setInterval(() => {
      exito.hidden = true;
    }, 7000);
    limpiarFormulario()
}

function obtenerIndice(){

  let transferencias = [];
  axios.get('https://my-json-server.typicode.com/nob322/trabajoCilsa/transferencias', {
            })
            .then(function (response) {
              transferencias =  response.data;
              indice =  transferencias.length;
            })
            .catch(function (error) {
              console.log(error);
            })
}

function limpiarFormulario(){
  const formulario = document.querySelector("#formulario__transferencia");
  formulario.reset();
}