<template>
  <div class="container">
    <div class="left-container">
      <div class="details">
        <h1>Welcome to Intelli</h1>
        <p>
          Let's get you all set up so you can verify your personal account and
          begin setting up your profile
        </p>
      </div>
    </div>
    <div class="right-container">
      <div><img src="../img/intellilogo.jpg" /></div>
      <div>
        <h1 class="title">Create Account</h1>
        <form action="" class="form-group" @submit.prevent="registerUsers">
          <p class="errorMessage" v-if="passwordError">
            {{ passwordErrorMessage }}
          </p>
          <Popup :visible="dialogVisible" @close="closeDialog">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="80px"
              width="550px"
              viewBox="0 0 448 512"
            >
              <path
                fill="#1c4532"
                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
              />
            </svg>
            <p class="popup-message">Your Account has been created</p>
          </Popup>
          <label for="first-name">First Name</label>
          <input
            type="text"
            class="input-text"
            placeholder="John"
            v-model="firstName"
          />
          <label>Last Name</label>
          <input
            type="text"
            class="input-text"
            placeholder="Doe"
            v-model="lastName"
          />
          <label for="email">E-mail:</label>
          <input
            class="input-text"
            type="text"
            placeholder="example@gmail.com"
            v-model="email"
            required
          />
          <label for="password">Password:</label>
          <div class="input-box">
            <input
              class="input-text-password"
              :type="passwordType"
              placeholder="@#*%"
              v-model="password"
              required
            />
            <img :src="imgSrc" :alt="imgSrc" @click="visiblePassword()" />
          </div>
          <label for="password">Confirm Password:</label>
          <div class="input-box">
            <input
              class="input-text-password"
              :type="confirmPasswordType"
              placeholder="@#*%"
              v-model="confirmPassword"
              required
            />
            <img
              :src="confirmPasswordImg"
              :alt="confirmPasswordImg"
              @click="visibleCurrentPassword()"
            />
          </div>
          <button type="submit" class="button1">Create account</button>
        </form>
        <p>or</p>
        <button class="button2" @click="signInWithGoogle">
          <img src="../img/google.jpg" alt="" />
          Continue with Google
        </button>
        <p>
          Already have an account?
          <span><router-link to="/signup">Signin now</router-link></span>
        </p>
      </div>
      <div></div>
    </div>
  </div>
</template>
  
  <script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Popup from "./UI/Popup.vue";
export default {
  components: { Popup },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dialogVisible: false,
      passwordType: "password",
      imgSrc:
        "https://icons.veryicon.com/png/o/photographic/ant-design-official-icon-library/eye-close-1.png",
      confirmPasswordType: "password",
      confirmPasswordImg:
        "https://icons.veryicon.com/png/o/photographic/ant-design-official-icon-library/eye-close-1.png",
      passwordErrorMessage: "Passwords do not match",
      passwordError: false,
    };
  },
  methods: {
    async registerUsers() {
      if (this.password == this.confirmPassword) {
        const email = this.email;
        const password = this.password;
        createUserWithEmailAndPassword(getAuth(), email, password)
          .then((data) => {
            console.log("Sucessfully registered!");
            this.dialogVisible = true;
          })
          .catch((error) => {
            console.log(error.code);
            alert(error.message);
          });
      } else {
        this.passwordError = true;
      }
    },
    signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
        .then((result) => {
          console.log(result.user);
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
        });
    },
    closeDialog() {
      this.dialogVisible = false;
      this.$router.push("/dashboard");
    },
    visiblePassword() {
      if (this.passwordType == "password") {
        this.passwordType = "text";

        this.imgSrc =
          "https://icons.veryicon.com/png/o/miscellaneous/myfont/eye-open-4.png";
      } else {
        this.passwordType = "password";
        this.imgSrc =
          "https://icons.veryicon.com/png/o/photographic/ant-design-official-icon-library/eye-close-1.png";
      }
      // this.passwordType = this.passwordType == "password" ? "text" : "password";
    },
    visibleCurrentPassword() {
      if (this.confirmPasswordType == "password") {
        this.confirmPasswordType = "text";

        this.confirmPasswordImg =
          "https://icons.veryicon.com/png/o/miscellaneous/myfont/eye-open-4.png";
      } else {
        this.confirmPasswordType = "password";
        this.confirmPasswordImg =
          "https://icons.veryicon.com/png/o/photographic/ant-design-official-icon-library/eye-close-1.png";
      }
      // this.passwordType = this.passwordType == "password" ? "text" : "password";
    },
  },
};
</script>
  <style scoped>
label {
  margin-bottom: 10px;
  color: #7f989a;
}
p {
  /* color: #7f989a; */
  width: 538px;
  text-align: center;
}
a {
  color: #1c4532;
}
button {
  display: flex;
  justify-content: center;
  align-items: center;
}
button img {
  margin-right: 70px;
}
.container {
  width: 1440px;
  height: 1024px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  margin: 0 auto;
}
.right-container {
  width: 720px;
  margin-top: 100px;
}
.left-container {
  width: 720px;
  background-color: #7f989a;
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
.button2 {
  width: 528px;
  height: 60px;
  border-radius: 15px;
  border: 1px solid #67728a;
  background: transparent;
  color: #67728a;
  font-family: "Inter" sans-serif;
  font-weight: 600;
  font-size: 20px;
}
.input-text {
  width: 528px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #7f989a;
  padding: 10px;
  margin-bottom: 20px;
}
.input-text-password {
  /* width: 528px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #7f989a;
  padding: 10px;
  margin-bottom: 20px; */
  width: 528px;
  height: 40px;
  border: 0;
  outline: 0;
}
.title {
  color: #2a4343;
  font-family: "Inter", sans-serif;
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
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}
.small-info {
  width: 720px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.small-info a {
  color: #1c4532;
}
.rememberMe {
  margin-top: 15px;
}
.checkbox {
  margin-top: 15px;
}
.details {
  border-radius: 30px;
  border: 2px solid #cccc;
  width: 462px;
  height: 385px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 200px;
}
.details h1 {
  width: 382px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 50px;
  letter-spacing: 2px;
  color: #fff;
}
.details p {
  width: 305px;
  height: 84px;
  color: #fff;
  text-align: start;
  font-size: 18px;
}
.input-box {
  background-color: #fff;
  width: 508px;
  height: 40px;
  /* max-width: 500px; */
  border-radius: 12px;
  border: 1px solid #7f989a;
  padding: 10px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.input-box img {
  width: 35px;
  cursor: pointer;
}
@media screen and (min-width: 100px) and (max-width: 1300px) {
  label {
    margin-left: 35px;
  }
  p {
    width: 100vw;
  }
  .container {
    width: 100vw;
  }
  .left-container {
    display: none;
  }
  .right-container {
    width: 100vw;
    margin-top: 30px;
  }
  .input-text {
    width: 80vw;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .input-text-password {
    width: 80vw;
  }
  .button1,
  .button2 {
    width: 80vw;
    margin: 0 auto;
    font-size: 17px;
  }
  .input-box {
    width: 80vw;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .errorMessage{
    width: 80vw;
    margin: 0 auto;
    margin-bottom: 20px;
  }
}
</style>