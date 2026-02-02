/**
 * Database types for PixTools
 * 
 * These will be auto-generated from Supabase schema later.
 * For now, manual definitions based on MIGRATION.md schema.
 */

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          github_id: string | null;
          email: string | null;
          name: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          github_id?: string | null;
          email?: string | null;
          name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          github_id?: string | null;
          email?: string | null;
          name?: string | null;
          created_at?: string;
        };
      };
      apps: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          is_active: boolean;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          is_active?: boolean;
        };
      };
      api_keys: {
        Row: {
          id: string;
          user_id: string;
          app_id: string;
          key: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          app_id: string;
          key: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          app_id?: string;
          key?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      usage_logs: {
        Row: {
          id: string;
          api_key_id: string;
          created_at: string;
          metadata: Record<string, unknown> | null;
        };
        Insert: {
          id?: string;
          api_key_id: string;
          created_at?: string;
          metadata?: Record<string, unknown> | null;
        };
        Update: {
          id?: string;
          api_key_id?: string;
          created_at?: string;
          metadata?: Record<string, unknown> | null;
        };
      };
      user_plans: {
        Row: {
          id: string;
          user_id: string;
          app_id: string;
          plan: string;
          monthly_limit: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          app_id: string;
          plan?: string;
          monthly_limit?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          app_id?: string;
          plan?: string;
          monthly_limit?: number;
        };
      };
    };
  };
}
