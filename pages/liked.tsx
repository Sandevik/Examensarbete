import SubHero from "../components/SubHero";
import { useLikes } from "../hooks/useLikes";

export default function liked() {
  const {likesList} = useLikes();

  return (
    <div>
      <SubHero>
        <h1>Gillade domäner</h1>
      </SubHero>
      {likesList.map(like => (<p key={like.id}>{like.id}</p>))}
      
    </div>
  )
}
