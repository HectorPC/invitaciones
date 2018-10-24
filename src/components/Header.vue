<template>
    <div id="header">

        <header class="main_header">

            <div class="row">
                <div class="content">
                    <a class="logo" href="#">HPC</a>
                    <nav>
                        <ul>
                            <li v-for="invitation in invitationTypes">
                                <nav-link :class="{active : invitation.name == selected}" @click.native="activeLink(invitation.name)">{{ invitation.name }}</nav-link>
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
    export default {
        data() {
            return {
                selected: '',
                invitationTypes: [
                    {name: 'Section01'},
                    {name: 'Section02'},
                    {name: 'Section03'},
                    {name: 'Section04'}
                ]
            }
        },
        methods: {
            activeLink(active) {
                this.selected = active;
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
        max-width: 940px;
        width: 100%;
        margin: 0 auto;
        padding: 50px 2% 50px;
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
        width: 50px;
        font-size: 25px;
        color: #8f8f8f;
        text-transform: uppercase;
        float: left;
        display: block;
        margin-top: 0;
        line-height: 1;
        margin-bottom: 10px;
    }

    nav {
        float: right;
        width: 60%;
    }

    nav ul {
        list-style: none;
        overflow: hidden;
        text-align: right;
        float: right;
    }

    nav ul li {
        display: inline-block;
        margin-left: 35px;
        line-height: 1.5;
    }

    .active {
        background: white;
        font-weight: bold;
        border-radius: 3px;
    }
    
</style>