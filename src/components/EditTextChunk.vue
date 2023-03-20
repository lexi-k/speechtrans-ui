<template lang="pug">
v-card.container
	.editTextChunk(
		contenteditable="true",
		@input="onInput",
		@focus="highlightFocused",
		@blur="unhighlightFocused",
		v-html="originalText"
	)
	v-btn.submitChanges(
		v-if="showSubmit",
		size="small",
		color="#188B61",
		@click="checkDiff"
	) Submit
	v-btn.discardChanges(
		v-if="showSubmit",
		size="small",
		color="#bd3f4f",
		@click="discardChanges"
	) Discard
</template>

<script lang="ts">
import { TextChunk } from "@/utils/chunk";
import type { PropType } from "vue";
import "@/styles/editChunk.scss";
import AsrClient from "@/utils/client";

export default {
	props: {
		client: {
			type: Object as PropType<AsrClient>,
			required: true,
		},
		chunk: {
			type: Object as PropType<TextChunk>,
			required: true,
		},
	},
	data() {
		return {
			originalText: "" as string,
			updatedText: "" as string,
			showSubmit: false,
		};
	},
	methods: {
		checkDiff() {
			if (this.updatedText !== this.originalText) {
				this.chunk.version += 1;
				// this.originalText =
				// 	"<span style='color: red'>" + this.updatedText + "</span>";
				// TODO: Diff this
				console.log(this.originalText);
				this.showSubmit = false;
			}
		},
		onInput(e: any) {
			this.updatedText = e.target.innerHTML;

			if (this.updatedText != this.originalText) this.showSubmit = true;
			else this.showSubmit = false;
			// TODO: Change color
			// TODO: Display *original* in some kind of dropdown
		},
		highlightFocused(e: any) {
			this.chunk.text =
				"<span style='background-color: #E0D64E; color: black'>" + this.chunk.text + "</span>";
		},
		unhighlightFocused(e: any) {
			this.chunk.text = this.chunk.text
				.replace("<span style='background-color: #E0D64E; color: black'>", "")
				.replace("</span>", "");
		},
		discardChanges() {
			// TODO: fix thi hack
			this.originalText = this.originalText + " ";
			this.showSubmit = false;
		}
	},

	mounted() {
		this.originalText = this.chunk.text;
		this.updatedText = this.originalText;
	},
};
</script>
