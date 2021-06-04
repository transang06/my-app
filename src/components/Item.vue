<template>
  <v-list-item>
    <template>
      <v-list-item-content>
        <v-list-item-title v-text="item.title"></v-list-item-title>
        <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
        <v-icon
          v-if="item.completed"
          @click="check(item)"
          color="green lighten-1"
        >
          mdi-checkbox-marked-circle
        </v-icon>
        <v-icon v-else color="grey darken-3" @click="check(item)">
          mdi-checkbox-marked-circle
        </v-icon>
        <v-icon color="red darken-3" @click="deleteicon(item)">
          mdi-minus-circle
        </v-icon>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
import axios from "axios";
export default {
  props: ["item"],

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
    check(item) {
      item.completed = !item.completed;
      axios
        .put(`https://apitodosang.herokuapp.com/api/todos/${item.id}/`, item)
        .then(() => this.lay());
    },
    deleteicon(item) {
      item.completed = !item.completed;
      axios
        .delete(`https://apitodosang.herokuapp.com/api/todos/${item.id}/`, item)
        .then(() => this.lay());
    },
  },
};
</script>