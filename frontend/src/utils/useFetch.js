import { ref } from 'vue';

export const useFetch = async (url, options = null) => {
    const data = ref([]);
    const loading = ref(true);
    const loadingError = ref(false);

    try{
        const res = await fetch(url, options);

        if(!res.ok){ throw new Error('Failed to fetch'); }

        data.value = await res.json();
    }
    catch (e) {
        loadingError.value = true;
        console.error(e.message);
    }
    finally {
        loading.value = false;
    }

    return { data, loading, loadingError };
};
