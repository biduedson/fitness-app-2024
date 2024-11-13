// hooks/useAuth.ts
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAuth = () => {
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isGynAdmin, setIsGynAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    signOut();
    setIsLoggedIn(false);
    setIsStudent(false);
    setIsGynAdmin(false);
  };

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setIsLoggedIn(!!session?.user);
      setIsStudent(!!session?.user?.student);
      setIsGynAdmin(!!session?.user?.gymAdmin);
    }
  }, [status, session]);

  return {
    session,
    isLoading,
    isAuthenticated: isLoggedIn,
    isStudent,
    isGynAdmin,
    logout,
  };
};

export default useAuth;
