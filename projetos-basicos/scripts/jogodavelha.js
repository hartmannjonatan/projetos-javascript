let matriz = [
    [-6, -6, -6],
    [-6, -6, -6],
    [-6, -6, -6]
]

let jogador = 1;

$(document).ready(function () {
    alertar("Jogador 1 joga.", "info")
    $('.slot').click(function (e) { 
        if(!$("#"+this.id).hasClass("filled")){
            preencher("#"+this.id)
        }
    });
});

function alertar(msg, type){
    let el = '<div class="alert alert-'+type+' alerta-fixo" role="alert" id="alertaInfo">\n\
        '+msg+'\n\
    </div>';

    $("#alerts").html( $("#alerts").html()+el)
}

function limparAlertas(){
    $("#alerts").html("")
}

function preencher(id) {
    if(jogador == 1){
        //jogador = 2;
        $(id).html('<i class=" mx-3 fa-solid fa-x fa-5x"></i>')
        atualizarMatriz(id)
        $(id).addClass("filled");
    } else{
        //jogador = 1;
        $(id).html('<i class=" mx-3 fa-solid fa-circle fa-5x"></i>')
        atualizarMatriz(id)
        $(id).addClass("filled");
    }
}

function atualizarMatriz(id){
    let l = id[2] - 1;
    let c = id[4] - 1;
    matriz[l][c] = jogador;
    jogador = jogador == 1 ? 2 : 1;
    verificarMatriz();
}

function verificarMatriz(){
    let sum = [];
    let d1 = 0;
    let d2 = 0;
    let aux = 3;
    for(let i = 0; i <= 2; i++){
        aux--;
        let linha = 0;
        let coluna = 0;
        d1 += matriz[i][i];
        d2 += matriz[i][aux]
        for(let j = 0; j <= 2; j++){
            linha += matriz[i][j]
            coluna += matriz[j][i]
        }
        sum.push(linha);
        sum.push(coluna);
    }
    sum.push(d1);
    sum.push(d2);
    
    let j1 = sum.indexOf(3);
    let j2 = sum.indexOf(6);
    console.log(sum)
    if(j1 != -1 | j2 != -1){
        if(j1 != -1){
            for(let i = 1; i <= 3; i++){
                for(let j = 1; j <= 3; j++){
                    $("#l"+i+"c"+j).addClass("filled")
                }
            }
            limparAlertas()
            alertar("Jogador 1 venceu!", "success");
            preencherVencedor(j1)
        }
    
        if(j2 != -1){
            for(let i = 1; i <= 3; i++){
                for(let j = 1; j <= 3; j++){
                    $("#l"+i+"c"+j).addClass("filled")
                }
            }
            limparAlertas()
            alertar("Jogador 2 venceu!", "success");
            preencherVencedor(j2)
        }

        $("#startConfetti").click();
        setTimeout(() => {
            window.location.reload();
        }, 5000);
        

    } else{
        let velha = true;
        for(let i = 0; i <= 2; i ++){
            if(matriz[i].includes(-6)){
                velha = false;
                console.log(matriz)
                break;
            }
        }
        if(velha){
            $(".slot").addClass("filled")
            $(".slot").addClass("velha")
            $(".jogovelha").html($(".jogovelha").html())
            limparAlertas();
            alertar("VELHA! O jogo empatou.", "danger");
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } else{
            limparAlertas();
            alertar("Jogador "+jogador+" joga.", "info");
        }
    }
    
}

function preencherVencedor(i){
    if(i < 6){
        if(i % 2 == 0){
            for(let aux = 1; aux <= 3; aux++){
                let linha = (i/2)+1
                $("#l"+linha+"c"+aux).addClass("slot-win");
            }
        } else{
            for(let aux = 1; aux <= 3; aux++){
                let col = (i+1)/2
                $("#l"+aux+"c"+col).addClass("slot-win");
            }
        }
    } else{
        switch (i) {
            case 6:
                $("#l1c1").addClass("slot-win");
                $("#l2c2").addClass("slot-win");
                $("#l3c3").addClass("slot-win");
                break;
        
            default:
                $("#l1c3").addClass("slot-win");
                $("#l2c2").addClass("slot-win");
                $("#l3c1").addClass("slot-win");
                break;
        }
    }
    $(".jogovelha").html($(".jogovelha").html())
}