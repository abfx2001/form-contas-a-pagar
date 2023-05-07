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