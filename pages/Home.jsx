export function Home() {
    return (
      <section className="home">
        <header>
          <h1>Welcome to SyncSpace</h1>
          <p>Your one-stop solution for managing emails, notes, and books.</p>
        </header>
        <main>
          <section className="features">
            <div className="feature">
              <h2>Mail App</h2>
              <p>
                Manage your emails effortlessly with features that simplify
                sending, receiving, and organizing your messages.
              </p>
            </div>
            <div className="feature">
              <h2>Note App</h2>
              <p>
                Take notes, create to-do lists, and organize your thoughts
                with a user-friendly interface.
              </p>
            </div>
            <div className="feature">
              <h2>Book App</h2>
              <p>
                Explore a vast collection of books, complete with pricing and
                detailed descriptions to aid your reading journey.
              </p>
            </div>
          </section>
        </main>
        <footer>
          <p>&copy; {new Date().getFullYear()} SyncSpace. All rights reserved.</p>
          <p>Created by Variniia Zavadskaia and Keren Vasserman.</p>
        </footer>
      </section>
    );
  }
  