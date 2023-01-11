import { useLikes } from "../hooks/useLikes";

export default function liked() {
  const {likesList} = useLikes();

  return (
    <div>
      {likesList.map(like => (<p key={like.id}>{like.id}</p>))}
      
    </div>
  )
}
