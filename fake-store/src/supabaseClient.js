// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ezblccwazblaguqphkya.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6YmxjY3dhemJsYWd1cXBoa3lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NTc5OTksImV4cCI6MjA2NDAzMzk5OX0.u6zdRbP3pp1EBHLZMkd8q-02rNlx0876lwitne_s7Fw'; 
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
