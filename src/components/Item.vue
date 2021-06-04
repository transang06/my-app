<template>
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
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    valid: false,
    title: "",
    description: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 50 || "Name must be less than 50 characters",
    ],
  }),
  methods: {
    add() {
      let item = { title: this.title, description: this.description };
      this.title = "";
      this.description = "";
      axios.post(`https://apitodosang.herokuapp.com/api/todos/`, item).then();
    },
  },
};
</script>