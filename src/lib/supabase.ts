import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if we're in the browser and environment variables are missing
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  console.error('Missing Supabase environment variables. Please check your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
}

// Use fallback values for development if environment variables are missing
const finalSupabaseUrl = supabaseUrl || 'https://iybchsakopqvccjythby.supabase.co'
const finalSupabaseAnonKey = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5YmNoc2Frb3BxdmNjanl0aGJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MjA4MjIsImV4cCI6MjA2NTA5NjgyMn0.JbXPBEJqAbMIli4NntGn-36eWck2fqdxGUbl3dxFtok'

export const supabase = createClient(finalSupabaseUrl, finalSupabaseAnonKey) 