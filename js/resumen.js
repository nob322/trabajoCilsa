datos= JSON.parse(sessionStorage.getItem('datos'))

if  (datos == null ) {
  location.replace('../paginas/401.html')
}

if((datos.usuario==null) && (datos.password==null)){
  location.replace('../paginas/401.html');
}
/*Agregar a clase*/ 
let movimientosLista = [];
let listaActual = []
const filas = 20;
let control_paginas= 1;
let ordenamiento = "";
let filaAnterior = "";

class UIResumen{

  llenarTabla(lista){


    const cabecera = document.createElement('tr');

    const id = document.createElement('th')
    id.id="indice"
    id.textContent="ID"
    const th1 = document.createElement('th')
    th1.textContent="Fecha";
    th1.id="fecha__th"
    const imagenFecha =  document.createElement('img')
    imagenFecha.id ="ordenar"
    imagenFecha.src= "../iconos/ordenar.png"
    imagenFecha.addEventListener('click', ordenarPorFecha)

    th1.appendChild(imagenFecha);
    const th2 = document.createElement('th')
    th2.id="descripcion__th"
    th2.textContent="Descripcion";
    const th3 = document.createElement('th');
    th3.id="detalle"
    th3.textContent="Detalle";
  
    cabecera.appendChild(id);
    cabecera.appendChild(th1);
    cabecera.appendChild(th2);
    cabecera.appendChild(th3);

    const tabla =  document.querySelector("#tabla__resumen")

    tabla.appendChild(cabecera);

      let rows = control_paginas * filas;
      let i=0;
      while(i<lista.length && i<rows ){
        const row = document.createElement("tr");
        row.classList="fila__tabla"
        row.id = i

        const imagen = document.createElement('img');
        imagen.src = "../iconos/add_circle.png";
        imagen.classList = "imagen__mostrar-mas"
        imagen.id = lista[i].id;
        imagen.addEventListener("click",ver_detalle)

        const td_detalle = document.createElement('td');
        td_detalle.id = 'td_detalle';
        td_detalle.appendChild(imagen);

        let fecha =  fechaobjetoAString(lista[i].fecha);

        row.innerHTML = `
                <td>${i+1}</td>
                <td class="fecha_tabla">${fecha}</td>
                <td class="descripcion_tabla">${lista[i].descripcion}</td>
            `;
        row.appendChild(td_detalle);
        tabla.appendChild(row)
        i++;
      
      }
    }
  sincronizarLista(lista){
    sessionStorage.setItem('movimientos', JSON.stringify(lista));
  } 

  limpiarTabla(){

    const tabla =  document.querySelector("#tabla__resumen");
    while (tabla.firstChild) {
      tabla.removeChild(tabla.firstChild);
  }}

  cargarInfoDatos(registro){

    const mas__informacion = document.querySelector("#mas__informacion");
    mas__informacion.hidden= false;

    const contenedor_div = document.createElement('div');
    contenedor_div.classList = "div__informacion"

    for (const t in registro) {

      const contenedor =  document.createElement("div");
      contenedor.classList="info_items"
      const span = document.createElement('span');
      span.classList = "span_item " + t
      span.textContent = t.toUpperCase() +": "
      const p = document.createElement('p');
      p.textContent = `${registro[t]}`
      contenedor.appendChild(span);
      contenedor.appendChild(p);
      contenedor_div.appendChild(contenedor);
    }

   
    mas__informacion.appendChild(contenedor_div)
    const idOperacion =  document.querySelector(".id");
    idOperacion.textContent = "ID OPERACION: " 
  
  }

  limpiarInformacion(){
    const info =  document.querySelector("#mas__informacion");
    while (info.firstChild) {
      info.removeChild(info.firstChild);
  }}
}
UI = new UIResumen();

inicio();
function inicio() { 


    eventListeners();

    const mas__informacion = document.querySelector("#mas__informacion")
    mas__informacion.hidden = true

    let movimientos;
    axios.get('https://my-json-server.typicode.com/nob322/trabajoCilsa/movimientos', {
              })
              .then(function (response) {
                movimientos =  response.data;
                movimientos.forEach(t => { 
                    t.fecha = convertirStringADate(t.fecha);
                });
                movimientosLista = movimientos.slice();
                listaActual = movimientos.slice();
                UI.llenarTabla(movimientosLista);
                UI.sincronizarLista(movimientosLista);
              })
              .catch(function (error) {
                console.log(error);
              })
  
}


function eventListeners(){
  const etiquetaCancelarFiltro = document.querySelector(".cancelar_filtro")
  etiquetaCancelarFiltro.addEventListener('click',cancelarFiltro);
  
  const mostrarMas = document.querySelector("#mostrar_mas")
  mostrarMas.addEventListener('click',mostrarMasFilas);
  
  const cerrar_sesion = document.querySelector("#cerrarSession")
  cerrar_sesion.addEventListener('click',cerrarSesionResumen);

  const input_campo_filtrar = document.querySelector("#input_campo_filtrar")
  input_campo_filtrar.addEventListener('input',filtrarPalabra);
  

}


function convertirStringADate(fechaObj){
  var nueva=fechaObj.split('/');
  dd = nueva[0];
  mm = nueva[1]-1;
  yyyy = nueva[2];
  let fecha = new Date(yyyy,mm,dd);
  return fecha;
}
function ordenarDeMayoraMenor(){
  let lista = movimientosLista.slice();
  listaOrdenada = lista.sort(function (a, b) {
      if (a.fecha > b.fecha) {
        return 1;
      }
      if (a.fecha < b.fecha) {
        return -1;
      }
      return 0;
    });
  return listaOrdenada;
}

function ordenarPorFecha(){
  mostrarCancelarFiltro();
  let listaOrdenada = ordenarDeMayoraMenor();
  UI.limpiarTabla();


  if (ordenamiento == "Asc") {
    ordenamiento = "Desc";
    UI.llenarTabla(listaOrdenada);
    listaActual = listaOrdenada.slice();
    const ordenar = document.querySelector("#ordenar");
    ordenar.src = "../iconos/menorAmayor.png"

  } else {
    lista = listaOrdenada.reverse();
    listaActual= lista.slice();
    ordenamiento = "Asc";
    UI.llenarTabla(lista);
    const ordenar = document.querySelector("#ordenar");
    ordenar.src = "../iconos/mayorAmenor.png"
  }

}

function cancelarFiltro() {
  const form_filtro= document.querySelector("#formulario_filtrar");
  form_filtro.reset();

  control_paginas=1;
  mostrarCancelarFiltro(true);
  UI.limpiarTabla();
  UI.llenarTabla(movimientosLista);
  const ordenar = document.querySelector("#ordenar");
  ordenar.src = "../iconos/ordenar.png"
  UI.limpiarInformacion(filtros)
}

function mostrarMasFilas() {
  
  control_paginas++;
  UI.limpiarTabla();
  UI.llenarTabla(listaActual)
  mostrarCancelarFiltro(false);
 
}

function cerrarSesionResumen() {
      cerrarSesion();
}

function ver_detalle(){
  const registroID =  Number(this.id);
  filaAnterior.classList = "cleanBackgound"
  const miFila = this.parentNode.parentNode;
  filaAnterior = miFila
  miFila.classList = "cambiarColorFila";

  const datosRegistro = movimientosLista.filter(t => t.id == registroID)
  UI.limpiarInformacion()
  UI.cargarInfoDatos(datosRegistro[0])
  
} 


function filtrarPalabra(){ 

  let movimientos = JSON.parse(sessionStorage.getItem("movimientos"))
  let misMovimientos = movimientos.slice();
  let listaNueva= [];


  misMovimientos.forEach(m => {
    if(((m.titulo).toLowerCase().includes((this.value).toLowerCase())) || ((m.descripcion).toLowerCase().includes((this.value).toLowerCase()))){
          listaNueva.push(m)
    }
  });
  listaActual = [];
  listaActual = listaNueva.slice();

  UI.limpiarInformacion()
  UI.limpiarTabla();
  UI.llenarTabla(listaNueva);
  listaNueva =[];
}


function mostrarCancelarFiltro(opcion){
  const img = document.querySelector(".cancelar_filtro img")
  const p = document.querySelector(".cancelar_filtro p")
  img.hidden= opcion
  p.hidden= opcion
}

function fechaobjetoAString(strFecha) {

  let objFecha =  new Date(strFecha)
  dd= objFecha.getDate();
  mm= objFecha.getMonth();
  yy= objFecha.getFullYear()

return `${dd}-${mm}-${yy}`
  
}