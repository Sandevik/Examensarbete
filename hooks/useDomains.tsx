import { useEffect, useState } from "react";
import useAuth from "../Auth/hooks/useAuth";
import { IDomainValues } from "../types";

export const useDomains = (id?: string) => {
  const [domains, setDomains] = useState<IDomainValues[] | IDomainValues | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  useEffect(() => {
    const getDomains = async () => {
      setLoading(true);
      if (id) {
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
        
      } else {
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
  }, [user]);

  return { domains, loading };
};
