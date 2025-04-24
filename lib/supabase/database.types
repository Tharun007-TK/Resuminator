export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      resumes: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          resume_data: Json
          template: string
          created_at: string
          updated_at: string
          is_public: boolean
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          resume_data: Json
          template?: string
          created_at?: string
          updated_at?: string
          is_public?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          resume_data?: Json
          template?: string
          created_at?: string
          updated_at?: string
          is_public?: boolean
        }
      }
    }
  }
}
