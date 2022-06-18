<template>
  <div class="relative">
    <div
      @click="toggle"
      class="flex justify-between items-center p-2 hover:cursor-pointer hover:bg-gray-100"
    >
      <OhVueIcon :name="icon" v-if="icon"></OhVueIcon>
      <div v-if="title" class="font-bold">
        {{ title }}
      </div>
    </div>
    <div
      :class="{ block: isOpen, hidden: !isOpen }"
      class="absolute left-0 right-0 mx-auto bg-white rounded w-fit shadow p-2"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    open: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: this.open,
    }
  },
  methods: {
    toggle() {
      console.log('toggle')
      this.isOpen = !this.isOpen
    },
  },
}
</script>
