const key = "4bfe53998ebee9203a64bf9bd1540a54";

function colocarDadosNaTela(dados) {
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = "Temperatura " + Math.floor(dados.main.temp) + "°C";
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = "Umidade " + dados.main.humidity + "%";
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

async function buscarCidade(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());

    colocarDadosNaTela(dados);
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}

document.querySelector(".input-cidade").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        const cidade = document.querySelector(".input-cidade").value;
        buscarCidade(cidade);
    }
});

window.onload = function() {
    document.querySelector(".input-cidade").value = "";

    localStorage.removeItem('cidade');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const dadosLocalizacao = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());

            colocarDadosNaTela(dadosLocalizacao);
        });
    } else {
        console.log('Geolocalização não é suportada neste navegador.');
    }
};
