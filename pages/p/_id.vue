<template>
  <div>
    {{ post.data }}
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
          date: '',
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
  created() {
    this.loadPost()
  },
}
</script>
