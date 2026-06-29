// ==========================================
// STUDENTTASK PRO
// ==========================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let pieChart;
let barChart;

// Variable para saber si estamos editando
let editingId = null;

// ==========================================
// CAMBIAR SECCIONES
// ==========================================

function showSection(sectionId){

    document.querySelectorAll(".section").forEach(section=>{
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");

    document.querySelectorAll(".sidebar li").forEach(item=>{
        item.classList.remove("active");
    });

    if(typeof event !== "undefined"){
        event.target.classList.add("active");
    }

}

// ==========================================
// GUARDAR EN LOCALSTORAGE
// ==========================================

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// ==========================================
// LIMPIAR FORMULARIO
// ==========================================

function clearForm(){

    document.getElementById("title").value="";
    document.getElementById("subject").value="";
    document.getElementById("description").value="";
    document.getElementById("priority").selectedIndex=0;
    document.getElementById("deadline").value="";

    editingId=null;

    document.getElementById("saveButton").textContent="Guardar tarea";

}

// ==========================================
// AGREGAR O ACTUALIZAR TAREA
// ==========================================

function addTask(){

    const title=document.getElementById("title").value.trim();

    const subject=document.getElementById("subject").value.trim();

    const description=document.getElementById("description").value.trim();

    const priority=document.getElementById("priority").value;

    const deadline=document.getElementById("deadline").value;

    if(!title || !subject || !deadline){

        alert("Completa todos los campos obligatorios");

        return;

    }

    if(editingId!==null){

        const task=tasks.find(t=>t.id===editingId);

        if(task){

            task.title=title;
            task.subject=subject;
            task.description=description;
            task.priority=priority;
            task.deadline=deadline;

        }

        alert("Tarea actualizada correctamente.");

    }else{

        tasks.push({

            id:Date.now(),

            title,

            subject,

            description,

            priority,

            deadline,

            completed:false

        });

        alert("Tarea agregada correctamente.");

    }

    saveTasks();

    clearForm();

    renderAll();

    showSection("tasks");

}

// ==========================================
// ELIMINAR
// ==========================================

function deleteTask(id){

    if(!confirm("¿Eliminar esta tarea?")) return;

    tasks=tasks.filter(task=>task.id!==id);

    saveTasks();

    renderAll();

}

// ==========================================
// COMPLETAR
// ==========================================

function completeTask(id){

    const task=tasks.find(task=>task.id===id);

    if(task){

        task.completed=!task.completed;

        saveTasks();

        renderAll();

    }

}

// ==========================================
// EDITAR
// ==========================================

function editTask(id){

    const task=tasks.find(task=>task.id===id);

    if(!task) return;

    editingId=id;

    document.getElementById("title").value=task.title;

    document.getElementById("subject").value=task.subject;

    document.getElementById("description").value=task.description;

    document.getElementById("priority").value=task.priority;

    document.getElementById("deadline").value=task.deadline;

    document.getElementById("saveButton").textContent="Actualizar tarea";

    showSection("newTask");

}

// ==========================================
// BUSCADOR
// ==========================================

function searchTasks(){

    const texto = document
        .getElementById("searchTask")
        .value
        .toLowerCase();

    const resultado = tasks.filter(task =>

        task.title.toLowerCase().includes(texto) ||

        task.subject.toLowerCase().includes(texto) ||

        task.description.toLowerCase().includes(texto)

    );

    renderTasks(resultado);

}

// ==========================================
// RENDER DE TAREAS
// ==========================================

function renderTasks(lista = tasks){

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    if(lista.length === 0){

        taskList.innerHTML = `

            <div class="task-card">

                <h3>No hay tareas registradas.</h3>

            </div>

        `;

        return;

    }

    lista.forEach(task=>{

        let colorPrioridad="";

        switch(task.priority){

            case "Alta":
                colorPrioridad="#ef4444";
            break;

            case "Media":
                colorPrioridad="#f59e0b";
            break;

            case "Baja":
                colorPrioridad="#22c55e";
            break;

        }

        taskList.innerHTML += `

        <div class="task-card">

            <h3>${task.title}</h3>

            <p>

                <strong>Materia:</strong>

                ${task.subject}

            </p>

            <p>

                <strong>Descripción:</strong>

                ${task.description}

            </p>

            <p>

                <strong>Prioridad:</strong>

                <span style="color:${colorPrioridad};font-weight:bold;">

                ${task.priority}

                </span>

            </p>

            <p>

                <strong>Entrega:</strong>

                ${task.deadline}

            </p>

            <p>

                <strong>Estado:</strong>

                ${task.completed

                ? "✅ Completada"

                : "⏳ Pendiente"}

            </p>

            <div class="task-buttons">

                <button

                    class="complete-btn"

                    onclick="completeTask(${task.id})">

                    ${task.completed

                    ? "Deshacer"

                    : "Completar"}

                </button>

                <button

                    class="edit-btn"

                    onclick="editTask(${task.id})">

                    Editar

                </button>

                <button

                    class="delete-btn"

                    onclick="deleteTask(${task.id})">

                    Eliminar

                </button>

            </div>

        </div>

        `;

    });

}

// ==========================================
// DASHBOARD
// ==========================================

function renderDashboard(){

    const total = tasks.length;

    const completed =
    tasks.filter(task=>task.completed).length;

    const pending =
    total - completed;

    const productivity =
    total===0
    ?0
    :Math.round((completed/total)*100);

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;

    document.getElementById("progressPercent").textContent =
    productivity + "%";

    document.getElementById("advanceCompleted").textContent =
    completed;

    document.getElementById("advancePending").textContent =
    pending;

    const recentTasks =
    document.getElementById("recentTasks");

    recentTasks.innerHTML="";

    if(tasks.length===0){

        recentTasks.innerHTML=`

            <div class="calendar-item">

                No hay tareas registradas.

            </div>

        `;

        return;

    }

    tasks
    .slice(-5)
    .reverse()
    .forEach(task=>{

        recentTasks.innerHTML += `

        <div class="calendar-item">

            <strong>${task.title}</strong>

            <br>

            📚 ${task.subject}

            <br>

            📅 ${task.deadline}

            <br>

            ${task.completed
            ? "✅ Terminada"
            : "⏳ Pendiente"}

        </div>

        `;

    });

}

// ==========================================
// AVANCES
// ==========================================

function renderProgress(){

    const progressList =
    document.getElementById("progressList");

    progressList.innerHTML="";

    if(tasks.length===0){

        progressList.innerHTML=`

        <div class="task-card">

            <h3>No hay tareas registradas.</h3>

        </div>

        `;

        return;

    }

    tasks.forEach(task=>{

        progressList.innerHTML += `

        <div class="task-card">

            <h3>${task.title}</h3>

            <p>

                <strong>Materia:</strong>

                ${task.subject}

            </p>

            <p>

                <strong>Prioridad:</strong>

                ${task.priority}

            </p>

            <p>

                <strong>Estado:</strong>

                ${task.completed

                ? "✅ Completada"

                : "⏳ Pendiente"}

            </p>

        </div>

        `;

    });

}

// ==========================================
// CALENDARIO
// ==========================================

function renderCalendar(){

    const calendar =
    document.getElementById("calendarList");

    calendar.innerHTML="";

    if(tasks.length===0){

        calendar.innerHTML=`

        <div class="calendar-item">

            No hay entregas próximas.

        </div>

        `;

        return;

    }

    const ordered =
    [...tasks].sort(

        (a,b)=>

        new Date(a.deadline)

        -

        new Date(b.deadline)

    );

    ordered.forEach(task=>{

        calendar.innerHTML += `

        <div class="calendar-item">

            <strong>${task.title}</strong>

            <br>

            📅 ${task.deadline}

            <br>

            📚 ${task.subject}

            <br>

            Prioridad:

            <strong>${task.priority}</strong>

            <br>

            Estado:

            ${task.completed

            ? "✅ Completada"

            : "⏳ Pendiente"}

        </div>

        `;

    });

}

// ==========================================
// GRÁFICAS
// ==========================================

function renderCharts(){

    const completed =
    tasks.filter(task=>task.completed).length;

    const pending =
    tasks.filter(task=>!task.completed).length;

    // Destruir gráficas anteriores

    if(pieChart){
        pieChart.destroy();
    }

    if(barChart){
        barChart.destroy();
    }

    // =========================
    // GRÁFICA DE DONA
    // =========================

    const pieCanvas =
    document.getElementById("pieChart");

    if(pieCanvas){

        pieChart = new Chart(pieCanvas,{

            type:"doughnut",

            data:{

                labels:[
                    "Completadas",
                    "Pendientes"
                ],

                datasets:[{

                    data:[
                        completed,
                        pending
                    ],

                    backgroundColor:[
                        "#22c55e",
                        "#ef4444"
                    ],

                    borderWidth:0

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                plugins:{
                    legend:{
                        labels:{
                            color:"white"
                        }
                    }
                }

            }

        });

    }

    // =========================
    // GRÁFICA DE BARRAS
    // =========================

    const subjects={};

    tasks.forEach(task=>{

        if(subjects[task.subject]){

            subjects[task.subject]++;

        }else{

            subjects[task.subject]=1;

        }

    });

    const barCanvas =
    document.getElementById("barChart");

    if(barCanvas){

        barChart = new Chart(barCanvas,{

            type:"bar",

            data:{

                labels:Object.keys(subjects),

                datasets:[{

                    label:"Cantidad de tareas",

                    data:Object.values(subjects),

                    backgroundColor:"#00c6ff"

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                scales:{

                    y:{

                        beginAtZero:true,

                        ticks:{
                            color:"white"
                        }

                    },

                    x:{

                        ticks:{
                            color:"white"
                        }

                    }

                },

                plugins:{

                    legend:{

                        labels:{
                            color:"white"
                        }

                    }

                }

            }

        });

    }

}

// ==========================================
// RENDER GENERAL
// ==========================================

function renderAll(){

    renderTasks();

    renderDashboard();

    renderProgress();

    renderCalendar();

    renderCharts();

}

// ==========================================
// INICIAR
// ==========================================

renderAll();
