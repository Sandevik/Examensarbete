import React from 'react'
import { filterOptions } from '../../types';
import { BsChevronRight } from 'react-icons/Bs';
import styled from 'styled-components';

interface IHeadingElementProps{
    title: string;
    currentFilter: filterOptions;
    onClick: () => void;

}

function DomainTableHeaderElement({title, currentFilter, onClick}: IHeadingElementProps) {
  return (
    <Btn onClick={onClick}>{title} <BsChevronRight className={currentFilter ? "turn" : "org"}/></Btn>
  )
}

export default DomainTableHeaderElement

const Btn = styled.button`
    display:flex;
    align-items:center;
    justify-content: space-between;
    border:none;
    background-color:transparent;
    font-size: 15px;
    cursor:pointer;
    user-select:none;
    .icon{
        color:red
    }
`;
