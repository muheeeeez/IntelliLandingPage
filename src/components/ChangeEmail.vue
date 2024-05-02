<template>
  <div class="container">
    <div><img src="../img/intellilogo.jpg" /></div>
    <form class="form-group" @submit.prevent="changeEmail">
      <label for="email">New Email:</label>
      <input
        type="text"
        class="input-text"
        placeholder="Enter an email"
        v-model="email"
        required
      />
      <button type="submit" class="button1">Update Email</button>
      <Popup :visible="dialogVisible" @close="closeDialog">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="80px"
          width="250px"
          viewBox="0 0 448 512"
        >
          <path
            fill="#1c4532"
            d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
          />
        </svg>
        <p class="popup-message">Your Email has been Updated</p>
      </Popup>
    </form>
  </div>
</template>
  
  <script>
import { getAuth, updateEmail } from "firebase/auth";
import Popup from "./UI/Popup.vue";
export default {
  components: { Popup },
  data() {
    return {
      email: "",
      dialogVisible: false,
    };
  },
  methods: {
    async changeEmail() {
      const auth = getAuth();
      const email = this.email;
      updateEmail(auth.currentUser, email)
        .then((data) => {
          this.dialogVisible = true;
        })
        .catch((error) => {
          console.log(error.code);
          // alert(error.message);
        });
    },
    closeDialog() {
      this.dialogVisible = false;
      this.$router.push("/signup");
    },
  },
};
</script>
  
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
label {
  margin-top: 200px;
  margin-bottom: 20px;
  color: #7f989a;
}
img {
  margin: 40px 0;
}

.container {
  width: 620px;
  display: grid;
  margin: auto;
}
.input-text {
  width: 528px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #7f989a;
  padding: 10px;
  margin-bottom: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

.button1 {
  width: 538px;
  height: 60px;
  border-radius: 12px;
  background-color: #1c4532;
  color: #fff;
  font-family: "Inter" sans-serif;
  font-weight: 600;
  font-size: 20px;
}
.popup-message {
  font-family: "Inter" sans-serif;
  font-weight: 600;
  font-size: 20px;
}
@media screen and (min-width: 100px) and (max-width: 1300px) {
  label {
    margin-left: 20px;
    margin-top: 10px;
  }
  form {
    margin-top: 10px;
    width: 90vw;
  }
  .container {
    width: 100vw;
    margin: 10px;
    display: block;
  }
  .input-text {
    width: 80vw;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .button1,
  .button2 {
    width: 80vw;
    margin: 0 auto;
  }
}
</style>