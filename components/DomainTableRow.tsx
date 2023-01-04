import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { IDomainValues } from "../types";
interface IProps {
  domain: IDomainValues;
}

export default function DomainTableRow({ domain }: IProps) {
  return (
    <Block>
      <div>{domain.id}</div>
      <div>{domain.availableBy}</div>
      <div className="disappearSecond">
        {domain.pageTitle !== "" ? domain.pageTitle : <em>Ingen sid titel</em>}
      </div>
      <div className="disappearSecond">
        {domain.domainAuthority === null
          ? "Upgradera för att se"
          : domain.domainAuthority}
      </div>
      <div className="disappearFirst">
        {domain.externalLinks === null
          ? "Uppgradera för att se"
          : domain.externalLinks}
      </div>
      <div className="disappearFirst">
        {domain.pageAuthority === null
          ? "Uppgradera för att se"
          : domain.pageAuthority}
      </div>
      <div>
        <Link href={`/domains/${domain.id}`}>
          <FiArrowRight />
        </Link>
      </div>
    </Block>
  );
}

const Block = styled.div`
  max-width: 1440px;
  margin-inline: auto;

  div{
    white-space: nowrap;
  }

  @media screen and (min-width: 769px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 1em;
    height: 3em;
    place-items: center;
    margin-inline: auto;
    padding-inline: 2em;
  }

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 1em;
    height: 3em;
    place-items: center;
    margin-inline: auto;
    padding-inline: 2em;

    .disappearFirst {
      display: none;
    }
    .disappearSecond {
      display: initial;
    }
  }

  @media screen and (max-width: 525px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1em;
    height: 3em;
    place-items: center;
    margin-inline: auto;
    padding-inline: 2em;

    .disappearFirst {
      display: none;
    }
    .disappearSecond {
      display: none;
    }
  }
`;
