<template>
  <section>
    <h2>Registrar Estudiante</h2>

    <form @submit.prevent="submitForm">
      <div class="student-form">
        <label>Nombre del estudiante:</label>
        <input v-model="name" type="text" required />
        <label>Nota 1:</label>

        <input
          v-model.number="note1"
          type="number"
          min="0"
          max="5"
          step="0.1"
          required
        />
        <label>Nota 2:</label>
        <input
          v-model.number="note2"
          type="number"
          min="0"
          max="5"
          step="0.1"
          required
        />

        <label>Nota 3:</label>
        <input
          v-model.number="note3"
          type="number"
          min="0"
          max="5"
          step="0.1"
          required
        />
        <button type="submit">Guardar</button>
      </div>
    </form>
    <!-- doble data value
    modelo vista <-> vista modelo-->
    <p v-if="msg">{{ msg }}</p>
  </section>
</template>
<!-- script afecta todo la app
script setup afecta solo este componente -->

<script setup>
import { ref } from "vue";
// variable reactiva, disponible en toda la app
const name = ref("");
const note1 = ref(null);
const note2 = ref(null);
const note3 = ref(null);
const msg = ref("");

const emit = defineEmits(["student-added"]);

function submitForm() {
  if (
    !name.value ||
    note1.value == null ||
    note2.value == null ||
    note3.value == null
  ) {
    msg.value = ":warning: Debes llenar todos los campos.";
    return;
  }

  const avg = (note1.value + note2.value + note3.value) / 3;
  emit("student-added", { name: name.value, avg });

  msg.value = `✔️ Estudiante ${
    name.value
  } guardado con promedio ${avg.toFixed(2)}`;

  // limpiar campos
  name.value = "";
  note1.value = note2.value = note3.value = null;
}
</script>

<style scoped>
input,
button {
  padding: 0.5rem;
  margin: 0.3rem 0;
  display: block;
  width: 100%;
  max-width: 300px;
}

.student-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
