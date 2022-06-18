<template>
  <div>
    <div
      @click="toggle"
      class="flex justify-between items-center p-2 hover:cursor-pointer hover:bg-gray-100"
    >
      <h3>{{ title }}</h3>
      <OhVueIcon
        :name="isOpen ? 'fa-chevron-down' : 'fa-chevron-up'"
      ></OhVueIcon>
    </div>
    <div :class="{ block: isOpen, hidden: !isOpen }">
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
