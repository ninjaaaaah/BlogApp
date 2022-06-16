<template>
  <div>
    <Header />
    <div class="grid grid-flow-row grid-cols-5 gap-4 container">
      <div
        class="col-span-5 row-span-2 bg-gray-500 rounded p-4 h-96 text-white"
      >
        Hello {{ this.$fire.auth.currentUser.displayName }}
      </div>
      <ArticleTile
        v-for="article in this.$store.state.articleList"
        :article="article"
        :key="article.id"
      />
      <ArticleTile
        v-for="article in this.$store.state.articleList"
        :article="article"
        :key="article.id"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      title: 'hello',
    }
  },
}
</script>
