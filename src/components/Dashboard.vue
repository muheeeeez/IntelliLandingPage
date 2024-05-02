<template>
  <h1>Welcome</h1>
  <button v-if="isLoggedIn" @click="handleSignOut">Logout</button>
  <button @click="navigateToChangeEmail">Change Email Address</button>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  methods: {
    handleSignOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push("/signup");
      });
    },
    navigateToChangeEmail(){
        this.$router.push("/change-email");
    }
  },
};
</script>

<style>
</style>