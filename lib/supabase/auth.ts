import { supabase } from './client';

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
}
