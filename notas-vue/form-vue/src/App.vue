<template>
  <div class="container">
    <header>
      <h1>Registro de Notas</h1>
      <nav>
        <button @click="view = 'form'">Formulario</button>
        <button @click="view = 'list'">Lista</button>
      </nav>
    </header>

    <main>
      <StudentForm v-if="view === 'form'" @student-added="addStudent" />
      <!-- input q viene del child (:students)-->
      <StudentList
        v-else
        :students="students"
        @delete-student="deleteStudent"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import StudentForm from "./components/StudentForm.vue";
import StudentList from "./components/StudentList.vue";

const view = ref("form");
const students = ref([]);

// Cargar desde localStorage
onMounted(() => {
  const saved = localStorage.getItem("students");
  if (saved) {
    students.value = JSON.parse(saved);
  }
});

// Guardar en localStorage
watch(
  students,
  (newVal) => {
    localStorage.setItem("students", JSON.stringify(newVal));
  },
  { deep: true }
);

function addStudent(student) {
  students.value.push(student);
}

function deleteStudent(index) {
  students.value.splice(index, 1);
}
</script>

<style scoped>
/* General */
.container {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  max-width: 900px;
  text-align: center; /* Centrar todo el contenido */
}

/* Header */
header {
  background: #4caf50;
  color: white;
  padding: 1rem;
  text-align: center;
  width: 100%; /* ocupa todo el ancho */
}

header h1 {
  margin: 0;
}

nav {
  margin-top: 1rem;
}

nav button {
  margin: 0 10px;
  padding: 0.5rem 1.2rem;
  background: white;
  color: #4caf50;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

nav button:hover {
  background: #e0e0e0;
}

/* Formulario */
form {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrar inputs y labels */
  margin: 1rem auto;
  max-width: 400px;
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

label {
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
  text-align: center;
}

input {
  padding: 0.6rem;
  margin-bottom: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button[type="submit"] {
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

button[type="submit"]:hover {
  background: #45a049;
}

/* Lista */
ul {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

li {
  background: #eee;
  margin: 8px 0;
  padding: 10px 15px;
  width: 80%;
  max-width: 500px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
}

.delete-btn:hover {
  background: #c0392b;
}
</style>