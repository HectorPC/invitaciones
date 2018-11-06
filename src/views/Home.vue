<template>
    <div id="home">
        <main-panel :style="{ 'background-image' : 'url(\'' + backgroundImage + '\')' }">
            <p>Elige el diseño de la invitación</p>
            <div class="design">
                <div class="design-selection" v-for="design in designs">
                   <radio :id="design.id"></radio> 
                    <card  @click.native="activeCard(design.frontDesign,design.id)" :isSelected="design.frontDesign == isSelected || radioChecked == design.id">
                        <span slot="front">{{ design.frontDesign }}</span>
                        <span slot="back">{{ design.backDesign }}</span>
                    </card>
                </div>
            </div>
            <p>Introduce el contenido de la invitación</p>
            <div class="data">
                <input-text :type="type" :label="label1" :id="id1" :name="name1" :isError="isError"></input-text>
                <div class="time">
                    <date :idDate="dateId"></date>
                    <hour :idHour="hourId"></hour>
                </div>
                <app-textarea>Textarea</app-textarea>
            </div>
            <p>Copia y comparte tu invitación</p>
            <div class="url">
                <div class="button-generate">
                    <app-button-generar @click.native="urlGenerator">Generar URL</app-button-generar>
                    <app-button-previsualizar @click.native="preview">Previsualizar</app-button-previsualizar>
                </div>
                <div class="copy">
                    <input-text :type="type" :label="label2" :id="id2" :name="name2" :isError="isError"></input-text>
                    <buttonCopy @click.native="copyUrl"></buttonCopy>
                </div>
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
                designs: [
                    {id: 'radio1', frontDesign: '1', backDesign: 'IMG1'},
                    {id: 'radio2', frontDesign: '2', backDesign: 'IMG2'},
                    {id: 'radio3', frontDesign: '3', backDesign: 'IMG3'}
                ],
                radioChecked: '',
                backgroundImage: 'src/assets/backgrounds/up2.png',
                img1: '',
                img2: '',
                img3: '',
                dateId: 'date',
                hourId: 'hour',
                selected: '',
                isSelected: ''
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
                var urlInput = document.querySelector('#url');
                urlInput.select();
                document.execCommand("copy");
            },
            urlGenerator() {
                var title = document.querySelector('#title').value;
                var date = document.querySelector('#date').value;
                var hour = document.querySelector('#hour').value;
                var description = document.querySelector('#description').value;

                var urlData = title + "/" + date + "/" + hour + "/" + description;
                var url = this.$route.path + urlData;
                document.querySelector('#url').value = url;

                console.log("title: " + title + " date: " + date + " hour: " + hour + " description: " + description);

                return url;
            },
            formatDate(notFormatDate) {
                return date;
            },
            formatDescription(notFormatDescription) {
                return description;
            },
            encriptUrl(url) {
                return encriptUrl;
            },
            preview() {
                var url = this.urlGenerator();
                this.$router.push(url);
            },
            activeCard(active,idRadio) {
                this.clearMoveCard();
                this.isSelected = active;
                document.querySelector('#'+idRadio).checked = true;
            },
            clearMoveCard() {
                this.isSelected = '';
                this.radioChecked = '';
            }
        },
        created() {
            EventBus.$on('changeRadioEvent', (radioChecked) => {
                this.clearMoveCard();
                this.radioChecked = radioChecked.id;
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

    .design, .time {
        display: flex;
        justify-content: space-around;
        text-align: center;
        flex-direction: row;
    }

    .time * {
        flex-grow: .5;
    }

    .time :nth-child(1) {
        padding-right: 5%;
    }

    .design-selection {
        height: 300px;
        width: 300px;
        border: 1px solid green;
    }

    .design-selection .custom-radios {
        display: block;
        position: relative;
        float: left;
        z-index: 1;
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

    .copy {
        display: flex;
    }

    @media (min-width: 768px) {
        
    }
</style>