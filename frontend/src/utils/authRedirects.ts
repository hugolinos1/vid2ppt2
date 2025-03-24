import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "app";

/**
 * RedirectAuthenticated redirects authenticated users to the dashboard
 * It's used on the login and signup pages to prevent authenticated users
 * from accessing those pages
 */
export function RedirectAuthenticated() {
  const { user, loading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  return null;
}
