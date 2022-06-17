<template>
  <div>
    <Header />
    <div class="grid grid-flow-row grid-cols-5 gap-4 container">
      <div
        class="col-span-5 row-span-2 bg-gray-500 rounded p-4 h-96 text-white"
      >
        Hello {{ this.$fire.auth.currentUser.displayName }}
      </div>
      <ArticleTile v-for="post in this.posts" :post="post" :key="post.id" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      title: 'hello',
      posts: [],
    }
  },
  methods: {
    async loadPosts() {
      const user = this.$fire.auth.currentUser
      const postRef = this.$fire.firestore
        .collection('blogs')
        .doc(user.uid)
        .collection('posts')
      // const snapshot = await postRef.get()
      // if (!snapshot.empty) {
      //   snapshot.forEach((doc) => {
      //     this.posts.push({ id: doc.id, data: doc.data() })
      //   })
      // } else {
      //   console.log('No such documents!')
      // }
      // this.posts.forEach((blog) => {
      //   console.log(blog)
      // })
      const observer = postRef.onSnapshot((snapshot) => {
        this.posts = []
        snapshot.forEach((doc) => {
          this.posts.push({ id: doc.id, data: doc.data() })
        })
      })
    },
  },
  created() {
    this.loadPosts()
  },
}
</script>
