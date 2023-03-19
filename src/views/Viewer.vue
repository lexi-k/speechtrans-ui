<template lang="pug">
.translation(v-html="finalText")
</template>

<script lang="ts">
import "@/styles/viewer.scss";
export default {
	data: () => ({
		textChunks: [] as string[],
		finalText: "" as string,
	}),
	mounted() {
		const res = {
			success: true,
			session_id: "default",
			textChunks: [
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
			],
		};

		const colorGradient = ["#a1a2a3", "#d1d1d1"];

		this.finalText = res.textChunks
			.slice(0, -colorGradient.length)
			.map(({ text }) => text)
			.join(" ");

		for (let i = 0; i < colorGradient.length; i++) {
			this.finalText += "<span style='color: " + colorGradient[i] + "'>";
			res.textChunks.at(-2 + i) == null
				? (this.finalText += "")
				: (this.finalText += " " + res.textChunks.at(
						-colorGradient.length + i
				  )?.text);
			this.finalText += "</span>";
		}

		let INTERVAL = 2000; // seconds

		// var intervalId = window.setInterval(function () {
		// 	 getData();
		// }, INTERVAL);

		async function getData() {
			// let enRes = await fetch(
			// 	"http://slt.ufal.mff.cuni.cz:5003/get_en_ASR",
			// 	{
			// 		method: "GET",
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 		},
			// 	}
			// );
			// TODO: Assert success

            // TODO: Scroll smoothly (50? chunks) to the bottom of the page
			window.scrollTo({
				top: document.body.scrollHeight,
				// left: 0,
				behavior: "smooth",
			});
		}
	},
};
</script>
