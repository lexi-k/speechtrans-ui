<template lang="pug">
Recorder
Viewer
</template>

<script lang="ts" setup>
import Recorder from "@/views/Recorder.vue";
import Viewer from "@/views/Viewer.vue"
import { useOcrStore } from '@/store/ocr'
const ocrStore = useOcrStore();


</script>
