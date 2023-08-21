export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      sets: {
        Row: {
          bgColor: string | null
          cover: string | null
          created_at: string | null
          description: string | null
          featured: boolean
          id: string
          name: string
          owner: string
          private: boolean
          recommendation: string | null
          songs: string[]
          textColor: string | null
        }
        Insert: {
          bgColor?: string | null
          cover?: string | null
          created_at?: string | null
          description?: string | null
          featured: boolean
          id?: string
          name: string
          owner?: string
          private?: boolean
          recommendation?: string | null
          songs: string[]
          textColor?: string | null
        }
        Update: {
          bgColor?: string | null
          cover?: string | null
          created_at?: string | null
          description?: string | null
          featured?: boolean
          id?: string
          name?: string
          owner?: string
          private?: boolean
          recommendation?: string | null
          songs?: string[]
          textColor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          id: string
          updated_at: string | null
          username: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          updated_at?: string | null
          username: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          updated_at?: string | null
          username?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
