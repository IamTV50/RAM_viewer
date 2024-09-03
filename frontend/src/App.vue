<script setup>
import { RouterLink, RouterView } from 'vue-router'
import IndexPage from "@/views/IndexPage.vue";
import FooterPage from "@/views/FooterPage.vue";
</script>

<template>
    <div class="container mt-2">
        <h1 class="text-center"> RAM viewer </h1>
        <IndexPage />
        <FooterPage />
    </div>
</template>

<style scoped></style>
