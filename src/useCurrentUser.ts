"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { UserRow } from "@/types/database";

interface UseCurrentUserResult {
  profile: UserRow | null;
  loading: boolean;
}

export function useCurrentUser(): UseCurrentUserResult {
  const [profile, setProfile] = useState<UserRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    async function load() {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        if (isMounted) {
          setProfile(null);
          setLoading(false);
        }
        return;
      }

      const { data: userRow } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (isMounted) {
        setProfile((userRow as UserRow) ?? null);
        setLoading(false);
      }
    }

    load();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      load();
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { profile, loading };
}
