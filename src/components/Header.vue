<template>
    <div id="header">

        <header class="main_header">

            <div class="row">
                <div class="content">
                   <img src="assets/backgrounds/logoV01.png"/><span class="logo">Mi Invitación Online</span>
                    <nav>
                        <ul>
                            <li v-for="(invitation, key) in invitationTypes" :key="key">
                                <nav-link :class="{active : invitation.name == selected}" @click.native="activeLink($event,invitation.name)">{{ invitation.name }}</nav-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </header>

    </div>
</template>

<script>
    import NavLink from './NavLink.vue'
    import EventBus from '../event-bus'
    import InvitationTypes from '../data/headerData.js'
    export default {
        data() {
            return {
                selected: 'Boda',
                invitationTypes: InvitationTypes.invitationTypes
            }
        },
        methods: {
            activeLink(event,active) {
                this.selected = active;
                EventBus.$emit('changeInvitationType', event.target);
            }
        },
        components: {
            NavLink
        }
    }
</script>

<style lang="scss" scoped>
    * {
        box-sizing: border-box;
    }

    #header {
        height: 70px;
        opacity: .9;
    }

    a {
        text-decoration: none;
    }

    .row {
        width: 100%;
        margin: 0 auto;
        position: relative;
        padding: 0 2%;
    }

    .content {
        width: 100%;
        margin: 0 auto;
        padding: 50px 2% 50px;
    }

      .content img {
        width: 60px;
        height: 60px;
        float: left;
        margin-top: -13px;
    }

    .main_header .row .content {
        padding: 0;
    }

    .main_header {
        position: fixed;
        top: 0px;
        left: 0px;
        max-height: 70px;
        width: 100%;
        padding-top: 17px;
        overflow: hidden;
        transition: all 0.3s;
        padding-bottom: 6px;
        /* font-family: "Oswald", sans-serif; */
        background: black;
    }

    .logo {
        width: 300px;
        font-size: 25px;
        color: white;
        // text-transform: uppercase;
        float: left;
        display: block;
        margin-top: 0;
        margin-bottom: 10px;
        margin-left: 14px;
        font-size: 35px;
    }

    nav {
        float: right;
    }

    nav ul {
        list-style: none;
        overflow: hidden;
        text-align: right;
        float: right;
        padding: 0px;
    }

    nav ul li {
        display: inline-block;
        margin-left: 8px;
        line-height: 1.5;
    }

    .active {
        background: white;
        font-weight: bold;
        border-radius: 3px;
    }
    
</style>