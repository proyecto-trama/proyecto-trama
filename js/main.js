
function leer(evento){
    let archivo = evento.target.files[0];
    if(archivo){
        let reader = new FileReader();
        reader.onload = function(e) {
            let contenido = e.target.result;
            document.getElementById('trama').innerText = contenido;
        };

        reader.readAsText(archivo);

        document.getElementById('archivo').value = '';
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
    let par = '', count = 0;
    for(let i = 0; i < cadena.length; i++) {
        par += cadena.charAt(i);
        //console.log(par);
        if(i%2 != 0) {
            arreglo[count] = par;
            count++;
            par='';
        }
        
    }
    console.log(arreglo);

    let header = arreglo[14];
    let headerP = arreglo[14].charAt(0);
    let headerL = arreglo[14].charAt(1);

    console.log(headerP);
    console.log(headerL);


    //Calculo MAC Origen - MAC Destino
    let macOrigen = '', macDestino = '';

    for(let i = 0; i < 12; i++) {
        if(i < 6){
            macDestino += arreglo[i];
            if(i!=5){
                macDestino += ':';
            }
            
        } else if(i > 5 && i < 12){
            macOrigen += arreglo[i];
            if(i!=11){
                macOrigen += ':';
            }
        }
    }
    console.log(macOrigen);
    console.log(macDestino);

    //Calculo Version IP

    let tipoRed = '', version = '';

    tipoRed = arreglo[12] + arreglo[13]; 
    console.log(tipoRed);


    if(tipoRed == '0800'){
        version = 'IPv4 (0x0800)';
    } else if (tipoRed == '0806'){
        version = 'ARP (0x0806)';
    } else if (tipoRed == '86dd'){
        version = 'IPv6 (0x86dd)';
    } else if (tipoRed == '8100'){
        version = 'VLAN (0x8100)';
    } else if (tipoRed == '0835'){
        version = 'RARP (0x0835)';
    } else {
        version = 'No se encuentra.';
    }

    console.log(version);

    //IP Origen - IP Destino

    let ipOrigen = '', ipDestino = '';

    if(headerP == '4'){
        //IPv4

        ipOrigen += parseInt(arreglo[26],16);
        ipOrigen += '.';

        ipOrigen += parseInt(arreglo[27],16);
        ipOrigen += '.';

        ipOrigen += parseInt(arreglo[28],16);
        ipOrigen += '.';

        ipOrigen += parseInt(arreglo[29],16);

        console.log(ipOrigen);

        ipDestino += parseInt(arreglo[30],16);
        ipDestino += '.';

        ipDestino += parseInt(arreglo[31],16);
        ipDestino += '.';

        ipDestino += parseInt(arreglo[32],16);
        ipDestino += '.';

        ipDestino += parseInt(arreglo[33],16);

        console.log(ipDestino);

    } else if(headerP == '6'){
        //IPv6

        for(let i = 22; i < 38; i++) {
            ipOrigen += arreglo[i];

            if(i%2 != 0 && i != 37){
                ipOrigen += ':';
            }
        }

        console.log(ipOrigen);

        for(let i = 38; i < 54; i++) {
            ipDestino += arreglo[i];

            if(i%2 != 0 && i != 53){
                ipDestino += ':';
            }
        }

        console.log(ipDestino);
    }


    //Puerto Origen - Destino
    par='';
    let puertoOrigen = 0, puertoDestino = 0;

    if(headerP == '4' ) {
        par = arreglo[34] + arreglo[35];
        puertoOrigen = parseInt(par,16);
        par='';
        console.log(puertoOrigen);

        par = arreglo[36] + arreglo[37];
        puertoDestino = parseInt(par,16);
        par='';
        console.log(puertoDestino);
    }

    


    //TTL - Tiempo de Duración
    let ttl = '';
    if(headerP == '4' ) {
        ttl = parseInt(arreglo[22],16);
        par = '';
        console.log(ttl);
    } else if(headerP == '6' ){
        ttl = 'No especificado.'
    }
    
    

    //Protocolo
    let protH = '', protocolo = '';

    if(headerP == '4' ) {
        protH = arreglo[23];
    } else if(headerP == '6' ){
        protH = arreglo[20];
    }
    

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
    } else if (protH == '3a'){
        protocolo = 'ICMPv6';
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
