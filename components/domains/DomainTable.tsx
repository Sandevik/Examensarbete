import React from "react";
import styled from "styled-components";
import { filterOptions, IDomainValues } from "../../types";
import DomainTableHeaderElement from "./DomainTableHeaderElement";
import DomainTableRow from "./DomainTableRow";
interface DomainTableProps {
  domains: IDomainValues[];
  updateSort: (by: filterOptions) => void;
  currentFilter: filterOptions;
}

export default function DomainTable({ domains, updateSort, currentFilter }: DomainTableProps) {
  return (
    <Block>
      <div className="headings">
        <DomainTableHeaderElement title={"Domän"} currentFilter={currentFilter} onClick={()=> updateSort("domainName")} />
        <DomainTableHeaderElement title={"Utgångsdatum"} currentFilter={currentFilter} onClick={()=> updateSort("availabilityDate")} />
        <div className="disappearSecond">Nuvarande Sidtitel</div>
        <div className="disappearSecond">
          <DomainTableHeaderElement title={"Domän Auktoritet"} currentFilter={currentFilter} onClick={()=> updateSort("domainAuthority")} />
        </div>
        <div className="disappearFirst">
          <DomainTableHeaderElement title={"Externa Länkar"} currentFilter={currentFilter} onClick={()=>updateSort("externalLinks")}/>
        </div>
        <div className="disappearFirst">
          <DomainTableHeaderElement title={"Sid Auktoritet"} currentFilter={currentFilter} onClick={()=>updateSort("pageAuthority")}  />
        </div>
        <div>...</div>
      </div>
      {domains?.map((domain, i) => <DomainTableRow key={i} domain={domain} />)}
    </Block>
  );
}

const Block = styled.div`
  width:100vw;
  margin-inline: auto;
  max-width: 1440px;
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
