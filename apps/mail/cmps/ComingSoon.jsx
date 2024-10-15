import { animateCSS } from "../../../services/util.service.js"

const {useNavigate} = ReactRouterDOM
const {useEffect, useRef} = React

export function ComingSoon() {
  const navigate = useNavigate()

  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    // Trigger animation on load
    animateCSS(titleRef.current, 'bounceIn')
    animateCSS(subtitleRef.current, 'fadeInUp')
  }, [animateCSS])

  function onBack() {
    navigate('/')
  }

  return (
    <section className="coming-soon">
      <button className="go-back-to-site" onClick={onBack}>
        Go Back
      </button>
      <div className="container coming-soon-content">
        <h1 ref={titleRef} className="coming-soon-title">This site is under construction</h1>
        <h2 ref={subtitleRef} className="coming-soon-subtitle">Coming Soon...</h2>
      </div>
    </section>
  )
}
