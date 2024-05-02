<template>
  <div class="container">
    <div><img src="../img/intellilogo.jpg" /></div>
    <form class="form-group" @submit.prevent="resetPassword">
      <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>
      <label for="email">Email:</label>
      <input
        type="text"
        class="input-text"
        placeholder="Enter an email"
        v-model="email"
        required
      />
      <button type="submit" class="button1">Send Verfication</button>
    </form>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
  data() {
    return {
      email: "",
      errorMessage: "",
    };
  },
  methods: {
    resetPassword() {
      const auth = getAuth();
      const email = this.email;
      sendPasswordResetEmail(auth, email)
        .then((data) => {
          alert("Reset Password Sent");
          this.$router.push("/signup");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMessage = "Invalid email";
              break;
            case "auth/user-not-found":
              this.errorMessage = "User not Found";
              break;
            case "auth/invalid-sender":
              this.errorMessage = "Email is Invalid or not Verified";
              break;
            default:
              this.errorMessage = "Email or Password was inocrrect";
              break;
          }
          // alert(error.message);
        });
    },
  },
};
</script>

<style scoped>
label {
  margin-bottom: 20px;
  color: #7f989a;
}
form {
  margin-top: 200px;
}
img {
  margin: 40px 0;
}
.container {
  width: 720px;
  height: 1024px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
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
.errorMessage {
  height: 50px;
  border: 1px solid #1c4532;
  border-radius: 10px;
  background-color: #1c4532;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 23px;
  letter-spacing: 1px;
}
@media screen and (min-width: 100px) and (max-width: 1300px) {
  label {
    margin-left: 20px;
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
  .errorMessage{
    width: 80vw;
    margin: 0 auto;
    margin-bottom: 20px;
  }
}
</style>