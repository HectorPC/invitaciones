<template>
    <div id="home">
        <main-panel :style="{ 'background-image' : 'url(\'' + backgroundImage + '\')' }">
           <!--  <panel>
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
            </panel> -->

            <h2>Elige el diseño de tu invitación</h2>
            <div class="design">
                <div class="design-selection">
                    <radio :id="radio1">Radio 1</radio>
                    <img :src="img1">
                </div>
                <div class="design-selection">
                    <radio :id="radio2">Radio 2</radio>
                    <img :src="img2">
                </div>
                <div class="design-selection">
                    <radio :id="radio3">Radio 3</radio>
                    <img :src="img3">
                </div>
            </div>
            <h2>Introduce los datos de tu invitación</h2>
            <div class="data">
                <input-text :type="type" :label="label1" :id="id1" :name="name1" :isError="isError"></input-text>
                <date></date>
                <hour></hour>
                <app-textarea>Textarea</app-textarea>
            </div>
            <h2>Copia y comparte tu invitación</h2>
            <div class="url">
                <div class="button-generate">
                    <app-button-generar>Generar URL</app-button-generar>
                    <app-button-previsualizar>Previsualizar</app-button-previsualizar>
                </div>
                <input-text :type="type" :label="label2" :id="id2" :name="name2" :isError="isError"></input-text>
                <buttonCopy @click.native="copyUrl"></buttonCopy>
            </div>


        </main-panel>
    </div>
</template>

<script>
    import MainPanel from '../components/MainPanel.vue'
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
                label1: 'Título',
                id1: 'title',
                name1: 'title',
                label2: '',
                id2: 'url',
                name2: 'url',
                isError: false,
                radio1: 'design1',
                radio2: 'design2',
                radio3: 'design3',
                radioChecked: '',
                backgroundImage: 'src/assets/backgrounds/up2.png',
                img1: '',
                img2: '',
                img3: '',
            }
        },
        components: {
            MainPanel,
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
        padding: 20px;
    }

    h2 {
        display: block;
    }

    .design {
        display: flex;
        justify-content: space-around;
        text-align: center;
        flex-direction: row;
    }
    .design-selection {
        display: inline-block;
        height: 300px;
        width: 300px;
        border: 1px solid green;
    }

    .design, .data, .url, .submit {
        border: 2px solid #9fafc712;
        border-radius: 5px;
        padding: 45px 50px;
    }

    .url .button-generate {
        text-align:  center;
        padding-bottom: 20px;
    }
    .url #inputText {
        width: 90%;
        display: inline-block;
    }

    .url #buttonCopy {
        width: auto;
        display: inline-block;
    }



    @media (min-width: 768px) {
        
    }
</style>