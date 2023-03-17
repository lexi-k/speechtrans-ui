<template>
	<!-- <HelloWorld /> -->
	<button id="button1">START</button>
	<button id="button2">SUSPEND</button>
	<button id="button3">RESUME</button>

	<html>
		<div class="container">
			<div
				class="text"
				id="en"
				style="border-left: solid; padding-left: 20px"
			>
				English:&nbsp;
			</div>
		</div>
	</html>
</template>

<script lang="ts">
import "../assets/home.css";
// import HelloWorld from '@/components/HelloWorld.vue'

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
	recorder.port.onmessage = async (e: { data: Float32Array }) => {
		// await fetch("http://slt.ufal.mff.cuni.cz:5003/submit_audio_chunk", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({ chunk: e.data, timestamp: timestamp++ }),
		// });
		console.log("Recorder on message.");
	};
}

export default {
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

		let INTERVAL = 2000; // seconds

		// var cz = document.getElementById("cz");
		var en = document.getElementById("en");

		// var intervalId = window.setInterval(function () {
		// 	 getData();
		// }, INTERVAL);

		// console.log(intervalId);

		async function getData() {
			let enRes = await fetch(
				"http://slt.ufal.mff.cuni.cz:5003/get_en_ASR",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			// const czData = await czRes.json();
			let enData = await enRes.json();

			// cz.textContent += czData.new_stable;
      // @ts-ignore
			en.textContent += " " + enData.new_stable;

			window.scrollTo({
				top: document.body.scrollHeight,
				left: 0,
				behavior: "smooth",
			});
		}
	},
};
</script>
