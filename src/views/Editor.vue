<template lang="pug">
EditChunk(:chunk="chunk")
EditChunk(:chunk="chunk1")
</template>

<script lang="ts">
import { TextChunk } from "@/utils/chunk";
import EditChunk from "@/components/EditChunk.vue";

import { useOcrStore } from "@/store/ocr";
const ocrStore = useOcrStore();


export default {
	data: () => ({
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
	}),
};
</script>
