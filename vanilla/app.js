// funciones de almacenamiento
function getStudents() {
    return JSON.parse(localStorage.getItem("students")) || [];
}

function saveStudent(student) {
    const students = getStudents();
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    console.log("hola")
}
function saveStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
}

function deleteStudents() {

}

// Router

function router() {
    const path = location.hash.slice(1) || "/";
    const app = document.getElementById("app");
    app.innerHTML = "";

    let templateId;

    if (path === "/") {
        templateId = "form-template"
    } else if (path === "/lista") {
        templateId = "list-template";
    } else {
        templateId = "404-template";
    }

    const template = document.getElementById(templateId);
    app.appendChild(template.content.cloneNode(true));

    if (path === "/") {
        attachFormLogic();
    } else if (path === "/lista") {
        renderList();
    }

}

// logica del formulario

function attachFormLogic() {
    const form = document.getElementById("studentForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const n1 = parseFloat(document.getElementById("nota1").value);
        const n2 = parseFloat(document.getElementById("nota2").value);
        const n3 = parseFloat(document.getElementById("nota3").value);

        if (!name || isNaN(n1) || isNaN(n2) || isNaN(n3)) {
            document.getElementById("msg").textContent = "😡💢 Debes llenar todos los campos.";
            return;
        }

        const avg = parseFloat(((n1 + n2 + n3) / 3).toFixed(2));

        const student = { name: name, avg: avg }; // Crear un objeto estudiante

        saveStudent(student); // Guardar el objeto estudiante

        document.getElementById("msg").textContent = `✔️ Estudiante ${name} con promedio ${avg?.toFixed(2)}, guardado correctamente`;
        form.reset();
    });
}

function saveStudent(student) {
    const students = getStudents();
    students.push(student);
    saveStudents(students); // Usar saveStudents para guardar el array completo
    console.log("hola");
}

function renderList() {
    const students = getStudents();
    const list = document.getElementById("studentList");
    list.innerHTML = "";

    if (students.length === 0) {
        const empty = (document.createElement("li"));
        empty.textContent = "No hay estudiantes registrados.";
        list.appendChild(empty);
        console.log("klk");
        return;
    }

    const template = document.getElementById("student-item-template");

    students.forEach((s, i) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".student-name").textContent = s.name;
        clone.querySelector(".student-avg").textContent = s.avg?.toFixed(2);
        //no funciona 
        clone.querySelector(".delete-btn").addEventListener("click", () => {
            deleteStudent(i);
        });
        list.appendChild(clone);

    })
}

function deleteStudent(index) {
    const students = getStudents();
    if (index >= 0 && index < students.length) {
        students.splice(index, 1);
        saveStudents(students); // Usar saveStudents para guardar el array actualizado
        renderList();
    }
}


window.addEventListener("hashchange", router);
window.addEventListener("load", router);