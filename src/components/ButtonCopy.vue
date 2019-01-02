<template>
    <div id="buttonCopy">
        <button class="button">
            <span data-title="COPIADO">COPIAR<img src="../../public/assets/img/copy-icon.png"/></span>
        </button>
    </div>
</template>

<script>
export default {
  name: "ButtonCopy"
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  border: 0px none;
}

.button {
  display: inline-block;
  overflow: hidden;
  perspective: 400px;
  background-color: transparent;
  width: 105px;
  -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(50%, transparent), to(rgba(255, 255, 255, 0.3)));
  border-radius: 22px;
  border: 1px dotted;
}

.button span {
  display: block;
  position: relative;
  transition: 0.3s ease-in-out all;
  transform-origin: 50% 0;
  transform-style: preserve-3d;
  background-color: black;
  color: white;
  padding: 0px 8px 14px 10px;
}

.button span:after {
  display: block;
  content: attr(data-title);
  position: absolute;
  left: -14px;
  top: 5px;
  transition: 0.3s ease-in-out all;
  transform-origin: 50% 0;
  transform: translate3d(0px, 105%, 0px) rotateX(-90deg);
  background-color: white;
  color: black;
  width: 100%;
  padding: 10px;
}

.button:focus span {
  transform: translate3d(0px, 0px, -30px) rotateX(90deg);
}

img {
  position: relative;
  top: 5px;
  left: 5px;
  width: 17px;
  height: 17px;
  padding: 5px;
}
</style>