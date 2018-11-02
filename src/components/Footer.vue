<template>
    <div class="footer">
        <a :href="hrefLink">Made by Vuejs</a>
        <div class="demo-label">DEMO ONLY</div>
    </div>
</template>

<script>
    export default {
        name:'Footer',
        props: {
            hrefLink: {default:'', type: String}
        }

    }
</script>

<style lang="scss" scoped>
    .demo-label {
        box-sizing: border-box;
        width: 120px;
        padding: 6px;
        margin: 8px auto 0;
        background-color: #202020;
        color: white;
        text-transform: uppercase;
    }
    a {
        color: #757575;
        text-decoration: none;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        margin-top: 20px;
        line-height: 24px;
        font-size: 13px;
        z-index: 1;
    }
</style>