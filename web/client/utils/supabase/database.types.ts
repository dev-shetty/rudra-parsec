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
      pot: {
        Row: {
          amount_per_head: number | null
          created_at: string
          creator: string | null
          goal_amount: number | null
          id: number
          members: string | null
          pot_code: string | null
          purpose: string | null
        }
        Insert: {
          amount_per_head?: number | null
          created_at?: string
          creator?: string | null
          goal_amount?: number | null
          id?: number
          members?: string | null
          pot_code?: string | null
          purpose?: string | null
        }
        Update: {
          amount_per_head?: number | null
          created_at?: string
          creator?: string | null
          goal_amount?: number | null
          id?: number
          members?: string | null
          pot_code?: string | null
          purpose?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pot_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pot_members_fkey"
            columns: ["members"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      transaction: {
        Row: {
          amount: number | null
          created_at: string
          id: number
          pot_id: number | null
          sender: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: number
          pot_id?: number | null
          sender?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: number
          pot_id?: number | null
          sender?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_pot_id_fkey"
            columns: ["pot_id"]
            isOneToOne: false
            referencedRelation: "pot"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_sender_fkey"
            columns: ["sender"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          address: string | null
          age: number | null
          auth_id: string | null
          created_at: string
          dob: string | null
          id: number
          name: string | null
        }
        Insert: {
          address?: string | null
          age?: number | null
          auth_id?: string | null
          created_at?: string
          dob?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          address?: string | null
          age?: number | null
          auth_id?: string | null
          created_at?: string
          dob?: string | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
