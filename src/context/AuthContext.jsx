import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId) => {
    if (!userId) {
      setProfile(null);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!error && data) {
      setProfile(data);
    } else {
      setProfile(null);
    }
  };

  useEffect(() => {
    let authSubscription;

    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session || null);
      if (session?.user?.id) {
        await loadProfile(session.user.id);
      }
      setLoading(false);
    };

    initAuth();

    const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session || null);
      setLoading(true);

      if (session?.user?.id) {
        await loadProfile(session.user.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    authSubscription = data?.subscription;

    return () => {
      authSubscription?.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      profile,
      refreshProfile: async () => {
        if (session?.user?.id) await loadProfile(session.user.id);
      },
      loading,
      session,
    }),
    [session, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
