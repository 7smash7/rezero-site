// js/config.js
// ⚠️ Mets TES valeurs (Supabase > Project settings > API)
const SUPABASE_URL = "https://sloewvalvaknukpsgcch.supabase.co";   // <-- remplace ICI
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsb2V3dmFsdmFrbnVrcHNnY2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2ODk2NTAsImV4cCI6MjA3NjI2NTY1MH0.MEJjFqWFdmFbE1tSFzF5pHNT1SLnJ-AH2C756HBbXD0";    // <-- remplace ICI

// Crée un client global Supabase
window.sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helpers pratiques — déjà prêts pour la suite
window.getUserOrRedirect = async function(to = "login.html") {
  const { data: { user } } = await sb.auth.getUser();
  if (!user) location.href = to;
  return user;
};
window.getUser = async function() {
  const { data: { user } } = await sb.auth.getUser();
  return user ?? null;
};

// Petit log pour vérifier que la page charge bien ton client
console.log("✅ Supabase prêt :", SUPABASE_URL);
