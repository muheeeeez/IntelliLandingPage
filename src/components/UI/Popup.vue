<template>
  <div v-if="visible" class="dialog-overlay">
    <div :class="{ 'dialog': true, 'fade-in': visible }">
      <slot></slot>
      <button @click="closeDialog">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
button {
  width: 238px;
  height: 60px;
  border-radius: 12px;
  background-color: #1c4532;
  color: #fff;
  font-family: "Inter" sans-serif;
  font-weight: 600;
  font-size: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-overlay {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #1c4532;
  font-family: "Inter" sans-serif;
  font-weight: 600;
  font-size: 20px;
  opacity: 0;
  transition: opacity 1s ease;
}
.fade-in {
  opacity: 1;
}
</style>