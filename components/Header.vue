<template>
  <div class="w-screen bg-pink-500 text-white shadow-md sticky top-0">
    <div
      class="xl:max-w-7xl flex flex-row items-center justify-between container"
    >
      <div class="text-lg font-bold flex flex-row gap-2 w-fit items-center">
        <v-icon name="hi-qrcode" animation="float" speed="slow" />
        <div class="w-60">Blog-App</div>
      </div>
      <ul class="flex flex-row gap-4">
        <li>
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/create">Create</NuxtLink>
        </li>
        <li>
          <button class="btn btn-ghost" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'

export default {
  name: 'Header',
  components: {
    'v-icon': OhVueIcon,
  },
  methods: {
    logout() {
      this.$fire.auth.signOut()
      this.$nuxt.$router.push('/auth/login')
    },
  },
}
</script>
