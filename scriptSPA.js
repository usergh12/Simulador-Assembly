var home = document.querySelector('#Home');
var simu = document.querySelector('#Simulador');
var sobre = document.querySelector('#Sobre');


function Fsimulador() {
    if (simu.style.display === 'block') {
    } else {
        simu.style.display = 'block';
        home.style.display = 'none';
        sobre.style.display = 'none';
    }

}

function Fhome() {
    if (home.style.display === 'block') {
    } else {
        simu.style.display = 'none';
        home.style.display = 'block';
        sobre.style.display = 'none';
    }

}

function Fsobre() {
    if (sobre.style.display === 'block') {
    } else {
        sobre.style.display = 'block';
        simu.style.display = 'none';
        home.style.display = 'none';
    }

}

