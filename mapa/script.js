let mapaMalha;
let mapaDados;

// como a função carrega um arquivo, usamos o termo async
// para indicar que ela vai esperar o carregamento

//mudar minha base e colocar o código de área (ver no site do IGBE)
async function loadMapData(){
    let mapaUrl='https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/json&qualidade=intermediaria&intrarregiao=UF';
    let dadosUrl='dados_ibge_anatel.json';


    // carrega o arquivo da malha
    mapaMalha = await d3.json(mapaUrl);
    mapaDados = await d3.json(dadosUrl);

    // usa a biblioteca d3.js para selecionar o svg com id #mapa 
    let svg = d3.select("#mapa");
    let projecao = d3.geoMercator();
    mapaPaths = d3.geoPath().projection(projecao)
    let centerLatLng = [-52.7778191, -16.5476006];
    let width = 800, height=800;

    svg.attr("width", width); 
    svg.attr("height", height);
    svg.attr("viewBox", "0 0 "+width+" "+ height);
    svg.attr("preserveAspectRatio", "xMidYMid meet");

    let grupo = svg.append("g");
    let geometrias = topojson.feature(mapaMalha, mapaMalha.objects.BRUF).features;

    projecao.center(centerLatLng);
    projecao.scale(900);
    projecao.translate([width/2, height/2]);

    // let dadosDensidade = []
    // // cria uma array só com as densidades, para
    // // poder calcular o valor mínimo e máximo
    // for (d of mapaDados) {
    //     dadosDensidade.push(d.densidade);
    // }

    // console.log(d.densidade)

    //  no domain você coloca o máximo e o mínimo da sua esscala
    // por exemplo se a densidade é um valor de 1.5 a 31,
    // Coloquei 0 como o mínimo e 32 como o máximo p/ arredondar
    var calculaCor = d3.scaleLinear()
    .domain([0, 32])
    .range(["#FFF5F0", "#A00014"])

    grupo.selectAll("path")
        .data(geometrias)
        .enter().append("path")
        .attr("d", mapaPaths)
        .attr("class", "uf")
        .attr("id", (d) => d.properties.codarea)
        .style("fill", function(d){
            // primeiro, pegamoss o código da área de cada elemento
            let codigo = d.properties.codarea;
            let cor;
            
            // filtramos os dados para pegar somente o item do json
            // que tem o código da área
            let dadoDoEstado = mapaDados.filter(function(item){
                return item.id == codigo;
            }); 
            // console.log(dadoDoEstado[0]);
            if(dadoDoEstado[0]){ 
                // a função calculaCor na linha 46 precisa do valor usado 
                // para pintar o mapa. No caso, densidade. ela retorna uma cor
                // calculada a partir dessa densidade
                cor = calculaCor(dadoDoEstado[0].densidade)
            }
            return cor || '#fff';
        })
        .attr("stroke-width", 1)
        .attr("stroke", 'rgb(0,0,0,0.2)')
        .on("mouseover",function(event, data) {
            desmarcaUF(document.querySelector('uf.ativo'));
            marcaUF(event.target, data);
        })
        .on("mouseout",function(event){
            desmarcaUF(event.target);
        });
}



function marcaUF(elemento, dados){
    let codigo = dados.properties.codarea;
    let dadosUF = mapaDados.filter(function(item){
        return item.id == codigo;
    });

    // let dadosUF = mapaDados.filter(function(item){
    //     return item.id == codigo;
    // }); filtrar meus dados aqui

    let nome = dadosUF[0].nome;
    let densidade = dadosUF[0].densidade
    // let uf = dadosUF[0].sigla;
    d3.select(elemento).classed("ativo", true);    
    d3.select('#uf-titulo').node().textContent = nome + " registrou " + parseFloat(densidade).toFixed(1) + " acessos de internet banda larga a cada 100 habitantes";
    // d3.select('#uf-valor').node().textContent = valorindice; //carregar o JSON
}

function desmarcaUF(elemento){
    d3.select(elemento).classed("ativo", false)
}

loadMapData();