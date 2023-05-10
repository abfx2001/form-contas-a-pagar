
const selectPag = document.getElementById('formaDePagamento')
const chavePix = document.getElementById('chavePix')
const linhaPix = document.getElementById('linhaPix')


selectPag.addEventListener('change', function () {
    if (selectPag.value === 'transBanc') {
        chavePix.innerHTML = ''
        linhaPix.innerHTML = ''
    } if (selectPag.value === 'pixCpf') {
        chavePix.innerHTML = ''
        chavePix.innerHTML = `
        <td>
            CHAVE PIX (CPF)
        </td>
        <td id="tipoChavePix">
            <input
            type="text"
            id="inputCpf"
            placeholder="Digite o CPF da Chave Pix"
            maxlength="14"
            >
        </td>
        `
        linhaPix.innerHTML = `
        <tr id="linhaPix">
          <td colspan="2" class="primaryColor"></td>
        </tr>
        `
        const inputCpf = document.querySelector('#inputCpf');
        inputCpf.addEventListener('input', function () {
            mascaraMutuario(this, cpf);
        });
        inputCpf.addEventListener('blur', function () {
            clearTimeout();
        });
        function mascaraMutuario(o, f) {
            v_obj = o
            v_fun = f
            setTimeout(function () {
                v_obj.value = v_fun(v_obj.value)
            }, 1)
        }
        function cpf(v) {
            v = v.replace(/\D/g, "")
            if (v.length <= 11) { //CPF
                v = v.replace(/(\d{3})(\d)/, "$1.$2")
                v = v.replace(/(\d{3})(\d)/, "$1.$2")
                v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            }
            return v
        }
    }
})

console.log(document.querySelector('#inputCpfCnpj'))







document.addEventListener('click', e => {
    const el = e.target;
    const nomeClass = el.className.toLowerCase()
    if (nomeClass === 'limpar btn-form') {
        e.preventDefault()
        window.location.reload()
    } if (nomeClass === 'imprimir btn-form') {
        e.preventDefault()
        geraForm()
        imprimirTela()
        //validaCampos()
    }
});

function validaCampos() {

}

function geraForm() {
    const codCond = document.getElementById('codCond')
    const cond = document.getElementById('cond')
    const condCNPJ = document.getElementById('condCNPJ')
    const valorCod = codCond.value.trim()

    if (codCond.value === '') {
        cond.innerHTML = '-'
        condCNPJ.innerHTML = '-'
        // document.getElementById('msgErro').style.display = 'block'
        // setInterval(() => {
        //     document.getElementById('msgErro').style.display = 'none'
        // }, 7000)
    } else {
        try {
            fetch(`https://sheetdb.io/api/v1/hzhenxx3blavx/search?cod=${valorCod}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data[0] == undefined) {
                        cond.innerHTML = 'Condomínio não encontrado'
                        condCNPJ.innerHTML = 'CNPJ não encontrado'
                    } else {
                        cond.innerHTML = ''
                        cond.innerHTML = `
                        <td id="cond">${data[0].condominio}</td>
                    `
                        condCNPJ.innerHTML = ''
                        condCNPJ.innerHTML = `
                        <td id="condCNPJ">${data[0].cnpj}</td>
                    `
                    }
                });
        } catch (e) {
            console.error(e)
        }
    }
}

function imprimirTela() {
    const controle = true // controle do forms
    if (controle) {
        document.getElementById('btn1').style.display = 'none'
        document.getElementById('btn2').style.display = 'none'
        window.print()
        window.location.reload()
    }
    return
}