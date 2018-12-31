<template>
    <div class="footer">
        <a :href="hrefLink" target="_blank">Free App</a>
        <div class="demo-label"><a :href="hrefLink" target="_blank">{{ domain }}</a></div>
    </div>
</template>

<script>
    export default {
        name:'Footer',
        data() {
            return {
            hrefLink: window.location.protocol + '//' + window.location.host,
            domain: window.location.host
         }
        }
    }

</script>

<style lang="scss" scoped>
    .demo-label {
        box-sizing: border-box;
        width: 130px;
        padding: 6px;
        margin: 8px auto 0;
        background-color: #202020;
        a{
          color: white;
          text-transform: uppercase;
        }   
    }
    a {
        color: #757575;
        text-decoration: none;
          &:hover {
            text-decoration: none;
            font-weight: bold;
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