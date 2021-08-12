// Funcção que captura os tipos de gêneros e adiciona em uma lista
function captura_generos(data) {
    all_genres_list = []
    for (let i = 0; i < data.length; i++) {
        var lista_temp = []
        if (data[i]['Genres'].includes(';')) {
            lista_temp = data[i]['Genres'].split(';')
            for (let j = 0; j < lista_temp.length; j++) {
                if (all_genres_list.includes(lista_temp[j]) == false) {
                    all_genres_list.push(lista_temp[j])
                }
            }
        }
        else if ((all_genres_list.includes(data[i]['Genres']) == false)) {
            all_genres_list.push(data[i]['Genres'])
        }

    }
    return all_genres_list.sort()

}

// Função que cria os select de pesquisa que recebe a lista de gêneros criada acima como parametro
function criarSelect(lista) {
    var Selection1 = ""
    var Selection2 = ""
    var Selection3 = ""
    var Selection4 = ""

    for (let i = 0; i <= lista.length; i++) {
            Selection1 += `<option value="${lista[i]}">${lista[i]}</option>`

            Selection2 += `<option value="${lista[i]}">${lista[i]}</option>`
       
            Selection3 += ` <option value="${lista[i]}">${lista[i]}</option>`

            Selection4 += `<option value="${lista[i]}">${lista[i]}</option>`

    //  Estruta de criação dos options dos select
    }
    return `<div id="seleçâo">
                <label for="place">Coluna 1: </label>
                <select class = "sele"name="place" id="place1" placeholder = "Selecione">
                    <option value="0"></option>
                    ${Selection1}
                </select>
                <label for="place">Coluna 2: </label>
                <select class = "sele"name="place" id="place2" placeholder = "Selecione">
                    <option value="0"></option>
                    ${Selection2}
                </select>
                <label for="place">Coluna 3: </label>
                <select class = "sele"name="place" id="place3" placeholder = "Selecione">
                    <option value="0"></option>
                    ${Selection3}
                </select>
                <label for="place">Coluna 4: </label>
                <select class = "sele"name="place" id="place4" placeholder = "Selecione">
                    <option value="0"></option>
                    ${Selection4}
            </div>`
}

//  Função que faz a montagem do gráfico na tela, em que busca os valores dos selects montados acima e compara com os dados no json
function innerGraphic(values, data) {
    // Montagem da estrutura que vai o gráfico de barra
    document.querySelector("#local-grafico").innerHTML = `
    <div id="grafico-bar">
    <canvas id="myChart"></canvas></div>
    `
    var value1 = data.filter((x) => x.Genres.split(';').filter((y) => values[0] == (y))[0]).length
    var value2 = data.filter((x) => x.Genres.split(';').filter((y) => values[1] == (y))[0]).length
    var value3 = data.filter((x) => x.Genres.split(';').filter((y) => values[2] == (y))[0]).length
    var value4 = data.filter((x) => x.Genres.split(';').filter((y) => values[3] == (y))[0]).length
    // Estrutura de montagem do gráfico de barra
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Coluna 1', 'Coluna 2', 'Coluna 3', 'Coluna 4'],
            datasets: [{
                label: 'Quantidade de aplicativos por gêneros',
                data: [value1, value2, value3, value4],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 2)',
                    'rgba(54, 162, 235, 2)',
                    'rgba(255, 159, 64, 2)',
                    'rgba(75, 192, 192, 2)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

//  Função que faz a montagem dos gráficos do botão secundário usando como parametros o mesmo da função innerGraphic
function innerGraphic2(values, data) {
    // Montagem da estrutura de div onde va cada gráfico rosquinha
    document.querySelector("#local-grafico").innerHTML = `
<div id="grafico-doughnut">
    <p>Comentarios por gênero</p>
    <canvas id="myChart1"></canvas>
</div>
<div id="grafico-doughnut">
    <p>Instalações por gênero</p>
    <canvas id="myChart2"></canvas>
</div>
`   
    // Atribui valor padrão para os graficos caso estegam com as caixa de pesquisa vazias  
    var value1 = values[0] =="" && values[1] =="" && values[2] =="" && values[3] =="" ? 10:0
    var value2 = values[0] =="" && values[1] =="" && values[2] =="" && values[3] =="" ? 10:0
    var value3 = values[0] =="" && values[1] =="" && values[2] =="" && values[3] =="" ? 10:0
    var value4 = values[0] =="" && values[1] =="" && values[2] =="" && values[3] =="" ? 10:0
    //Calculo do dados para o primero gráfico de rosquinha 
    data.filter((x) => x.Genres.split(';').filter((y) => values[0] == (y))[0]).map((z) => value1 += z.Reviews)
    data.filter((x) => x.Genres.split(';').filter((y) => values[1] == (y))[0]).map((z) => value2 += z.Reviews)
    data.filter((x) => x.Genres.split(';').filter((y) => values[2] == (y))[0]).map((z) => value3 += z.Reviews)
    data.filter((x) => x.Genres.split(';').filter((y) => values[3] == (y))[0]).map((z) => value4 += z.Reviews)
    // Estrutura da montagem do gráfico rosquinha
    var ctx = document.getElementById('myChart1').getContext('2d');
    var myChart1 = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Coluna 1', 'Coluna 2', 'Coluna 3', 'Coluna 4'],
            datasets: [{
        
                data: [value1, value2, value3, value4],
                backgroundColor: [
                    'red',
                    '#4169E1',
                    'orange',
                    'green',
                ],
            }]
        },
    });

    // Atribui valor padrão para os graficos caso estegam com as caixa de pesquisa vazias 
    value5 = values[0] =="" && values[1] =="" && values[2] =="" && values[3] =="" ? 10:0
    value6 = values[0] =="" && values[1] =="" && values[2] =="" && values[3] =="" ? 10:0
    value7 = values[0] =="" && values[1] =="" && values[2] =="" && values[3] =="" ? 10:0
    value8 = values[0] =="" && values[1] =="" && values[2] =="" && values[3] =="" ? 10:0
    //Calculo do dados para o segundo gráfico de rosquinha 
    data.filter((x) => x.Genres.split(';').filter((y) => values[0] == (y))[0]).map((z) => value5 += parseInt(z.Installs.replace(",", "")))
    data.filter((x) => x.Genres.split(';').filter((y) => values[1] == (y))[0]).map((z) => value6 += parseInt(z.Installs.replace(",", "")))
    data.filter((x) => x.Genres.split(';').filter((y) => values[2] == (y))[0]).map((z) => value7 += parseInt(z.Installs.replace(",", "")))
    data.filter((x) => x.Genres.split(';').filter((y) => values[3] == (y))[0]).map((z) => value8 += parseInt(z.Installs.replace(",", "")))
    // Estrutura da montagem do gráfico rosquinha
    var ctx = document.getElementById('myChart2').getContext('2d');
    var myChart2 = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Coluna 1', 'Coluna 2', 'Coluna 3', 'Coluna 4'],
            datasets: [{
                data: [value5, value6, value7, value8],
                backgroundColor: [
                    'red',
                    '#4169E1',
                    'orange',
                    'green',
                ],

            }]
        },
    });

}

//  Estrutura de criação do texto de apresentação do site
const texto = `<h4 id="titulo">Neste site voçê pode fazer comparações simples entre generos de jogos da Play Store, simples é fácil, click no botão acima "Principal" ou "Secundário" e altere os generenos como desejar.</h4>

<p>Google Play é um serviço de distribuição digital de aplicativos, jogos, filmes, programas de televisão, músicas e livros, desenvolvido e operado pela Google. Ela é a loja oficial de aplicativos para o sistema operacional Android, além de fornecer conteúdo digital.

As aplicações do Google Play estão disponíveis de graça ou a um custo. O conteúdo pode ser baixado diretamente de um dispositivo com o sistema Android ou em um computador pessoal através do site do Google Play. Estas aplicações podem ser direcionadas para usuários com base em um atributo particular de hardware de seu dispositivo.
</p>`

// Evento de escuta que coloca o texto montado acima na pagina
window.addEventListener("load", function sobre(event) {
    event.preventDefault();
    document.querySelector("#sobre").innerHTML = texto
})

// Evento que escuta caso o click seja feito no botão home é reseta a pagina para estado de aprensatção do site 
document.querySelector("#home").addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".opções").innerHTML = ""
    document.querySelector("#local-grafico").innerHTML = ""
    document.querySelector("#sobre").innerHTML = texto
})

// Área onde faz a chamda dos dados do json e criação do servidor http
fetch('http://localhost:8080/data.json')
    .then(function (resp) {
        return resp.json()
    })
    .then(function (data) {
        //  Chamada da função de criação da lista de gêneros
        genero_list = captura_generos(data)
        //  Chamda da função de criação dos select na tela
        div_selection = criarSelect(genero_list)
        //  Evento que escuta se o botão primaio foi precionado para refazer a tela com o gráfico de barras
        document.querySelector("#primario").addEventListener("click", function (event) {
            event.preventDefault();
            // Faz alteração na pagina para sem o texto de apresentação
            document.querySelector("#sobre").innerHTML = ''
            // Faz a chamada dos selcts
            document.querySelector('.opções').innerHTML = div_selection
            // Chamada da função que cria o gráficos de barras
            innerGraphic(["", "", "", ""], data);
            var selects = document.querySelectorAll('.sele');
            // Escuta o evento de mudança na seleção das caixas de pesquisa
            selects.forEach((x) => x.addEventListener('change', function (event) {
                var values = [];
                // faz a inserção dos valores colocados na caixa select para um vetor
                selects.forEach((y) => values.push(y.options[y.selectedIndex].value))
                innerGraphic(values, data);
            }))

        })

// Evento que escuta o clcik no boão secundário
        document.querySelector("#secundario").addEventListener("click", function (event) {
            event.preventDefault();
            // Faz alteração na pagina para sem o texto de apresentação
            document.querySelector("#sobre").innerHTML = ''
            // chamada dos selects
            document.querySelector('.opções').innerHTML = div_selection
            // chamda da função que monta os gráficos
            innerGraphic2(["", "", "", ""], data);

            var selects = document.querySelectorAll('.sele');
            // Escuta o evento de mudança na seleção das caixas de pesquisa
            selects.forEach((x) => x.addEventListener('change', function (event) {
                var values = [];
                // faz a inserção dos valores colocados na caixa select para um vetor
                selects.forEach((y) => values.push(y.options[y.selectedIndex].value))
                innerGraphic2(values, data);
            }))
        })

    }
    ).catch(function (error) {
        console.log(error)
    })