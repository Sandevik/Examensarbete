import { useEffect, useState } from "react";
import useAuth from "../Auth/hooks/useAuth";
import { IDomainValues } from "../types";

export const useAllDomains = () => {
  const [domains, setDomains] = useState<IDomainValues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastDomain, setLastDomain] = useState<string>("");
  const [updater, setUpdater] = useState<boolean>(false);
  const { user, loading: userLoading } = useAuth();

  const updateDomains = () => {
    setUpdater(true);
  }

  const getDomains = async () => {
    if (!userLoading){
      setLoading(true);
      await fetch("/api/get-paginated-domains", {
        method: "POST",
        cache: "force-cache",
        body: JSON.stringify({ uid: user?.uid, lastDomain }),
        headers: {
          "Content-Type": "application/json",
        },
    })
      .then((res) => res.json())
      .then((data: IDomainValues[]) => { 
        setDomains([...domains, ...data]);
        setLoading(false);
      });
    }
  };

  useEffect(()=>{
    const updateDomains = () => {
      if (updater){
        getDomains();
      }
      setUpdater(false);
    }
    updateDomains();
  },[updater])

  useEffect(()=>{
    setLastDomain(domains[domains.length - 1]?.domainUrl)
  },[domains])
  
  useEffect(() => {
    getDomains();
  }, [user, userLoading]);

  return { domains, loading, lastDomain, updateDomains };
};
