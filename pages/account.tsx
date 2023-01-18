import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import styled from "styled-components";
import { logOut } from "../Auth/controllers/logOut";
import useAuth from "../Auth/hooks/useAuth";
import Button from "../components/Button";
import DeleteButton from "../components/DeleteButton";
import Loading from "../components/Loading";
import PaymentForm from "../components/PaymentForm";
import SubHero from "../components/SubHero";
import { removeUser } from "../controllers/removeUser";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    : ""
);

export default function account() {
  const { user, loading } = useAuth();

  const handleRemoval = () => {    
   if (user){
    const answer = prompt("Skriv DELETE");
    if (answer === "DELETE"){
      removeUser(user)
    }else{
      alert("Borttagning hindrad, återgår...")
    }
   }
  }

  return (
    <div>
      {!loading ? (
        <>
          <SubHero>
            <h1>Välkommen {user && <Namn>{user.name}</Namn>}</h1>
          </SubHero>
          <Block>
          
          <span>{user?.email}</span>
          <div>
          {user?.subscriptionType !== "premium" && (
            <>
            <CardDetails>
              <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
            </CardDetails>
            <p>Uppgradera din prenumeration för att använda premium funktionerna, samt att få tillgång till premium värden.</p>
            </>
          )}
          {user?.subscriptionType !== undefined ?
            <div>Din nuvarande prenumeration: {user?.subscriptionType}</div>
          : ""}
          </div>

          {user && <Button text="Logga ut" onClick={logOut} />}
          {user && <DeleteButton text="Ta bort konto" onClick={handleRemoval} />}
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

const CardDetails = styled.div`
  margin-block:1em;
  width:20em;
`;