<template>
  <div>
    <Header />
    <div class="container">
      <div class="w-full h-screen center">
        <div class="w-72">
          <div class="text-xl font-bold">Register</div>
          <input
            type="text"
            class="w-full h-8 mt-4 border-b-2 border-gray-300"
            placeholder="Name"
            v-model="user.name"
          />
          <input
            type="text"
            class="w-full h-8 mt-4 border-b-2 border-gray-300"
            placeholder="Phone Number"
            v-model="user.phoneNumber"
          />
          <input
            type="text"
            class="w-full h-8 mt-4 border-b-2 border-gray-300"
            placeholder="Email address"
            v-model="user.email"
          />
          <input
            type="password"
            class="w-full h-8 mt-4 border-b-2 border-gray-300"
            placeholder="Password"
            v-model="user.password"
          />
          <button
            class="w-full h-8 mt-4 bg-pink-500 text-white font-bold"
            @click="register"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
      },
    }
  },
  methods: {
    register() {
      const db = this.$fire.firestore.collection('users')
      console.log(this.user)
      this.$fire.auth
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((userCredential) => {
          const user = userCredential.user
          user.updateProfile({
            displayName: this.user.name,
            phoneNumber: this.user.phoneNumber,
          })
          db.doc(user.uid).set({
            email: user.email,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
          })
          $nuxt.$router.push('/auth/login')
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
        })
    },
  },
}
</script>
