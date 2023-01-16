import { useEffect, useState } from "react";
import useAuth from "../Auth/hooks/useAuth";
import { IDomainValues } from "../types";

export const useSingleDomain = (id?: string) => {
  const [domains, setDomains] = useState<IDomainValues | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const { user, loading: userLoading } = useAuth();
  useEffect(() => {
    const getDomains = async () => {
      setLoading(true);
      if (id !== undefined && !userLoading){
        let urlencoded = new URLSearchParams();
        urlencoded.append("uid", "CxeCaxdlkgZMO5inkzVaKJY9UKH3");
        urlencoded.append("id", id.toString());

        await fetch("/api/get-domain-by-id", {
          method: "POST",
          cache: "force-cache",
          body: urlencoded,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
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
  }, [user]);

  return { domains, loading };
};
