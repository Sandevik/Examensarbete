import { useRouter } from "next/router";
import styled from "styled-components";
import Loading from "../../components/Loading";
import useCheckLike from "../../hooks/useCheckLike";
import { useSingleDomain } from "../../hooks/useSingleDomain";
import LikeButton from "../../components/LikeComponents/LikeButton";
import useAuth from "../../Auth/hooks/useAuth";
import { IDomainValues } from "../../types";
import { useState, useEffect } from "react";
import { removeDomain } from "../../controllers/removeDomain";
import { changeDomainObject } from "../../controllers/changeDomainObject";
import SubHero from "../../components/SubHero";
import DeleteButton from "../../components/DeleteButton";

export default function id() {
  const router = useRouter();
  const { id } = router.query;
  const { domains: domain, loading } = useSingleDomain(id?.toString());
  const { isLiked } = useCheckLike(domain, loading);
  const { user, loading: userLoading } = useAuth();
  const [domainProps, setDomainProps] = useState<IDomainValues>();

  useEffect(() => {
    setDomainProps(domain);
  }, [domain]);

  const handlePreviewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDomainProps({
      ...domainProps,
      onPreview: e.target.value == "1" ? true : false,
    } as IDomainValues);
  };
  const handleHiddenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDomainProps({
      ...domainProps,
      hidden: e.target.value == "1" ? true : false,
    } as IDomainValues);
  };
  const pushChangesToFirebase = () => {
    changeDomainObject(domain?.domainUrl, domainProps);
    alert("sparat");

    setDomainProps(domain);
  };

  return (
    <div>
      {loading && userLoading ? (
        <Loading />
      ) : (
        <>
          <SubHero>
            <Title>
              {domain && <LikeButton isLiked={isLiked} domain={domain} />}
              <h1 className="url">{domainProps?.domainUrl}</h1>
            </Title>
          </SubHero>
          <Wrapper>
            <div className="row">
              <h3>Tillgänglig: {domainProps?.availableBy}</h3>
              <h3>
                {domainProps?.pageTitle
                  ? domainProps.pageTitle
                  : "Ingen aktuell sid titel hittades"}
              </h3>
            </div>
            <div className="row">
              <Prop>
                Domän Auktoritet: <div>{domainProps?.domainAuthority}</div>
              </Prop>
              <Prop>
                Externa Länkar: <div>{domainProps?.externalLinks}</div>
              </Prop>
              <Prop>
                Sid Auktoritet: <div>{domainProps?.pageAuthority}</div>
              </Prop>
            </div>
            
            <div className="row">
              <div>
                <div>IDN Kodat Domännamn: {domainProps?.encodedDomainUrl}</div>
                <div>Senast krypt: {domainProps?.lastCrawled ? domainProps.lastCrawled : "okänt"}</div>
                <div>Spam Poäng: {domainProps?.spamScore}</div>
              </div>
              <div>
                <div>Antagligen ledig: {domainProps?.likelyFree ? "Ja" : "Nej"}</div>
                <div> Sidor Krypta Från Rotdomän: {domainProps?.pagesCrawledFromRoot}</div>
                <div>Sidlänkar till Sidan: {domainProps?.pagesToPage}</div>
              </div>

            </div>
            

            {user?.userType === "admin" ? (
              <AdminControls>
                <div>
                  Förhandsvisning:
                  <select
                    name="preview"
                    onChange={(e) => handlePreviewChange(e)}
                  >
                    {domainProps?.onPreview ? (
                      <>
                        <option value="1">Aktiv</option>
                        <option value="0">Inaktiv</option>
                      </>
                    ) : (
                      <>
                        <option value="0">Inaktiv</option>
                        <option value="1">Aktiv</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  Dold:
                  <select name="hidden" onChange={(e) => handleHiddenChange(e)}>
                    {domainProps?.hidden ? (
                      <>
                        <option value="1">Ja</option>
                        <option value="0">Nej</option>
                      </>
                    ) : (
                      <>
                        <option value="0">Nej</option>
                        <option value="1">Ja</option>
                      </>
                    )}
                  </select>
                </div>
                {domain !== domainProps && (
                  <button onClick={() => pushChangesToFirebase()}>
                    Spara ändring
                  </button>
                )}
                <DeleteButton text={"Ta bort domän"} onClick={() => removeDomain(domain)} />
              </AdminControls>
            ) : (
              ""
            )}
          </Wrapper>
        </>
      )}
    </div>
  );
}

const Wrapper = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  height: calc(100vh - 8em);
  padding-inline: 1em;

  h2 {
    padding: 0;
    margin: 0;
  }
  h3 {
    color: white;
    text-align: center;
  }

  .row {
    display: flex;
    align-items: baseline;
    justify-content: space-evenly;
    padding-block: 1em;
    background-color: var(--blue);
    border-radius: 10px;
    margin-top: 1em;
    gap: 1em;
    color: white;
    div{
      margin-block:1em;
      div{
        text-align:center;
      }
    }
  }

  @media screen and (max-width: 740px) {
    .row {
      display: flex;
      align-items: baseline;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-block: 1em;
      background-color: var(--blue);
      border-radius: 10px;
      margin-top: 1em;
      gap: 1em;
      color: white;
    }
  }
`;

const AdminControls = styled.div`
  margin-top:1em;
  margin-bottom:1em;
  background-color: var(--gray);
  padding:1em;
  border-radius:10px;
  display:flex;
  gap: 1em;
`;

const Prop = styled.div`
  margin-block: 1em;
  padding-inline:1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  color: white;
  width: 13em;

  div {
    background-color: var(--gray);
    width: 45px;
    height: 45px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--green);
    font-weight: 600;
  }
`;

const Title = styled.div`
  display:flex;
  align-items:baseline;
  gap:10px;
`;