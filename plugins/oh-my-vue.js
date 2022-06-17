import Vue from 'vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import * as FaIcons from 'oh-vue-icons/icons/fa'
import * as HiIcons from 'oh-vue-icons/icons/hi'

const Fa = Object.values({ ...FaIcons })
const Hi = Object.values({ ...HiIcons })
addIcons(...Fa, ...Hi)

Vue.use(OhVueIcon)
Vue.component('OhVueIcon', OhVueIcon)
