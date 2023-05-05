export type IncomingRequest = {
	method: string;
	headers: Record<string, string>;
	params: Record<string, string>;
	query: URLSearchParams;
	body: string | Record<string, unknown> | ReadableStream;
};
