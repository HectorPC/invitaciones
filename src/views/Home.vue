<template>
  <div id="home">
    <main-panel :style="{ 'background-image' : 'url(\'' + backgroundImage + '\')' }">
      <p>Elige el diseño de la invitación</p>
      <div class="design">
        <div class="design-selection" v-for="(design, key) in designs" :key="key">
          <radio :id="design.id"></radio>
          <card
            :class="{activeCard : design.frontDesign == isSelected}"
            @click.native="activeCard(design.frontDesign,design.id)"
            :isSelected="design.frontDesign == isSelected || radioChecked == design.id"
          >
            <span slot="front">{{ design.frontDesign }}</span>
            <img
              class="imgDesign"
              v-if="invitationType=='Boda'"
              slot="back"
              :src="design.backDesign[backDesignNumberArray].boda"
            />
            <img
              class="imgDesign"
              v-if="invitationType=='Comunión'"
              slot="back"
              :src="design.backDesign[backDesignNumberArray].comunion"
            />
            <img
              class="imgDesign"
              v-if="invitationType=='Bautizo'"
              slot="back"
              :src="design.backDesign[backDesignNumberArray].bautizo"
            />
            <img
              class="imgDesign"
              v-if="invitationType=='Cumpleaños'"
              slot="back"
              :src="design.backDesign[backDesignNumberArray].cumpleanos"
            />
            <img
              class="imgDesign"
              v-if="invitationType=='Evento'"
              slot="back"
              :src="design.backDesign[backDesignNumberArray].evento"
            />
          </card>
        </div>
      </div>
      <p>Introduce el contenido de la invitación</p>
      <div class="data">
        <input-text :type="type" :label="label1" :id="id1" :name="name1" :isError="isError"></input-text>
        <div class="time">
          <date :idDate="dateId" :label="labelDate"></date>
          <hour :idHour="hourId" :label="labelHour"></hour>
        </div>
        <app-textarea>Textarea</app-textarea>
      </div>
      <p>Copia y comparte tu invitación</p>
      <div class="url">
        <div class="button-generate">
          <app-button-generar id="generar" @click.native="urlGenerator">Generar URL</app-button-generar>
          <app-button-previsualizar id="previsualizar" @click.native="preview">Previsualizar</app-button-previsualizar>
        </div>
        <div class="copy">
          <input-text :type="type" :label="label2" :id="id2" :name="name2" :isError="isError"></input-text>
          <buttonCopy @click.native="copyUrl"></buttonCopy>
        </div>
      </div>
      <div class="share">
        <h4>Share</h4>
        <vue-goodshare-facebook :page_url="urlGenerated" title_social="Facebook" has_icon></vue-goodshare-facebook>
        <vue-goodshare-twitter :page_url="urlGenerated" title_social="Twitter" has_icon></vue-goodshare-twitter>
        <vue-goodshare-pinterest :page_url="urlGenerated" title_social="Pinterest" has_icon></vue-goodshare-pinterest>
        <vue-goodshare-reddit :page_url="urlGenerated" title_social="Reddit" has_icon></vue-goodshare-reddit>
        <vue-goodshare-linkedIn :page_url="urlGenerated" title_social="LinkedIn" has_icon></vue-goodshare-linkedIn>
        <vue-goodshare-email :page_url="urlGenerated" title_social="email" has_icon></vue-goodshare-email>
        <vue-goodshare-whatsApp :page_url="urlGenerated" title_social="WhatsApp" has_icon></vue-goodshare-whatsApp>
        <vue-goodshare-telegram :page_url="urlGenerated" title_social="Telegram" has_icon></vue-goodshare-telegram>
      </div>
      <!--  -->
      <div class="suggestions" @click="onToggle()">
        <div>
          <span>Buzón de sugerencias</span>
        </div>
        <div>
          <img src="../../public/assets/img/email-open.png" />
        </div>
      
      <transition name="fade">
        <div class="form-style-6" v-if="show">
          <h1>Sugerencias</h1>
          <form action="https://formspree.io/xknollol" method="POST">
            <input type="text" name="name" placeholder="Tu nombre" />
            <input type="email" name="email" placeholder="Tu email" />
            <textarea name="text" placeholder="Escribe tu sugerencia"></textarea>
            <input type="submit" value="Enviar sugerencia" />
          </form>
        </div>
      </transition>
</div>
      <!--  -->
    </main-panel>
  </div>
</template>

<script>
import MainPanel from "../components/MainPanel.vue";
import InputText from "../components/InputText.vue";
import Radio from "../components/Radio.vue";
import ButtonCopy from "../components/ButtonCopy.vue";
import Card from "../components/Card.vue";
import Textarea from "../components/Textarea.vue";
import Date from "../components/Date.vue";
import Hour from "../components/Hour.vue";
import ButtonGenerar from "../components/ButtonGenerar.vue";
import ButtonPrevisualizar from "../components/ButtonPrevisualizar.vue";
import EventBus from "../event-bus";
import Designs from "../data/designsData.js";
import InvitationTypes from "../data/headerData.js";
// Import vue-goodshare single elements
import VueGoodshareFacebook from "vue-goodshare/src/providers/Facebook.vue";
import VueGoodshareTwitter from "vue-goodshare/src/providers/Twitter.vue";
import VueGoodsharePinterest from "vue-goodshare/src/providers/Pinterest.vue";
import VueGoodshareReddit from "vue-goodshare/src/providers/Reddit.vue";
import VueGoodshareLinkedIn from "vue-goodshare/src/providers/LinkedIn.vue";
import VueGoodshareEmail from "vue-goodshare/src/providers/Email.vue";
import VueGoodshareWhatsApp from "vue-goodshare/src/providers/WhatsApp.vue";
import VueGoodshareTelegram from "vue-goodshare/src/providers/Telegram.vue";

export default {
  name: "Home",
  data() {
    return {
      invitationType: InvitationTypes.invitationTypes[0]["name"],
      type: "text",
      label1: "Título",
      id1: "title",
      name1: "title",
      label2: "",
      id2: "url",
      name2: "url",
      isError: false,
      designs: Designs.designs,
      radioChecked: "",
      backgroundImage: "./assets/backgrounds/up2.png",
      img1: "",
      img2: "",
      img3: "",
      dateId: "date",
      hourId: "hour",
      selected: "",
      isSelected: "",
      labelDate: "Fecha",
      labelHour: "Hora",
      backDesignNumberArray: 0,
      urlGenerated: window.location.protocol + "//" + window.location.host,
      show: false
    };
  },
  components: {
    MainPanel,
    InputText,
    Radio,
    ButtonCopy,
    Card,
    Date,
    Hour,
    appButtonGenerar: ButtonGenerar,
    appButtonPrevisualizar: ButtonPrevisualizar,
    appTextarea: Textarea,
    VueGoodshareFacebook,
    VueGoodshareTwitter,
    VueGoodsharePinterest,
    VueGoodshareReddit,
    VueGoodshareLinkedIn,
    VueGoodshareEmail,
    VueGoodshareWhatsApp,
    VueGoodshareTelegram
  },
  methods: {
    copyUrl() {
      var urlInput = document.querySelector("#url");
      urlInput.select();
      document.execCommand("copy");
    },
    urlGenerator() {
      var invitationType = this.invitationType;
      var design = this.radioChecked;
      if (design === "") {
        design = "radio1";
      }
      var title = document.querySelector("#title").value;
      var date = this.formatDate(document.querySelector("#date").value);
      var hour = document.querySelector("#hour").value;
      var description = this.formatText(
        document.querySelector("#description").value
      );

      if (title === "") {
        title = "-";
      } else {
        title = this.formatText(title);
      }
      if (date === "") {
        date = "-";
      }
      if (hour === "") {
        hour = "-";
      }
      if (description === "") {
        description = "-";
      }

      try {
        var srcImg = this.formatSrcImg(
          document.querySelector(".activeCard .imgDesign").src
        );
      } catch (e) {
        srcImg = "no-image-design";
      }

      var urlData =
        this.getDomainUrl() +
        "/invitation/" +
        invitationType +
        "/" +
        design +
        "/" +
        srcImg +
        "/" +
        title +
        "/" +
        date +
        "/" +
        hour +
        "/" +
        description;
      var url = urlData;
      document.querySelector("#url").value = url;
      this.urlGenerated = url;
      return url;
    },
    formatDate(notFormatDate) {
      return notFormatDate
        .split("-")
        .reverse()
        .join("-");
    },
    formatText(notFormatText) {
      var description = notFormatText.replace(/\r|\n|\r\n/g, "breaklLine");
      description = description.split(" ").join("+");
      return description;
    },
    formatSrcImg(src) {
      var partsSrc = src.split("/");
      return partsSrc[partsSrc.length - 1];
    },
    preview() {
      var url = this.urlGenerator();
      var win = window.open(url, "_blank");
      win.focus();
      //  this.$router.push(url)
    },
    activeCard(active, idRadio) {
      this.clearMoveCard();
      this.isSelected = active;
      this.radioChecked = idRadio;
      document.querySelector("#" + idRadio).checked = true;
    },
    clearMoveCard() {
      this.isSelected = "";
      this.radioChecked = "";
    },
    getDomainUrl() {
      return window.location.protocol + "//" + window.location.host;
    },
    onToggle() {
      this.show = !this.show;
    }
  },
  created() {
    EventBus.$on("changeRadioEvent", radioChecked => {
      this.clearMoveCard();
      this.radioChecked = radioChecked.id;
    });
    EventBus.$on("changeInvitationType", invitation => {
      this.invitationType = invitation.innerText;
      switch (invitation.innerText) {
        case "Boda":
          this.backDesignNumberArray = 0;
          break;
        case "Comunión":
          this.backDesignNumberArray = 1;
          break;
        case "Bautizo":
          this.backDesignNumberArray = 2;
          break;
        case "Cumpleaños":
          this.backDesignNumberArray = 3;
          break;
        case "Evento":
          this.backDesignNumberArray = 4;
          break;
        default:
          this.backDesignNumberArray = 0;
          break;
      }
    });
  }
};
</script>

<style scoped>
#home {
  max-width: 1440px;
  margin: 0 auto;
  overflow: auto;
  max-height: 100vh;
  margin-bottom: 20px;
  padding: 20px;
}

#home p {
  font-size: 1.5em;
}

.design,
.time {
  display: flex;
  justify-content: space-around;
  text-align: center;
  flex-direction: row;
}

.time * {
  flex-grow: 0.5;
}

.time :nth-child(1) {
  padding-right: 5%;
}

.design-selection {
  height: 100%;
  width: 100%;
  padding: 10px;
}

.design-selection .custom-radios {
  display: block;
  position: relative;
  float: left;
  z-index: 1;
}

.design,
.data,
.url,
.submit {
  border: 2px solid #617fab26;
  border-radius: 5px;
  padding: 45px 50px;
}

.url .button-generate {
  text-align: center;
  padding-bottom: 20px;
}

#generar,
#previsualizar {
  display: inline-block;
}
.url #inputText {
  width: 90%;
  display: inline-block;
}

.url #buttonCopy {
  width: auto;
  display: inline-block;
}

.copy {
  display: flex;
}

.share {
  text-align: center;
  padding-right: 100px;
  padding-left: 100px;
  padding-bottom: 100px;
}

.suggestions {
  height: 430px;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* Contact form */

.form-style-6 {
  max-width: 400px;
  margin: 10px auto;
  padding: 16px;
  background: #f7f7f7;
}
.form-style-6 h1 {
  background: var(--contact-background);
  padding: 20px 0;
  font-size: 140%;
  font-weight: 300;
  text-align: center;
  color: #fff;
  margin: -16px -16px 16px -16px;
}
.form-style-6 input[type="text"],
.form-style-6 input[type="date"],
.form-style-6 input[type="datetime"],
.form-style-6 input[type="email"],
.form-style-6 input[type="number"],
.form-style-6 input[type="search"],
.form-style-6 input[type="time"],
.form-style-6 input[type="url"],
.form-style-6 textarea,
.form-style-6 select {
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  outline: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  background: #fff;
  margin-bottom: 4%;
  border: 1px solid #ccc;
  padding: 3%;
  color: #555;
}
.form-style-6 input[type="text"]:focus,
.form-style-6 input[type="date"]:focus,
.form-style-6 input[type="datetime"]:focus,
.form-style-6 input[type="email"]:focus,
.form-style-6 input[type="number"]:focus,
.form-style-6 input[type="search"]:focus,
.form-style-6 input[type="time"]:focus,
.form-style-6 input[type="url"]:focus,
.form-style-6 textarea:focus,
.form-style-6 select:focus {
  box-shadow: 0 0 5px var(--contact-background);
  padding: 3%;
  border: 1px solid var(--contact-background);
  resize: vertical;
}

.form-style-6 input[type="submit"],
.form-style-6 input[type="button"] {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  padding: 3%;
  background: var(--contact-background);
  border-bottom: 2px solid var(--contact-background);
  border-top-style: none;
  border-right-style: none;
  border-left-style: none;
  color: #fff;
  font-size: 12px;
}
.form-style-6 input[type="submit"]:hover,
.form-style-6 input[type="button"]:hover {
  background: #083c9ced;
}
/* End contact form */

@media screen and (max-width: 768px) {
  .design,
  .time {
    flex-direction: column;
  }
  #previsualizar {
    display: none;
  }
}
</style>