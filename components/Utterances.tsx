import { useEffect, useRef } from 'react'

type Props = {
  className: any
  repo: string
  issueTerm?: 'pathname' | 'url' | 'title' | 'og:title'
  label?: string
  theme: 'github-light' | 'github-dark' | string
}

export default function Utterances({
  className,
  repo,
  issueTerm = 'pathname',
  label,
  theme
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // 테마 전환 시 중복 삽입 방지
    ref.current.innerHTML = ''

    const s = document.createElement('script')
    s.src = 'https://utteranc.es/client.js'
    s.async = true
    s.setAttribute('repo', repo)
    s.setAttribute('issue-term', issueTerm)
    if (label) s.setAttribute('label', label)
    s.setAttribute('theme', theme)
    s.setAttribute('crossorigin', 'anonymous')
    ref.current.append(s)
  }, [repo, issueTerm, label, theme])

  return <section id='comments' className={className} ref={ref} />
}
