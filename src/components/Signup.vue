<template>
  <div class="container">
    <div class="right-container">
      <div><img src="../img/intellilogo.jpg" /></div>
      <div>
        <h1 class="title">Sign in</h1>
        <form action="" class="form-group" @submit.prevent="signInUsers">
          <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>
          <label for="email">E-mail:</label>
          <input
            class="input-text"
            type="text"
            placeholder="example@gmail.com"
            v-model="email"
            required
          />
          <label for="password">Password:</label>
          <input
            class="input-text"
            type="password"
            placeholder="@#*%"
            v-model="password"
            required
          />
          <div class="small-info">
            <div class="checkbox">
              <input type="checkbox" />
              <label for="remeber" class="rememberMe">Remember me</label>
            </div>
            <div>
              <p>
                <router-link to="/forgot-password"
                  >Forgot Password?</router-link
                >
              </p>
            </div>
          </div>
          <button type="submit" class="button1">Sign in</button>
        </form>
        <p>or</p>
        <button @click="signInWithGoogle" class="button2">
          <img src="../img/google.jpg" alt="" />
          Continue with Google
        </button>
        <div class="account">
          <p>
            Don't have an account?
            <span
              ><router-link to="/create-account">Create Now</router-link></span
            >
          </p>
        </div>
      </div>
      <div></div>
    </div>
    <div class="left-container">
      <div class="details">
        <h1>Welcome to Intelli</h1>
        <p>
          Let's get you all set up so you can verify your personal account and
          begin setting up your profile
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
export default {
  // async setup() {
  //   const promise = new Promise((resolve, reject) => {
  //     setTimeout(function () {
  //       resolve("Success");
  //     }, 2000);
  //   });
  //   const user = await promise;
  //   return {
  //     user,
  //   };
  // },

  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    signInUsers() {
      const email = this.email;
      const password = this.password;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log("Sucessfully registered!");
          this.$router.push("/dashboard");
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
            case "auth/wrong-password":
              this.errorMessage = "Incorrect Password";
              break;
            default:
              this.errorMessage = "Email or Password was inocrrect";
              break;
          }
          //   alert(error.message);
        });
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
.title {
  color: #2a4343;
  font-family: "Inter", sans-serif;
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
.account {
  display: flex;
  justify-content: center;
}
.details p {
  width: 305px;
  height: 84px;
  color: #fff;
  text-align: start;
  font-size: 18px;
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
  /* .title {
    width: 100vw;
  }
  .card {
    flex: 1 0 calc(50% 20px);
  } */
  label {
    margin-left: 35px;
  }
  p {
    width: 100vw;
  }
  .button1,
  .button2 {
    width: 80vw;
    margin: 0 auto;
    font-size: 17px;
  }
  .container {
    width: 100vw;
  }
  .left-container {
    display: none;
  }
  .right-container {
    width: 100vw;
  }
  .input-text {
    width: 80vw;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .small-info {
    width: 80vw;
    flex-direction: column;
    margin: 0 auto;
  }
  .small-info label {
    margin-left: 10px;
  }
  .errorMessage{
    width: 80vw;
    margin: 0 auto;
    margin-bottom: 20px;
  }
}
</style>