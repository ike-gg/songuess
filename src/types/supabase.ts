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
      lobbies: {
        Row: {
          id: string
          leader: string
          name: string
          player1: string
          player2: string | null
          player3: string | null
          player4: string | null
        }
        Insert: {
          id?: string
          leader?: string
          name: string
          player1?: string
          player2?: string | null
          player3?: string | null
          player4?: string | null
        }
        Update: {
          id?: string
          leader?: string
          name?: string
          player1?: string
          player2?: string | null
          player3?: string | null
          player4?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lobbies_leader_fkey"
            columns: ["leader"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lobbies_player1_fkey"
            columns: ["player1"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lobbies_player2_fkey"
            columns: ["player2"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lobbies_player3_fkey"
            columns: ["player3"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lobbies_player4_fkey"
            columns: ["player4"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
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
