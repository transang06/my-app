<template>
  <div>
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
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="title"
                :rules="nameRules"
                :counter="100"
                label="Title"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="description"
                :rules="nameRules"
                :counter="100"
                label="Description"
                required
              ></v-text-field>
            </v-col>
            <v-col @click="add"> Add </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-list two-line>
        <v-list-item-group>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :class="{ 'teal lighten-4': item.completed }"
          >
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="item.description"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text
                  v-text="item.action"
                ></v-list-item-action-text>
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
        </v-list-item-group>
      </v-list>
    </v-card>
    <template v-if="tbs.length">
      <Alert v-for="(tb, i) in tbs" :key="i" :tb="tb" />
    </template>
  </div>
</template>
<script>
import axios from "axios";
import Alert from "./Alert.vue";

export default {
  components: {
    Alert,
  },
  data() {
    return {
      valid: false,
      title: "",
      description: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 50 || "Name must be less than 50 characters",
      ],
      items: [],
      errors: [],
      tbs: [],
    };
  },
  created() {
    this.lay();
  },
  methods: {
    lay() {
      axios
        .get(`https://shilim.herokuapp.com/api/todos/`)
        .then((response) => {
          this.items = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    add() {
      let item = { title: this.title, description: this.description };
      this.title = "";
      this.description = "";
      axios
        .post(`https://shilim.herokuapp.com/api/todos/`, item)
        .then(() => {
          this.lay();
          this.tbs.unshift("Thêm thanh cong");
        });
    },
    check(item) {
      item.completed = !item.completed;
      axios
        .put(`https://shilim.herokuapp.com/api/todos/${item.id}/`, item)
        .then(() => {
          this.lay();
          this.tbs.unshift("Thay đổi thanh cong");
        });
    },
    deleteicon(item) {
      axios
        .delete(`https://shilim.herokuapp.com/api/todos/${item.id}/`, item)
       .then(() => {
          this.lay();
          this.tbs.unshift("Xóa thanh cong");
        });
    },
  },
};
</script>