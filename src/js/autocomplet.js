const inputEl = document.querySelector('#autocompleteInput');

inputEl.addEventListener('input', onInputChange);

testeArray();

let idBancos = [];

async function testeArray() {
    const res = await fetch("../bancos.json");
    const data = await res.json();


    idBancos = data.map((bancos) => {
        return bancos.id;
    });
}

function onInputChange() {
    removeAutocompleteDropdown();

    const value = inputEl.value.toLowerCase();

    if (value.length === 0) return;

    let bancosFiltrados = [];

    bancosFiltrados = idBancos.filter((x) => x.toLowerCase().includes(value.toLowerCase()))

    createAutocompleteDropdown(bancosFiltrados)
}

function createAutocompleteDropdown(list) {
    const listEl = document.createElement("ul");
    listEl.className = "autocompleteList";
    listEl.id = "autocompleteList";

    list.forEach((banco) => {
        const listItem = document.createElement("li");
        const bancoBotao = document.createElement("button");
        bancoBotao.innerHTML = banco;
        bancoBotao.addEventListener('click', onBancoBotaoClick);
        listItem.appendChild(bancoBotao);
        listEl.appendChild(listItem);
    });

    document.querySelector("#autocompleteWrapper").appendChild(listEl);
}

function removeAutocompleteDropdown() {
    const listEl = document.querySelector("#autocompleteList");
    if (listEl) listEl.remove();
}

function onBancoBotaoClick(e) {
    e.preventDefault();

    const buttonEl = e.target;
    inputEl.value = buttonEl.innerHTML;

    removeAutocompleteDropdown();
}