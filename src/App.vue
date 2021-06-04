<template>
  <v-app>
    <v-main>
      <HelloWorld />

      <Ina/>
      <Alert/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Ina from "./components/Ina";
import Alert from "./components/Alert";
export default {
  name: "App",

  components: {
    HelloWorld,
    Ina,
    Alert,
  },

  data: () => ({
    //
  }),
};
</script>
