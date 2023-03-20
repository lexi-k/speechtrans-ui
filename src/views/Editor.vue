<template lang="pug">
v-container
	EditChunk(:chunk="chunk")
	EditChunk(:chunk="chunk1")
	text-viewer(:fontSize=42, :client="client")
</template>

<script lang="ts">
import { TextChunk } from "@/utils/chunk";
import EditChunk from "@/components/EditTextChunk.vue";
import TextViewer from "@/components/TextViewer.vue";
import AsrClient from "@/utils/client";


export default {
	data() {
		return {
            client: new AsrClient({}),
			chunk: {
				timestamp: 0,
				version: 0,
				text: "Hello, my name is <span style='color: red'>John.</span>&nbsp;",
			} as TextChunk,
			chunk1: {
				timestamp: 0,
				version: 0,
				text: "Hello, my name is John.",
			} as TextChunk,
		};
	},
};
</script>
