function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( cities => {
        for(state of cities) {
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }
    } )
}

populateUfs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "";
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for(city of cities) {
            citySelect.innerHTML += `<option value = "${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    } )
    
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);

//itens de coleta

const itensToColect = document.querySelectorAll(".itens-grid  li");

for (item of itensToColect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]");

let selectedItens = [];

function handleSelectedItem(event) {
    const itensLi = event.target;
    itensLi.classList.toggle("selected");

    const itensId = itensLi.dataset.id;

    console.log('ITEM ID', itensId);

    const alreadySelected = selectedItens.findIndex(item => item == itensId);
    /* O CÓDIGO ACIMA É O MESMO QUE ESSE: 
    const alreadySelected = selectedItens.findIndex(item => {
        const itemFound = item == itensId;
        return itemFound;
    });*/

    if(alreadySelected != -1) {
        const filteredItens = selectedItens.filter( item => {
            const itemIsDifferent = item != itensId;
            return itemIsDifferent;
        })
        selectedItens = filteredItens;
    }else {
        selectedItens.push(itensId);
    }

    console.log('selectedItens', selectedItens);

    collectedItens.value = selectedItens;

}