export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SupportCenterScope = "nacional" | "formosa_capital" | "formosa_interior";
export type ArticleCategory = "comunicacion" | "confianza" | "bullying" | "presion_social" | "red_apoyo";
export type AnonymousInboxTopic = "bullying" | "ansiedad" | "autoimagen" | "soledad" | "otro";
export type InboxStatus = "pendiente" | "derivado" | "archivado";

export interface Database {
  public: {
    Tables: {
      story_episodes: {
        Row: {
          id: string;
          slug: string;
          episode_number: number;
          title: string;
          subtitle: string;
          quote: string | null;
          content_markdown: string;
          video_url: string | null;
          cover_image: string;
          read_time_minutes: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          episode_number: number;
          title: string;
          subtitle: string;
          quote?: string | null;
          content_markdown: string;
          video_url?: string | null;
          cover_image: string;
          read_time_minutes?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          episode_number?: number;
          title?: string;
          subtitle?: string;
          quote?: string | null;
          content_markdown?: string;
          video_url?: string | null;
          cover_image?: string;
          read_time_minutes?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      articles_resources: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: ArticleCategory;
          summary: string;
          content_markdown: string;
          professional_author: string;
          author_role: string;
          cover_image: string | null;
          read_time_minutes: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          category: ArticleCategory;
          summary: string;
          content_markdown: string;
          professional_author: string;
          author_role?: string;
          cover_image?: string | null;
          read_time_minutes?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          category?: ArticleCategory;
          summary?: string;
          content_markdown?: string;
          professional_author?: string;
          author_role?: string;
          cover_image?: string | null;
          read_time_minutes?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      weekly_polls: {
        Row: {
          id: string;
          question: string;
          description: string | null;
          is_active: boolean;
          total_votes: number;
          created_at: string;
          closes_at: string | null;
        };
        Insert: {
          id?: string;
          question: string;
          description?: string | null;
          is_active?: boolean;
          total_votes?: number;
          created_at?: string;
          closes_at?: string | null;
        };
        Update: {
          id?: string;
          question?: string;
          description?: string | null;
          is_active?: boolean;
          total_votes?: number;
          created_at?: string;
          closes_at?: string | null;
        };
      };
      poll_options: {
        Row: {
          id: string;
          poll_id: string;
          option_text: string;
          vote_count: number;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          poll_id: string;
          option_text: string;
          vote_count?: number;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          poll_id?: string;
          option_text?: string;
          vote_count?: number;
          order_index?: number;
          created_at?: string;
        };
      };
      community_questions: {
        Row: {
          id: string;
          question_prompt: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          question_prompt: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          question_prompt?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      community_responses: {
        Row: {
          id: string;
          question_id: string;
          response_text: string;
          author_pseudonym: string;
          is_approved: boolean;
          sentiment_tag: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          question_id: string;
          response_text: string;
          author_pseudonym?: string;
          is_approved?: boolean;
          sentiment_tag?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          question_id?: string;
          response_text?: string;
          author_pseudonym?: string;
          is_approved?: boolean;
          sentiment_tag?: string;
          created_at?: string;
        };
      };
      anonymous_inbox: {
        Row: {
          id: string;
          topic: AnonymousInboxTopic;
          encrypted_message: string;
          contact_method: string | null;
          status: InboxStatus;
          internal_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          topic: AnonymousInboxTopic;
          encrypted_message: string;
          contact_method?: string | null;
          status?: InboxStatus;
          internal_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          topic?: AnonymousInboxTopic;
          encrypted_message?: string;
          contact_method?: string | null;
          status?: InboxStatus;
          internal_notes?: string | null;
          created_at?: string;
        };
      };
      territorial_support_centers: {
        Row: {
          id: string;
          name: string;
          scope: SupportCenterScope;
          address: string | null;
          phone_primary: string;
          phone_secondary: string | null;
          hours_info: string;
          is_free: boolean;
          is_emergency_24h: boolean;
          website_or_social: string | null;
          order_priority: number;
        };
        Insert: {
          id?: string;
          name: string;
          scope: SupportCenterScope;
          address?: string | null;
          phone_primary: string;
          phone_secondary?: string | null;
          hours_info: string;
          is_free?: boolean;
          is_emergency_24h?: boolean;
          website_or_social?: string | null;
          order_priority?: number;
        };
        Update: {
          id?: string;
          name?: string;
          scope?: SupportCenterScope;
          address?: string | null;
          phone_primary?: string;
          phone_secondary?: string | null;
          hours_info?: string;
          is_free?: boolean;
          is_emergency_24h?: boolean;
          website_or_social?: string | null;
          order_priority?: number;
        };
      };
    };
    Functions: {
      increment_poll_vote: {
        Args: {
          p_poll_id: string;
          p_option_id: string;
        };
        Returns: void;
      };
    };
  };
}