<template lang="pug">
v-card.container
	.editChunk(contenteditable="true", @input="onInput", v-html="chunk.text")
v-btn(color="primary", @click="checkDiff") Save
</template>

<script lang="ts">
import { TextChunk } from "@/utils/chunk";
import type { PropType } from "vue";
import "@/styles/editChunk.scss";

export default {
	props: {
		chunk: {
			type: Object as PropType<TextChunk>,
			required: true,
		},
	},
	data() {
		return {
			originalText: "" as string,
			updatedText: "" as string,
		};
	},

	methods: {
		checkDiff() {
			if (this.updatedText !== this.originalText) {
				this.chunk.version += 1;
				this.chunk.text = this.updatedText;
				console.log(this.chunk);
			}
		},
		onInput(e: any) {
			this.updatedText = e.target.innerHTML;
			// TODO: Change color
			// TODO: Display *original* in some kind of dropdown
			// TODO: Maybe wait some time and autosubmit with an option to cancle
		},
	},

	mounted() {
		this.originalText = this.chunk.text;
		this.updatedText = this.originalText;
	},
};
</script>
