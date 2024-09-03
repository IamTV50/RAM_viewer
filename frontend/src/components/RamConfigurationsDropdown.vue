<script setup>
import Select from 'primevue/select';

import {onMounted} from "vue";
import {useFetch} from "@/utils/useFetch.js";

const configs = defineModel('configList');
const selectedConfig = defineModel('selectedConfig');

onMounted(async () => {
    const { data, loading, loadingError } = await useFetch('http://localhost:3000/ram/configs');

    configs.value = data.value;
});
</script>

<template>
    <!-- filter configs so it only contain conf string (instead of e.g {conf: "2x4"}) -->
    <Select v-model="selectedConfig"
            :options="configs.map(item => item.conf)"
            :placeholder="selectedConfig"
            :invalid="selectedConfig === null" />
</template>

<style scoped></style>