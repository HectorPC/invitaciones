<template>
  <div class="home-list">
    <div class="list-type-container">
      <div class="list-type" v-for="(list,key) in options" :key="key" @click="selectList">{{list}}</div>
    </div>
    <div class="table">
      <div class="header-table">
        <div class="row">Comprar</div>
        <div class="row">Producto</div>
      </div>
      <div class="body-table">
        <div class="row check"></div>
        <!-- <div class="row item" v-for="(item,key) in items" :key="key">{{item}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import ListData from "../data/listData.js";
export default {
  name: "HomeList",
  data() {
    return {
      id: "inputDropdown",
      listData: ListData.lists,
      items: []
    };
  },
  components: {},
  computed: {
    options() {
      return this.listData.map(list => list.name);
    }
  },
  method: {
       selectList() {
          console.log("???????-->")
      }
  }
};
</script>


<style scoped>
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

.row {
    display: inline-block;
    border: 1px solid black;
    padding: 10px;

}
</style>