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
			eav_attribute: {
				Row: {
					id: number | null;
					created_at: Date | null;
					updated_at: Date | null;
					isactive: boolean | null;
					code: string | null;
					name: string | null;
					backend_type: string | null;
					frontend_input: string | null;
					entity_type_id: number | null;
				};
				Insert: {
					id: number | null;
					created_at: Date | null;
					updated_at: Date | null;
					isactive: boolean | null;
					code: string | null;
					name: string | null;
					backend_type: string | null;
					frontend_input: string | null;
					entity_type_id: number | null;
				};
				Update: {
					id: number | null;
					created_at: Date | null;
					updated_at: Date | null;
					isactive: boolean | null;
					code: string | null;
					name: string | null;
					backend_type: string | null;
					frontend_input: string | null;
					entity_type_id: number | null;
				};
			};
			m_attribute: {
				Row: {
					id: number | null;
					created_at: Date | null;
					updated_at: Date | null;
					code: string | null;
					attribute_type: string | null;
					backend_type: string | null;
					attribute_group_id: number | null;
					label: string | null;
				};
				Insert: {
					id: number | null;
					created_at: Date | null;
					updated_at: Date | null;
					code: string | null;
					attribute_type: string | null;
					backend_type: string | null;
					attribute_group_id: number | null;
					label: string | null;
				};
				Update: {
					id: number | null;
					created_at: Date | null;
					updated_at: Date | null;
					code: string | null;
					attribute_type: string | null;
					backend_type: string | null;
					attribute_group_id: number | null;
					label: string | null;
				};
			};
			product_category: {
				Row: {
					id: number | null;
					created_at: Date | null;
					updated_at: Date | null;
					name: string | null;
					parent_id: number | null;
					description: string | null;
				};
				Insert: {
					id: number | null;
					created_at: Date | null;
					updated_at: Date | null;
					name: string | null;
					parent_id: number | null;
					description: string | null;
				};
				Update: {
					id: number | null;
					created_at: Date | null;
					updated_at: Date | null;
					name: string | null;
					parent_id: number | null;
					description: string | null;
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
