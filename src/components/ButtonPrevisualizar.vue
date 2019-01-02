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
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #c7c745), color-stop(1, #9bbd2a));
        background: -moz-linear-gradient(top, #c7c745 5%, #9bbd2a 100%);
        background: -webkit-linear-gradient(top, #c7c745 5%, #9bbd2a 100%);
        background: -o-linear-gradient(top, #c7c745 5%, #9bbd2a 100%);
        background: -ms-linear-gradient(top, #c7c745 5%, #9bbd2a 100%);
        background: linear-gradient(to bottom, #c7c745 5%, #9bbd2a 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#c7c745', endColorstr='#9bbd2a', GradientType=0);
        background-color: #c7c745;
        -moz-border-radius: 5px 28px 28px 5px;
        -webkit-border-radius: 5px 28px 28px 5px;
        border-radius: 5px 28px 28px 5px;
        border: 3px solid #9aab19;
        display: inline-block;
        cursor: pointer;
        color: #ffffff;
        font-family: Arial;
        font-size: 18px;
        padding: 11px 16px;
        text-decoration: none;
        text-shadow: 1px 1px 0px #5d6628;
    }

    .myButton:hover {
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #9bbd2a), color-stop(1, #c7c745));
        background: -moz-linear-gradient(top, #9bbd2a 5%, #c7c745 100%);
        background: -webkit-linear-gradient(top, #9bbd2a 5%, #c7c745 100%);
        background: -o-linear-gradient(top, #9bbd2a 5%, #c7c745 100%);
        background: -ms-linear-gradient(top, #9bbd2a 5%, #c7c745 100%);
        background: linear-gradient(to bottom, #9bbd2a 5%, #c7c745 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#9bbd2a', endColorstr='#c7c745', GradientType=0);
        background-color: #9bbd2a;
    }

    .myButton:active {
        position: relative;
        top: 1px;
    }
</style>