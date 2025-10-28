import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rzcmcnosndcuqhyaewze.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6Y21jbm9zbmRjdXFoeWFld3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTY0MjYsImV4cCI6MjA3NTQ5MjQyNn0.vW8BFXm93DzAkQ8Ch5sj7eeR6nJ2-2bt_7_wt1Ux0Tw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
        headers: {
            'Accept': 'application/json'
        }
    }
});
