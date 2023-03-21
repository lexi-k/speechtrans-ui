import { TextChunk, TextChunkVersions, AudioChunk } from "./chunk";
import fetchRetry from "fetch-retry";

const retryingFetch = fetchRetry(fetch);

class AsrClient {
	baseUrl: string;
	headers: Headers;
	session: string;
	constructor({
		baseUrl = "http://slt.ufal.mff.cuni.cz:5003",
		additionalHeaders,
		sessionId = "default",
	}: {
		baseUrl?: string;
		additionalHeaders?: HeadersInit;
		sessionId?: string;
	}) {
		this.baseUrl = baseUrl;

		this.session = `?session_id=${sessionId}`;

		this.headers = new Headers(additionalHeaders);
		this.headers.append("Content-Type", "application/json");
	}

	async get(api: string) {
		const response = await retryingFetch(
			this.baseUrl + api + this.session,
			{
				retries: 3,
				retryDelay: 1000,
				method: "GET",
				headers: this.headers,
			}
		);
		if (response.ok) return response.json();
		else console.log(response.statusText);
	}

	async post(api: string, payload: object = {}) {
		const response = await retryingFetch(
			this.baseUrl + api + this.session,
			{
				retries: 3,
				retryDelay: 1000,
				method: "POST",
				headers: this.headers,
				body: JSON.stringify(payload),
			}
		);
		if (response.ok) return response.json();
		else console.error(response.statusText);
	}

	async submitAudioChunk(audioChunk: AudioChunk) {
		const res = await this.post("/submit_audio_chunk", audioChunk);
		return res;
	}

	async getLatestTextChunkVersions() {
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

export default AsrClient;
