import {animateCSS} from '../services/util.service.js'

const {useNavigate} = ReactRouterDOM
const {useEffect, useRef} = React

export function Home() {
  const featureRefs = [useRef(null), useRef(null), useRef(null)]
  const footerRef = useRef(null)
  const aboutSectionRef = useRef(null)
  const testimonialRefs = [useRef(null), useRef(null)]

  useEffect(() => {
    // Animate features, footer, about section, and testimonials on load
    featureRefs.forEach((ref) => animateCSS(ref.current, 'bounceIn'))
    animateCSS(aboutSectionRef.current, 'fadeIn')
    animateCSS(footerRef.current, 'fadeInUp')
    testimonialRefs.forEach((ref) => animateCSS(ref.current, 'zoomIn'))
  }, [animateCSS])

  return (
    <section className="homepage-container">
    <header className="homepage-header">
      <h1 className="homepage-title">Welcome to SyncSpace</h1>
      <p className="homepage-subtitle">Your one-stop solution for managing emails, notes, and books.</p>
    </header>

    <main className="homepage-main">
      {/* Features Section */}
      <section className="homepage-features">
        <div className="homepage-feature-item" ref={featureRefs[0]}>
          <h2 className="homepage-feature-title">Mail App</h2>
          <p className="homepage-feature-description">
            Manage your emails effortlessly with features that simplify sending, receiving, and organizing your messages.
          </p>
        </div>
        <div className="homepage-feature-item" ref={featureRefs[1]}>
          <h2 className="homepage-feature-title">Note App</h2>
          <p className="homepage-feature-description">
            Take notes, create to-do lists, and organize your thoughts with a user-friendly interface.
          </p>
        </div>
        <div className="homepage-feature-item" ref={featureRefs[2]}>
          <h2 className="homepage-feature-title">Book App</h2>
          <p className="homepage-feature-description">
            Explore a vast collection of books, complete with pricing and detailed descriptions to aid your reading journey.
          </p>
        </div>
      </section>

      {/* New About Section */}
      <section className="homepage-about-section" ref={aboutSectionRef}>
        <h2 className="homepage-about-title">Why Choose SyncSpace?</h2>
        <div className="homepage-about-feature">
          <div className="homepage-about-feature-heading">🛠️ User-Friendly Interface</div>
          <p className="homepage-about-feature-description">
            Enjoy a simple, easy-to-navigate interface that helps you get things done without hassle.
          </p>
        </div>
        <div className="homepage-about-feature">
          <div className="homepage-about-feature-heading">📧 Powerful Mail Management</div>
          <p className="homepage-about-feature-description">
            Stay on top of your emails with organized folders, quick filters, and smart inbox features.
          </p>
        </div>
        <div className="homepage-about-feature">
          <div className="homepage-about-feature-heading">📝 Versatile Note-Taking</div>
          <p className="homepage-about-feature-description">
            Create notes, tasks, and to-do lists effortlessly, with the flexibility to categorize and organize your thoughts.
          </p>
        </div>
        <div className="homepage-about-feature">
          <div className="homepage-about-feature-heading">📚 Vast Library of Books</div>
          <p className="homepage-about-feature-description">
            Explore a wide selection of books with detailed descriptions, reviews, and pricing information.
          </p>
        </div>
      </section>

      {/* New Testimonials Section */}
      <section className="homepage-testimonials">
        <h2 className="homepage-testimonials-title">What Our Users Say</h2>
        <div className="homepage-testimonial-item" ref={testimonialRefs[0]}>
          <blockquote className="homepage-testimonial-quote">
            <p>"SyncSpace has completely transformed how I manage my tasks. The Note App is a game changer!"</p>
            <cite className="homepage-testimonial-cite">– John Doe</cite>
          </blockquote>
        </div>
        <div className="homepage-testimonial-item" ref={testimonialRefs[1]}>
          <blockquote className="homepage-testimonial-quote">
            <p>"I love the Book App! It's so easy to find new reads and manage my collection."</p>
            <cite className="homepage-testimonial-cite">– Jane Smith</cite>
          </blockquote>
        </div>
      </section>
    </main>

    <footer className="homepage-footer" ref={footerRef}>
      <p className="homepage-footer-text">&copy; {new Date().getFullYear()} SyncSpace. All rights reserved.</p>
      <p className="homepage-footer-text">Created by Variniia Zavadskaia and Keren Vasserman.</p>
    </footer>
  </section>
  )
}
