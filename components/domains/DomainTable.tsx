import React from "react";
import styled from "styled-components";
import useAuth from "../../Auth/hooks/useAuth";
import { filterOptions, IDomainValues } from "../../types";
import DomainTableHeaderElement from "./DomainTableHeaderElement";
import DomainTableRow from "./DomainTableRow";
interface DomainTableProps {
  domains: IDomainValues[];
  updateSort: (by: filterOptions) => void;
  currentFilter: filterOptions;
}

export default function DomainTable({ domains, updateSort, currentFilter }: DomainTableProps) {
  const {user, loading} = useAuth()
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
      <h3 className={"center"}>Förhandsvisade</h3>
      {/* Få preview domäner att renderas först (ovanför) */}
      {domains?.map(domain => {
        if (domain.onPreview){
          return <DomainTableRow key={domain.id} domain={domain} />
        }
      })}

      <h3 className={"center"}>Alla domäner</h3>
      {/* Domäner som inte är previewed renderas under previewed */}
      {domains?.map((domain) => {
        if (!domain.onPreview){
          if (domain.hidden && user?.userType === "admin"){
            return <DomainTableRow key={domain.id} domain={domain} /> 
          }else if(domain.hidden && user?.userType !== "admin"){
            return
          }else if(!domain.hidden){
            return <DomainTableRow key={domain.id} domain={domain} /> 
          }
        }
      })}
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

  .center{
      text-align:center;
      border-bottom: 1px solid black;
      max-width:30em;
      margin-inline:auto;
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

