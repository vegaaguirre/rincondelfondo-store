import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cjpplwynzksbmvxketul.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcHBsd3luemtzYm12eGtldHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNzAzMTUsImV4cCI6MjA3Mjc0NjMxNX0.Fy5uPmKjARzhSj6Yj4ESt2xw_VDMMorGwPycighqsvc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)