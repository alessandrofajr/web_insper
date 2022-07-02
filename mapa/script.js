let mapaMalha;
let mapaDados;

// como a função carrega um arquivo, usamos o termo async
// para indicar que ela vai esperar o carregamento
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

    // define o range de cores e escala a ser usada pelo mapa
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
            // pega o código da área de cada elemento
            let codigo = d.properties.codarea;
            let cor;
            
            // filtra os dados para pegar somente o item do json
            // que tem o código da área
            let dadoDoEstado = mapaDados.filter(function(item){
                return item.id == codigo;
            }); 
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

    let nome = dadosUF[0].nome;
    let densidade = dadosUF[0].densidade
    d3.select(elemento).classed("ativo", true);    
    d3.select('#uf-titulo').node().textContent = nome + " registrou " + parseFloat(densidade).toFixed(1) + " acessos de internet banda larga a cada 100 habitantes em janeiro de 2022";
}

function desmarcaUF(elemento){
    d3.select(elemento).classed("ativo", false)
}

loadMapData();