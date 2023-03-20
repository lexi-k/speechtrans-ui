<template lang="pug">
.translation(:style="styleFontSize", v-html="getFinalText")
</template>

<script lang="ts">
import { TextChunk, TextChunkVersions } from "@/utils/chunk";
import type { PropType } from "vue";
import "@/styles/editChunk.scss";
import AsrClient from "@/utils/client";

export default {
	name: "text-viewer",
	props: {
		fontSize: {
			type: Number,
			required: true,
		},
		client: {
			type: Object as PropType<AsrClient>,
			required: true,
		},
	},

	data() {
		return {
			styleFontSize: "font-size: " + this.fontSize.toString() + "px",
			textChunks: [] as TextChunk[],
			updateTextInterval: 1000,
			intervalId: Number,
		};
	},

	methods: {
		async updateText() {
			var currentChunkCersions = {} as TextChunkVersions;
			this.textChunks.forEach((textChunk) => {
				currentChunkCersions[textChunk.timestamp] = textChunk.version;
			});

			const textChunksUpdate = await this.client.getLatestTextChunks(
				currentChunkCersions
			);

			textChunksUpdate.textChunks.forEach((textChunk) => {
				if (this.textChunks.length <= textChunk.timestamp) {
					this.textChunks[textChunk.timestamp] = textChunk;
				} else if (
					textChunk.version >
					this.textChunks[textChunk.timestamp].version
				) {
					this.textChunks[textChunk.timestamp] = textChunk;
				}
			});

			window.scroll({
				top: document.body.scrollHeight,
				behavior: "smooth",
			});
		},
	},
	async mounted() {
		// this.textChunks = await this.client.getLatestTextChunks({});
		this.textChunks = [
			{
				timestamp: 0,
				version: 0,
				text: "Hello, my name is John.",
			},
			{
				timestamp: 1,
				version: 0,
				text: "I am a student at the University of Applied Sciences in Munich.",
			},
			{
				timestamp: 2,
				version: 0,
				text: "It is not a nice place to live",
			},
			{
				timestamp: 3,
				version: 0,
				text: "but it is a nice place to study.",
			},
			{
				timestamp: 4,
				version: 0,
				text: "Lorem Ipsum, sometimes referred to as lipsum,",
			},
			{
				timestamp: 5,
				version: 0,
				text: "is the placeholder text used in design when creating content. It helps designers",
			},
			{
				timestamp: 6,
				version: 0,
				text: "plan out where the content will sit, without",
			},
			{
				timestamp: 7,
				version: 0,
				text: "needing to wait for the content to be written and approved.",
			},
		];
		// this.intervalId = window.setInterval(function () {
		// 	updateText();
		// }, this.updateTextInterval);
	},

	computed: {
		getFinalText() {
			const colorGradient = ["#a1a2a3", "#d1d1d1"];
			let finalText = this.textChunks
				.slice(0, -colorGradient.length)
				.map(({ text }) => text)
				.join(" ");

			for (let i = 0; i < colorGradient.length; i++) {
				finalText += "<span style='color: " + colorGradient[i] + "'>";
				this.textChunks.at(-2 + i) == null
					? (finalText += "")
					: (finalText +=
							" " +
							this.textChunks.at(-colorGradient.length + i)
								?.text);
				finalText += "</span>";
			}
			return finalText;
		},
	},
};
</script>
