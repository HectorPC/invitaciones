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

    <div class="block-select">
      <span>Mis listas guardadas</span>
      <div class="list-storaged select">
        <select name="slct" id="slct" @change="selectList($event.target.value)">
          <option selected>Sin seleccionar</option>
          <option :value="list" v-for="(list,key) in listStoraged" :key="key">{{list}}</option>
        </select>
      </div>
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
            <button class="recover-list" @click="showModalDelete = true">
              <span>Eliminar lista guardada</span>
            </button>
          </div>
          <div class="button-list">
            <button class="save-list" @click="showModalSave = true">
              <span>Guardar lista</span>
            </button>
          </div>
        </div>

        <div class="block-item" v-for="(item,key) in items" :key="key">
          <div class="row check">
            <div class="block-item-category">
              <span class="item-category">{{item.itemCategory}}</span>
              <div
                class="simple-checkbox"
                v-for="(itemCateg,index) in item.itemsCategory"
                :key="index"
              >
                <div class="block-ckeckbox">
                  <input
                    class="larger-checkbox"
                    type="checkbox"
                    name
                    :id="itemCateg.name"
                    v-model="itemCateg.checked"
                    :value="itemCateg.name"
                  />
                  <span class="item-name">{{itemCateg.name}}</span>
                </div>

                <div class="edit-delete">
                  <div class="delete">
                    <i class="material-icons" @click="deleteItem(itemCateg)">delete_forever</i>
                  </div>
                </div>
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
              id="categoryText"
              name="categoryText"
              placeholder="Categoría"
            ></input-text>
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

    <modal v-if="showModalShare" @close="showModalShare=false">
      <div slot="body" class="copy">
        <input-text
          type="text"
          label="Copiar para compartir"
          id="copyUrl"
          name="copyUrl"
          class="copyUrl"
        ></input-text>
        <buttonCopy @click.native="copyUrl" class="buttonCopy"></buttonCopy>
      </div>
    </modal>

    <modal v-if="showModalSave" @close="showModalSave=false; showAddList=false">
      <div slot="body" class="modal-body-save">
        <h3>Guardado en {{listSelected}}:</h3>
        <ul>
          <li v-for="(saved,key) in getListsSavedOfType" :key="key">
            <input-text
              type="text"
              class="change-name-saved"
              label="Nombre lista"
              :id="'input'+key.toString()"
              :name="saved"
            />
            <span class="list-name-saved" :id="'span'+key.toString()">{{formatListname(saved)}}</span>
            <div class="edit-save">
              <i class="material-icons" @click="showAddSavedNameList(key.toString())">edit</i>
              <i class="material-icons" @click="replaceNameList(saved,'input'+key.toString())">save</i>
              <i class="material-icons" @click="restoreSavedNameList(key.toString())">restore_page</i>
            </div>
          </li>
        </ul>
        <i class="material-icons" @click="showAddList = !showAddList">add_circle_outline</i>
        <div class="show-add-list" v-if="showAddList || getListsSavedOfType.length===0">
          <input-text
            type="text"
            label="Nombre de la lista"
            id="newList"
            name="newList"
            class="list-saved"
          ></input-text>
          <i class="material-icons ckeck-icon" @click="saveNewList($event)">check</i>
        </div>
      </div>
    </modal>

    <modal v-if="showModalDelete" @close="showModalDelete=false">
      <div slot="body" class="modal-body-delete" v-if="getListsSavedOfType.length > 0">
        <h3>Guardado en {{listSelected}}:</h3>
        <ul>
          <li v-for="(saved,key) in getListsSavedOfType" :key="key">
            <input-text
              type="text"
              label="Lista 1"
              :id="saved"
              :name="saved"
              class="list-saved"
              :disabled="true"
              :v-model="saved"
            ></input-text>
          </li>
          <!-- <li>
            <input-text
              type="text"
              label="Lista 2"
              id="listSaved2"
              name="listSaved2"
              class="list-saved"
            ></input-text>
          </li>
          <li>
            <input-text
              type="text"
              label="Lista 3"
              id="listSaved3"
              name="listSaved3"
              class="list-saved"
            ></input-text>
          </li>-->
        </ul>
      </div>
      <div v-else slot="body" class="modal-body-delete no-list">
        <span>No hay listas guardadas</span>
      </div>
    </modal>
    <go-top class="go-top" bg-color="#FFDC1A" :size="40" :has-outline="false" title="Volver arriba"></go-top>
  </div>
</template>

<script>
import ListData from "../data/listData.js";
import InputText from "../components/InputText.vue";
import Modal from "../components/Modal.vue";
import ButtonCopy from "../components/ButtonCopy.vue";
import GoTop from "@inotom/vue-go-top";

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
      listStoraged: [],
      listsSavedOfType: [],
      showModalShare: false,
      showModalSave: false,
      showModalDelete: false,
      showAddList: false
    };
  },
  components: {
    InputText,
    Modal,
    ButtonCopy,
    GoTop
  },
  computed: {
    options() {
      return this.listData.map(list => list.name);
    },
    path() {
      return this.$route.path;
    },
    getListsSavedOfType() {
      const storageListNames = [];
      const lengthOfListSelected = this.listSelected.length;
      this.listStoraged.forEach(stored => {
        if (
          stored[0].substring(0, lengthOfListSelected) === this.listSelected
        ) {
          storageListNames.push(stored[0]);
        }
      });
      console.log("storageListNames: ", storageListNames);
      return storageListNames;
    }
  },
  created() {
    this.save(this.getDataUrl(), this.listType);
    this.selectList(this.listType);
    this.recover();
    this.recoverAllLocalStorage();
  },
  methods: {
    getDataUrl() {
      const urlArray = this.path.split("/");
      if (urlArray.length >= 3 && urlArray[urlArray.length - 1].length) {
        const dataEncode = urlArray[2];
        const dataDecode = this.decodeUrl(dataEncode);

        let newStringJson = dataDecode.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
        newStringJson = newStringJson.replace(/'/g, '"');

        const arrayNewJson = newStringJson.split("}]}]");
        const listType = arrayNewJson[1];
        this.listType = listType;
        console.log("this.listType: ", this.listType);

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
      const itemsSelected = this.listData
        .filter(list => list.name === selectedList)
        .map(listToShow => listToShow.items);
      this.items = itemsSelected[0];
      this.listSelected = selectedList;
      if (this.isOverwritten()) {
        this.recover();
      }

      // this.getListsSavedOfType();
    },
    isOverwritten() {
      const listSaved = localStorage.getItem(this.listSelected);
      return listSaved !== null;
    },
    newItem() {
      this.isNew = !this.isNew;
    },
    addItem() {
      this.isNew = false;
      const newCategoryValue = this.toLowerCase(
        document.querySelector("#categoryText").value
      );
      const newItemValue = this.toLowerCase(
        document.querySelector("#insertText").value
      );

      if (newItemValue !== "") {
        if (newCategoryValue !== "" && this.exitsCategory(newCategoryValue)) {
          this.items
            .filter(item => item.itemCategory === newCategoryValue)
            .forEach(element => {
              element.itemsCategory.push({
                name: newItemValue,
                checked: false
              });
            });
        } else {
          this.items.push({
            itemCategory: newCategoryValue,
            itemsCategory: [
              {
                name: newItemValue,
                checked: false
              }
            ]
          });
        }
      }
    },
    toLowerCase(text) {
      return text.toLowerCase();
    },
    exitsCategory(category) {
      return (
        this.items.find(item => item.itemCategory === category) !== undefined
      );
    },
    deleteItem(item) {
      this.items.forEach((element, index) => {
        element.itemsCategory.forEach((itemCategory, indexCategory) => {
          if (itemCategory.name === item.name) {
            element.itemsCategory.splice(indexCategory, 1);
          }
        });

        if (element.itemsCategory.length === 0) {
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
      document.querySelector(".share").style.display = "none";
      document.querySelector(".go-top").style.display = "none";
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
      document.querySelector(".share").style.display = "block";
      document.querySelector(".go-top").style.display = "block";
      document.querySelector(".home-list").style.marginTop = "70px";
      document.querySelector(".home-list").style.transform = "scale(1)";
      document.querySelector(".home-list").style.padding = "40px";
      const deleteItemsShow = document.querySelectorAll(".delete");
      deleteItemsShow.forEach(deleteItem => {
        deleteItem.style.display = "table-cell";
      });
    },
    recoverAllLocalStorage() {
      this.listStoraged = Object.entries(localStorage);
      // this.options.forEach(optionList => {
      //   localStorageItems.forEach(storageItem => {
      //     if (optionList === storageItem[0]) {
      //       this.listStoraged.push(optionList);
      //     }
      //   });
      // });

      console.log("listStoraged: ", this.listStoraged);
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
    // recover() {
    //   const listNameToRecover = this.options.find(
    //     listName => listName === this.listSelected
    //   );
    //   const listSaved = localStorage.getItem(listNameToRecover);
    //   if (listSaved !== undefined) {
    //     this.items = JSON.parse(listSaved);
    //   }
    // },
    save(items, list) {
      const listToSave = items;
      if (list === "") {
        list = this.listSelected;
      }
      try{
        localStorage.setItem(list, JSON.stringify(listToSave));
      }catch(e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Has execido el número de listas que pueden ser guardadas, elimina alguna lista para poder guardar listas nuevas. La lista no ha sido guardada.'); //data wasn't successfully saved due to quota exceed so throw an error
          }
      }
    },
    saveNewList() {
      const nameList =
        this.listSelected + "/*" + document.querySelector("input#newList").value;
      try{
          localStorage.setItem(nameList, JSON.stringify(this.items));
      }catch(e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Has execido el número de listas que pueden ser guardadas, elimina alguna lista para poder guardar listas nuevas. La lista no ha sido guardada.'); //data wasn't successfully saved due to quota exceed so throw an error
          }
      }
    },
    share() {
      const url = this.generateUrl();
      this.showModalShare = true;

      setTimeout(() => {
        if (
          document.querySelector("#copyUrl").value !== null &&
          this.urlHasJson(url)
        ) {
          document.querySelector("#copyUrl").value = url;
        } else {
          document.querySelector("#copyUrl").value = "Lista vacía";
        }
      }, 50);
    },
    urlHasJson(url) {
      return url.indexOf("{") !== -1;
    },
    generateUrl() {
      const itemsToString = JSON.stringify(this.items);
      let url =
        this.getDomainUrl() + "/homeList/" + itemsToString + this.listSelected;
      return url;
    },
    getDomainUrl() {
      return window.location.protocol + "//" + window.location.host;
    },
    copyUrl() {
      var urlInput = document.querySelector("#copyUrl");
      urlInput.select();
      document.execCommand("copy");
    },
    formatListname(listName) {
      const arrayListName = listName.split("/*");
      return arrayListName[1];
    },
    showAddSavedNameList(listId) {
      const inputSelector = "input" + listId;
      const spanSelector = "span" + listId;

      const inputElement = document.getElementById(inputSelector);
      const spanElement = document.getElementById(spanSelector);

      inputElement.style.display = "block";
      spanElement.style.display = "none";
    },
    restoreSavedNameList(listId) {
      const inputSelector = "input" + listId;
      const spanSelector = "span" + listId;

      const inputElement = document.getElementById(inputSelector);
      const spanElement = document.getElementById(spanSelector);

      inputElement.style.display = "none";
      spanElement.style.display = "block";
    },
    replaceNameList(itemList, idNewName) {
      localStorage.removeItem(itemList);
      const newListName = document.querySelector(
        "input#" + idNewName
      ).value;
      try{
        localStorage.setItem(this.listSelected + "/*" + newListName, JSON.stringify(this.items));
      }catch(e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Has execido el número de listas que pueden ser guardadas, elimina alguna lista para poder guardar listas nuevas. La lista no ha sido guardada.'); //data wasn't successfully saved due to quota exceed so throw an error
          }
      }
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
  .block-item-category {
    width: 100%;
    .item-category {
      text-transform: uppercase;
      font-weight: bold;
      color: grey;
    }
  }
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
  display: inline-flex;
  justify-content: space-between;
  border: 1px dotted grey;
  .block-ckeckbox {
    position: relative;
    top: 1px;
    input.larger-checkbox {
      transform: scale(1.5);
      margin-right: 5px;
    }
    .item-name {
      padding-left: 8px;
      text-transform: capitalize;
    }
  }
}

.edit,
.delete {
  display: table-cell;
  text-align: center;
  padding-right: 10px;
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
    box-shadow: 1px 17px 13px -13px #1c57bf;
    background: linear-gradient(to bottom, #599bb3 5%, #1c57bf 100%);
    background-color: #1c57bf;
    border: 2px solid #1c57bf;
    text-shadow: 0px 0px 0px #1c57bf;
    &:hover {
      background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
      background-color: #408c99;
    }
  }
  &.share {
    box-shadow: 1px 17px 13px -13px #1c57bf;
    background: linear-gradient(to bottom, #599bb3 5%, #1c57bf 100%);
    background-color: #1c57bf;
    border: 2px solid #1c57bf;
    text-shadow: 0px 0px 0px #1c57bf;
    &:hover {
      background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
      background-color: #408c99;
    }
  }
}

.copy {
  display: flex;
  justify-content: space-between;
  .copyUrl {
    width: 100%;
  }
}

.block-select {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  > span {
    position: relative;
    top: 12px;
  }
}

// Select dropdown
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #408c99;
  background-image: none;
}
/* Remove IE arrow */
select::-ms-expand {
  display: none;
}
/* Custom Select */
.select {
  position: relative;
  display: flex;
  width: 20em;
  height: 36px;
  line-height: 3;
  background: #408c99;
  overflow: hidden;
  border-radius: 0.25em;
  margin: 20px auto;
}
select {
  flex: 1;
  padding: 4px 1.5em;
  color: #fff;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
}
/* Arrow */
.select::after {
  content: "\25BC";
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 1em;
  background: #29668f;
  cursor: pointer;
  pointer-events: none;
  -webkit-transition: 0.25s all ease;
  -o-transition: 0.25s all ease;
  transition: 0.25s all ease;
  font-size: 12px;
}
/* Transition */
.select:hover::after {
  color: #ffdc39;
}

//Modals
.modal-body-save {
  h3 {
    position: relative;
    top: -20px;
    width: 90%;
  }
  .list-name-saved {
    width: 100%;
  }
  .change-name-saved {
    display: none;
  }
  .material-icons {
    padding-right: 30px;
  }

  ul {
overflow: auto;
max-height: 450px;
  li {
    list-style-type: decimal;
    display: flex;
    justify-content: space-between;
    div {
      width: 100%;
    }
  }
  }

  .show-add-list {
    display: inline-flex;

    .list-saved {
      width: 700px;
    }
    .material-icons.ckeck-icon {
      color: green;
      &:hover {
        font-size: 24px;
      }
    }
  }
}
</style>