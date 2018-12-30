<template>
    <div>
<!-- https://codepen.io/erikterwan/pen/EVzeRP -->

<nav role="navigation">
  <span class="header-text">Mi Invitación Online</span>
        <div id="menuToggle">
          <input id="closeMenu" type="checkbox" />

          <span></span>
          <span></span>
          <span></span>

          <ul id="menu">
            <a href="#" v-for="(invitation, key) in invitationTypes" :key="key">
              <li @click="closeMenu($event)">{{ invitation.name }}</li>
            </a>
          </ul>
        </div>
      </nav>

    </div>
</template>

<script>
    import EventBus from '../event-bus'
    import InvitationTypes from '../data/headerData.js'
    export default {
      data() {
            return {
                selected: '',
                invitationTypes: InvitationTypes.invitationTypes
            }
        },
        methods: {
          closeMenu() {
            document.querySelector("#closeMenu").checked = false;
            EventBus.$emit('changeInvitationType', event.target);
          }
        }
    }
</script>

<style lang="scss" scoped>

a
{
  text-decoration: none;
  color: #232323;
  
  transition: color 0.3s ease;
}

a:hover
{
  color: tomato;
}

#menuToggle
{
  display: block;
  position: fixed;
  top: 25px;
  left: 25px;
  
  z-index: 1;
  
  -webkit-user-select: none;
  user-select: none;
}

#menuToggle input
{
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;
  
  cursor: pointer;
  
  opacity: 0; /* hide this */
  z-index: 2; /* and place it over the hamburger */
  
  -webkit-touch-callout: none;
}

#menuToggle span
{
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  
  background: #cdcdcd;
  border-radius: 3px;
  
  z-index: 1;
  
  transform-origin: 4px 0px;
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
}

#menuToggle span:first-child
{
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2)
{
  transform-origin: 0% 100%;
}


#menuToggle input:checked ~ span
{
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
  background: #232323;
}


#menuToggle input:checked ~ span:nth-last-child(3)
{
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}


#menuToggle input:checked ~ span:nth-last-child(2)
{
  transform: rotate(-45deg) translate(0, -1px);
}

#menu
{
  position: fixed;
  width: 180px;
  margin: -100px 0 0 -50px;
  padding: 50px;
  padding-top: 125px;
  height: 100%;
  background: #ededed;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */
  
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
}

#menu li
{
  padding: 10px 0;
  font-size: 22px;
}


#menuToggle input:checked ~ ul
{
  transform: none;
}


.header-text {
    position: relative;
    top: 18px;
    left: 95px;
    font-size: 25px;
}

</style>