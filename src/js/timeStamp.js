const zeroFill = n => {
    return ('0' + n).slice(-2);
}
const interval = setInterval(() => {
    const now = new Date();
    const dataHora = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());
    document.getElementById('data-hora').innerHTML = dataHora;
}, 1000);