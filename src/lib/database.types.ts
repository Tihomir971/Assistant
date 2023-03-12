export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
	public: {
		Tables: {
			_template: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					id: number;
					isactive: boolean;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					updated?: string;
				};
			};
			ad_client: {
				Row: {
					ad_language: string | null;
					created: string;
					createdby: string | null;
					id: number;
					isactive: boolean;
					name: string;
					updated: string;
					updatedby: string | null;
					value: string;
				};
				Insert: {
					ad_language?: string | null;
					created?: string;
					createdby?: string | null;
					id?: number;
					isactive?: boolean;
					name: string;
					updated?: string;
					updatedby?: string | null;
					value: string;
				};
				Update: {
					ad_language?: string | null;
					created?: string;
					createdby?: string | null;
					id?: number;
					isactive?: boolean;
					name?: string;
					updated?: string;
					updatedby?: string | null;
					value?: string;
				};
			};
			ad_language: {
				Row: {
					ad_client_id: number;
					ad_language: string;
					ad_org_id: number;
					countrycode: string | null;
					created: string;
					id: number;
					isactive: boolean;
					languageiso: string | null;
					name: string;
					updated: string;
				};
				Insert: {
					ad_client_id: number;
					ad_language: string;
					ad_org_id?: number;
					countrycode?: string | null;
					created?: string;
					id?: number;
					isactive?: boolean;
					languageiso?: string | null;
					name: string;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_language?: string;
					ad_org_id?: number;
					countrycode?: string | null;
					created?: string;
					id?: number;
					isactive?: boolean;
					languageiso?: string | null;
					name?: string;
					updated?: string;
				};
			};
			ad_message: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					id: number;
					isErrorMsg: boolean;
					msgText: string;
					updated: string;
				};
				Insert: {
					ad_client_id: number;
					ad_org_id: number;
					created?: string;
					id?: number;
					isErrorMsg?: boolean;
					msgText: string;
					updated: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isErrorMsg?: boolean;
					msgText?: string;
					updated?: string;
				};
			};
			ad_note: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					ad_user_id: string | null;
					created: string;
					description: string | null;
					id: number;
					isActive: boolean;
					processed: boolean;
					textMsg: string | null;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					ad_user_id?: string | null;
					created?: string;
					description?: string | null;
					id?: number;
					isActive?: boolean;
					processed?: boolean;
					textMsg?: string | null;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					ad_user_id?: string | null;
					created?: string;
					description?: string | null;
					id?: number;
					isActive?: boolean;
					processed?: boolean;
					textMsg?: string | null;
					updated?: string;
				};
			};
			ad_org: {
				Row: {
					ad_client_id: number;
					code: string;
					created: string;
					description: string | null;
					id: number;
					isactive: boolean;
					name: string;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					code: string;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					name: string;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					code?: string;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					name?: string;
					updated?: string;
				};
			};
			ad_user: {
				Row: {
					ad_client_id: number;
					avatar_url: string | null;
					created: string;
					id: string;
					is_enabled: boolean;
					updated_at: string;
					username: string | null;
					website: string | null;
				};
				Insert: {
					ad_client_id?: number;
					avatar_url?: string | null;
					created?: string;
					id: string;
					is_enabled?: boolean;
					updated_at?: string;
					username?: string | null;
					website?: string | null;
				};
				Update: {
					ad_client_id?: number;
					avatar_url?: string | null;
					created?: string;
					id?: string;
					is_enabled?: boolean;
					updated_at?: string;
					username?: string | null;
					website?: string | null;
				};
			};
			ad_user_client: {
				Row: {
					ad_clent_id: number;
					auth_user_id: string;
					created: string;
					id: number;
					updated: string;
				};
				Insert: {
					ad_clent_id: number;
					auth_user_id: string;
					created?: string;
					id?: number;
					updated?: string;
				};
				Update: {
					ad_clent_id?: number;
					auth_user_id?: string;
					created?: string;
					id?: number;
					updated?: string;
				};
			};
			attribute_group: {
				Row: {
					code: string;
					created: string;
					id: number;
					label: string | null;
					updated: string;
				};
				Insert: {
					code: string;
					created?: string;
					id?: number;
					label?: string | null;
					updated?: string;
				};
				Update: {
					code?: string;
					created?: string;
					id?: number;
					label?: string | null;
					updated?: string;
				};
			};
			attribute_option: {
				Row: {
					attribute_id: number;
					code: string;
					created_at: string;
					id: number;
					label: string | null;
					updated: string;
				};
				Insert: {
					attribute_id: number;
					code: string;
					created_at?: string;
					id?: number;
					label?: string | null;
					updated?: string;
				};
				Update: {
					attribute_id?: number;
					code?: string;
					created_at?: string;
					id?: number;
					label?: string | null;
					updated?: string;
				};
			};
			c_area: {
				Row: {
					code: string;
					created: string;
					name: string;
					parent: string | null;
					updated: string;
				};
				Insert: {
					code: string;
					created?: string;
					name: string;
					parent?: string | null;
					updated?: string;
				};
				Update: {
					code?: string;
					created?: string;
					name?: string;
					parent?: string | null;
					updated?: string;
				};
			};
			c_bpartner: {
				Row: {
					ad_client_id: number;
					ad_language: string | null;
					ad_org_id: number;
					created: string;
					id: number;
					isactive: boolean;
					m_pricelist_id: number | null;
					name: string;
					po_pricelist_id: number | null;
					taxid: string | null;
					updated: string;
					value: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_language?: string | null;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					m_pricelist_id?: number | null;
					name: string;
					po_pricelist_id?: number | null;
					taxid?: string | null;
					updated?: string;
					value: string;
				};
				Update: {
					ad_client_id?: number;
					ad_language?: string | null;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					m_pricelist_id?: number | null;
					name?: string;
					po_pricelist_id?: number | null;
					taxid?: string | null;
					updated?: string;
					value?: string;
				};
			};
			c_channel: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					code: string;
					created: string;
					description: string | null;
					id: number;
					isactive: boolean;
					name: string;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					code: string;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					name: string;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					code?: string;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					name?: string;
					updated?: string;
				};
			};
			c_channel_node: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					c_channel_id: number;
					code: string;
					created: string;
					id: number;
					isactive: boolean;
					node_id: number;
					parent_id: number | null;
					product_category_id: number | null;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					c_channel_id: number;
					code: string;
					created?: string;
					id?: number;
					isactive?: boolean;
					node_id: number;
					parent_id?: number | null;
					product_category_id?: number | null;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					c_channel_id?: number;
					code?: string;
					created?: string;
					id?: number;
					isactive?: boolean;
					node_id?: number;
					parent_id?: number | null;
					product_category_id?: number | null;
					updated?: string;
				};
			};
			c_channel_params: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					c_channel_id: number;
					created: string;
					id: number;
					isactive: boolean;
					key: string;
					updated: string;
					value: string | null;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					c_channel_id: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					key: string;
					updated?: string;
					value?: string | null;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					c_channel_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					key?: string;
					updated?: string;
					value?: string | null;
				};
			};
			c_country: {
				Row: {
					alpha_2_code: string;
					alpha3Code: string;
					country_uu: string;
					created: string;
					isActive: boolean;
					label: string;
					name: string;
					numeric: string;
					regionName: string | null;
					'Sub-regionName': string | null;
					updated: string;
				};
				Insert: {
					alpha_2_code: string;
					alpha3Code: string;
					country_uu?: string;
					created?: string;
					isActive?: boolean;
					label: string;
					name: string;
					numeric: string;
					regionName?: string | null;
					'Sub-regionName'?: string | null;
					updated?: string;
				};
				Update: {
					alpha_2_code?: string;
					alpha3Code?: string;
					country_uu?: string;
					created?: string;
					isActive?: boolean;
					label?: string;
					name?: string;
					numeric?: string;
					regionName?: string | null;
					'Sub-regionName'?: string | null;
					updated?: string;
				};
			};
			c_currency: {
				Row: {
					alphabetic_code: string;
					created: string;
					cursymbol: string | null;
					id: number;
					is_enabled: boolean;
					minor_unit: number;
					name: string;
					numeric_code: string;
					updated: string;
				};
				Insert: {
					alphabetic_code: string;
					created?: string;
					cursymbol?: string | null;
					id?: number;
					is_enabled?: boolean;
					minor_unit?: number;
					name: string;
					numeric_code: string;
					updated?: string;
				};
				Update: {
					alphabetic_code?: string;
					created?: string;
					cursymbol?: string | null;
					id?: number;
					is_enabled?: boolean;
					minor_unit?: number;
					name?: string;
					numeric_code?: string;
					updated?: string;
				};
			};
			c_municipality: {
				Row: {
					code: string;
					created: string;
					id: number;
					name: string;
					parent: string | null;
					updated: string | null;
				};
				Insert: {
					code: string;
					created?: string;
					id?: number;
					name: string;
					parent?: string | null;
					updated?: string | null;
				};
				Update: {
					code?: string;
					created?: string;
					id?: number;
					name?: string;
					parent?: string | null;
					updated?: string | null;
				};
			};
			c_settlement: {
				Row: {
					code: string;
					created: string;
					id: number;
					manicipalityCode: string;
					name: string;
					updated: string;
				};
				Insert: {
					code: string;
					created?: string;
					id?: number;
					manicipalityCode: string;
					name: string;
					updated?: string;
				};
				Update: {
					code?: string;
					created?: string;
					id?: number;
					manicipalityCode?: string;
					name?: string;
					updated?: string;
				};
			};
			c_tax: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					c_taxcategory_id: number;
					created: string;
					description: string | null;
					id: number;
					isactive: boolean;
					isdefault: boolean;
					name: string;
					rate: number;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					c_taxcategory_id: number;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					isdefault?: boolean;
					name: string;
					rate: number;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					c_taxcategory_id?: number;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					isdefault?: boolean;
					name?: string;
					rate?: number;
					updated?: string;
				};
			};
			c_taxcategory: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					description: string | null;
					id: number;
					isactive: boolean;
					isdefault: boolean;
					name: string;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					isdefault?: boolean;
					name: string;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					isdefault?: boolean;
					name?: string;
					updated?: string;
				};
			};
			c_uom: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					description: string | null;
					id: number;
					isactive: boolean;
					isdefault: boolean;
					name: string;
					stdprecision: number;
					uomsymbol: string | null;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					isdefault?: boolean;
					name: string;
					stdprecision: number;
					uomsymbol?: string | null;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					isdefault?: boolean;
					name?: string;
					stdprecision?: number;
					uomsymbol?: string | null;
					updated?: string;
				};
			};
			c_uom_conversion: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					c_uom_id: number;
					c_uom_to_id: number;
					created: string;
					dividerate: number;
					id: number;
					isactive: boolean;
					m_product_id: number | null;
					multiplyrate: number;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					c_uom_id: number;
					c_uom_to_id: number;
					created?: string;
					dividerate?: number;
					id?: number;
					isactive?: boolean;
					m_product_id?: number | null;
					multiplyrate?: number;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					c_uom_id?: number;
					c_uom_to_id?: number;
					created?: string;
					dividerate?: number;
					id?: number;
					isactive?: boolean;
					m_product_id?: number | null;
					multiplyrate?: number;
					updated?: string;
				};
			};
			eav_attribute: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					backend_type: string | null;
					code: string;
					created: string;
					entity_type_id: number;
					frontend_input: string;
					id: number;
					isactive: boolean;
					name: string;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					backend_type?: string | null;
					code: string;
					created?: string;
					entity_type_id?: number;
					frontend_input?: string;
					id?: number;
					isactive?: boolean;
					name: string;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					backend_type?: string | null;
					code?: string;
					created?: string;
					entity_type_id?: number;
					frontend_input?: string;
					id?: number;
					isactive?: boolean;
					name?: string;
					updated?: string;
				};
			};
			eav_attribute_group: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					code: string;
					created: string;
					id: number;
					name: string;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					code: string;
					created?: string;
					id?: number;
					name: string;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					code?: string;
					created?: string;
					id?: number;
					name?: string;
					updated?: string;
				};
			};
			eav_attribute_option: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					code: string;
					created: string;
					eav_attribute_id: number;
					id: number;
					name: string;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					code: string;
					created?: string;
					eav_attribute_id: number;
					id?: number;
					name: string;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					code?: string;
					created?: string;
					eav_attribute_id?: number;
					id?: number;
					name?: string;
					updated?: string;
				};
			};
			eav_entity_type: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					code: string;
					created: string;
					id: number;
					isactive: boolean;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					code: string;
					created?: string;
					id?: number;
					isactive?: boolean;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					code?: string;
					created?: string;
					id?: number;
					isactive?: boolean;
					updated?: string;
				};
			};
			m_attribute: {
				Row: {
					attribute_group_id: number;
					attribute_type: string | null;
					attributevaluetype: string | null;
					backend_type: string;
					code: string;
					created: string;
					id: number;
					isactive: boolean;
					label: string | null;
					name: string;
					updated: string;
				};
				Insert: {
					attribute_group_id?: number;
					attribute_type?: string | null;
					attributevaluetype?: string | null;
					backend_type: string;
					code: string;
					created?: string;
					id?: number;
					isactive?: boolean;
					label?: string | null;
					name: string;
					updated?: string;
				};
				Update: {
					attribute_group_id?: number;
					attribute_type?: string | null;
					attributevaluetype?: string | null;
					backend_type?: string;
					code?: string;
					created?: string;
					id?: number;
					isactive?: boolean;
					label?: string | null;
					name?: string;
					updated?: string;
				};
			};
			m_attributeset: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					id: number;
					isactive: boolean;
					name: string;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					name: string;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					name?: string;
					updated?: string;
				};
			};
			m_attributeuse: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					isactive: boolean;
					m_attribute_id: number;
					m_attributeset_id: number;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					isactive?: boolean;
					m_attribute_id: number;
					m_attributeset_id: number;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					isactive?: boolean;
					m_attribute_id?: number;
					m_attributeset_id?: number;
					updated?: string;
				};
			};
			m_attributevalue: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					id: number;
					isactive: boolean;
					m_attribute_id: number;
					name: string;
					updated: string;
					value: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					m_attribute_id: number;
					name: string;
					updated?: string;
					value: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					m_attribute_id?: number;
					name?: string;
					updated?: string;
					value?: string;
				};
			};
			m_discountschema: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					flatdiscount: number | null;
					id: number;
					isactive: boolean;
					name: string;
					updated: string;
					validfrom: string | null;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					flatdiscount?: number | null;
					id?: number;
					isactive?: boolean;
					name: string;
					updated?: string;
					validfrom?: string | null;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					flatdiscount?: number | null;
					id?: number;
					isactive?: boolean;
					name?: string;
					updated?: string;
					validfrom?: string | null;
				};
			};
			m_discountschemaline: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					c_bpartner_id: number | null;
					created: string;
					id: number;
					isactive: boolean;
					m_discountschema_id: number;
					m_product_category_id: number | null;
					m_product_id: number | null;
					seqno: number;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					c_bpartner_id?: number | null;
					created?: string;
					id?: number;
					isactive?: boolean;
					m_discountschema_id: number;
					m_product_category_id?: number | null;
					m_product_id?: number | null;
					seqno: number;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					c_bpartner_id?: number | null;
					created?: string;
					id?: number;
					isactive?: boolean;
					m_discountschema_id?: number;
					m_product_category_id?: number | null;
					m_product_id?: number | null;
					seqno?: number;
					updated?: string;
				};
			};
			m_locator: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					id: number;
					isactive: boolean;
					isdefault: boolean;
					m_warehouse_id: number;
					updated: string;
					value: string;
					x: string | null;
					y: string | null;
					z: string | null;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					isdefault?: boolean;
					m_warehouse_id: number;
					updated?: string;
					value: string;
					x?: string | null;
					y?: string | null;
					z?: string | null;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					isdefault?: boolean;
					m_warehouse_id?: number;
					updated?: string;
					value?: string;
					x?: string | null;
					y?: string | null;
					z?: string | null;
				};
			};
			m_pricelist: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					basepricelist_id: number | null;
					c_currency_id: number;
					created: string;
					description: string | null;
					enforcepricelimit: boolean;
					id: number;
					isactive: boolean;
					isdefault: boolean;
					issopricelist: boolean;
					istaxincluded: boolean | null;
					name: string;
					priceprecision: number;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					basepricelist_id?: number | null;
					c_currency_id: number;
					created?: string;
					description?: string | null;
					enforcepricelimit?: boolean;
					id?: number;
					isactive?: boolean;
					isdefault?: boolean;
					issopricelist?: boolean;
					istaxincluded?: boolean | null;
					name: string;
					priceprecision?: number;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					basepricelist_id?: number | null;
					c_currency_id?: number;
					created?: string;
					description?: string | null;
					enforcepricelimit?: boolean;
					id?: number;
					isactive?: boolean;
					isdefault?: boolean;
					issopricelist?: boolean;
					istaxincluded?: boolean | null;
					name?: string;
					priceprecision?: number;
					updated?: string;
				};
			};
			m_pricelist_version: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					description: string | null;
					id: number;
					isactive: boolean;
					m_discountschema_id: number;
					m_pricelist_id: number;
					m_pricelist_version_base_id: number | null;
					name: string;
					updated: string;
					validfrom: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					m_discountschema_id: number;
					m_pricelist_id: number;
					m_pricelist_version_base_id?: number | null;
					name: string;
					updated?: string;
					validfrom: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					m_discountschema_id?: number;
					m_pricelist_id?: number;
					m_pricelist_version_base_id?: number | null;
					name?: string;
					updated?: string;
					validfrom?: string;
				};
			};
			m_product: {
				Row: {
					attributes: Json | null;
					barcode: string | null;
					brand: string | null;
					c_taxcategory_id: number;
					c_uom_id: number;
					category_id: number[] | null;
					client_id: number | null;
					condition: string | null;
					created: string;
					discontinued: boolean;
					id: number;
					isactive: boolean;
					isselfservice: boolean;
					m_attributeset_id: number | null;
					m_product_category_id: number | null;
					mpn: string | null;
					name: string;
					price: number | null;
					pricelastpo: number | null;
					producttype: string;
					qtyonhand: number | null;
					sku: string | null;
					special_price: number | null;
					unitsperpack: number;
					unitsperpallet: number | null;
					updated: string;
					web: boolean;
				};
				Insert: {
					attributes?: Json | null;
					barcode?: string | null;
					brand?: string | null;
					c_taxcategory_id?: number;
					c_uom_id?: number;
					category_id?: number[] | null;
					client_id?: number | null;
					condition?: string | null;
					created?: string;
					discontinued?: boolean;
					id?: number;
					isactive?: boolean;
					isselfservice?: boolean;
					m_attributeset_id?: number | null;
					m_product_category_id?: number | null;
					mpn?: string | null;
					name: string;
					price?: number | null;
					pricelastpo?: number | null;
					producttype?: string;
					qtyonhand?: number | null;
					sku?: string | null;
					special_price?: number | null;
					unitsperpack?: number;
					unitsperpallet?: number | null;
					updated?: string;
					web?: boolean;
				};
				Update: {
					attributes?: Json | null;
					barcode?: string | null;
					brand?: string | null;
					c_taxcategory_id?: number;
					c_uom_id?: number;
					category_id?: number[] | null;
					client_id?: number | null;
					condition?: string | null;
					created?: string;
					discontinued?: boolean;
					id?: number;
					isactive?: boolean;
					isselfservice?: boolean;
					m_attributeset_id?: number | null;
					m_product_category_id?: number | null;
					mpn?: string | null;
					name?: string;
					price?: number | null;
					pricelastpo?: number | null;
					producttype?: string;
					qtyonhand?: number | null;
					sku?: string | null;
					special_price?: number | null;
					unitsperpack?: number;
					unitsperpallet?: number | null;
					updated?: string;
					web?: boolean;
				};
			};
			m_product_category: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					description: string | null;
					id: number;
					isactive: boolean;
					isselfservice: boolean;
					name: string;
					parent_id: number | null;
					updated: string;
					value: string | null;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					isselfservice?: boolean;
					name: string;
					parent_id?: number | null;
					updated?: string;
					value?: string | null;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					isselfservice?: boolean;
					name?: string;
					parent_id?: number | null;
					updated?: string;
					value?: string | null;
				};
			};
			m_product_po: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					barcode: string | null;
					c_bpartner_id: number;
					c_currency_id: number | null;
					c_uom_id: number | null;
					created: string;
					discontinued: boolean | null;
					isactive: boolean;
					iscurrentvendor: boolean;
					m_product_id: number;
					manufacturer: string | null;
					priceeffective: string | null;
					pricelastinv: number | null;
					pricelastpo: number | null;
					pricelist: number | null;
					pricepo: number | null;
					updated: string;
					url: string | null;
					vendorcategory: string | null;
					vendorproductno: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					barcode?: string | null;
					c_bpartner_id: number;
					c_currency_id?: number | null;
					c_uom_id?: number | null;
					created?: string;
					discontinued?: boolean | null;
					isactive?: boolean;
					iscurrentvendor?: boolean;
					m_product_id: number;
					manufacturer?: string | null;
					priceeffective?: string | null;
					pricelastinv?: number | null;
					pricelastpo?: number | null;
					pricelist?: number | null;
					pricepo?: number | null;
					updated?: string;
					url?: string | null;
					vendorcategory?: string | null;
					vendorproductno: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					barcode?: string | null;
					c_bpartner_id?: number;
					c_currency_id?: number | null;
					c_uom_id?: number | null;
					created?: string;
					discontinued?: boolean | null;
					isactive?: boolean;
					iscurrentvendor?: boolean;
					m_product_id?: number;
					manufacturer?: string | null;
					priceeffective?: string | null;
					pricelastinv?: number | null;
					pricelastpo?: number | null;
					pricelist?: number | null;
					pricepo?: number | null;
					updated?: string;
					url?: string | null;
					vendorcategory?: string | null;
					vendorproductno?: string;
				};
			};
			m_productprice: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					id: number;
					isactive: boolean;
					m_pricelist_version_id: number;
					m_product_id: number;
					pricelimit: number | null;
					pricelist: number | null;
					pricestd: number;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					m_pricelist_version_id: number;
					m_product_id: number;
					pricelimit?: number | null;
					pricelist?: number | null;
					pricestd: number;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					id?: number;
					isactive?: boolean;
					m_pricelist_version_id?: number;
					m_product_id?: number;
					pricelimit?: number | null;
					pricelist?: number | null;
					pricestd?: number;
					updated?: string;
				};
			};
			m_storageonhand: {
				Row: {
					ad_client_id: number | null;
					ad_org_id: number | null;
					created: string;
					id: number;
					isactive: boolean | null;
					m_locator_id: number | null;
					m_product_id: number;
					qtyonhand: number;
					updated: string;
					warehouse_id: number;
				};
				Insert: {
					ad_client_id?: number | null;
					ad_org_id?: number | null;
					created?: string;
					id?: number;
					isactive?: boolean | null;
					m_locator_id?: number | null;
					m_product_id: number;
					qtyonhand?: number;
					updated?: string;
					warehouse_id: number;
				};
				Update: {
					ad_client_id?: number | null;
					ad_org_id?: number | null;
					created?: string;
					id?: number;
					isactive?: boolean | null;
					m_locator_id?: number | null;
					m_product_id?: number;
					qtyonhand?: number;
					updated?: string;
					warehouse_id?: number;
				};
			};
			m_warehouse: {
				Row: {
					ad_client_id: number;
					ad_org_id: number | null;
					code: string;
					created: string;
					id: number;
					isactive: boolean;
					name: string;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number | null;
					code: string;
					created?: string;
					id?: number;
					isactive?: boolean;
					name: string;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number | null;
					code?: string;
					created?: string;
					id?: number;
					isactive?: boolean;
					name?: string;
					updated?: string;
				};
			};
			'mage_categ_link.for_delete': {
				Row: {
					id: number;
					mage_id: number;
					product_category_id: number;
				};
				Insert: {
					id?: number;
					mage_id: number;
					product_category_id: number;
				};
				Update: {
					id?: number;
					mage_id?: number;
					product_category_id?: number;
				};
			};
			product_category: {
				Row: {
					ad_client_id: number;
					ad_org_id: number;
					created: string;
					description: string | null;
					id: number;
					isactive: boolean;
					name: string;
					parent_id: number | null;
					updated: string;
				};
				Insert: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					name: string;
					parent_id?: number | null;
					updated?: string;
				};
				Update: {
					ad_client_id?: number;
					ad_org_id?: number;
					created?: string;
					description?: string | null;
					id?: number;
					isactive?: boolean;
					name?: string;
					parent_id?: number | null;
					updated?: string;
				};
			};
			product_type: {
				Row: {
					code: string;
					created: string;
					id: number;
					is_enabled: boolean;
					name: string;
					updated: string;
				};
				Insert: {
					code: string;
					created?: string;
					id?: number;
					is_enabled?: boolean;
					name: string;
					updated: string;
				};
				Update: {
					code?: string;
					created?: string;
					id?: number;
					is_enabled?: boolean;
					name?: string;
					updated?: string;
				};
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					created: string;
					id: string;
					updated: string;
					username: string | null;
					website: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					created?: string;
					id: string;
					updated?: string;
					username?: string | null;
					website?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					created?: string;
					id?: string;
					updated?: string;
					username?: string | null;
					website?: string | null;
				};
			};
			web_catalog: {
				Row: {
					ad_client_id: number | null;
					ad_org_id: number | null;
					code: string | null;
					created: string;
					id: number;
					isactive: boolean;
					name: string | null;
					updated: string;
				};
				Insert: {
					ad_client_id?: number | null;
					ad_org_id?: number | null;
					code?: string | null;
					created?: string;
					id?: number;
					isactive?: boolean;
					name?: string | null;
					updated?: string;
				};
				Update: {
					ad_client_id?: number | null;
					ad_org_id?: number | null;
					code?: string | null;
					created?: string;
					id?: number;
					isactive?: boolean;
					name?: string | null;
					updated?: string;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			c_channel_get_node_link: {
				Args: {
					p_channel_id: number;
					p_client_id: number;
					p_org_id: number;
				};
				Returns: {
					id: number;
					name: string;
					mage_id: number;
					parent_id: number;
					parent_mage_id: number;
				}[];
			};
			c_channel_store_mage_categ_link: {
				Args: {
					categ_name: string;
					product_categ_id: number;
					mage_categ_id: number;
					prod_categ_parent_id: number;
					channel_id: number;
					org_id: number;
					client_id: number;
				};
				Returns: number;
			};
			get_mage_categ_links: {
				Args: Record<PropertyKey, never>;
				Returns: {
					id: number;
					name: string;
					mage_id: number;
					parent_id: number;
					parent_mage_id: number;
				}[];
			};
			store_mage_categ_link: {
				Args: {
					product_categ_id: number;
					mage_categ_id: number;
				};
				Returns: number;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
