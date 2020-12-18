
function valphone() {
    var phone = document.getElementById("phone").value;
    var valtel = (/([a-zA-Z])/ig);
    if (phone.match(valtel)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No puedes ingresar letras dentro de un numero telefonico ',
        });
    }
}

function spaces() {
    var ns = document.getElementById("name").value;
    var ls = document.getElementById("lastname").value;
    var us = document.getElementById("username").value;
    var ps = document.getElementById("password").value;
    var cs = document.getElementById("confirm_password").value;

    for (i = 0; i < ns.length; i++) {
        if (ns.charAt(i) == ' ' && ns.charAt(i + 1) == ' ') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puedes ingresar dos espacios seguidos.',
            });
            break;
        }
    }

    for (i = 0; i < ls.length; i++) {
        if (ls.charAt(i) == ' ' && ls.charAt(i + 1) == ' ') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puedes ingresar dos espacios seguidos.',
            });
            break;
        }
    }

    for (i = 0; i < us.length; i++) {
        if (us.charAt(i) == ' ' && us.charAt(i + 1) == ' ') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puedes ingresar dos espacios seguidos.',
            });
            break;
        }
    }

    for (i = 0; i < ps.length; i++) {
        if (ps.charAt(i) == ' ' && ps.charAt(i + 1) == ' ') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puedes ingresar dos espacios seguidos.',
            });
            break;
        }
    }
    for (i = 0; i < ps.length; i++) {
        if (ps.charAt(i) == ' ' && ps.charAt(i + 1) == ' ') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puedes ingresar dos espacios seguidos.',
            });
            break;
        }
    }
}

function valp1() {
    var vcla1 = document.getElementById("password").value;
    var disval = document.getElementById('vp1');
    var count8 = 8 - vcla1.length;
    var count16 = 16 - vcla1.length;
    if (vcla1.length == 8 || vcla1.length == 16) {
        disval.innerHTML = `<p><h6 class="text-success"> Contraseña Válida </h6></p>`;
    } else {
        if (vcla1.length < 8) {
            disval.innerHTML = `<p><h6 class="text-warning">Contraseña Inválida te faltan ` + count8 +
                ` digitos para una clave de 8 caracteres</h6> </p>`;
        }
    }
}
function valp2() {
    var vcla1 = document.getElementById("password").value;
    var vcla2 = document.getElementById("confirm_password").value;
    var disval = document.getElementById('vp2');
    if (vcla2 == vcla1) {
        disval.innerHTML = `<p><h6 class="text-success">Las contraseñas coinciden</h6></p>`;
    } else {
        disval.innerHTML = `<p><h6 class="text-warning">Las contraseñas NO coinciden</h6></p>`;
    }
}


