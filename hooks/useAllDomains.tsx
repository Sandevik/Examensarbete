import { useEffect, useState } from "react";
import useAuth from "../Auth/hooks/useAuth";
import { IDomainValues } from "../types";

export const useAllDomains = () => {
  const [domains, setDomains] = useState<IDomainValues[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const { user, loading: userLoading } = useAuth();

  const incrementPageIndex = () => {
    setPageIndex(pageIndex+1)
  }
  
  useEffect(() => {
    const getDomains = async () => {
      if (!userLoading){
        setLoading(true);
      await fetch("/api/get-paginated-domains", {
        method: "POST",
        cache: "force-cache",
        body: JSON.stringify({ uid: user?.uid, index: pageIndex }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data: IDomainValues[]) => {
          setDomains(data);
          setLoading(false);
        });
      }
    };
    getDomains();
  }, [user, userLoading]);

  return { domains, loading, incrementPageIndex };
};
