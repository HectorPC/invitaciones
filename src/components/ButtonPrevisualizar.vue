<template>
    <div id="buttonPrevisualizar">
        <a href="#" class="myButton">
            <slot></slot>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'ButtonPrevisualizar'
    }
</script>

<style scoped>
    #buttonPrevisualizar {
        display: inline-block;
    }
    .myButton {
        display: inline-block;
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #637fb5), color-stop(1, #1D55BF));
        background: -moz-linear-gradient(top, #637fb5 5%, #1D55BF 100%);
        background: -webkit-linear-gradient(top, #637fb5 5%, #1D55BF 100%);
        background: -o-linear-gradient(top, #637fb5 5%, #1D55BF 100%);
        background: -ms-linear-gradient(top, #637fb5 5%, #1D55BF 100%);
        background: linear-gradient(to bottom, #637fb5 5%, #1D55BF 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#637fb5', endColorstr='#1D55BF', GradientType=0);
        background-color: #637fb5;
        -moz-border-radius: 5px 28px 28px 5px;
        -webkit-border-radius: 5px 28px 28px 5px;
        border-radius: 5px 28px 28px 5px;
        border: 3px solid #1D55BF;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 18px;
        padding: 11px 16px;
        text-decoration: none;
        text-shadow: 1px 1px 0px #637fb5;
        box-shadow: 5px 10px 8px 1px #888888;
    }

    .myButton:active {
        position: relative;
        top: 1px;
    }
</style>