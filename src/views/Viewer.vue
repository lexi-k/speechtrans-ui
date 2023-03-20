<template lang="pug">
text-viewer(:fontSize=42, :client="client")
</template>

<script lang="ts">
import "@/styles/textViewer.scss";
import TextViewer from "@/components/TextViewer.vue";
import AsrClient from "@/utils/client";

export default {
	data() {
		return {
			client: new AsrClient({}),
		};
	},
};
</script>
