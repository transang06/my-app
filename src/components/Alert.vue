<template>
  <div>
    <v-alert type="success" dismissible>
      {{ tb }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: ["tb"],
};
</script>
