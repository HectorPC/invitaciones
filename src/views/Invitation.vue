<template>
    <div id="invitation">

        <div v-if="getDesignType(path) == 'radio1'" class="wrapper front-type-1">
            <h2> {{ getTitle(path) }} </h2>
            <div class="date-hour">
                <span class="date">Fecha {{ getInvitationType(path) }}: <b>{{ getDate(path) }}</b></span><span class="hour">Hora: <b>{{ getHour(path) }}</b></span>
            </div>
            <div class="description">
                <p v-html="getDescription(path)"></p>
            </div>
        </div>

        <div v-if="getDesignType(path) == 'radio2'" class="wrapper front-type-2">
            <div class="date-hour">
                <span class="date">{{ getDate(path) }}</span><span class="hour">{{ getHour(path) }}</span>
            </div>
            <h2> {{ getTitle(path) }} </h2>
            <div class="description">
                <p v-html="getDescription(path)"></p>
            </div>
        </div>

        <div v-if="getDesignType(path) == 'radio3'" class="wrapper front-type-3">
            <h2> {{ getTitle(path) }} </h2>
            <div class="description">
                <p v-html="getDescription(path)"></p>
            </div>
            <div class="date-hour">
                <span class="date">{{ getDate(path) }}</span><span class="hour">{{ getHour(path) }}</span>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Invitation',
        data() {
            return {
                invitationType: '',
                designType: '',
                srcImg: '',
                title: '',
                date: '',
                hour: '',
                description: ''
            }
        },
        computed: {
            path() {
                return this.$route.path;
            }
        },
        methods: {
            getInvitationType(path) {
                var invitationArray = path.split('/');
                return this.decodeUrl(invitationArray[2])
            },
            getDesignType(path) {
                var invitationArray = path.split('/');
                return invitationArray[3]
            },
            getSrcImg(path) {
                var invitationArray = path.split('/');
                return invitationArray[4]
            },
            getTitle(path) {
                var invitationArray = path.split('/');
                return this.decodeUrl(invitationArray[5])
            },
            getDate(path) {
                var invitationArray = path.split('/');
                return invitationArray[6]
            },
            getHour(path) {
                var invitationArray = path.split('/');
                return invitationArray[7]
            },
            getDescription(path) {
                var invitationArray = path.split('/');
                return this.formatDescription(this.decodeUrl(invitationArray[8]))
            },
            decodeUrl(urlEncode) {
                return decodeURI(urlEncode);
            },
            formatDescription(notFormatDescription) {
                var formatDescription = notFormatDescription.split('breaklLine').join('<br>');
                formatDescription = formatDescription.split('+').join(' ');
                return formatDescription
            }

        }

    }
</script>

<style scoped>

#invitation {
    text-align: center;
}

.wrapper {
    border: 2px solid green;

    height: 98vh;
}

h2 {
    border: 1px dotted pink;

    height: 10vh;
    position: relative;
    top: 10px;
}

.date-hour {
    border: 1px solid red;

    display: flex;
    justify-content: space-around;
    height: 10vh;
}

.date {
    border: 1px solid black;

    padding: 20px;
}

.hour {
    border: 1px solid black;

    padding: 20px;
}

.description {
    border: 3px solid orange;

    padding: 20px;
    height: 50vh;
}

.description p {
    text-align: justify;
    padding: 40px;
}

</style>