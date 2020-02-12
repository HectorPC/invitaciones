<template>
  <div class="home-list">
    <div class="list-type-container">
      <div
        class="list-type"
        v-for="(list,key) in options"
        :key="key"
        @click="selectList(list)"
      >{{list}}</div>
    </div>
    <div id="table" class="table" v-if="listSelected!== ''">
      <div class="header-table">
        <div class="header">{{listSelected}}</div>
      </div>
      <div class="body-table">
        <div class="block-item" v-for="(item,key) in items" :key="key">
          <div class="row check">
            <Checkbox
              :id="item.name"
              v-model="item.checked"
              :value="item.name"
              @change="handleChange()"
            >{{item.name}}</Checkbox>

            <div class="edit-delete">
              <!-- <div class="edit">
                <i class="material-icons">edit</i>
                <div class="icon-text">Editar</div>
              </div>-->
              <div class="delete">
                <i class="material-icons" @click="deleteItem(item)">delete_forever</i>
                <div class="icon-text">Borrar</div>
              </div>
            </div>
          </div>
          <!-- <div class="row item">{{item.name}}</div> -->
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
    </div>
    <div class="print" @click="print">Print</div>
  </div>
</template>

<script>
import ListData from "../data/listData.js";
import Checkbox from "vue-material-checkbox";
import InputText from "../components/InputText.vue";

export default {
  name: "HomeList",
  data() {
    return {
      id: "inputDropdown",
      listData: ListData.lists,
      items: [],
      listSelected: "",
      isNew: false
    };
  },
  components: {
    Checkbox,
    InputText
  },
  computed: {
    options() {
      return this.listData.map(list => list.name);
    }
  },
  methods: {
    selectList(selectedList) {
      this.items = [];
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
          idItem: this.getLastId(),
          checked: false
        });
      }
    },
    getLastId() {
      return this.items[this.items.length - 1] !== undefined
        ? this.items[this.items.length - 1].idItem
        : 0;
    },
    deleteItem(item) {
      const index = this.items.indexOf(item.id);
      this.items.splice(index, 1);
    },
    print() {
      document.querySelector(".add-item").style.display = "none";
      document.querySelector(".list-type-container").style.display = "none";

      window.print();

      document.querySelector(".add-item").style.display = "inherit";
      document.querySelector(".list-type-container").style.display = "flex";
    }
  }
};
</script>


<style lang="scss" scoped>
.home-list {
  margin-top: 30px;
  padding: 40px;
}

.list-type-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.list-type {
  border: 1px solid red;
  padding: 40px;
}

.table {
  padding: 50px 15% 160px 15%;
}

.header {
  display: inline-block;
  border: 1px solid black;
  padding: 10px;
  text-align: center;
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
}

.edit,
.delete {
  display: table-cell;
  padding: 17px;
  text-align: center;
}

.add-item {
  display: inherit;
  border-top: 2px dotted grey;
}

.add-text {
  padding: 10px;
  vertical-align: super;
}

.insert-text {
  display: flex;
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

.hidden-item {
}
</style>