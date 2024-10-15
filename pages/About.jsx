export function About() {
  return (
    <section className="about">
      <header>
        <h1>About Our App</h1>
      </header>
      <main>
        <section>
          <h2>Mission</h2>
          <p>
            Our mission is to provide a seamless experience for managing emails, notes, and books. We believe in
            simplifying the way you interact with your digital tools.
          </p>
        </section>
        <section>
          <h2>Features</h2>
          <section className="about-features container">
            <div>
              <strong>Mail App:</strong>Allows users to send and receive emails seamlessly, manage their inbox with intuitive sorting options, and utilize filters
              to quickly find important messages. Users can categorize their emails with customizable labels, archive
              old conversations, and easily manage spam. The app also offers a responsive design, ensuring smooth access
              on any device, along with integration for attachments, rich text formatting, and the ability to set
              reminders for follow-up emails.
            </div>
            <div>
              <strong>Note App:</strong>A flexible note-taking solution with options for different note types, including
              text notes, checklists, and voice memos. Users can create notebooks for various subjects or projects,
              ensuring their ideas are organized and easily retrievable. The app supports rich text formatting, allowing
              users to emphasize important points and add links or images. Collaboration features enable sharing notes
              with friends or colleagues for group projects, while robust search functionality helps users quickly find
              specific notes. Additionally, the app includes reminders and tags for effective task management and
              prioritization.
            </div>
            <div>
              <strong>Book App:</strong>A digital library that provides an extensive collection of books along with
              pricing and detailed descriptions. Users can browse by genre, author, or popularity, making it easy to
              discover new reads. The app features user reviews and ratings to assist in choosing the right book. Each
              book entry includes essential details such as publication date, ISBN, and a synopsis to help users make
              informed decisions. Users can also create personalized reading lists, track their reading progress, and
              receive recommendations based on their interests.
            </div>
          </section>
        </section>
        <footer>
          <h2>Contact Us</h2>
          <p>If you have any questions or feedback, feel free to reach out to us!</p>
           <p>&copy; {new Date().getFullYear()} SyncSpace. All rights reserved to </p>
          <p>Created by Variniia Zavadskaia and Keren Vasserman.</p>
      </footer>
      </main>
    </section>
  )
}
