let controle = true;

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
              id="valorInputPix"
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
        window.location.reload()
    } if (nomeClass === 'imprimir') {
        e.preventDefault()
        validaCampos()
    }
});

function validaCampos() {
    const erros = []
    const inputs = document.querySelectorAll('.valorInput')
    const inputPix = document.querySelector('#valorInputPix')
    if (inputs[0].value === '') {
        erros.push('selecione uma data')
        inputs[0].classList.add('erros')
    } else {
        inputs[0].classList.remove('erros')
    }
    if (inputs[1].value === '') {
        erros.push('insira um valor')
        inputs[1].classList.add('erros')
    } else {
        inputs[1].classList.remove('erros')
    }
    if (inputs[2].value === '') {
        erros.push('Digite um nome')
        inputs[2].classList.add('erros')
    } else {
        inputs[2].classList.remove('erros')
    }
    if (inputs[3].value === '') {
        erros.push('Digite um CNPJ ou CPF')
        inputs[3].classList.add('erros')
    } else {
        inputs[3].classList.remove('erros')
    }
    if (inputs[4].value === '') {
        erros.push('Digite o número do banco')
        inputs[4].classList.add('erros')
    } else {
        inputs[4].classList.remove('erros')
    }
    if (inputs[5].value === '') {
        erros.push('Digite a agência')
        inputs[5].classList.add('erros')
    } else {
        inputs[5].classList.remove('erros')
    }
    if (inputs[6].value === '') {
        erros.push('Digite o número da conta')
        inputs[6].classList.add('erros')
    } else {
        inputs[6].classList.remove('erros')
    }
    if (inputs[7].value === '') {
        erros.push('Digite a assinatura do Gerente')
        inputs[7].classList.add('erros')
    } else {
        inputs[7].classList.remove('erros')
    }
    if (inputPix) {
        if (inputPix.value === '') {
            erros.push('Digite a chave PIX')
            inputPix.classList.add('erros')
        } else {
            inputPix.classList.remove('erros')
        }
    }
    if (erros.length > 0) {
        document.getElementById('msgErro').style.display = 'block'
        setInterval(() => {
            document.getElementById('msgErro').style.display = 'none'
        }, 7000)
    } else {
        geraForm()
        imprimirTela()
    }
}

function geraForm() {
    const codCond = document.getElementById('codCond')
    const cond = document.getElementById('cond')
    const condCNPJ = document.getElementById('condCNPJ')
    const valorCod = codCond.value.trim()

    if (codCond.value === '') {
        cond.innerHTML = '-'
        condCNPJ.innerHTML = '-'
        codCond.classList.add('erros')
        controle = false
        document.getElementById('msgErro').style.display = 'block'
        setInterval(() => {
            document.getElementById('msgErro').style.display = 'none'
        }, 7000)
    } else {
        codCond.classList.remove('erros')
        try {
            fetch(`https://sheetdb.io/api/v1/hzhenxx3blavx/search?cod=${valorCod}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data[0] == undefined) {
                        cond.innerHTML = '-'
                        condCNPJ.innerHTML = '-'
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
            controle = true
        } catch (e) {
            console.error(e)
        }
    }
}

function imprimirTela() {
    if (controle) {
        document.getElementById('btn1').style.display = 'none'
        document.getElementById('btn2').style.display = 'none'
        window.print()
        window.location.reload()
    }
    return
}