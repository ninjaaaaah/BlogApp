<template>
  <div>
    <Header />
    <div class="container">
      <div class="w-full h-screen center">
        <div class="w-72">
          <div class="text-xl font-bold">Login</div>
          <form @submit.prevent="login" class="mt-6 flex flex-col gap-4">
            <input
              type="text"
              class="w-full h-8 border-b-2 border-gray-300"
              placeholder="Username"
              v-model="user.email"
            />
            <input
              type="password"
              class="w-full h-8 border-b-2 border-gray-300"
              placeholder="Password"
              v-model="user.password"
            />
            <div
              :class="snackbar.show ? 'opacity-100' : 'opacity-0'"
              class="text-red-400 text-xs flex items-center gap-2"
            >
              <v-icon name="hi-solid-information-circle" />
              <span>{{ snackbar.text }}</span>
            </div>
            <button
              class="w-full h-8 bg-pink-500 text-white font-bold"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'

export default {
  components: {
    'v-icon': OhVueIcon,
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      snackbar: {
        show: false,
        text: '',
      },
    }
  },
  methods: {
    login() {
      this.$fire.auth
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message

          if (errorCode === 'auth/user-not-found') {
            this.snackbar = {
              show: true,
              text: 'User not found',
            }
          }

          if (errorCode === 'auth/wrong-password') {
            this.snackbar = {
              show: true,
              text: 'Wrong password',
            }
          }
        })
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          $nuxt.$router.push('/')
        })
    },
    change() {
      this.snackbar = {
        show: false,
        text: '',
      }
    },
  },
}
</script>
