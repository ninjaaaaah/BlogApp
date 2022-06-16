<template>
  <div class="flex flex-col w-full rounded-md shadow overflow-hidden">
    <div class="h-48">
      <img
        class="w-full h-full object-cover"
        :src="`https://picsum.photos/seed/${article.id}/500/500?grayscale&blur=1&random=${article.id}`"
      />
    </div>
    <div class="flex flex-col gap-3 p-4 pb-8">
      <div class="font-bold text-xs text-gray-500 text-left">
        {{ article.date }}
      </div>
      <div class="font-bold text-md line-clamp-2">
        {{ article.title }}
      </div>
      <div class="text-sm line-clamp-3">
        {{ article.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleTile',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>
