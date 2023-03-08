let v1 = 0;
let v2 = 0;
let equal = 0;
let op = "";

$(document).ready(function(){

    $("#limpar").click(function (e) {
        $("#visor").html("0");
        setV1(0);
        setV2(0)
        equal = 0;
        op = "";
    });

    $("#apagar").click(function (e) {
        let content = $("#visor").html().slice(0, -1);
        $("#visor").html(content);
    });

    $(".n").click(function (e) { 
        if($("#visor").html() == "0" || $("#visor").html() == "ERRO"){
            $("#visor").html(this.id)
        } else{
            $("#visor").append(this.id)
        }
    });

    $("#ponto").click(function (e) {
        if($("#visor").html().includes(",")){
            $("#visor").html("ERRO")
        } else{
            if($("#visor").html() == ""){
                $("#visor").append("0,")
            } else{
                $("#visor").append(",")
            }
            
        }
    })

    $("#mais-menos").click(function (e){
        if($("#visor").html().includes("-")){
            $("#visor").html($("#visor").html().replace("-", ""))
        } else{
            $("#visor").html("-"+$("#visor").html())
        }
    })

    $("#porcento").click(function (e){
        percente();
    })

    $(".op").click(function (e) { 
        setV1($("#visor").html())
        $("#visor").html("")
        op = this.id;
    });
  
    $("#igual").click(equals)
});

function setV1(){
    v1 = $("#visor").html();
    v1 = v1.replace(",", ".")
    if(v1.includes(".")){
        v1 = parseFloat(v1)
    } else{
        v1 = parseInt(v1);
    }
}

function setV2(){
    v2 = $("#visor").html();
    v2 = v2.replace(",", ".")
    if(v2.includes(".")){
        v2 = parseFloat(v2)
    } else{
        v2 = parseInt(v2);
    }
}

function add(){
    equal = v1 + v2;
}

function less(){
    equal = v1 - v2;
}

function multiply(){
    equal = v1 * v2;
}

function division(){
    equal = v1/v2;
}

function percente(){
    let value = $("#visor").html();
    value = value.replace(",", ".");
    value = value/100;
    value = value+"";
    value = value.replace(".", ",");
    $("#visor").html(value);
}

function equals(){
    setV2($("#visor").html())
    switch (op) {
        case "mais":
            add();
            break;
        case "menos":
            less();
            break;
        case "vezes":
            multiply();
            break;
        case "dividido":
            division();
            break;

        default:
            equal = 0;
            break;
    }

    if(equal.toString().length > 9){
        equal = new Number(equal).toFixed(9);
    }
    equal = equal+""
    equal = equal.replace(".", ",");
    $("#visor").html(equal);
}
