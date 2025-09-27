<template>
  <section>
    <h2>Lista de Estudiantes</h2>
    <!-- directivas, instruccion q modifica el dom -->
    <ul v-if="students.length > 0">
      <li v-for="(s, i) in students" :key="i">
        <strong>{{ s.name }}</strong> - Promedio: {{ s.avg.toFixed(2) }}
        <button class="delete-btn" @click="$emit('delete-student', i)">
          ✖️
        </button>
      </li>
    </ul>
    <p v-else>No hay estudiantes registrados</p>
  </section>
</template>

<script setup>
// Child q sirve como output para q todos sepan q props recibe
defineProps({
  students: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  background: #eee;
  margin: 5px 0;
  color: black;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  background: #E74C3C;
  color: white;
  border: none;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
}

.delete-btn:hover {
  background: #C0392B;
}
</style>