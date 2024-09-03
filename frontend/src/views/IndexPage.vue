<script setup>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import ProgressSpinner from "primevue/progressspinner";
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import {onMounted, ref} from "vue";

const types = ref([]);
const brands = ref([]);
const ramConfs = ref([]);
const ramModules = ref([]);

const loadingRamModules = ref(true);
const loadingRamModulesError = ref(false);

const fetchModules = async () =>{
    const url = 'http://localhost:3000/ram/modules';
    loadingRamModules.value = true;

    try{
        const res = await fetch(url);

        if(!res.ok){
            throw new Error('Failed to fetch');
        }

        ramModules.value = await res.json();
        loadingRamModulesError.value = false;
    }
    catch (error) {
        loadingRamModulesError.value = true;
        console.error(error.message);
    }
    finally {
        loadingRamModules.value = false;
    }
}

onMounted(() => {
    fetchModules();
});
</script>

<template>
    <div class="mt-4">
        <div v-if="loadingRamModules">
            <ProgressSpinner />
        </div>
        <div v-else-if="loadingRamModulesError">
            <span>couldn't load all data</span>
        </div>
        <div v-else>
            <Accordion>
                <AccordionTab v-for="module in ramModules"
                              :key="module.id"
                              :header="module.model">
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
                </AccordionTab>
            </Accordion>
        </div>
    </div>

</template>
