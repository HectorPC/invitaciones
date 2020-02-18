<template>
  <div class="home-list">
    <div class="list-type-container">
      <div
        class="list-type"
        v-for="(list,key) in options"
        :key="key"
        :class="{'active': listSelected === list}"
        @click="selectList(list)"
      >{{list}}</div>
    </div>
    <div id="table" class="table" v-if="listSelected!== ''">
      <div class="header-table">
        <div class="header">
          <span>~ {{listSelected}} ~</span>
        </div>
      </div>
      <div class="body-table">
        <div class="recover-save">
          <div class="button-list">
            <button class="recover-list" @click="recover">
              <span v-if="(listType === listSelected) && !isOverwritten">Recuperar lista compartida</span>
              <span v-else>Recuperar lista guardada</span>
            </button>
          </div>
          <div class="button-list">
            <button class="save-list" @click="save(items, '')">Guardar lista</button>
          </div>
        </div>
        <div class="block-item" v-for="(item,key) in items" :key="key">
          <div class="row check">
            <div class="custom-checkbox"></div>
            <div class="simple-checkbox">
              <input
                class="larger-checkbox"
                type="checkbox"
                name
                :id="item.name"
                v-model="item.checked"
                :value="item.name"
              />
              <span class="item-name">{{item.name}}</span>
            </div>

            <div class="edit-delete">
              <div class="delete">
                <i class="material-icons" @click="deleteItem(item)">delete_forever</i>
              </div>
            </div>
          </div>
        </div>
        <div class="row add-item">
          <i class="material-icons" @click="newItem">library_add</i>
          <span class="add-text">Nuevo item</span>
          <div class="insert-text" v-if="isNew">
            <input-text
              class="input-text-add"
              type="input"
              id="insertText"
              name="insertText"
              placeholder="Nuevo producto"
            ></input-text>
            <div class="check-add" @click="addItem">
              <i class="material-icons check-text">check_circle_outline</i>
              <span class="add-text">Añadir</span>
            </div>
          </div>
        </div>
      </div>
      <button class="button print" @click="print">Imprimir</button>
      <button class="button share" @click="share">Compartir</button>
    </div>
  </div>
</template>

<script>
import ListData from "../data/listData.js";
import InputText from "../components/InputText.vue";

export default {
  name: "HomeList",
  data() {
    return {
      id: "inputDropdown",
      listData: ListData.lists,
      items: [],
      listSelected: "",
      isNew: false,
      listType: "",
      isOverwritten: Boolean
    };
  },
  components: {
    InputText
  },
  computed: {
    options() {
      return this.listData.map(list => list.name);
    },
    path() {
      return this.$route.path;
    }
  },
  created() {
    this.save(this.getDataUrl(), this.listType);
    this.isOverwritten = false;
  },
  methods: {
    getDataUrl() {
      const urlArray = this.path.split("/");
      if (urlArray.length >= 3 && urlArray[urlArray.length - 1].length) {
        const dataEncode = urlArray[2];
        const dataDecode = this.decodeUrl(dataEncode);
        let newStringJson = dataDecode.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
        newStringJson = newStringJson.replace(/'/g, '"');

        const arrayNewJson = newStringJson.split("]");
        const listType = arrayNewJson[1];
        this.listType = listType;

        newStringJson = newStringJson.replace(listType, "");

        const jsonDataDecode = JSON.parse(newStringJson);

        return jsonDataDecode;
      } else {
        return [];
      }
    },
    decodeUrl(urlEncode) {
      return decodeURI(urlEncode);
    },
    selectList(selectedList) {
      // this.items = [];
      const itemsSelected = this.listData
        .filter(list => list.name === selectedList)
        .map(listToShow => listToShow.items);
      this.items = itemsSelected[0];
      this.listSelected = selectedList;
    },
    handleChange() {},
    newItem() {
      this.isNew = !this.isNew;
    },
    addItem() {
      this.isNew = false;
      const newItemValue = document.querySelector("#insertText").value;
      if (newItemValue !== "") {
        this.items.push({
          name: newItemValue,
          // idItem: this.getLastId(),
          checked: false
        });
      }
    },
    deleteItem(item) {
      this.items.forEach((element, index) => {
        if (element.name === item.name) {
          this.items.splice(index, 1);
        }
      });
    },
    print() {
      this.beforePrint();
      window.print();
      this.afterPrint();
    },
    beforePrint() {
      document.querySelector(".add-item").style.display = "none";
      document.querySelector(".list-type-container").style.display = "none";
      document.querySelector(".recover-save").style.display = "none";
      document.querySelector(".header").style.display = "none";
      document.querySelector(".footer").style.display = "none";
      document.querySelector(".print").style.display = "none";
      document.querySelector(".home-list").style.transform = "scale(0.7)";
      document.querySelector(".home-list").style.padding = "0px";
      const deleteItemsHidden = document.querySelectorAll(".delete");
      deleteItemsHidden.forEach(deleteItem => {
        deleteItem.style.display = "none";
        if (
          this.listSelected === "Lista compra-alimentos" ||
          this.listSelected === "Lista de la maleta"
        ) {
          document.querySelector(".home-list").style.marginTop = "-390px";
        } else if (this.listSelected === "Lista compra-limpieza") {
          document.querySelector(".home-list").style.marginTop = "-200px";
        } else if (this.listSelected === "Lista para ir al trabajo") {
          document.querySelector(".home-list").style.marginTop = "-180px";
        } else {
          document.querySelector(".home-list").style.marginTop = "-100px";
        }
      });
    },
    afterPrint() {
      document.querySelector(".add-item").style.display = "inherit";
      document.querySelector(".list-type-container").style.display = "flex";
      document.querySelector(".recover-save").style.display = "inline-flex";
      document.querySelector(".header").style.display = "block";
      document.querySelector(".footer").style.display = "block";
      document.querySelector(".print").style.display = "block";
      document.querySelector(".home-list").style.marginTop = "70px";
      document.querySelector(".home-list").style.transform = "scale(1)";
      document.querySelector(".home-list").style.padding = "40px";
      const deleteItemsShow = document.querySelectorAll(".delete");
      deleteItemsShow.forEach(deleteItem => {
        deleteItem.style.display = "table-cell";
      });
    },
    recover() {
      const listNameToRecover = this.options.find(
        listName => listName === this.listSelected
      );
      const listSaved = localStorage.getItem(listNameToRecover);
      if (listSaved !== undefined) {
        this.items = JSON.parse(listSaved);
      }
    },
    save(items, list) {
      const listToSave = items;
      if (list === "") {
        list = this.listSelected;
      }
      localStorage.setItem(list, JSON.stringify(listToSave));
      if (list === this.listType) {
        this.isOverwritten = true;
      }
    },
    share() {
      const url = this.generateUrl();
    },
    generateUrl() {
      const itemsToString = JSON.stringify(this.items);
      let url =
        this.getDomainUrl() + "/homeList/" + itemsToString + this.listSelected;
      return url;
    },
    getDomainUrl() {
      return window.location.protocol + "//" + window.location.host;
    }
  }
};
</script>


<style lang="scss" scoped>
.home-list {
  margin-top: 70px;
  padding: 40px;
}

.list-type-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.list-type {
  border: 2px solid #29668f;
  padding: 20px;
  margin: 2px;
  &:hover {
    background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
    background-color: #408c99;
    color: white;
    font-weight: bold;
  }
  &.active {
    background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
    background-color: #408c99;
    color: white;
    font-weight: bold;
  }
}

.table {
  padding: 50px 17% 160px 17%;
}

.header {
  display: inline-block;
  border: 1px solid black;
  padding: 13px;
  text-align: center;
  border-radius: 5px 5px 0px 0px;
  span {
    font-size: 20px;
  }
}

.recover-save {
  display: inline-flex;
  width: 100%;
  .button-list {
    border: 1px solid grey;
    width: 50%;
    button {
      height: 30px;
      width: 100%;
      font-family: inherit;
      color: #408c99;
      font-weight: bold;
      font-size: 14px;
      &:hover {
        border: 1px solid rgb(216, 216, 216);
        color: white;
        background-color: #408c99;
      }
    }
  }
}

.row {
  display: inline-flex;
  border: 1px solid black;
  padding: 10px;
}

.header-table,
.block-item {
  display: grid;
}

.material-icons {
  display: inline;
  cursor: pointer;
  font-size: 22px;
  &.check-text {
    position: relative;
    top: 2px;
    left: 4px;
  }
}

.add-text {
  position: relative;
  top: 2px;
}

.simple-checkbox {
  width: -webkit-fill-available;
  padding-left: 10px;
  padding-top: 3px;
  input.larger-checkbox {
    transform: scale(1.5);
    margin-right: 5px;
  }
  .item-name {
    padding-left: 5px;
  }
}

.edit,
.delete {
  display: table-cell;
  text-align: center;
  padding-top: 4px;
  .icon-text {
    font-size: 11px;
  }
}

.add-item {
  display: inherit;
  border: 2px dotted grey;
  padding-left: 17px;
  border-radius: 0px 0px 5px 5px;
}

.add-text {
  padding: 10px;
  vertical-align: super;
  font-size: 14px;
}

.insert-text {
  display: flex;
  height: 55px;
  .input-text-add {
    width: 83%;
    padding: 5px 16px 0px 5px;
  }
  .check-add {
    border: 1px solid green;
    height: 25px;
    border-radius: 5px;
    padding: 3px;
    &:hover {
      background-color: rgba(32, 180, 32, 0.459);
      cursor: pointer;
      box-shadow: 3px 3px 5px grey;
    }
  }
}

.button {
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 15px;
  font-family: inherit;
  padding: 8px 15px;
  text-decoration: none;
  border-radius: 30px;
  margin-top: 10px;

  &:active {
    position: relative;
    top: 1px;
  }

  &.print {
    float: right;
    box-shadow: 1px 17px 13px -13px #276873;
    background: linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
    background-color: #599bb3;
    border: 2px solid #29668f;
    text-shadow: 0px 0px 0px #3d768a;

    &:hover {
      background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
      background-color: #408c99;
    }
  }
  &.share {
    box-shadow: 1px 17px 13px -13px #276873;
    background: linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
    background-color: #599bb3;
    border: 2px solid #29668f;
    text-shadow: 0px 0px 0px #3d768a;

    &:hover {
      background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
      background-color: #408c99;
    }
  }
}
</style>