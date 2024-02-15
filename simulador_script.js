var ax = 0;
var bx = 1;
var cx = 2;
var dx = 3;
var sp = 4;
var pc = 5;

var cmp = 2;
var stack = [];
var mostrarcodigo = "";

var mnemonicos = "";
var regis_entrada = "";
var regis_saida = 10000;
var regis_saida2 = "";

var registers = [0, 0, 0, 0, 0, 0];



function Update() {
    mnemonicos = "";
    regis_entrada = "";
    regis_saida = 100000;
    regis_saida2 = "";

    document.getElementById('mostrarax').innerHTML = registers[ax];
    document.getElementById('mostrarbx').innerHTML = registers[bx];
    document.getElementById('mostrarcx').innerHTML = registers[cx];
    document.getElementById('mostrardx').innerHTML = registers[dx];
    document.getElementById('mostrarsp').innerHTML = registers[sp];
    document.getElementById('mostrarpc').innerHTML = registers[pc];

    document.getElementById('textarea_pilha').value = "";
    for (i = 0; i < stack.length; i++) {
        var listar = stack[i] + "\n";
        document.getElementById('textarea_pilha').value += listar;
    }
}

function mov_i(tgt, src) {
    registers[tgt] = src;
}

function mov_r(tgt, src) {
    registers[tgt] = registers[src];
}

function add_i(tgt, src) {
    registers[tgt] += src;
}

function add_r(tgt, src) {
    registers[tgt] += registers[src];
}

function sub_i(tgt, src) {
    registers[tgt] -= src;
}

function sub_r(tgt, src) {
    registers[tgt] -= registers[src];
}

function cmp_i(tgt, src) {
    if (registers[tgt] == src) {
        cmp = 1;
        alert("1 --- VERDADEIRO (IGUAL)");
    }
    else {
        cmp = 0;
        alert("0 --- FALSO (DIFERENTE)");
    }
}

function cmp_r(tgt, src) {
    if (registers[tgt] == registers[src]) {
        cmp = 1;
        alert("1 --- VERDADEIRO (IGUAL)");
    }
    else {
        cmp = 0;
        alert("0 --- FALSO (DIFERENTE)");
    }
}

function push_i(src) {
    stack.push(src)
    registers[sp]++;
}
function push_r(src) {
    stack.push(registers[src])
    registers[sp]++;
}

function pop() {
    stack.pop()
    if (registers[sp] > 0) {
        registers[sp]--;
    }
}

function mnemonico(valor) {
    mnemonicos = valor;

    if (mnemonicos == 4) {
        pop();
        MostrarCodigo()
        Update();
    }
}


function registrador_entrada(valor) {
    regis_entrada = valor;
}


function registrador_saida(valor) {
    if (valor == 9) {
        if(document.getElementById('thomas').value == ""){return;}
        else{
        regis_saida2 = 9;
        regis_saida = document.getElementById('thomas').value;
        regis_saida = parseInt(regis_saida);
    }
    }
    else {
        if(mnemonicos ==""){return;}
        else{
        regis_saida = valor;
    }
    }

    operacional();
    regis_saida = document.getElementById('thomas').value = "";
}

function operacional() {
    if (mnemonicos == -1) {
        if (regis_saida2 == 9) {
            mov_i(regis_entrada, regis_saida);
            MostrarCodigo();
        }
        else {
            mov_r(regis_entrada, regis_saida);
            MostrarCodigo();

        }
    }

    else if (mnemonicos == 1) {
        if (regis_saida2 == 9) {
            add_i(regis_entrada, regis_saida);
            MostrarCodigo();
        }
        else {
            add_r(regis_entrada, regis_saida);
            MostrarCodigo();
        }
    }
    else if (mnemonicos == 2) {
        if (regis_saida2 == 9) {
            sub_i(regis_entrada, regis_saida);
            MostrarCodigo();
        }
        else {
            sub_r(regis_entrada, regis_saida);
            MostrarCodigo();
        }
    }
    else if (mnemonicos == 3) {
        if (regis_saida2 == 9) {
            push_i(regis_saida);
            MostrarCodigo();
        }
        else {
            push_r(regis_saida);
            MostrarCodigo();
        }
    }

    else if (mnemonicos == 5) {
        if (regis_saida2 == 9) {
            cmp_i(regis_entrada, regis_saida);
            MostrarCodigo();
        }
        else {
            cmp_r(regis_entrada, regis_saida);
            MostrarCodigo();
        }
    }
    registers[pc]++;
    Update();
}

function MostrarCodigo() {

    if (mnemonicos == -1) {
        if (regis_saida2 == 9) {
            if (regis_entrada == 0) {
                mostrarcodigo = "MOV " + "AX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_entrada == 1) {
                mostrarcodigo = "MOV " + "BX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_entrada == 2) {
                mostrarcodigo = "MOV " + "CX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_entrada == 3) {
                mostrarcodigo = "MOV " + "DX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
        }
        else {
            if (regis_entrada == 0) {
                if (regis_saida == 0) {
                    mostrarcodigo = "MOV " + "AX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "MOV " + "AX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "MOV " + "AX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "MOV " + "AX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
            else if (regis_entrada == 1) {
                if (regis_saida == 0) {
                    mostrarcodigo = "MOV " + "BX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "MOV " + "BX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "MOV " + "BX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "MOV " + "BX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
            else if (regis_entrada == 2) {
                if (regis_saida == 0) {
                    mostrarcodigo = "MOV " + "CX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "MOV " + "CX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "MOV " + "CX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "MOV " + "CX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
            else if (regis_entrada == 3) {
                if (regis_saida == 0) {
                    mostrarcodigo = "MOV " + "DX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "MOV " + "DX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "MOV " + "DX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "MOV " + "DX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }

        }

        return;
    }
    if (mnemonicos == 1) {
        if (regis_saida2 == 9) {
            if (regis_entrada == 0) {
                mostrarcodigo = "ADD " + "AX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_entrada == 1) {
                mostrarcodigo = "ADD " + "BX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_entrada == 2) {
                mostrarcodigo = "ADD " + "CX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_entrada == 3) {
                mostrarcodigo = "ADD " + "DX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
        }
        else {
            if (regis_entrada == 0) {
                if (regis_saida == 0) {
                    mostrarcodigo = "ADD " + "AX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "ADD " + "AX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "ADD " + "AX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "ADD " + "AX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
            else if (regis_entrada == 1) {
                if (regis_saida == 0) {
                    mostrarcodigo = "ADD " + "BX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "ADD " + "BX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "ADD " + "BX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "ADD " + "BX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
            else if (regis_entrada == 2) {
                if (regis_saida == 0) {
                    mostrarcodigo = "ADD " + "CX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "ADD " + "CX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "ADD " + "CX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "ADD " + "CX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
            else if (regis_entrada == 3) {
                if (regis_saida == 0) {
                    mostrarcodigo = "ADD " + "DX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "ADD " + "DX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "ADD " + "DX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "ADD " + "DX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
        }
    }
    if (mnemonicos == 2) {
        if (regis_saida2 == 9) {
            if (regis_entrada == 0) {
                mostrarcodigo = "SUB " + "AX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_entrada == 1) {
                mostrarcodigo = "SUB " + "BX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_entrada == 2) {
                mostrarcodigo = "SUB " + "CX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_entrada == 3) {
                mostrarcodigo = "SUB " + "DX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
        }
        else {
            if (regis_entrada == 0) {
                if (regis_saida == 0) {
                    mostrarcodigo = "SUB " + "AX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "SUB " + "AX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "SUB " + "AX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "SUB " + "AX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
            else if (regis_entrada == 1) {
                if (regis_saida == 0) {
                    mostrarcodigo = "SUB " + "BX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "SUB " + "BX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "SUB " + "BX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "SUB " + "BX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
            else if (regis_entrada == 2) {
                if (regis_saida == 0) {
                    mostrarcodigo = "SUB " + "CX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "SUB " + "CX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "SUB " + "CX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "SUB " + "CX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
            else if (regis_entrada == 3) {
                if (regis_saida == 0) {
                    mostrarcodigo = "SUB " + "DX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "SUB " + "DX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "SUB " + "DX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "SUB " + "DX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
        }
    }
    if (mnemonicos == 3) {
        if (regis_saida2 == 9) {

            mostrarcodigo = "PUSH " + regis_saida + "\n";
            document.getElementById('codigos').value += mostrarcodigo;
        }
        else {
            if (regis_saida == 0) {
                mostrarcodigo = "PUSH " + "AX" + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_saida == 1) {
                mostrarcodigo = "PUSH " + "BX" + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_saida == 2) {
                mostrarcodigo = "PUSH " + "CX" + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_saida == 3) {
                mostrarcodigo = "PUSH " + "DX" + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }

        }
    }
    if (mnemonicos == 4) {
        mostrarcodigo = "POP " + "\n";
        document.getElementById('codigos').value += mostrarcodigo;
    }
    if (mnemonicos == 5) {
        if (regis_saida2 == 9) {
            if (regis_entrada == 0) {
                mostrarcodigo = "CMP " + "AX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_entrada == 1) {
                mostrarcodigo = "CMP " + "BX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_entrada == 2) {
                mostrarcodigo = "CMP " + "CX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
            else if (regis_entrada == 3) {
                mostrarcodigo = "CMP " + "DX" + ", " + regis_saida + "\n";
                document.getElementById('codigos').value += mostrarcodigo;
            }
        }
        else {
            if (regis_entrada == 0) {
                if (regis_saida == 0) {
                    mostrarcodigo = "CMP " + "AX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "CMP " + "AX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "CMP " + "AX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "CMP " + "AX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
            else if (regis_entrada == 1) {
                if (regis_saida == 0) {
                    mostrarcodigo = "CMP " + "BX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "CMP " + "BX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "CMP " + "BX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "CMP " + "BX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
            else if (regis_entrada == 2) {
                if (regis_saida == 0) {
                    mostrarcodigo = "CMP " + "CX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "CMP " + "CX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "CMP " + "CX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "CMP " + "CX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
            else if (regis_entrada == 3) {
                if (regis_saida == 0) {
                    mostrarcodigo = "CMP " + "DX" + ", " + "AX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 1) {
                    mostrarcodigo = "CMP " + "DX" + ", " + "BX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 2) {
                    mostrarcodigo = "CMP " + "DX" + ", " + "CX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
                else if (regis_saida == 3) {
                    mostrarcodigo = "CMP " + "DX" + ", " + "DX" + "\n";
                    document.getElementById('codigos').value += mostrarcodigo;
                }
            }
        }
    }
}

function limpar() {
    registers = [0, 0, 0, 0, 0, 0];
    Update();
    mostrarcodigo = "";
    document.getElementById('codigos').value = mostrarcodigo;


}

function onlynumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
