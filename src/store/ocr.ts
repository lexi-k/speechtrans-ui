// Utilities
import { defineStore } from "pinia";

export const useOcrStore = defineStore("app", {
	state: () => {
		return { ocrEnabled: false };
	},
});
