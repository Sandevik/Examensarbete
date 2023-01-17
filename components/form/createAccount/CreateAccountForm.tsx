import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
interface ICreateAccountForm {
  onSubmit?: (name: string, email: string, password: string) => void;
}
interface Details {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export default function CreateAccountForm({ onSubmit }: ICreateAccountForm) {
  const [details, setDetails] = useState<Details>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (typeof onSubmit == "function" && details.name !== "" && details.email != "" && details.password.length > 6 && details.password === details.repeatPassword){
        onSubmit(details.name, details.email, details.password)
    }else{
        alert("Någon uppgift stämmer inte")
    }
  }

  return (
    <Form>
      <h2>Skapa konto</h2>
      <InputGroup>
        <label htmlFor="Namn">Namn</label>
        <input
          type="text"
          placeholder="John Doe"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />
      </InputGroup>

      <InputGroup>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          placeholder="john.doe@example.com"
          value={details.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="">Lösenord</label>
        <input
          type="password"
          placeholder="**************"
          value={details.password}
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
        />
      </InputGroup>

      <InputGroup>
        <label htmlFor="">Upprepa lösenord</label>
        <input
          type="password"
          placeholder="**************"
          value={details.repeatPassword}
          onChange={(e) =>
            setDetails({ ...details, repeatPassword: e.target.value })
          }
        />
      </InputGroup>

      <button className="submit" onClick={(e)=>handleClick(e)}>
        Skapa konto
      </button>
      <div className="link">Har du redan ett konto? <LINK href="/login"> Logga in </LINK></div>
    </Form>
  );
}

const Form = styled.form`
  max-width: 25em;
  display: flex;
  flex-direction: column;
  background-color: rgba(255,255,255,0.6);
  padding: 1em;
  border-radius: 10px;

  .submit {
    margin-top: 1em;

    cursor: pointer;
    border: none;
    padding: 1em;
    background-color: var(--gray);
    color: black;
    border-radius: 10px;
    transition: background-color 0.2s ease-in-out, color 0.2s;
    :hover {
      background-color: var(--green);
      color: white;
    }
  }

  .link{
    font-size: 14px;
    margin-top: 5px;
    margin-inline:auto;
  }

  h2 {
    text-align: center;
  }
`;

const InputGroup = styled.div`
  @media screen and (min-width: 420px){
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2em;
    margin-top: 1em;

    input {
      height: 2em;
      border-radius: 5px;
      border: none;
      padding-inline: 10px;
    }
  }
  @media screen and (max-width: 419px){
    display:flex;
    flex-direction:column;
    margin-bottom:1em;
    input {
      margin-top:.5em;
      height: 2em;
      border-radius: 5px;
      border: none;
      padding-inline: 10px;
    }
  }
`;

const LINK = styled(Link)`
  color: var(--green);
  font-size: 14px;
`;