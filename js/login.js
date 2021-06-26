'use strict';
const formularioLogin = document.querySelector('#formulario__login');
const btnSubmitUsuario = document.querySelector('#btnUsuario');
const inputUsuario = document.querySelector('#inputUsuario');


eventListeners();
function eventListeners() {

    btnSubmitUsuario.addEventListener('click', consultarUsuario);
}
class UILogin{


    agregarFormContraseña(){


        const divBienvenida =  document.createElement('div');
        divBienvenida.classList = 'div__bienvenida'

        //______________________________________________________________________________________
        const img_usuario_correcto =  document.createElement('img');
        img_usuario_correcto.src ="iconos/check_circle.png"
        img_usuario_correcto.id = 'img_usuario_correcto';

        const usuario = document.createElement('div');
        usuario.className = 'nombre__usuario-form'
        usuario.textContent = `${inputUsuario.value}`

        divBienvenida.appendChild(usuario);
        divBienvenida.appendChild(img_usuario_correcto);

        const divContenedor = document.createElement('div');
        divContenedor.id = "form__input-contraseña";

        // ____________________________________________________________________________________
        const divEtiquetas =  document.createElement('div');
        divEtiquetas.className = "div__etiquetas-password"

        const etiqueta = document.createElement('label')
        etiqueta.className = 'label__password'
        etiqueta.textContent = 'Contraseña: ';


        const contenedor_mensaje_error = document.createElement('div');
        contenedor_mensaje_error.className = "conteneder_mensaje_error" 

        const etiquetaError = document.createElement('label')
        etiquetaError.className = 'label__password-error'
        etiquetaError.hidden = true;
        etiquetaError.textContent = 'Contraseña Incorrecta';

        const img_error_password =  document.createElement('img');
        img_error_password.src= "iconos/disabled_by_default.png"
        img_error_password.hidden= true;
        img_error_password.id = 'img_error_password';

        contenedor_mensaje_error.appendChild(etiquetaError)
        contenedor_mensaje_error.appendChild(img_error_password)

        divEtiquetas.appendChild(etiqueta);
        divEtiquetas.appendChild(contenedor_mensaje_error);

        // ____________________________________________________________________
        const divIcono =  document.createElement('div');
        divIcono.className = 'input__icono-contraseña';

        const inputPassword = document.createElement('input');
        inputPassword.type='password';
        inputPassword.name='input';
        inputPassword.className='inputPassword';
        inputPassword.placeholder='Ingrese su contraseña';
        
        divIcono.appendChild(inputPassword);

        divContenedor.appendChild(divEtiquetas);
        divContenedor.appendChild(divIcono);
      
        const divBotonEnviar = document.createElement('div');
        divBotonEnviar.id = 'form__boton-password';

        const botonEnviar =  document.createElement('button');
        botonEnviar.type='submit';

        botonEnviar.textContent= "Enviar";
        botonEnviar.addEventListener('click', validarPassword)
        divBotonEnviar.appendChild(botonEnviar);

        formularioLogin.appendChild(divBienvenida);
        formularioLogin.appendChild(divContenedor);
        formularioLogin.appendChild(divBotonEnviar);
       
    }

    quitarFormularioUsuario(){
        while (formularioLogin.firstChild) {
            formularioLogin.removeChild(formularioLogin.firstChild);
        }
    }
}     
function consultarUsuario(e){
    e.preventDefault();

    let usuario;
    axios.get('https://my-json-server.typicode.com/nob322/trabajoCilsa/usuarios', {
        params: {
            usuario: inputUsuario.value
          }
      })
      .then(function (response) {
        usuario =  response.data;
        if(usuario.length){
            ui.quitarFormularioUsuario();
            ui.agregarFormContraseña();  
        }
        else{
            const etiquetaError = document.querySelector('#error_usuario');
            etiquetaError.hidden =  false;
            setTimeout(() => {
                etiquetaError.hidden =  true;
            }, 5000);
        }
        
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        
      })
}
function guardarUsuarioSession(usuarioObj){
        sessionStorage.setItem('datos',JSON.stringify(usuarioObj))
}
function validarPassword(e){

    e.preventDefault();

    const campoPassword = document.querySelector('.inputPassword');
    let usuario;
    axios.get('https://my-json-server.typicode.com/nob322/trabajoCilsa/usuarios', {
    
        params: {
            usuario: inputUsuario.value,
            password: campoPassword.value 
          }
      })
      .then(function (response) {
        usuario =  response.data;
        if(usuario.length){
        guardarUsuarioSession(usuario[0]);
        location.replace('paginas/home.html');
        }
        else{

            const etiquetaError= document.querySelector('.label__password-error');
            const imagenError= document.querySelector('#img_error_password');
            etiquetaError.hidden =  false;
            imagenError.hidden =  false;
            
            setTimeout(() => {
                etiquetaError.hidden =  true;
                imagenError.hidden =  true;
            }, 5000);
            

        }
        
      })
      .catch(function (error) {
        console.log(error);
      })
    //   .then(function () {
        
    //   })
}
const ui = new UILogin();