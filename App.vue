<template>
  <div style="padding:20px">
    <h1>📚 Students API (Vue + Vite)</h1>

    <h2>All Students</h2>
    <ul>
      <li v-for="s in students" :key="s.id">
        {{ s.name }} ({{ s.course }})
        <button @click="getStudentById(s.id)" style="margin-left:10px">View Details</button>
      </li>
    </ul>

    <div v-if="student">
      <h2>Student Details</h2>
      <p><b>ID:</b> {{ student.id }}</p>
      <p><b>Name:</b> {{ student.name }}</p>
      <p><b>Course:</b> {{ student.course }}</p>
    </div>

    <h2>Filter Students by Course</h2>
    <input v-model="course" placeholder="Enter course (e.g., BSIT)" />
    <button @click="filterByCourse">Filter</button>

    <ul>
      <li v-for="s in courseStudents" :key="s.id">{{ s.name }} ({{ s.course }})</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const students = ref([]);
const student = ref(null);
const course = ref("");
const courseStudents = ref([]);

onMounted(() => {
  fetch("http://localhost:5000/students")
    .then((r) => r.json())
    .then((d) => (students.value = d))
    .catch((e) => console.error("Error fetching students:", e));
});

function getStudentById(id) {
  fetch(`http://localhost:5000/students/${id}`)
    .then((r) => r.json())
    .then((d) => (student.value = d))
    .catch((e) => console.error("Error fetching student:", e));
}

function filterByCourse() {
  fetch(`http://localhost:5000/students/filter?course=${encodeURIComponent(course.value)}`)
    .then((r) => r.json())
    .then((d) => (courseStudents.value = d))
    .catch((e) => console.error("Error filtering students:", e));
}
</script>

<style>

button { padding:8px 14px; margin-left:8px; border-radius:6px; }
</style>
npm run dev
