<template>
    <div class="content">
        <div class="choice">¿Qué necesito?</div>
        <router-link class="router-link" to="/homeInvitation">
            <div class="invitation-generator">Generar Invitación</div>
        </router-link>
        <router-link class="router-link" to="/homeList">
            <div class="list-generator">Generar Lista</div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "ChoiceHome"
    }
</script>

<style scoped>
.content {
    text-align: center;
}
.invitation-generator, .list-generator {
    border: 1px solid green;
    border-radius: 3px;
    display: inline-grid;
    grid-template-columns: min-content;
    padding: 50px;
    margin: 10px;
    text-align: center;
}
.router-link, .router-link:visited {
    text-decoration: none;
    color: var(--contact-background);
}
.router-link:hover {
    color: blue;
}

</style>