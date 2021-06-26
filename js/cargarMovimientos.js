
function cargarMovimientos(){
axios.get('https://my-json-server.typicode.com/nob322/trabajoCilsa/movimientos', {
              })
              .then(function (response) {
                movimientos =  response.data;
                movimientos.forEach(t => { 
                    t.fecha = convertirStringADate(t.fecha)  
                });
                lista = movimientos.slice();
                sessionStorage.setItem('movimientos', JSON.stringify(lista));
              })
              .catch(function (error) {
                console.log(error);
              })
}

function convertirStringADate(fechaObj){
    var nueva=fechaObj.split('/');
    dd = nueva[0];
    mm = nueva[1]-1;
    yyyy = nueva[2];
    let fecha = new Date(yyyy,mm,dd);
    return fecha;
  }
  
  