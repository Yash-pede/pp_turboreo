import { createClient } from "@refinedev/supabase";

// const SUPABASE_URL = "https://vtwtxwxztznjuvfzjsro.supabase.co";
// const SUPABASE_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0d3R4d3h6dHpuanV2Znpqc3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3NjM0NTgsImV4cCI6MjAyMTMzOTQ1OH0.9owePIbw7l4DaRi7iDRFI1XslYxCuklPc-mQzA2BGK0";

const SUPABASE_URL = "https://krtkfjphiovnpjawcxwo.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydGtmanBoaW92bnBqYXdjeHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2MDQzNzMsImV4cCI6MjAxNzE4MDM3M30.rNWu78HUY5Yk6zTegL0Z0-dCiTqkU6wIifiTJQ3S_wQ";
const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydGtmanBoaW92bnBqYXdjeHdvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTYwNDM3MywiZXhwIjoyMDE3MTgwMzczfQ.QHwa4JaXnRJwKUqUaV1LBZBMB3icITqI98RhPiwgNIs";
export const supabaseClient: ReturnType<any> = createClient(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: true,
    },
  },
);
export const supabaseServiceRoleClient: ReturnType<any> = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: true,
    },
  },
);
