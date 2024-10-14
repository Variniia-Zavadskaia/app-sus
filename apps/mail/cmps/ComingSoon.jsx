const {useNavigate} = ReactRouterDOM

export function ComingSoon() {
  const navigate = useNavigate()

  function onBack() {
    navigate('/mail')
  }
  return (
    <section className="coming-soon ">
      <button className="go-back-to-site" onClick={onBack}>Go back</button>
    <div className="container coming-soon">

      <h1>This site is under construction</h1>

      <h2>Coming Soon.....</h2>
    </div>
    </section>
  )
}
