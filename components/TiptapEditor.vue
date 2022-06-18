<template>
  <div class="flex flex-col gap-4">
    <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 100, offset: [0, 0] }"
      v-if="editor"
      class="bg-white border-[1px] border-gray-400 flex items-center"
    >
      <div class="border-r-[1px] border-gray-400 p-2">
        <div class="flex items-center">
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
          <Dropdown icon="fa-chevron-down" class="w-fit">
            <button
              @click="editor.chain().focus().toggleUnderline().run()"
              :class="{ active: editor.isActive('underline') }"
              class="tile"
            >
              <OhVueIcon name="fa-underline" />
            </button>
            <button
              @click="editor.chain().focus().toggleSubscript().run()"
              :class="{ active: editor.isActive('subscript') }"
              class="tile"
            >
              <OhVueIcon name="fa-subscript" />
            </button>
            <button
              @click="editor.chain().focus().toggleSuperscript().run()"
              :class="{ active: editor.isActive('superscript') }"
              class="tile"
            >
              <OhVueIcon name="fa-superscript" />
            </button>
            <button @click="addImage" class="tile">
              <OhVueIcon name="fa-regular-image" />
            </button>
            <button
              @click="editor.chain().focus().toggleCode().run()"
              :class="{ active: editor.isActive('code') }"
              class="tile"
            >
              <OhVueIcon name="fa-code" />
            </button>
          </Dropdown>
        </div>
      </div>
      <div class="border-r-[1px] border-gray-400 p-2">
        <Dropdown
          :icon="
            editor.isActive({ textAlign: 'right' })
              ? 'fa-align-right'
              : editor.isActive({ textAlign: 'center' })
              ? 'fa-align-center'
              : 'fa-align-left'
          "
        >
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
        </Dropdown>
      </div>
      <div class="border-r-[1px] border-gray-400 p-2">
        <Dropdown
          :title="
            editor.isActive('heading', { level: 1 })
              ? 'H1'
              : editor.isActive('heading', { level: 2 })
              ? 'H2'
              : editor.isActive('heading', { level: 3 })
              ? 'H3'
              : 'H1'
          "
        >
          <button
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ active: editor.isActive('heading', { level: 1 }) }"
            class="tile font-bold"
          >
            H1
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ active: editor.isActive('heading', { level: 2 }) }"
            class="tile font-bold"
          >
            H2
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ active: editor.isActive('heading', { level: 3 }) }"
            class="tile font-bold"
          >
            H3
          </button>
        </Dropdown>
      </div>
      <div class="border-r-[1px] border-gray-400 p-2">
        <Dropdown icon="fa-ellipsis-v">
          <button @click="addImage" class="tile">
            <OhVueIcon name="fa-regular-image" />
          </button>
          <button
            @click="editor.chain().focus().toggleCode().run()"
            :class="{ active: editor.isActive('code') }"
            class="tile"
          >
            <OhVueIcon name="fa-code" />
          </button>
        </Dropdown>
      </div>
    </bubble-menu>
    <editor-content
      :editor="editor"
      class="outline-none text-xl"
      placeholder="Add content"
    />
  </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

import Document from '@tiptap/extension-document'
import Code from '@tiptap/extension-code'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Underline from '@tiptap/extension-underline'

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
        Underline,
        Subscript,
        Superscript,
        Text,
        Heading,
        Image,
        Code,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Placeholder.configure({
          placeholder: 'Write something…',
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

<style lang="scss">
.ProseMirror {
  outline: none;
}

.ProseMirror {
  > * + * {
    margin: 1em 0;
  }
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

.mention {
  border: 1px solid #000;
  border-radius: 0.4rem;
  padding: 0.1rem 0.3rem;
  box-decoration-break: clone;
}
</style>
