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
  const isLoadedRef = useRef(false)

  // 최초 마운트 시 스크립트 로드 (theme 변경은 postMessage로 처리하므로 의존성에서 제외)
  useEffect(() => {
    if (!ref.current || isLoadedRef.current) return

    const s = document.createElement('script')
    s.src = 'https://utteranc.es/client.js'
    s.async = true
    s.setAttribute('repo', repo)
    s.setAttribute('issue-term', issueTerm)
    if (label) s.setAttribute('label', label)
    s.setAttribute('theme', theme)
    s.setAttribute('crossorigin', 'anonymous')
    ref.current.append(s)
    isLoadedRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo, issueTerm, label])

  // 테마 변경 시 postMessage로 iframe에 전달
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.utterances-frame'
    )
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        { type: 'set-theme', theme },
        'https://utteranc.es'
      )
    }
  }, [theme])

  return <section id='comments' className={className} ref={ref} />
}
