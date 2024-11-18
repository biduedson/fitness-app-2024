// hooks/useAuth.ts
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Session } from "next-auth";

const useAuth = () => {
  const { data: session, status } = useSession();
  const [uSersession, setUSersession] = useState<Session | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isGynAdmin, setIsGynAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    signOut();
    setIsLoggedIn(false);
    setIsStudent(false);
    setIsGynAdmin(false);
    setUSersession(null);
  };

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setIsLoggedIn(!!session?.user);
      setIsStudent(!!session?.user?.student);
      setIsGynAdmin(!!session?.user?.gymAdmin);
      setUSersession(session);
    }
  }, [status, session]);

  return {
    session,
    isLoading,
    isAuthenticated: isLoggedIn,
    isStudent,
    isGynAdmin,
    logout,
    uSersession,
  };
};

export default useAuth;
