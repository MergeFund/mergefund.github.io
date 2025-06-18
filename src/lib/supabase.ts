import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iybchsakopqvccjythby.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5YmNoc2Frb3BxdmNjanl0aGJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MjA4MjIsImV4cCI6MjA2NTA5NjgyMn0.JbXPBEJqAbMIli4NntGn-36eWck2fqdxGUbl3dxFtok'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 