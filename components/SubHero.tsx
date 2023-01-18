import React from 'react'
import styled from 'styled-components';
interface ISubHeroProps{
    children: React.ReactNode;
}

export default function SubHero({children}: ISubHeroProps) {
  return (
    <Block>
        {children}
    </Block>
  )
}

const Block = styled.section`
    height: 14em;
    background-color:var(--green);
    color: white;
    display:grid;
    place-items:center
`;