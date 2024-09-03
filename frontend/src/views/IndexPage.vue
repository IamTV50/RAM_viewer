<script setup>
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import ProgressSpinner from "primevue/progressspinner";
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import {onMounted, ref} from "vue";
import {useFetch} from "@/utils/useFetch.js";
import BrandsDropdown from "@/components/BrandsDropdown.vue";
import RamConfigurationsDropdown from "@/components/RamConfigurationsDropdown.vue";

//const types = ref([]);
const brands = ref([]);
const ramConfigs = ref([]);
const ramModules = ref([]);

const loadingRamModules = ref(true);
const loadingRamModulesError = ref(false);

const handleSubmit = async (module) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "newPrice": module.price,
            "newEcc": module.ecc,
            "newCas": module.cas_latency,
            "newCapacity": module.capacity,
            "newSpeed": module.speed,
            "newModel": module.model,
            "newBrand": module.brand_name,
            "newConf": module.configuration
        })
    };

    const { data, loading, loadingError } = await useFetch(`http://localhost:3000/ram/update/${module.id}`, options);
};

onMounted( async () => {
    const { data, loading, loadingError } = await useFetch('http://localhost:3000/ram/modules');

    ramModules.value = data.value;
    loadingRamModules.value = loading.value;
    loadingRamModulesError.value = loadingError.value;
});
</script>

<template>
    <div class="mt-4">
        <div v-if="loadingRamModules" class="text-center">
            <ProgressSpinner />
        </div>
        <div v-else-if="loadingRamModulesError" class="text-center">
            <span>problem loading data</span>
        </div>
        <div v-else>
            <Accordion>
                <AccordionPanel v-for="module in ramModules"
                                :key="module.id"
                                :value="module.id" >
                    <AccordionHeader>{{ module.ram_type }} - {{ module.model }}</AccordionHeader>
                    <AccordionContent>
                        <form>
                            <div class="row mb-2">
                                <div class="col">
                                    Price:
                                    <InputNumber v-model="module.price"
                                                 input-id="locale-user"
                                                 :min-fraction-digits="2"
                                                 :max-fraction-digits="2"
                                                 :invalid="module.price === null" />
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    ECC memory: <Checkbox v-model="module.ecc" :binary="true" />
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    CAS latency:
                                    <InputNumber v-model="module.cas_latency"
                                                 :max-fraction-digits="0"
                                                 :invalid="module.cas_latency === null"/>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    Capacity:
                                    <InputNumber v-model="module.capacity"
                                                 :max-fraction-digits="0"
                                                 :invalid="module.capacity === null" />
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    Configuration:
                                    <RamConfigurationsDropdown v-model:config-list="ramConfigs"
                                                               v-model:selected-config="module.configuration" />
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    Model:
                                    <InputText type="text"
                                               v-model="module.model"
                                               :invalid="module.model === '' || module.model === null" />
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    Speed:
                                    <InputNumber v-model="module.speed"
                                                 :max-fraction-digits="0"
                                                 :invalid="module.speed === null" />
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    Brand:
                                    <BrandsDropdown v-model:brands-list="brands"
                                                    v-model:selected-brand="module.brand_name" />
                                </div>
                            </div>
                        </form>

                        <div class="text-end">
                            <Button label="Submit" @click="handleSubmit(module)" />
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
    </div>
</template>
