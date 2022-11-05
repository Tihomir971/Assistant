export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			test: {
				Row: {
					id: number | null;
					created: Date | null;
				};
				Insert: {
					id: number | null;
					created: Date | null;
				};
				Update: {
					id: number | null;
					created: Date | null;
				};
			};
			ad_user: {
				Row: {
					id: string;
					updated_at: string | null;
					username: string | null;
					avatar_url: string | null;
					website: string | null;
				};
				Insert: {
					id: string;
					updated_at?: string | null;
					username?: string | null;
					avatar_url?: string | null;
					website?: string | null;
				};
				Update: {
					id?: string;
					updated_at?: string | null;
					username?: string | null;
					avatar_url?: string | null;
					website?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
