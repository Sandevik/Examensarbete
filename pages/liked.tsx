import Link from "next/link";
import styled from "styled-components";
import Like from "../components/Like";
import LikeButton from "../components/LikeComponents/LikeButton";
import SubHero from "../components/SubHero";
import useCheckLike from "../hooks/useCheckLike";
import { useLikes } from "../hooks/useLikes";

export default function liked() {
  const {likesList} = useLikes();
  

  return (
    <Wrapper>
      <SubHero>
        <h1>Gillade domäner</h1>
      </SubHero>
      
      {likesList.length > 0 ? likesList.map(like => (<Like key={like.id} domain={like} />)) : <div className="center"> Här vad det tomt, <Link className="link" href="/domains">klicka här för att se domäner</Link></div>}
      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .center{
    text-align:center;
    margin-inline:auto;
    padding-top:1em;
  }
  .link{
    text-decoration:underline
  }
`;