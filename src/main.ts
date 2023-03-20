/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import EditChunk from './components/EditTextChunk.vue'
import AudioRecorder from './components/AudioRecorder.vue'
import TextViewer from './components/TextViewer.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
app.component('EditChunk', EditChunk);
app.component('audio-recorder', AudioRecorder);
app.component('text-viewer', TextViewer);

registerPlugins(app)

app.mount('#app')
