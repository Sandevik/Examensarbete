import React from "react";
import styled from "styled-components";
import { IDomainValues } from "../types";
import DomainTableRow from "./DomainTableRow";
interface DomainTableProps {
  domains: IDomainValues[];
}

export default function DomainTable({ domains }: DomainTableProps) {
  return (
    <Block>
      <div className="headings">
        <div>Domän</div>
        <div>Utgångsdatum</div>
        <div className="disappearSecond">Nuvarande Sidtitel</div>
        <div className="disappearSecond">Domän Auktoritet</div>
        <div className="disappearFirst">Externa Länkar</div>
        <div className="disappearFirst">Sid Auktoritet</div>
        <div>...</div>
      </div>
      {domains?.map((domain) => <DomainTableRow domain={domain} />)}
    </Block>
  );
}

const Block = styled.div`
  max-width: 1440px;
  margin-inline: auto;

  .headings{
    text-align:center;
    position: sticky;
    top: 4em;
  }

  @media screen and (min-width: 769px) {
    .headings {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      gap: 1em;
      background-color: #cccccc;
      height: 3em;
      place-items: center;
      margin-inline: auto;
      padding-inline: 2em;
    }
  }

  @media screen and (max-width: 768px) {
    .headings {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr ;
      gap: 1em;
      background-color: #cccccc;
      height: 3em;
      place-items: center;
      margin-inline: auto;
      padding-inline: 2em;
    }
    .disappearFirst{
        display:none;
    }
    .disappearSecond{
        display: initial;
    }
    
  }

  @media screen and (max-width: 525px) {
    .headings {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1em;
      background-color: #cccccc;
      height: 3em;
      place-items: center;
      margin-inline: auto;
      padding-inline: 2em;
    }
    .disappearFirst{
        display:none;
    }
    .disappearSecond{
        display:none;
    }
    
  }
`;
