const notificacion = document.querySelector("#notificacion")
const formulario = document.querySelector('#form');
const nombreCliente = document.querySelector('#nombre');
const emailUsuario = document.querySelector('#email');
const boletosAdultos = document.querySelector("#cantidad-adultos");
const boletosNiños = document.querySelector("#cantidad-niños");
const paisOrigen = document.querySelector('#ORIGEN');
const paisDestino = document.querySelector('#DESTINO');
const fechaSalida = document.querySelector('#fecha-ida');
const fechaRegreso = document.querySelector('#fecha-vuelta');
const Btn = document.querySelector('#btn');

//CORREGIR EL RESET DEL FORMULARIO 

//guardar la informacion de la compra 

const compraObj= {
    cliente: '',
    correo:'',
    boletos:0,
    paisOrigen: '',
    paisDestino: '',
    fechaSalida:'',
    fechaRegreso:''
}

nombreCliente.addEventListener('input', e=>{
    compraObj.cliente = e.target.value
    //console.log(compraObj);
})

emailUsuario.addEventListener('input', e=>{
    compraObj.correo = e.target.value
    //console.log(compraObj);
})

boletosAdultos.addEventListener('input', () => {
    const suma = Number(boletosAdultos.value) + Number(boletosNiños.value);
    compraObj.boletos = suma;
  });

boletosNiños.addEventListener('input', () => {
    const suma = Number(boletosAdultos.value) + Number(boletosNiños.value);
    compraObj.boletos = suma;
  });


paisOrigen.addEventListener('input', e=>{
    compraObj.paisOrigen = e.target.value
    //console.log(compraObj);
})


paisDestino.addEventListener('input', e=>{
    compraObj.paisDestino = e.target.value
    //console.log(compraObj);
})


fechaSalida.addEventListener('input', e=>{
    compraObj.fechaSalida = e.target.value
    //console.log(compraObj);
})


fechaRegreso.addEventListener('input', e=>{
    compraObj.fechaRegreso = e.target.value
    //console.log(compraObj);
})

  
//deshabilitar fechas anteriores
const hoy = new Date();
fechaSalida.min = hoy.toISOString().split("T")[0];
fechaRegreso.min = hoy.toISOString().split("T")[0];

//deshabilittar seleccionar misma fecha
fechaSalida.addEventListener("change", () => {
    const fecha1 = new Date(fechaSalida.value);
    const fecha2 = new Date(fechaRegreso.value);

    if (fecha1.toDateString() === fecha2.toDateString()) {
     // console.log("Las fechas son iguales");

     const alerta = document.createElement('div')
     alerta.innerHTML = `<p>Ambas fechas no pueden ser iguales</p>`
     alerta.classList.add('alerta')
     notificacion.appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000);

        Btn.disabled = true;
        Btn.classList.add("same-date");
        
    } else {
      Btn.disabled = false;
      Btn.classList.remove("same-date");
    }
  });

  fechaRegreso.addEventListener("change", () => {
    const fecha1 = new Date(fechaSalida.value);
    const fecha2 = new Date(fechaRegreso.value);

    if (fecha1.toDateString() === fecha2.toDateString()) {
     // console.log("Las fechas son iguales");

     const alerta = document.createElement('div')
     alerta.innerHTML = `<p>Ambas fechas no pueden ser iguales</p>`
     alerta.classList.add('alerta')
     notificacion.appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000);


      Btn.disabled = true;
      Btn.classList.add("same-date");
    } else {
      Btn.disabled = false;
      Btn.classList.remove("same-date");
    }
  });

  //deshabilitar mismo pais

  paisOrigen.addEventListener("change", ()=>{
    const pais1 = paisOrigen.value;
    const pais2 = paisDestino.value;

    if (pais1 === pais2){
        const alerta = document.createElement('div')
        alerta.innerHTML = `<p>Ambos paises no pueden ser iguales</p>`
        alerta.classList.add('alerta')
        notificacion.appendChild(alerta);
   
               setTimeout(() => {
                   alerta.remove();
               }, 3000);
   
           Btn.disabled = true;
           Btn.classList.add("same-date");
    }else{
        Btn.disabled = false;
        Btn.classList.remove("same-date");
    }

  })

  paisDestino.addEventListener("change", ()=>{
    const pais1 = paisOrigen.value;
    const pais2 = paisDestino.value;

    if (pais1 === pais2){
        const alerta = document.createElement('div')
        alerta.innerHTML = `<p>Ambos paises no pueden ser iguales</p>`
        alerta.classList.add('alerta')
        notificacion.appendChild(alerta);
   
               setTimeout(() => {
                   alerta.remove();
               }, 3000);
   
           Btn.disabled = true;
           Btn.classList.add("same-date");
    }else{
        Btn.disabled = false;
        Btn.classList.remove("same-date");
    }

  })


document.addEventListener('DOMContentLoaded', cargarSELECT );


formulario.addEventListener('submit', finalizarCompra)


//extraer paises de la api
function cargarSELECT() {
    const url = 'https://restcountries.com/v3.1/all';
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            const paisesEnEspañol = data
                .filter(pais => pais.region === 'Americas')
                .map(pais => pais.translations.spa.common);
            obtenerPais(paisesEnEspañol);
        })
        .catch(error => console.error('Error:', error));
}

//filtrar nombres y transferirlo al html

function obtenerPais(listado) {
    const paisesDestino = [];
    const paisesOrigen = [];

    listado.forEach(pais => {
        if (!paisesDestino.includes(pais)) {
            paisesDestino.push(pais);
        }

        if (!paisesOrigen.includes(pais)) {
            paisesOrigen.push(pais);
        }
    });

    paisesDestino.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais;
        option.textContent = pais;
        paisDestino.appendChild(option);
    });

    paisesOrigen.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais;
        option.textContent = pais;
        paisOrigen.appendChild(option);
    });
}

function finalizarCompra(e){

    e.preventDefault();

    const {cliente, correo, boletos, paisOrigen, paisDestino, fechaSalida, fechaRegreso} = compraObj;

    if(cliente==='' || correo==='' || boletos === 0 ||paisOrigen === '' || paisDestino ==='' || fechaSalida ==='' || fechaRegreso === '' ){
        const alerta = document.createElement('div')
        alerta.innerHTML = `<p>Todos los campos son obligatorios</p>`
        alerta.classList.add('alerta')
        notificacion.appendChild(alerta);
   
               setTimeout(() => {
                   alerta.remove();
               }, 3000);
   
           Btn.disabled = true;
           Btn.classList.add("same-date");
    }else{
        Btn.disabled = false;
        Btn.classList.remove("same-date");
            const agregar = document.createElement('div')
    agregar.innerHTML = `<p>Compra realizada correctamente</p>`
        agregar.classList.add('agregar')
        notificacion.appendChild(agregar);
   
               setTimeout(() => {
                   agregar.remove();
               }, 3000);

               console.log(compraObj);
   
    formulario.reset()
    reiniciarCompra()

    }

    }


function reiniciarCompra(){
    compraObj= {
        cliente: '',
        correo:'',
        boletos:0,
        paisOrigen: '',
        paisDestino: '',
        fechaSalida:'',
        fechaRegreso:''
    }
}
