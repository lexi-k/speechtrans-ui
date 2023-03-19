<template lang="pug">
v-card.container
	.editChunk(contenteditable="true"  @input="onInput" v-html="chunk.text")
v-btn(color="primary", @click="checkDiff") Save
</template>

<script lang="ts">
import { Chunk } from "@/utils/chunk";
import type { PropType } from "vue";
import "@/styles/editChunk.scss";

export default {
	props: {
		chunk: {
			type: Object as PropType<Chunk>,
			required: true,
		},
	},
	data: () => ({
		originalText: "" as string,
		updatedText: "" as string,
	}),

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
		},
	},

	mounted() {
		this.originalText = this.chunk.text;
		this.updatedText = this.originalText;
	},
};
</script>
