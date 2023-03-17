<template lang="pug">
v-app-bar(color="#434c5e", prominent)
	//- v-app-bar-nav-icon
	v-toolbar-title(style="color: #88c0d0") Speech Translator
	v-container(style="max-width: 1000px")
		v-row(align="center", justify="end")
			v-col
				v-select.test(
					label="Select input language",
					variant="solo",
					density="compact",
					v-model="language",
					:items="languages",
					:style="{ padding: '20px 5px 0 0', maxWidth: '230px' }"
				)
					template(v-slot:prepend)
						v-icon(color="#ebcb8b") mdi-translate

			v-col
				v-checkbox.testchck(
					label="OCR",
					color="#a3be8c",
					style="margin-top: 20px"
				)
					template(v-slot:label)
						div(style="color: white") OCR

			v-col
				v-btn.testbtn(variant="flat", prepend-icon="mdi-play-pause") Translate
	//- v-btn(variant="text", icon="mdi-cog", @click.stop="drawer = !drawer")
	//- v-btn(variant="text", icon="mdi-dots-vertical")

//- v-dialog(v-model="drawer")
//- 	v-container(:style="{backgroundColor: 'white', borderRadius: '3px'}")
//- 		v-row
//- 			v-col(cols="9", sm="3")
//- 				v-select(
//- 					label="Select input language",
//- 					variant="solo",
//- 					v-model="language",
//- 					:items="languages",
//- 					append-icon="mdi-translate",
//- 				)
</template>

<style>
.test .v-field {
	background-color: #eceff4;
}

.testbtn {
	background-color: #eceff4;
}

.testchck .v-selection-control__wrapper {
	color: #bf616a;
}
</style>

<script lang="ts">
export default {
	data: () => ({
		drawer: false,
		group: null,
		language: "Czech",
		languages: [
			"Afrikaans",
			"Albanian",
			"Amharic",
			"Arabic",
			"Armenian",
			"Assamese",
			"Azerbaijani",
			"Bashkir",
			"Basque",
			"Belarusian",
			"Bengali",
			"Bosnian",
			"Breton",
			"Bulgarian",
			"Catalan",
			"Chinese",
			"Croatian",
			"Czech",
			"Danish",
			"Dutch",
			"English",
			"Estonian",
			"Faroese",
			"Finnish",
			"French",
			"Galician",
			"Georgian",
			"German",
			"Greek",
			"Gujarati",
			"Haitian Creole",
			"Hausa",
			"Hawaiian",
			"Hebrew",
			"Hindi",
			"Hungarian",
			"Icelandic",
			"Indonesian",
			"Italian",
			"Japanese",
			"Javanese",
			"Kannada",
			"Kazakh",
			"Khmer",
			"Korean",
			"Lao",
			"Latin",
			"Latvian",
			"Lingala",
			"Lithuanian",
			"Luxembourgish",
			"Macedonian",
			"Malagasy",
			"Malay",
			"Malayalam",
			"Maltese",
			"Maori",
			"Marathi",
			"Mongolian",
			"Myanmar",
			"Nepali",
			"Norwegian",
			"Nynorsk",
			"Occitan",
			"Pashto",
			"Persian",
			"Polish",
			"Portuguese",
			"Punjabi",
			"Romanian",
			"Russian",
			"Sanskrit",
			"Serbian",
			"Shona",
			"Sindhi",
			"Sinhala",
			"Slovak",
			"Slovenian",
			"Somali",
			"Spanish",
			"Sundanese",
			"Swahili",
			"Swedish",
			"Tagalog",
			"Tajik",
			"Tamil",
			"Tatar",
			"Telugu",
			"Thai",
			"Tibetan",
			"Turkish",
			"Turkmen",
			"Ukrainian",
			"Urdu",
			"Uzbek",
			"Vietnamese",
			"Welsh",
			"Yiddish",
			"Yoruba",
		],
	}),

	watch: {
		group() {
			this.drawer = false;
		},
	},
};
</script>
