import { TextChunk, TextChunkVersions, AudioChunk } from "./chunk";

class AsrClient {
	baseUrl: string;
	headers: Headers;
	session: string;
	constructor(
		additionalHeaders?: HeadersInit,
		sessionId: string = "default"
	) {
		this.baseUrl = "http://slt.ufal.mff.cuni.cz:5003";

		this.session = `?session_id=${sessionId}`;

		this.headers = new Headers(additionalHeaders);
		this.headers.append("Content-Type", "application/json");
	}

	async get(api: string, payload: object = {}) {
		const response = await fetch(this.baseUrl + api + this.session, {
			method: "GET",
			headers: this.headers,
			body: JSON.stringify(payload),
		});
		return response.json();
	}

	async post(api: string, payload: object = {}) {
		const response = await fetch(this.baseUrl + api + this.session, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify(payload),
		});
		return response.json();
	}

	async submitAudioChunk(audioChunk: AudioChunk) {
		const res = await this.post("/submit_audio_chunk", audioChunk);
		return res;
	}

	async getLatestTextChunksVersions() {
		const res = await this.get("/get_latest_text_chunk_versions");
		return res.versions as TextChunkVersions;
	}

	async getLatestTextChunks(chunkVersions: TextChunkVersions) {
		const res = await this.post("/get_latest_text_chunks", {
			versions: chunkVersions,
		});
		return res.text_chunks as TextChunk[];
	}

	async updateTextChunk(chunk: TextChunk) {
		const res = await this.post("/edit_asr_chunk", chunk);
		return {
			timestamp: res.timestamp,
			version: res.version,
			text: res.text,
		} as TextChunk;
	}
}
