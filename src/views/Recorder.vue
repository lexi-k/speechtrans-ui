<template lang="pug">
audio-recorder(:asrClient="client", :sampleRate="sampleRate")
</template>

<script lang="ts">
import AsrClient from "@/utils/client";
import AudioRecorder from "@/components/AudioRecorder.vue";

export default {
	data() {
		return {
			client: new AsrClient({}),
			sampleRate: 16000,
		};
	},
};
</script>
