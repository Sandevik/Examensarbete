import { useRouter } from 'next/router'
import { useDomains } from '../../hooks/useDomains'

export default function id() {
    const router = useRouter()
    const {id} = router.query
    const {domains: domain, loading} = useDomains(id?.toString())
    

  return (
    <div>
        {loading ? "loading": JSON.stringify(domain)}
    </div>
  )
}
