<script setup>
import QAAHeader from './components/qaa/qaaHeader.vue'
import QaaFooter from './components/qaa/qaaFooter.vue'
</script>

<template>
  <QAAHeader />

  <router-view/>

  <QaaFooter />
</template>

<style scoped>
/* .table-div {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
} */
</style>
