let cronometro = new Date();
cronometro.setHours(0);
cronometro.setMinutes(0);
cronometro.setSeconds(0);
cronometro.setMilliseconds(0);
let stopping = false;
let interval;

$(document).ready(function () {
    let date = new Date().toLocaleTimeString();
    date = date.split(":")

    $("#btn-iniciar").click(iniciarCronometro);
    
    if(!stopping){
        setInterval(changeTime, 1000);
    }
    
});

function changeTime(){
    let date = new Date().toLocaleTimeString();
    date = date.split(":")
    changeSecond(date[2]);
    changeMinute(date[1])
    changeHour(date[0])
}

function changeSecond(s){
    $("#relogioS").html(s+"s");
}

function changeMinute(m){
    $("#relogioM").html(m+"m");
}

function changeHour(h){
    $("#relogioH").html(h+"h");
}

function iniciarCronometro(){
    stopping = false;
    $(".botoes").html('\n\
        <button type="button" id="btn-parar" class="col btn btn-outline-dark w-100">Parar</button>\n\
        <button type="button" id="btn-resetar" class="col btn btn-outline-dark w-100">Resetar</button>\n\
    ')

    $("#btn-parar").click(pararCronometro);
    $("#btn-resetar").click(resetarCronometro);

    interval = setInterval(changeCronometro, 10);
}

function pararCronometro(){
    clearInterval(interval)
    stopping = true;
    $(".botoes").html('\n\
        <button type="button" id="btn-iniciar" class="col btn btn-outline-dark w-100">Iniciar</button>\n\
        <button type="button" id="btn-resetar" class="col btn btn-outline-dark w-100">Resetar</button>\n\
    ')
    $("#btn-iniciar").click(iniciarCronometro);
    $("#btn-resetar").click(resetarCronometro);
}

function resetarCronometro(){
    clearInterval(interval)
    $(".botoes").html('\n\
        <button type="button" id="btn-iniciar" class="col btn btn-outline-dark w-100">Iniciar</button>\n\
    ')
    $("#btn-iniciar").click(iniciarCronometro);
    cronometro = new Date();
    cronometro.setHours(0);
    cronometro.setMinutes(0);
    cronometro.setSeconds(0);
    cronometro.setMilliseconds(0);
    stopping = true;
    $("#cronometroH").html("00");
    $("#cronometroM").html("00");
    $("#cronometroS").html("00");
    $("#cronometroMS").html("00");
}

function changeCronometro(){
    if(!stopping){
        addMilisecond();
        $("#cronometroH").html(cronometro.getHours());
        $("#cronometroM").html(cronometro.getMinutes());
        $("#cronometroS").html(cronometro.getSeconds());
        $("#cronometroMS").html(cronometro.getMilliseconds());
    }
    
}

function addMilisecond(){
    cronometro.setMilliseconds(cronometro.getMilliseconds()+1);
    if(cronometro.getMilliseconds() > 99){
        cronometro.setMilliseconds(0);
        cronometro.setSeconds(cronometro.getSeconds()+1);
        if(cronometro.getSeconds() > 59){
            cronometro.setSeconds(0);
            cronometro.setMinutes(cronometro.getMinutes()+1);
            if(cronometro.getMinutes() > 59){
                cronometro.setMinutes(0);
                cronometro.setHours(cronometro.getHours()+1);
            }
        }
    }
}