const zeroFill = n => {
    return ('0' + n).slice(-2);
}
const interval = setInterval(() => {
    const now = new Date();
    const dataHora = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());
    document.getElementById('data-hora').innerHTML = dataHora;
}, 1000);

const selectPag = document.getElementById('formaDePagamento')
const chavePix = document.getElementById('chavePix')
const linhaPix = document.getElementById('linhaPix')

selectPag.addEventListener('change', function () {
    if (selectPag.value === 'transBanc') {
        chavePix.innerHTML = ''
        linhaPix.innerHTML = ''
    } else {
        chavePix.innerHTML = `
        <td>CHAVE PIX</td>
          <td>
            <input
              type="text"
              name=""
              id=""
              placeholder="Digite a chave pix"
            >
        `
        linhaPix.innerHTML = `
        <tr id="linhaPix">
          <td colspan="2" class="primaryColor"></td>
        </tr>
        `
    }
})

document.addEventListener('click', e => {
    const el = e.target;
    const nomeClass = el.className.toLowerCase()
    if (nomeClass === 'limpar') {
        e.preventDefault()
        window.location.reload();
    } if (nomeClass === 'gerar') {
        e.preventDefault()
        validaCampos()
    } if (nomeClass === 't1') {
        e.preventDefault()
    }
});

function validaCampos() {
    const erros = []
    const inputs = document.querySelectorAll('#valorInput')
    if (inputs[0].value === '') {
        erros.push('selecione uma data')
    }
    if (inputs[1].value === '') {
        erros.push('insira um valor')
    }
    if (inputs[2].value === '') {
        erros.push('Digite um nome')
    }
    if (inputs[3].value === '') {
        erros.push('Digite um CNPJ ou CPF')
    }
    if (inputs[4].value === '') {
        erros.push('Digite o número do banco')
    }
    if (inputs[5].value === '') {
        erros.push('Digite a agência')
    }
    if (inputs[6].value === '') {
        erros.push('Digite o número da conta')
    }
    if (inputs[7].value === '') {
        erros.push('Digite a assinatura do Gerente')
    }
    alert(erros)
}

function geraForm() {
    const codCond = document.getElementById('codCond')
    const cond = document.getElementById('cond')
    const condCNPJ = document.getElementById('condCNPJ')

    const valorCod = codCond.value.trim()
    fetch(`https://sheetdb.io/api/v1/hzhenxx3blavx/search?cod=${valorCod}`)
        .then((response) => response.json())
        .then((data) => {
            if (data[0] == undefined) {
                cond.innerHTML = ''
                condCNPJ.innerHTML = ''
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
}