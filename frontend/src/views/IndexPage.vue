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

const types = ref([]);
const brands = ref([]);
const ramConfs = ref([]);
const ramModules = ref([]);

const loadingRamModules = ref(true);
const loadingRamModulesError = ref(false);

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
                                                 :max-fraction-digits="2"/>
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
                                                 input-id="integeronly" />
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    Capacity:
                                    <InputNumber v-model="module.capacity"
                                                 input-id="integeronly" />
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    Configuration:
                                    <!-- todo -->
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    Model:
                                    <InputText type="text" v-model="module.model" />
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    Speed:
                                    <InputNumber v-model="module.speed"
                                                 input-id="integeronly" />
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="col">
                                    Brand:
                                    <!-- todo -->
                                </div>
                            </div>
                        </form>

                        <div class="text-end">
                            <Button label="Submit" />
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
    </div>

</template>
