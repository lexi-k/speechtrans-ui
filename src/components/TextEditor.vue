<template lang="pug">
v-container
	edit-text-chunk(v-for="chunk in textChunks", :client="client" :chunk="chunk")
</template>

<script lang="ts">
import { TextChunk } from "@/utils/chunk";
import AsrClient from "@/utils/client";
import { text } from "stream/consumers";
import { PropType } from "vue";

export default {
	name: "text-editor",
	props: {
		textChunks: {
			type: Array as PropType<TextChunk[]>,
			required: true,
		},
	},
	data() {
		return {
			client: new AsrClient({}),
			// chunk: {
			// 	timestamp: 0,
			// 	version: 0,
			// 	text: "Hello, my name is John. I am a student at the University of Applied Sciences in Munich. It is not a nice place to live but it is a nice place to study. Lorem Ipsum, sometimes referred to as lipsum, is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved. <span style='color: red'>John.</span>&nbsp;",
			// } as TextChunk,
			// chunk1: {
			// 	timestamp: 0,
			// 	version: 0,
			// 	text: "Hello, my name is John.",
			// } as TextChunk,
		};
	},
};
</script>
