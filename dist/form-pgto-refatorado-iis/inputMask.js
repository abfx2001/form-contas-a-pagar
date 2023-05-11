const input = document.querySelector('#inputCpfCnpj');

input.addEventListener('input', function () {
    mascaraMutuario(this, cpfCnpj);
});

input.addEventListener('blur', function () {
    clearTimeout();
});

function mascaraMutuario(o, f) {
    v_obj = o
    v_fun = f
    setTimeout(function () {
        v_obj.value = v_fun(v_obj.value)
    }, 1)
}

function cpfCnpj(v) {
    v = v.replace(/\D/g, "")
    if (v.length <= 11) { //CPF
        v = v.replace(/(\d{3})(\d)/, "$1.$2")
        v = v.replace(/(\d{3})(\d)/, "$1.$2")
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    } else {
        v = v.replace(/^(\d{2})(\d)/, "$1.$2")
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
        v = v.replace(/(\d{4})(\d)/, "$1-$2")
    }
    return v
}

String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

function mascaraMoeda(campo, evento) {
    var tecla = (!evento) ? window.event.keyCode : evento.which;
    var valor = campo.value.replace(/[^\d]+/gi, '').reverse();
    var resultado = "";
    var mascara = "##.###.###,##".reverse();
    for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
        if (mascara.charAt(x) != '#') {
            resultado += mascara.charAt(x);
            x++;
        } else {
            resultado += valor.charAt(y);
            y++;
            x++;
        }
    }
    campo.value = resultado.reverse();
}