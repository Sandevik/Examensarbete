import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAuth from "../Auth/hooks/useAuth";
import { changeSubscriptionType } from "../controllers/changeSubscriptionType";
import styled from "styled-components";
import Button from "./Button";

interface credentials {
  name: string | "";
  email: string | "";
}

export default function PaymentForm() {
  const { user } = useAuth();
  const [credentials, setCredentials] = useState<credentials>({
    name: "",
    email: "",
  });
  const stripe = useStripe();
  const elements = useElements();

  const createSubscription = async () => {
    try {
      const cardElement = elements?.getElement(CardElement);
      if (cardElement) {
        const paymentMethod = await stripe?.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        const res = await fetch("/api/subscribe-with-stripe", {
          method: "POST",
          headers: {
            ContentType: "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email || user?.email,
            paymentMethod: paymentMethod?.paymentMethod?.id,
            uid: user?.uid,
          }),
        });
        if (!res.ok) return alert(`Betalning misslyckades`);
        const data = await res.json();
        if (data && user != null) {
          await changeSubscriptionType(user, "premium");
        }
      }
    } catch (error) {
      console.log(error);
      alert("Betalning misslyckades");
    }
  };

  return (
    <>
      <PersonDetails>
        <InputDetail>
          Name:
          <input
            type="text"
            placeholder="John Doe"
            value={credentials?.name}
            onChange={(e) =>
              setCredentials({ ...credentials, name: e.target.value })
            }
          />
        </InputDetail>
        <InputDetail>
          Email:
          <input
            type="text"
            placeholder="john.doe@example.com"
            value={credentials?.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </InputDetail>
        <CardElement />
      </PersonDetails>
      <Button text={"Prenumerera 200kr / mån"} onClick={createSubscription}/>
    </>
  );
}

const PersonDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  background-color: var(--gray);
  border-radius: 10px;
  height: 10em;
  justify-content: space-evenly;
`;

const InputDetail = styled.div`
  display: flex;
  justify-content: space-between;
  input {
    border:none;
    border-radius:5px;
    padding:5px;
  }
`;


