import { useRouter } from 'next/router'
import styled from 'styled-components'
import Loading from '../../components/Loading'
import useLikes from '../../hooks/useLikes'
import { useSingleDomain } from '../../hooks/useSingleDomain'
import type {IDomainValues} from "../../types"

export default function id() {
    const router = useRouter()
    const { likesList , toggleLike} = useLikes()
    const {id} = router.query
    const {domains: domain, loading} = useSingleDomain(id?.toString())

  return (
    <div>
        {loading ? <Loading />: 
        
        <Wrapper>
          <h1>{domain?.id}</h1>
          <h2>Tillgänglig: {domain?.availableBy}</h2>
          <div>Domän Auktoritet: {domain?.domainAuthority}</div>
          <div>Domännamnsklassning: {domain?.domainNameRating}</div>
          <div>Kodat Domännamn: {domain?.encodedDomainUrl}</div>
          <div>Externa Länkar: {domain?.externalLinks}</div>
          <div>Senast krypt: {domain?.lastCrawled}</div>
          <div>Antagligen ledig: {domain?.likelyFree?.toString()}</div>
          <div>Sid Auktoritet: {domain?.pageAuthority}</div>
          <div>Sid Titel: {domain?.pageTitle}</div>
          <div>Sidor Krypta Från Rotdomän: {domain?.pagesCrawledFromRoot}</div>
          <div>Sidlänkar till Sidan: {domain?.pagesToPage}</div>
          <div>Spam Poäng: {domain?.spamScore}</div>
          <button onClick={()=> domain? toggleLike(domain) : ""}>Like</button>
          
        </Wrapper>
        
        }
    </div>
  )
}

const Wrapper = styled.div`
  background-color: #d15252;
  max-width: 1440px;
  margin-inline:auto;
  height: calc(100vh - 8em);
  padding-inline: 1em;
`;