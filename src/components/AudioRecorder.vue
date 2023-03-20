<template lang="pug">
button#button1 START
button#button2 SUSPEND
button#button3 RESUME
</template>

<script lang="ts">
import AsrClient from "@/utils/client";

export default {
	name: "audio-recorder",
	data() {
		return {
			context: {} as AudioContext,
			source: {} as MediaStreamAudioSourceNode,
			microphone: {} as MediaStream,
			recorder: {} as AudioWorkletNode,
			timestamp: 0,
		};
	},
	methods: {
		async createAudioContext() {
			this.context = new AudioContext({
				latencyHint: "interactive",
				sampleRate: this.sampleRate, // default: 16000
			});
		},
		async getRecorder() {
			await this.context.audioWorklet.addModule("/recorder.worklet.js");
			this.recorder = new AudioWorkletNode(
				this.context,
				"recorder.worklet"
			);
		},
		async getMicrophone() {
			this.microphone = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
		},
		async createSource() {
			this.source = this.context.createMediaStreamSource(this.microphone);
			this.source
				.connect(this.recorder)
				.connect(this.context.destination);
		},
		async submitAudioChunk(audioEvent: { data: Float32Array }) {
			const res = await this.asrClient.submitAudioChunk({
				timestamp: this.timestamp++,
				chunk: audioEvent.data,
			});
			if (!res.success) {
				console.error("Error while submitting audio chunk:");
				console.error(res.message);
			}
		},
		async startRecording() {
			await this.createAudioContext();
			await this.getRecorder();
			await this.getMicrophone();
			await this.createSource();

			console.info("Started recording.");

			this.recorder.port.onmessage = this.submitAudioChunk;
		},
	},
	props: {
		asrClient: { type: AsrClient, required: true },
		sampleRate: { type: Number, required: true },
	},
	mounted() {
		// @ts-ignore
		document
			.getElementById("button1")
			.addEventListener("click", this.startRecording);
		// @ts-ignore
		document
			.getElementById("button2")
			.addEventListener("click", function () {
				// @ts-ignore
				this.context.suspend().then(() => {
					console.log("Playback suspended successfully");
				});
			});

		// @ts-ignore
		document
			.getElementById("button3")
			.addEventListener("click", function () {
				// @ts-ignore
				this.context.resume().then(() => {
					console.log("Playback resumed successfully");
				});
			});
	},
};
</script>
