<template>
  <v-app>
    <v-main>
      <HelloWorld />

      <Ina/>
      
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Ina from "./components/Ina";

export default {
  name: "App",

  components: {
    HelloWorld,
    Ina,

  },

  data: () => ({
    //
  }),
};
</script>
