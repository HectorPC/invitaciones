<template>
    <div id="invitation">

        <div v-if="getDesignType(path) == 'radio1'" class="wrapper front-type-1">
            <h2> {{ getTitle(path) }} </h2>
            <div class="date">
                <span>{{ getDate(path) }}</span><span>{{ getHour(path) }}</span>
            </div>
            <div class="description">
                {{ getDescription(path) }}
            </div>
        </div>

        <div v-if="getDesignType(path) == 'radio2'" class="wrapper front-type-2">
            <div class="date">
                <span>{{ getDate(path) }}</span><span>{{ getHour(path) }}</span>
            </div>
            <h2> {{ getTitle(path) }} </h2>
            <div class="description">
                {{ getDescription(path) }}
            </div>
        </div>

        <div v-if="getDesignType(path) == 'radio3'" class="wrapper front-type-3">
            <h2> {{ getTitle(path) }} </h2>
            <div class="description">
                {{ getDescription(path) }}
            </div>
            <div class="date">
                <span>{{ getDate(path) }}</span><span>{{ getHour(path) }}</span>
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
                return invitationArray[2]
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
                return invitationArray[5]
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
                return invitationArray[8]
            }
        }
        

    }
</script>

<style scoped>

.wrapper {
    border: 1px solid green;
}

</style>