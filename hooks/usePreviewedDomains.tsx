import { useEffect, useState } from "react";
import useAuth from "../Auth/hooks/useAuth";
import { IDomainValues } from "../types";

export const usePreviewedDomain = (id?: string) => {
  const [domains, setDomains] = useState<IDomainValues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getDomains = async () => {
      setLoading(true);
        await fetch("/api/get-previewed-domains", {
          method: "POST",
          cache: "force-cache",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setDomains(data);
            setLoading(false);
          });
    };
    getDomains();
  }, []);

  return { previewedDomains: domains, loading };
};
