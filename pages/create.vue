<template>
  <div class="bg-gray-50">
    <Header />
    <div class="container flex flex-row min-h-screen gap-4 bg-white">
      <div class="flex flex-col gap-4 w-3/4 p-4 px-10 rounded">
        <form
          @submit.prevent=""
          class="flex flex-col gap-2 h-full text-gray-700"
        >
          <input
            class="w-full text-3xl font-bold outline-none rounded-md py-4 placeholder-gray-500"
            placeholder="Add Title"
            contenteditable
            v-model="post.title"
          />
          <!-- <VueEditor v-model="post.content" class="h-full" /> -->
          <TiptapEditor v-model="post.content" />
        </form>
      </div>
      <div class="w-1/4 h-screen bg-white">
        <div class="flex flex-col">
          <Collapse title="Outline" open="True">
            <ul class="flex flex-col gap-1 m-4" v-show="toc.length">
              <li
                v-for="heading in toc"
                :class="{
                  'text-lg font-bold text-gray-600': heading.level == 'h1',
                  'ml-2 text-sm font-normal text-gray-500':
                    heading.level == 'h2',
                  'ml-4 text-sm font-normal text-gray-500':
                    heading.level == 'h3',
                }"
              >
                {{ heading.text }}
              </li>
            </ul>
          </Collapse>
          <hr />
          <Collapse title="Tags" open="True">
            <div class="text-sm m-2 flex flex-col gap-2">
              <div>Add New Tag</div>
              <input
                type="text"
                v-model="post.tags"
                class="p-2 border-[1px] border-gray-500"
              />
            </div>
          </Collapse>
          <hr />
          <Collapse title="Excerpt" open="True">
            <div class="w-full p-2 focus:outline-1">
              <textarea
                class="w-full h-full outline-none border-[1px] rounded-md border-gray-500 p-2 text-sm"
                placeholder="Add Excerpt"
                v-model="post.excerpt"
              ></textarea>
            </div>
          </Collapse>
          <hr />
          <button
            class="mt-4 w-max bg-pink-500 text-white font-bold rounded-md py-3 px-6 self-end"
            @click="createPost"
          >
            Submit
          </button>
        </div>
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
        timestamp: Date(),
        excerpt: '',
        tags: '',
      },
      toc: [],
    }
  },
  methods: {
    createPost() {
      this.post.timestamp = Date.now()
      const user = this.$fire.auth.currentUser
      const db = this.$fire.firestore
        .collection('blogs')
        .doc(user.uid)
        .collection('posts')
      db.add(this.post)
      this.$nuxt.$router.push('/')
    },
    generateTOC() {
      const regex = /<(?<level>h\w)>(?<text>.*?)</gs
      let match
      this.toc = []
      while ((match = regex.exec(this.post.content)) !== null) {
        console.log(match)
        this.toc.push({
          level: match.groups.level,
          text: match.groups.text,
        })
      }
    },
  },
  watch: {
    post: {
      handler(val) {
        this.generateTOC()
      },
      deep: true,
    },
  },
}
</script>
