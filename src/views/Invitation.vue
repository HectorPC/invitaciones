<template>
    <div id="invitation">

        <div class="front-type-1">
            <h2> {{title}} </h2>
            <div class="date">
                <span>{{ date }}</span><span>{{ hour }}</span>
            </div>
            <div class="description">
                {{ description }}
            </div>
        </div>

        <div class="front-type-2">
            <div class="date">
                <span>{{ date }}</span><span>{{ hour }}</span>
            </div>
            <h2> {{title}} </h2>
            <div class="description">
                {{ description }}
            </div>
        </div>

        <div class="front-type-3">
            <h2> {{title}} </h2>
            <div class="description">
                {{ description }}
            </div>
            <div class="date">
                <span>{{ date }}</span><span>{{ hour }}</span>
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
                return this.$router.fullPath;
            }
        },
        methods: {
            getInvitationType() {

            },
            getDesignType() {

            },
            getSrcImg() {

            },
            getTitle() {

            },
            getDate() {

            },
            getHour() {

            },
            getDescription() {

            }
        }
        

    }
</script>

<style scoped>

</style>