<template>
    <div id="home">
        <main-panel :style="{ 'background-image' : 'url(\'' + backgroundImage + '\')' }">
            <panel>
                <input-text :type="type" :label="label" :id="id" :name="name" :isError="isError"></input-text>
                <radio :id="radio1">Radio 1</radio>
                <radio :id="radio2">Radio 2</radio>
                <buttonCopy @click.native="copyUrl"></buttonCopy>
                <card>
                    <span slot="front">1</span>
                    <span slot="back">IMG</span>
                </card>
                <card>
                    <span slot="front">2</span>
                    <span slot="back">IMG</span>
                </card>
                <card>
                    <span slot="front">3</span>
                    <span slot="back">IMG</span>
                </card>
                <app-textarea>Textarea</app-textarea>
                <date></date>
                <hour></hour>
                <app-button-generar>Generar URL</app-button-generar>
                <app-button-previsualizar>Previsualizar</app-button-previsualizar>
            </panel>
        </main-panel>
    </div>
</template>

<script>
    import MainPanel from '../components/MainPanel.vue'
    import Panel from '../components/Panel.vue'
    import InputText from '../components/InputText.vue'
    import Radio from '../components/Radio.vue'
    import ButtonCopy from '../components/ButtonCopy.vue'
    import Card from '../components/Card.vue'
    import Textarea from '../components/Textarea.vue'
    import Date from '../components/Date.vue'
    import Hour from '../components/Hour.vue'
    import ButtonGenerar from '../components/ButtonGenerar.vue'
    import ButtonPrevisualizar from '../components/ButtonPrevisualizar.vue'
    import EventBus from '../event-bus'

    export default {
        name: 'Home',
        data() {
            return {
                type: 'text',
                label: 'Nombre',
                id: 'nombre',
                name: 'nombre',
                isError: false,
                radio1: 'radio1',
                radio2: 'radio2',
                radioChecked: '',
                backgroundImage: 'src/assets/backgrounds/up2.png'
            }
        },
        components: {
            MainPanel,
            Panel,
            InputText,
            Radio,
            ButtonCopy,
            Card,
            Date,
            Hour,
            appButtonGenerar: ButtonGenerar,
            appButtonPrevisualizar: ButtonPrevisualizar,
            appTextarea: Textarea
        },
        methods: {
            copyUrl() {
                var urlInput = document.querySelector('#nombre');
                urlInput.select();
                document.execCommand("copy");
            }
        },
        created() {
            EventBus.$on('changeRadioEvent', (radioChecked) => {
                this.radioChecked = radioChecked;
            });
        }
    }
</script>

<style scoped>
    #home {
        max-width: 1440px;
        margin: 0 auto;
        overflow: auto;
        max-height: 100vh;
        margin-bottom: 20px;
    }
</style>