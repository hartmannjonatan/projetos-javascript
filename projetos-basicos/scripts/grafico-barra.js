let min  = 0;
let max = 1000;
let interval = 200;
let barras = [
    ["Exemplo 1", 500],
    ["Exemplo 2", 800]
]
let canvas;
let image;

$(document).ready(function () {
    canvas = document.getElementById("canvas");
    var stylew = window.getComputedStyle(canvas).width;
    var valor = parseInt(stylew.substr(0,stylew.search("px")));
    canvas.width = valor;
    stylew = window.getComputedStyle(canvas).height;
    valor = parseInt(stylew.substr(0,stylew.search("px")));
    canvas.height = valor;

    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        desenharGrafico()
    } else{
        $("canvas").html("Esse elemento não é suportado pelo seu navegador.")
    }
    
    $("#imagem").click(function (e) { 
        canvas.toBlob(
            blob => {
                const anchor = window.document.createElement('a');
                anchor.href = window.URL.createObjectURL(blob);
                anchor.download = 'export.png';
                anchor.click();
                window.URL.revokeObjectURL(anchor.href);
         
            },
            'image/png',
            0.9,
        );
    });

    $("#novo").click(function (e) { 
        novaBarra();
    });

    $("#confirmarBarras").click(function (e) {
         $("tr").each(function (index, element) {
            let aux = element.id;
            aux = aux.charAt(5)
             $("#text"+aux).each(function (ind, elem) {
                $(elem).attr("id", "text"+index);
             });
             $("#num"+aux).each(function (ind, elem) {
                $(elem).attr("id", "num"+index);
             });
             $("#delete"+aux).each(function (ind, elem) {
                $(elem).attr("id", "delete"+index);
             });
            $(element).attr("id", "barra"+index);
         });

        barras = [];
        for(let i = 1; i <= $("#tabelaBarras").find("tr").length; i++){
            console.log("#text"+i)
            let barra = [$("#text"+i).val(), $("#num"+i).val()];
            barras.push(barra)
        }


        desenharGrafico();
    });

    const myModalEl = document.getElementById('exampleModal')
    myModalEl.addEventListener('show.bs.modal', event => {
        $("#tabelaBarras").html("")
        for(i = 0; i <= barras.length - 1; i++){
            let aux = $("#tabelaBarras").find("tr").length+1;
            let content = '<tr id="barra'+aux+'">\n\
                <td><input class="form-control" type="text" id="text'+aux+'" value="'+barras[i][0]+'"></td>\n\
                <td><input class="form-control" type="num" id="num'+aux+'" value="'+barras[i][1]+'"></td>\n\
                <td><i id="delete'+aux+'" class="deleteBarra fa-animate-hover fa-solid fa-x fa-xl"></i></td>\n\
            </tr>'
            $("#tabelaBarras").append(content)

            $(".deleteBarra").click(function (e) { 
                let id = this.id;
                id = id.charAt(6);

                $("#barra"+id).attr("id", "barraRemove")
                $("#barraRemove").remove();

                

                
            });
        }
        
    })

    $("#gerar").click(function (e) { 
        min = $("#min").val();
        max = $("#max").val();
        interval = $("#interval").val();
        desenharGrafico();
    });
});

function novaBarra(){
    let aux = $("#tabelaBarras").find("tr").length+1;
    let content = '<tr id="barra'+aux+'">\n\
        <td><input class="form-control" type="text" id="text'+aux+'"></td>\n\
        <td><input class="form-control" type="num" id="num'+aux+'"></td>\n\
        <td><i id="delete'+aux+'" class="deleteBarra fa-animate-hover fa-solid fa-x fa-xl"></i></td>\n\
    </tr>'

    $("#tabelaBarras").append(content);
    
}

function desenharGrafico(){
    ctx.reset();
    ctx.beginPath();
    ctx.moveTo(50,10);
    ctx.lineTo(50, canvas.height - 30);
    ctx.stroke();

    ctx.moveTo(50, canvas.height - 30);
    ctx.lineTo(canvas.width - 50, canvas.height - 30);
    ctx.stroke();

    ctx.moveTo(50, canvas.height - 30);
    ctx.lineTo(10, canvas.height - 30);
    ctx.stroke();
    ctx.fillText(min+"", 10, canvas.height - 30)

    ctx.moveTo(50, 20);
    ctx.lineTo(10, 20);
    ctx.stroke();
    ctx.fillText(max+"", 10, 20)
    ctx.closePath();

    let space = (canvas.height - 30) - 20;
    space = space / ((max - min)/interval);
    for(let aux =  1; aux <= ((max - min)/interval)-1; aux++){
        ctx.beginPath();
        ctx.moveTo(50, 20+(space*aux));
        ctx.lineTo(10, 20+(space*aux));
        ctx.stroke();
        ctx.fillText(max-(interval*aux), 10, 20+(space*aux))
        ctx.closePath();
    }

    let lenght = barras.length;
    let l = ((canvas.width - 50) - 50) / lenght;
    l = l*0.44;
    let margin = l*1.25;
    //l = ((canvas.width - 50) - 50) / (lenght - (margin*lenght));

    for(let aux = 0; aux <= lenght - 1; aux++){
        let height = (((canvas.height - 30) - 20) * (barras[aux][1] - min)) / max;
        height = - height;
        if(l > 60){
            ctx.fillRect(50 + (margin*(aux+1) + (l*(aux))), canvas.height - 30, 60, height);
        } else{
            ctx.fillRect(50 + (margin*(aux+1) + (l*(aux))), canvas.height - 30, l, height);
        }
        ctx.fillText(barras[aux][0], 50 + (margin*(aux+1) + (l*(aux))), canvas.height - 10);
    }
    
}