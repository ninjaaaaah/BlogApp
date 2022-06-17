<template>
  <div class="bg-gray-50">
    <Header />
    <div class="container flex flex-row min-h-screen gap-4">
      <div class="flex flex-col gap-4 w-3/4 bg-white p-4 px-10 rounded">
        <form
          @submit.prevent=""
          class="flex flex-col gap-2 h-full text-gray-500"
        >
          <input
            class="w-full text-3xl font-bold outline-none rounded-md py-4"
            placeholder="Add Title"
            contenteditable
            v-model="post.title"
          />
          <!-- <VueEditor v-model="post.content" class="h-full" /> -->
          <TiptapEditor v-model="post.content" />
          <button
            class="mt-4 w-max bg-pink-500 text-white font-bold rounded-md py-3 px-6 self-end"
            type="submit"
            @click="createPost"
          >
            Submit
          </button>
        </form>
      </div>
      <div class="w-1/4 h-screen bg-white p-4">
        <div class="text-xl font-bold">Login</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create',
  data() {
    return {
      post: {
        title: '',
        content: '',
      },
    }
  },
  methods: {
    createPost() {
      const user = this.$fire.auth.currentUser
      const db = this.$fire.firestore
        .collection('blogs')
        .doc(user.uid)
        .collection('posts')
      db.add(this.post)
      this.$nuxt.$router.push('/')
    },
  },
}
</script>
