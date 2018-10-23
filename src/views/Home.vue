<template>
    <div id="home">


        <input-text :type="type" :label="label" :id="id" :name="name" :isError="isError"></input-text> 

        

    </div>
</template>

<script>
import InputText from '../components/InputText.vue'

    export default {
        name: 'Home',
        data() {
            return {
                type: 'text',
                label: 'Nombre',
                id: 'nombre',
                name: 'nombre',
                isError: false
            }
        },
        components: {
            InputText
        }
    }
</script>

<style scoped>

  #home {
    max-width: 1440px;
    margin: 0 auto;

  }

</style>