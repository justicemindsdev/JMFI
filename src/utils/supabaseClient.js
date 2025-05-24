// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iraynmibzknhmwjuoqfu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyYXlubWliemtuaG13anVvcWZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMDk3ODEsImV4cCI6MjA2MzY4NTc4MX0.Pau9DZFsKsBGUthGWlo63wTR_gAmPd9BVLhTiXW5Kg4'

export const supabase = createClient(supabaseUrl, supabaseKey)
