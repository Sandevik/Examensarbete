import { useEffect, useState } from "react";
import useAuth from "../Auth/hooks/useAuth";
import { IDomainValues } from "../types";

export const useAllDomains = () => {
  const [domains, setDomains] = useState<IDomainValues[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const { user, loading: userLoading } = useAuth();
  
  useEffect(() => {
    const getDomains = async () => {
      if (!userLoading){
        setLoading(true);
      await fetch("/api/get-domains", {
        method: "POST",
        cache: "force-cache",
        body: JSON.stringify({ uid: user?.uid }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setDomains(data);
          setLoading(false);
        });
      }
    };
    getDomains();
  }, [user, userLoading]);

  return { domains, loading };
};
