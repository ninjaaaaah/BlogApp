<template>
  <div>
    <editor-content
      :editor="editor"
      class="outline-none text-xl"
      placeholder="Add content"
    />
    <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 100, offset: [0, 0] }"
      v-if="editor"
      class="p-2 bg-white rounded shadow flex gap-2 items-center"
    >
      <div>
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ active: editor.isActive('bold') }"
          class="tile"
        >
          <OhVueIcon name="fa-bold" />
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ active: editor.isActive('italic') }"
          class="tile"
        >
          <OhVueIcon name="fa-italic" />
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :class="{ active: editor.isActive('strike') }"
          class="tile"
        >
          <OhVueIcon name="fa-strikethrough" />
        </button>
      </div>
      |
      <div>
        <button
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{
            active: editor.isActive({ textAlign: 'left' }),
          }"
          class="tile"
        >
          <OhVueIcon name="fa-align-left" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{
            active: editor.isActive({ textAlign: 'center' }),
          }"
          class="tile"
        >
          <OhVueIcon name="fa-align-center" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{
            active: editor.isActive({ textAlign: 'right' }),
          }"
          class="tile"
        >
          <OhVueIcon name="fa-align-right" />
        </button>
        <!-- <button
          @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{
            active: editor.isActive({ textAlign: 'justify' }),
          }"
          class="tile"
        >
          <OhVueIcon name="fa-align-justify" />
        </button> -->
        <!-- <button @click="editor.chain().focus().unsetTextAlign().run()">
          unsetTextAlign
        </button> -->
      </div>
      |
      <div>
        <button @click="addImage">
          <OhVueIcon name="fa-regular-image" />
        </button>
      </div>
    </bubble-menu>
  </div>
</template>

<script>
import { BubbleMenu, Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

export default {
  components: {
    EditorContent,
    BubbleMenu,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        Heading,
        Image,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Placeholder.configure({
          placeholder: 'Write something …',
        }),
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },

  methods: {
    addImage() {
      const url = window.prompt('URL')

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run()
      }
    },
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style>
.ProseMirror {
  outline: none;
  height: inherit;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
