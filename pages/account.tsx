import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import styled from "styled-components";
import { logOut } from "../Auth/controllers/logOut";
import useAuth from "../Auth/hooks/useAuth";
import Loading from "../components/Loading";
import PaymentForm from "../components/PaymentForm";
import SubHero from "../components/SubHero";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    : ""
);

export default function account() {
  const { user, loading } = useAuth();

  return (
    <div>
      {!loading ? (
        <>
          <SubHero>
            <h1>Välkommen {user && <Namn>{user?.name}</Namn>}</h1>
          </SubHero>
          <Block>
          {user?.subscriptionType !== undefined ?
            <div>Din nuvarande prenumeration: {user?.subscriptionType}</div>
          : ""}
          <span>{user?.email}</span>
          {user?.subscriptionType !== "premium" && (
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          )}

          {user && <button onClick={logOut}>Logga ut</button>}
          {user && <button>Ta bort konto</button>}
          {!user && <h3>Vänligen logga in för att visa ditt konto</h3> }
          </Block>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

const Namn = styled.span`
  text-transform: capitalize;
`;

const Block = styled.div`
  max-width:1440px;
  margin-inline:auto;
`;