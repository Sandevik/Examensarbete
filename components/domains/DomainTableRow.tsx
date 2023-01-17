import Link from "next/link";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { IDomainValues } from "../../types";
import useCheckLike from "../../hooks/useCheckLike";
import { useLikes } from "../../hooks/useLikes";
import LikeIcon from "../LikeComponents/LikeIcon";
import LikeButton from "../LikeComponents/LikeButton";
interface IProps {
  domain: IDomainValues;
}

export default function DomainTableRow({ domain }: IProps) {
  const {isLiked} = useCheckLike(domain)
  
  return (
    <Block>
      <Url><LikeButton isLiked={isLiked} domain={domain}/><div className={domain.onPreview ? "highlight" : ""}>{domain.id}</div></Url>
      <div>{domain.availableBy}</div>
      <div className="disappearSecond">
        {domain.pageTitle !== "" ? domain.pageTitle : <em>Ingen sid titel</em>}
      </div>
      <div className="disappearSecond">
        {domain.domainAuthority === null
          ? "Uppgradera"
          : domain.domainAuthority}
      </div>
      <div className="disappearFirst">
        {domain.externalLinks === null
          ? "Uppgradera"
          : domain.externalLinks}
      </div>
      <div className="disappearFirst">
        {domain.pageAuthority === null
          ? "Uppgradera"
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

const Url = styled.div`
  display:flex;
  justify-content:space-between;
  width:100%;

`;