<template>
    <div>
        <a class="seventh before after" href="#">
            <slot></slot>
        </a>
    </div>
</template>

<script>
    export default {
        name:'NavLink'
    }
</script>

<style lang="scss" scoped>

    a, a:visited, a:hover, a:active {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        position: relative;
        transition: 0.5s color ease;
        text-decoration: none;
        color: #81b3d2;
        font-size: 18px;
        padding: 0px 5px;
    }

    a:hover {
        color: #81b3d2;
    }

    a.before:before, a.after:after {
        content: "";
        transition: 0.5s all ease;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        position: absolute;
    }

    a.before:before {
        top: -0.25em;
    }

    a.after:after {
        bottom: -0.25em;
    }

    a.before:before, a.after:after {
        height: 5px;
        width: 0px;
        background: #316fb6;
    }

    a.seventh:before {
        right: 0;
    }

    a.seventh:after {
        left: 0;
    }

    a.before:hover:before, a.after:hover:after {
        width: 100%;
    }


</style>