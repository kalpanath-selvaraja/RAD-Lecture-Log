import { createClient } from "@supabase/supabase-js"

const SUPERBASE_URL = process.env.SUPERBASE_URL as string
const SUPERBASE_SECRET = process.env.SUPERBASE_SECRET as string

export const supabase = createClient(SUPERBASE_URL, SUPERBASE_SECRET)


