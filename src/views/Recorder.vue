<template lang="pug">
button#button1 START
button#button2 SUSPEND
button#button3 RESUME
</template>

<script lang="ts">
import AsrClient from "@/utils/ckient";

const client = new AsrClient({
	baseUrl: "http://slt.ufal.mff.cuni.cz:5003",
	sessionId: "default",
});
let context: AudioContext | null = null;
async function test() {
	context = new AudioContext({
		latencyHint: "interactive",
		sampleRate: 16000,
	});

	const microphone = await navigator.mediaDevices.getUserMedia({
		audio: true,
	});

	const source = context.createMediaStreamSource(microphone);

	await context.audioWorklet.addModule("/recorder.worklet.js");
	const recorder = new AudioWorkletNode(context, "recorder.worklet");

	source.connect(recorder).connect(context.destination);

	var timestamp = 0;
	// TODO: move this to a function with proper error handeling
	recorder.port.onmessage = async (e: { data: Float32Array }) => {
		// await fetch("http://slt.ufal.mff.cuni.cz:5003/submit_audio_chunk", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({ chunk: e.data, timestamp: timestamp++ }),
		// });
		// const res = await client.submitAudioChunk({
		// 	timestamp: timestamp++,
		// 	chunk: e.data,
		// });
		console.log("Recorder on message.");
	};
}

export default {
	data: () => ({
		context: {} as AudioContext,
		source: {} as MediaStreamAudioSourceNode,
		microphone: {} as MediaStream,
		recorder: {} as AudioWorkletNode,
		timestamp: 0,
	}),
	methods: {
		async createAudioContext() {
			this.context = new AudioContext({
				latencyHint: "interactive",
				sampleRate: 16000,
			});
		},
		async getMicrophone() {
			this.microphone = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
		},
		async createSource() {
			this.source = this.context.createMediaStreamSource(this.microphone);
		},
		async getRecorder() {
			await this.context.audioWorklet.addModule("/recorder.worklet.js");
			this.recorder = new AudioWorkletNode(
				this.context,
				"recorder.worklet"
			);
		},
		async startRecording() {
			this.source
				.connect(this.recorder)
				.connect(this.context.destination);

			this.recorder.port.onmessage = async (e: {
				data: Float32Array;
			}) => {
				const res = await client.submitAudioChunk({
					timestamp: this.timestamp++,
					chunk: e.data,
				});
				// TODO: Error handling
				console.log(res);
			};
		},
	},
	props: {
		test: String,
	},
	mounted() {
		// @ts-ignore
		document
			.getElementById("button1")
			.addEventListener("click", function () {
				test().then(() => {
					console.log("Playback started successfully");
				});
			});
		// @ts-ignore
		document
			.getElementById("button2")
			.addEventListener("click", function () {
				// @ts-ignore
				context.suspend().then(() => {
					console.log("Playback suspended successfully");
				});
			});

		// @ts-ignore
		document
			.getElementById("button3")
			.addEventListener("click", function () {
				// @ts-ignore
				context.resume().then(() => {
					console.log("Playback resumed successfully");
				});
			});
	},
};
</script>
