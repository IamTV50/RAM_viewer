<script setup>
import Select from 'primevue/select';

import {onMounted} from "vue";
import {useFetch} from "@/utils/useFetch.js";
import {store} from "@/store.js";

const brands = defineModel('brandsList');
const selectedBrand = defineModel('selectedBrand');

onMounted(async () => {
    const { data, loading, loadingError } = await useFetch(`${store.apiHost}:${store.apiPort}/ram/brands`);

    brands.value = data.value;
});
</script>

<template>
    <!-- filter brands so it only contain conf string (instead of e.g {name: "Kingston"}) -->
    <Select v-model="selectedBrand"
            :options="brands.map(item => item.name)"
            :placeholder="selectedBrand"
            :invalid="selectedBrand === null" />
</template>

<style scoped></style>