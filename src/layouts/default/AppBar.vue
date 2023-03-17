<template lang="pug">

v-app-bar(color="primary" prominent)
	v-app-bar-nav-icon(@click.stop="drawer = !drawer")
	v-toolbar-title Speech Translator
	v-spacer
	v-btn(variant="text" icon="mdi-cog")
	v-btn(variant="text" icon="mdi-dots-vertical")

v-navigation-drawer(v-model="drawer" location="top" temporary)
	v-list(:items="items")

</template>

<script lang="ts">
export default {
	data: () => ({
		drawer: false,
		group: null,
		items: [
			{
				title: "Foo",
				value: "foo",
			},
			{
				title: "Bar",
				value: "bar",
			},
			{
				title: "Fizz",
				value: "fizz",
			},
			{
				title: "Buzz",
				value: "buzz",
			},
		],
	}),

	watch: {
		group() {
			this.drawer = false;
		},
	},
};
</script>
