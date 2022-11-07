export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _template: {
        Row: {
          id: number
          code: string
          created_at: string
          updated_at: string
          ad_client_id: number
          ad_org_id: number
        }
        Insert: {
          id?: number
          code: string
          created_at?: string
          updated_at?: string
          ad_client_id?: number
          ad_org_id?: number
        }
        Update: {
          id?: number
          code?: string
          created_at?: string
          updated_at?: string
          ad_client_id?: number
          ad_org_id?: number
        }
      }
      ad_client: {
        Row: {
          updated_at: string
          isactive: boolean
          created_at: string | null
          id: number
          code: string
          name: string
          createdby: string | null
          updatedby: string | null
          ad_language: string | null
        }
        Insert: {
          updated_at: string
          isactive?: boolean
          created_at?: string | null
          id?: number
          code: string
          name: string
          createdby?: string | null
          updatedby?: string | null
          ad_language?: string | null
        }
        Update: {
          updated_at?: string
          isactive?: boolean
          created_at?: string | null
          id?: number
          code?: string
          name?: string
          createdby?: string | null
          updatedby?: string | null
          ad_language?: string | null
        }
      }
      ad_language: {
        Row: {
          ad_language: string
          id: number
          isactive: boolean
          ad_client_id: number
          code: string
          created_at: string
          updated_at: string
        }
        Insert: {
          ad_language: string
          id?: number
          isactive?: boolean
          ad_client_id: number
          code: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          ad_language?: string
          id?: number
          isactive?: boolean
          ad_client_id?: number
          code?: string
          created_at?: string
          updated_at?: string
        }
      }
      ad_locale: {
        Row: {
          id: number
          created_at: string | null
          updated_at: string | null
          country_id: string | null
          label: string | null
          ad_language_id: string
          code: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          updated_at?: string | null
          country_id?: string | null
          label?: string | null
          ad_language_id: string
          code: string
        }
        Update: {
          id?: number
          created_at?: string | null
          updated_at?: string | null
          country_id?: string | null
          label?: string | null
          ad_language_id?: string
          code?: string
        }
      }
      ad_message: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          msgText: string
          isErrorMsg: boolean
          ad_client_id: number
          ad_org_id: number
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at: string
          msgText: string
          isErrorMsg?: boolean
          ad_client_id: number
          ad_org_id: number
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          msgText?: string
          isErrorMsg?: boolean
          ad_client_id?: number
          ad_org_id?: number
        }
      }
      ad_note: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          ad_client_id: number
          ad_org_id: number
          isActive: boolean
          ad_user_id: string | null
          processed: boolean
          description: string | null
          textMsg: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at?: string
          ad_client_id?: number
          ad_org_id?: number
          isActive?: boolean
          ad_user_id?: string | null
          processed?: boolean
          description?: string | null
          textMsg?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          ad_client_id?: number
          ad_org_id?: number
          isActive?: boolean
          ad_user_id?: string | null
          processed?: boolean
          description?: string | null
          textMsg?: string | null
        }
      }
      ad_org: {
        Row: {
          id: number
          isactive: boolean
          code: string
          name: string
          ad_client_id: number
          updated_at: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          isactive?: boolean
          code: string
          name: string
          ad_client_id?: number
          updated_at?: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          isactive?: boolean
          code?: string
          name?: string
          ad_client_id?: number
          updated_at?: string
          description?: string | null
          created_at?: string
        }
      }
      ad_user: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          avatar_url: string | null
          username: string | null
          website: string | null
          ad_client_id: number
          is_enabled: boolean
        }
        Insert: {
          created_at?: string
          id: string
          updated_at?: string
          avatar_url?: string | null
          username?: string | null
          website?: string | null
          ad_client_id?: number
          is_enabled?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          avatar_url?: string | null
          username?: string | null
          website?: string | null
          ad_client_id?: number
          is_enabled?: boolean
        }
      }
      ad_user_client: {
        Row: {
          auth_user_id: string
          ad_clent_id: number
          id: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          auth_user_id: string
          ad_clent_id: number
          id?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string
          ad_clent_id?: number
          id?: number
          created_at?: string | null
          updated_at?: string | null
        }
      }
      attribute_group: {
        Row: {
          id: number
          code: string
          created_at: string
          updated_at: string
          label: string | null
        }
        Insert: {
          id?: number
          code: string
          created_at?: string
          updated_at?: string
          label?: string | null
        }
        Update: {
          id?: number
          code?: string
          created_at?: string
          updated_at?: string
          label?: string | null
        }
      }
      attribute_option: {
        Row: {
          id: number
          attribute_id: number
          code: string
          created_at: string
          label: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          attribute_id: number
          code: string
          created_at?: string
          label?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          attribute_id?: number
          code?: string
          created_at?: string
          label?: string | null
          updated_at?: string
        }
      }
      c_area: {
        Row: {
          name: string
          code: string
          parent: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          name: string
          code: string
          parent?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          name?: string
          code?: string
          parent?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      c_bpartner: {
        Row: {
          isActive: boolean
          value: string
          name: string
          created_at: string
          id: number
          ad_language: string | null
          taxid: string | null
          updated_at: string
          ad_client_id: number
          ad_org_id: number
        }
        Insert: {
          isActive?: boolean
          value: string
          name: string
          created_at?: string
          id?: number
          ad_language?: string | null
          taxid?: string | null
          updated_at?: string
          ad_client_id: number
          ad_org_id: number
        }
        Update: {
          isActive?: boolean
          value?: string
          name?: string
          created_at?: string
          id?: number
          ad_language?: string | null
          taxid?: string | null
          updated_at?: string
          ad_client_id?: number
          ad_org_id?: number
        }
      }
      c_country: {
        Row: {
          numeric: string
          alpha_2_code: string
          created_at: string | null
          updated_at: string
          label: string
          country_uu: string
          alpha3Code: string
          name: string
          isActive: boolean
          regionName: string | null
          "Sub-regionName": string | null
        }
        Insert: {
          numeric: string
          alpha_2_code: string
          created_at?: string | null
          updated_at?: string
          label: string
          country_uu?: string
          alpha3Code: string
          name: string
          isActive?: boolean
          regionName?: string | null
          "Sub-regionName"?: string | null
        }
        Update: {
          numeric?: string
          alpha_2_code?: string
          created_at?: string | null
          updated_at?: string
          label?: string
          country_uu?: string
          alpha3Code?: string
          name?: string
          isActive?: boolean
          regionName?: string | null
          "Sub-regionName"?: string | null
        }
      }
      c_currency: {
        Row: {
          created_at: string
          updated_at: string
          minor_unit: number
          id: number
          name: string
          alphabetic_code: string
          numeric_code: string
          cursymbol: string | null
          is_enabled: boolean
        }
        Insert: {
          created_at?: string
          updated_at?: string
          minor_unit?: number
          id?: number
          name: string
          alphabetic_code: string
          numeric_code: string
          cursymbol?: string | null
          is_enabled?: boolean
        }
        Update: {
          created_at?: string
          updated_at?: string
          minor_unit?: number
          id?: number
          name?: string
          alphabetic_code?: string
          numeric_code?: string
          cursymbol?: string | null
          is_enabled?: boolean
        }
      }
      c_municipality: {
        Row: {
          name: string
          created_at: string | null
          updated_at: string | null
          parent: string | null
          id: number
          code: string
        }
        Insert: {
          name: string
          created_at?: string | null
          updated_at?: string | null
          parent?: string | null
          id?: number
          code: string
        }
        Update: {
          name?: string
          created_at?: string | null
          updated_at?: string | null
          parent?: string | null
          id?: number
          code?: string
        }
      }
      c_settlement: {
        Row: {
          id: number
          code: string
          name: string
          created_at: string | null
          updated_at: string | null
          manicipalityCode: string
        }
        Insert: {
          id?: number
          code: string
          name: string
          created_at?: string | null
          updated_at?: string | null
          manicipalityCode: string
        }
        Update: {
          id?: number
          code?: string
          name?: string
          created_at?: string | null
          updated_at?: string | null
          manicipalityCode?: string
        }
      }
      eav_attribute: {
        Row: {
          id: number
          frontend_input: string | null
          backend_type: string | null
          isactive: boolean
          code: string
          name: string
          ad_client_id: number
          ad_org_id: number
          created_at: string
          updated_at: string
          entity_type_id: number
        }
        Insert: {
          id?: number
          frontend_input?: string | null
          backend_type?: string | null
          isactive?: boolean
          code: string
          name: string
          ad_client_id?: number
          ad_org_id?: number
          created_at?: string
          updated_at?: string
          entity_type_id?: number
        }
        Update: {
          id?: number
          frontend_input?: string | null
          backend_type?: string | null
          isactive?: boolean
          code?: string
          name?: string
          ad_client_id?: number
          ad_org_id?: number
          created_at?: string
          updated_at?: string
          entity_type_id?: number
        }
      }
      eav_attribute_group: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          ad_client_id: number
          ad_org_id: number
          code: string
          name: string
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at?: string
          ad_client_id?: number
          ad_org_id?: number
          code: string
          name: string
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          ad_client_id?: number
          ad_org_id?: number
          code?: string
          name?: string
        }
      }
      eav_attribute_option: {
        Row: {
          id: number
          code: string
          created_at: string
          updated_at: string
          ad_client_id: number
          ad_org_id: number
          name: string
          eav_attribute_id: number
        }
        Insert: {
          id?: number
          code: string
          created_at?: string
          updated_at?: string
          ad_client_id?: number
          ad_org_id?: number
          name: string
          eav_attribute_id: number
        }
        Update: {
          id?: number
          code?: string
          created_at?: string
          updated_at?: string
          ad_client_id?: number
          ad_org_id?: number
          name?: string
          eav_attribute_id?: number
        }
      }
      eav_entity_type: {
        Row: {
          id: number
          ad_client_id: number
          ad_org_id: number
          updated_at: string
          isactive: boolean
          code: string
          created_at: string
        }
        Insert: {
          id?: number
          ad_client_id?: number
          ad_org_id?: number
          updated_at?: string
          isactive?: boolean
          code: string
          created_at?: string
        }
        Update: {
          id?: number
          ad_client_id?: number
          ad_org_id?: number
          updated_at?: string
          isactive?: boolean
          code?: string
          created_at?: string
        }
      }
      family_attribute: {
        Row: {
          created_at: string
          id: number
          family_id: number
          attribute_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          family_id: number
          attribute_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          family_id?: number
          attribute_id?: number
          updated_at?: string
        }
      }
      m_attribute: {
        Row: {
          id: number
          code: string
          updated_at: string | null
          created_at: string | null
          attribute_type: string | null
          backend_type: string
          attribute_group_id: number
          label: string | null
        }
        Insert: {
          id?: number
          code: string
          updated_at?: string | null
          created_at?: string | null
          attribute_type?: string | null
          backend_type?: string
          attribute_group_id?: number
          label?: string | null
        }
        Update: {
          id?: number
          code?: string
          updated_at?: string | null
          created_at?: string | null
          attribute_type?: string | null
          backend_type?: string
          attribute_group_id?: number
          label?: string | null
        }
      }
      m_family: {
        Row: {
          id: number
          code: string
          created_at: string
          updated_at: string
          name: Json | null
          is_enabled: boolean
          label: string | null
        }
        Insert: {
          id?: number
          code: string
          created_at?: string
          updated_at?: string
          name?: Json | null
          is_enabled?: boolean
          label?: string | null
        }
        Update: {
          id?: number
          code?: string
          created_at?: string
          updated_at?: string
          name?: Json | null
          is_enabled?: boolean
          label?: string | null
        }
      }
      m_locator: {
        Row: {
          isdefault: boolean
          Zone: string | null
          Shelf: string | null
          id: number
          ad_client_id: number
          ad_org_id: number
          created: string | null
          updated: string | null
          m_warehouse_id: number
          Aisle: string
          Bin: string
          Rack: string
        }
        Insert: {
          isdefault?: boolean
          Zone?: string | null
          Shelf?: string | null
          id?: number
          ad_client_id?: number
          ad_org_id?: number
          created?: string | null
          updated?: string | null
          m_warehouse_id: number
          Aisle?: string
          Bin?: string
          Rack?: string
        }
        Update: {
          isdefault?: boolean
          Zone?: string | null
          Shelf?: string | null
          id?: number
          ad_client_id?: number
          ad_org_id?: number
          created?: string | null
          updated?: string | null
          m_warehouse_id?: number
          Aisle?: string
          Bin?: string
          Rack?: string
        }
      }
      m_product: {
        Row: {
          id: number
          name: string
          sku: string
          created_at: string | null
          web: boolean
          attributes: Json | null
          is_enabled: boolean | null
          qtyonhand: number | null
          brand: string | null
          mpn: string | null
          price: number | null
          pricelastpo: number | null
          special_price: number | null
          updated_at: string | null
          family_id: number | null
          barcode: string | null
          condition: string | null
          category_id: number[] | null
          client_id: number | null
        }
        Insert: {
          id?: number
          name: string
          sku: string
          created_at?: string | null
          web?: boolean
          attributes?: Json | null
          is_enabled?: boolean | null
          qtyonhand?: number | null
          brand?: string | null
          mpn?: string | null
          price?: number | null
          pricelastpo?: number | null
          special_price?: number | null
          updated_at?: string | null
          family_id?: number | null
          barcode?: string | null
          condition?: string | null
          category_id?: number[] | null
          client_id?: number | null
        }
        Update: {
          id?: number
          name?: string
          sku?: string
          created_at?: string | null
          web?: boolean
          attributes?: Json | null
          is_enabled?: boolean | null
          qtyonhand?: number | null
          brand?: string | null
          mpn?: string | null
          price?: number | null
          pricelastpo?: number | null
          special_price?: number | null
          updated_at?: string | null
          family_id?: number | null
          barcode?: string | null
          condition?: string | null
          category_id?: number[] | null
          client_id?: number | null
        }
      }
      m_storageonhand: {
        Row: {
          isactive: boolean | null
          m_locator_id: number | null
          m_product_id: number
          created: string
          updated: string
          ad_client_id: number | null
          ad_org_id: number | null
          qtyonhand: number
          id: number
          warehouse_id: number
        }
        Insert: {
          isactive?: boolean | null
          m_locator_id?: number | null
          m_product_id: number
          created?: string
          updated?: string
          ad_client_id?: number | null
          ad_org_id?: number | null
          qtyonhand?: number
          id?: number
          warehouse_id: number
        }
        Update: {
          isactive?: boolean | null
          m_locator_id?: number | null
          m_product_id?: number
          created?: string
          updated?: string
          ad_client_id?: number | null
          ad_org_id?: number | null
          qtyonhand?: number
          id?: number
          warehouse_id?: number
        }
      }
      m_warehouse: {
        Row: {
          isactive: boolean
          ad_org_id: number | null
          id: number
          code: string
          name: string
          ad_client_id: number
          created: string
          updated: string | null
        }
        Insert: {
          isactive?: boolean
          ad_org_id?: number | null
          id?: number
          code: string
          name: string
          ad_client_id?: number
          created?: string
          updated?: string | null
        }
        Update: {
          isactive?: boolean
          ad_org_id?: number | null
          id?: number
          code?: string
          name?: string
          ad_client_id?: number
          created?: string
          updated?: string | null
        }
      }
      mage_categ_link: {
        Row: {
          id: number
          product_category_id: number
          mage_id: number
        }
        Insert: {
          id?: number
          product_category_id: number
          mage_id: number
        }
        Update: {
          id?: number
          product_category_id?: number
          mage_id?: number
        }
      }
      product_category: {
        Row: {
          name: string
          id: number
          created_at: string
          parent_id: number | null
          updated_at: string
          description: string | null
        }
        Insert: {
          name: string
          id?: number
          created_at?: string
          parent_id?: number | null
          updated_at?: string
          description?: string | null
        }
        Update: {
          name?: string
          id?: number
          created_at?: string
          parent_id?: number | null
          updated_at?: string
          description?: string | null
        }
      }
      product_type: {
        Row: {
          id: number
          code: string
          name: string
          is_enabled: boolean
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: number
          code: string
          name: string
          is_enabled?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          code?: string
          name?: string
          is_enabled?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          website: string | null
          updated_at: string | null
          created_at: string | null
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          website?: string | null
          updated_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          website?: string | null
          updated_at?: string | null
          created_at?: string | null
        }
      }
      table_template: {
        Row: {
          id: number
          created_at: string
          createdby: string | null
          updated_at: string
          updatedby: string | null
          ad_client_id: number
          ad_org_id: number | null
          isactive: boolean
        }
        Insert: {
          id?: number
          created_at?: string
          createdby?: string | null
          updated_at?: string
          updatedby?: string | null
          ad_client_id?: number
          ad_org_id?: number | null
          isactive?: boolean
        }
        Update: {
          id?: number
          created_at?: string
          createdby?: string | null
          updated_at?: string
          updatedby?: string | null
          ad_client_id?: number
          ad_org_id?: number | null
          isactive?: boolean
        }
      }
      tax_rate: {
        Row: {
          id: number
          code: string
          description: string | null
          rate: number
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: number
          code: string
          description?: string | null
          rate: number
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: number
          code?: string
          description?: string | null
          rate?: number
          created_at?: string
          updated_at?: string | null
        }
      }
      test: {
        Row: {
          id: number
          created: string | null
        }
        Insert: {
          id: number
          created?: string | null
        }
        Update: {
          id?: number
          created?: string | null
        }
      }
      web_catalog: {
        Row: {
          id: number
          ad_client_id: number | null
          ad_org_id: number | null
          created: string | null
          code: string | null
          name: string | null
          updated: string | null
          isactive: boolean
        }
        Insert: {
          id?: number
          ad_client_id?: number | null
          ad_org_id?: number | null
          created?: string | null
          code?: string | null
          name?: string | null
          updated?: string | null
          isactive?: boolean
        }
        Update: {
          id?: number
          ad_client_id?: number | null
          ad_org_id?: number | null
          created?: string | null
          code?: string | null
          name?: string | null
          updated?: string | null
          isactive?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_mage_categ_links: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      store_mage_categ_link: {
        Args: { product_categ_id: number; mage_categ_id: number }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
