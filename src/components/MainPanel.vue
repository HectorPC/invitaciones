<template>
    <div id="mainPanel" :style="{ 'background-image' : 'url(\'' + image + '\')' }">
    <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'MainPanel',
        props: {
            image: {default: ''}
        }
    }
</script>

<style scoped>
    #mainPanel {
        background-position: center; /* Center the image */
        background-repeat: no-repeat; /* Do not repeat the image */
        // background-size: cover;
        overflow: hidden;
        margin-bottom: 100px;
    }
</style>