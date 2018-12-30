<template>
  <div
    id="invitation"
    :style="{ 'background-image' : 'url(\'' + background + '\')' }"
  >
    <div v-if="getDesignType(path) == 'radio1'" class="wrapper front-type-1">
      <h2>{{ getTitle(path) }}</h2>
      <div class="date-hour">
        <span class="date"
          >Fecha {{ getInvitationType(path) }}: <b>{{ getDate(path) }}</b></span
        ><span class="hour"
          >Hora: <b>{{ getHour(path) }}</b></span
        >
      </div>
      <div class="description"><p v-html="getDescription(path)"></p></div>
    </div>

    <div v-if="getDesignType(path) == 'radio2'" class="wrapper front-type-2">
      <div class="date-hour">
        <span class="date"
          >Fecha {{ getInvitationType(path) }}: <b>{{ getDate(path) }}</b></span
        ><span class="hour"
          >Hora: <b>{{ getHour(path) }}</b></span
        >
      </div>
      <h2>{{ getTitle(path) }}</h2>
      <div class="description"><p v-html="getDescription(path)"></p></div>
    </div>

    <div v-if="getDesignType(path) == 'radio3'" class="wrapper front-type-3">
      <h2>{{ getTitle(path) }}</h2>
      <div class="description"><p v-html="getDescription(path)"></p></div>
      <div class="date-hour">
        <span class="date"
          >Fecha {{ getInvitationType(path) }}: <b>{{ getDate(path) }}</b></span
        ><span class="hour"
          >Hora: <b>{{ getHour(path) }}</b></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Invitation",
  computed: {
    path() {
      return this.$route.path;
    },
    background() {
      return `${this.getDomainUrl()}/${this.setBackground()}`;
    },
    srcImg() {
      var invitationArray = this.path.split("/");
      return invitationArray[4];
    }
  },
  methods: {
    getInvitationType(path) {
      var invitationArray = path.split("/");
      return this.decodeUrl(invitationArray[2]);
    },
    getDesignType(path) {
      var invitationArray = path.split("/");
      return invitationArray[3];
    },
    getTitle(path) {
      var invitationArray = path.split("/");
      return this.decodeUrl(invitationArray[5]);
    },
    getDate(path) {
      var invitationArray = path.split("/");
      return invitationArray[6];
    },
    getHour(path) {
      var invitationArray = path.split("/");
      return invitationArray[7];
    },
    getDescription(path) {
      var invitationArray = path.split("/");
      return this.formatDescription(this.decodeUrl(invitationArray[8]));
    },
    decodeUrl(urlEncode) {
      return decodeURI(urlEncode);
    },
    formatDescription(notFormatDescription) {
      var formatDescription = notFormatDescription
        .split("breaklLine")
        .join("<br>");
      formatDescription = formatDescription.split("+").join(" ");
      return formatDescription;
    },
    setBackground() {
      return `./assets/backgrounds/${this.srcImg}`;
    },
    getDomainUrl() {
      return window.location.protocol + "//" + window.location.host;
    }
  }
};
</script>

<style scoped>
#invitation {
  text-align: center;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: x-large;
}

.wrapper {
  height: 98vh;
}

h2 {
  height: 10vh;
  position: relative;
  top: 10px;
}

.date-hour {
  display: flex;
  justify-content: space-around;
  height: 10vh;
}

.date {
  padding: 20px;
}

.hour {
  padding: 20px;
}

.description {
  padding: 20px;
  height: 50vh;
}

.description p {
  text-align: justify;
  padding: 40px;
}

*[title] {
  pointer-events: none;
}
</style>
