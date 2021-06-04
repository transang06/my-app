<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar color="pink" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Inbox</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group>
        <Item
          v-for="(item, index) in items"
          :key="index"
          :class="{ 'teal lighten-4': item.completed }"
          :item="item"
        ></Item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import axios from "axios";
import Item from "./Item.vue";
export default {
  components: {
    Item,
  },
  data() {
    return {
      items: [],
      selected: true,
      errors: [],
    };
  },
  created() {
    this.lay();
  },
  methods: {
    lay() {
      axios
        .get(`https://apitodosang.herokuapp.com/api/todos/`)
        .then((response) => {
          this.items = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>