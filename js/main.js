
function leer(evento){
    let archivo = evento.target.files[0];
    if(archivo){
        let reader = new FileReader();
        reader.onload = function(e) {
            let contenido = e.target.result;
            document.getElementById('trama').innerText = contenido;
        };

        reader.readAsText(archivo);
    }
}

window.addEventListener('load', () => {
    document.getElementById('archivo').addEventListener('change', leer);
});


const borrar = () => {
    document.getElementById('trama').value = '';
}

const calcular = () =>{
    let trama = document.getElementById('trama').value;

    if(trama == '') {
        alert('Ingrese la trama en el campo.')
    } else {
        //Capturar y limpiar Cadena
     
    let cadena = trama.replace(/\s+/g, '');
    console.log(cadena);

    let arreglo = [];
    for(let i = 0; i < cadena.length; i++) {
        arreglo[i] = cadena.charAt(i);
    }

    //Calculo MAC Origen - MAC Destino
    let macOrigen = '', macDestino = '';

    for(let i = 0; i < cadena.length; i++) {
        if(i < 12){
            macDestino += arreglo[i];

            if(i%2 != 0 && i != 11){
                macDestino += ':';
            }
        } else if(i > 11 && i < 24){
            macOrigen += arreglo[i];

            if(i%2 != 0 && i != 23){
                macOrigen += ':';
            }
        }
    }
    console.log(macOrigen);
    console.log(macDestino);

    //Calculo Version IP

    let tipoRed = '', version = '';

    for(let i = 24; i < 28; i++) {
        tipoRed += arreglo[i]; 
    }

    if(tipoRed == '0800'){
        version = 'IPv4 (0x0800)';
    } else if (tipoRed == '0806'){
        version = 'ARP (0x0806)';
    } else if (tipoRed == '08dd'){
        version = 'IPv6 (0x08dd)';
    } else if (tipoRed == '8100'){
        version = 'VLAN (0x8100)';
    } else if (tipoRed == '0835'){
        version = 'RARP (0x0835)';
    } else {
        version = 'No se encuentra.';
    }

    console.log(version);


    //IP Origen - IP Destino
    let ipOrigen = '', ipDestino = '', par = '';

    par = arreglo[52] + arreglo[53];
    ipOrigen += parseInt(par,16);
    ipOrigen += '.';
    par='';

    par = arreglo[54] + arreglo[55];
    ipOrigen += parseInt(par,16);
    ipOrigen += '.';
    par='';

    par = arreglo[56] + arreglo[57];
    ipOrigen += parseInt(par,16);
    ipOrigen += '.';
    par='';

    par = arreglo[58] + arreglo[59];
    ipOrigen += parseInt(par,16);
    par='';

    console.log(ipOrigen);


    par = arreglo[60] + arreglo[61];
    ipDestino += parseInt(par,16);
    ipDestino += '.';
    par='';

    par = arreglo[62] + arreglo[63];
    ipDestino += parseInt(par,16);
    ipDestino += '.';
    par='';

    par = arreglo[64] + arreglo[65];
    ipDestino += parseInt(par,16);
    ipDestino += '.';
    par='';

    par = arreglo[66] + arreglo[67];
    ipDestino += parseInt(par,16);
    par='';

    console.log(ipDestino);


    //Puerto Origen - Destino
    let puertoOrigen = '', puertoDestino = '';

    par = arreglo[68] + arreglo[69]+ arreglo[70] + arreglo[71];
    puertoOrigen = parseInt(par,16);
    par='';
    console.log(puertoOrigen);

    par = arreglo[72] + arreglo[73]+ arreglo[74] + arreglo[75];
    puertoDestino = parseInt(par,16);
    par='';
    console.log(puertoDestino);


    //TTL - Tiempo de Duración
    let ttl = '';

    par = arreglo[44] + arreglo[45]
    ttl = parseInt(par,16);
    par = '';
    console.log(ttl);

    //Protocolo
    let protH = '', protocolo = '';
    protH = arreglo[46] + arreglo[47]

    if(protH == '04'){
        protocolo = 'IP Encapsulación';
    } else if (protH == '06'){
        protocolo = 'TCP';
    } else if (protH == '11'){
        protocolo = 'UDP';
    } else if (protH == '01'){
        protocolo = 'ICMP';
    } else if (protH == '29'){
        protocolo = 'IPv6';
    } else {
        protocolo = 'No se encuentra.';
    }
    console.log(protocolo);



    //Mostrar Datos

    document.getElementById('macOrigen').value = macOrigen;
    document.getElementById('macDestino').value = macDestino;
    document.getElementById('ttl').value = ttl;
    document.getElementById('etherType').value = version;
    document.getElementById('ipOrigen').value = ipOrigen;
    document.getElementById('ipDestino').value = ipDestino;
    document.getElementById('puertoOrigen').value = puertoOrigen;
    document.getElementById('puertoDestino').value = puertoDestino;
    document.getElementById('protocolo').value = protocolo;
    }
    
}
