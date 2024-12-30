import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'your supa base url';
const supabaseKey = 'your axon key here';

export const supabase = createClient(supabaseUrl, supabaseKey);