let tasks = localStorage.getItem("tasks");
$(document).ready(function () {
    if(tasks == null || tasks == undefined){
        let task = {
            title: null,
            date: null,
            id: null
        }
        tasks = [];
        tasks.push(task)
        
        localStorage.setItem("tasks", JSON.stringify(tasks))
        tasks = localStorage.getItem("tasks");
    } else{}
    tasks = JSON.parse(tasks)
    tasks_array = [];
    for(let i in tasks){
        tasks_array.push(tasks[i])
    }
    tasks = tasks_array;
    console.log(tasks)

    htmltasks = "";
    tasks.forEach(task => {
        if(task.id != null){
            htmltasks += '\n\
            <div class="alert alert-secondary d-flex justify-content-start">\n\
                <a class="btn-check-task" id="'+task.id+'"><i class="fa-animate-hover fa-animate-hover-translate fa-solid fa-check fa-2xl"></i></a>\n\
                <div class="h4 mx-2 mx-md-5">'+task.title+'</div>\n\
                <div class="h5 flex-grow-1 text-end">'+task.date+'</div>\n\
            </div>\n\
            '
        }
    });
    $("#tasks").html(htmltasks);

    $("#btn-criar").click(function (e) { 
        let titulo = $("#titulo").val();
        let data = $("#data").val();
        let id = new Date().toLocaleTimeString();
        
        if(titulo != ""){
            if(data != ""){
                let task = {
                    title: titulo,
                    date: data,
                    id: id
                }
                tasks.push(task)
                localStorage.setItem("tasks", JSON.stringify(tasks));
                window.location.reload()
            } else{
                $("#data").focus()
            }
        } else{
            $("#titulo").focus()
        }
    });

    $(".btn-check-task").click(function (e) { 
        removeTaskId(this.id)
    });
});

function removeTaskId(id){
    let stringifyTasks = []
    tasks.forEach(task => {
        stringifyTasks.push(JSON.stringify(task))
    })

    tasks.forEach(task => {
        if(task.id == id){
            let stringifyTask = JSON.stringify(task)
            let i = stringifyTasks.indexOf(stringifyTask);
            if(i != -1){
                tasks.splice(i, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                window.location.reload()
            }
        }
    });

}