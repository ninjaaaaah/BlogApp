<template>
  <div>
    <Header />
    <div class="container min-h-screen gap-4 bg-white">
      <h1>
        {{ post.data.title }}
      </h1>
      <div>{{ Date(post.data.timestamp) }}</div>
      <div v-html="post.data.content" class="article"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        id: this.$route.params.id,
        data: {
          title: '',
          content: '',
          timestamp: '',
        },
      },
    }
  },
  methods: {
    async loadPost() {
      const user = this.$fire.auth.currentUser
      const postRef = this.$fire.firestore
        .collection('blogs')
        .doc(user.uid)
        .collection('posts')
        .doc(this.post.id)
      const snapshot = await postRef.get()
      if (!snapshot.empty) {
        this.post.data = snapshot.data()
      } else {
        console.log('No such documents!')
      }
      console.log(this.post)
    },
  },
  mounted() {
    this.loadPost()
  },
}
</script>
