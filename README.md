<strong>Project Title:</strong> Front-End Email Client

<strong>Description:</strong>
I developed a front-end for an email client that interacts with a backend API to send and receive emails. The application consists of an Inbox page, an Email page, and utilizes JavaScript to dynamically handle user interactions without reloading the page. This single-page application leverages Django's API endpoints to manage email functionalities such as sending, viewing, archiving, and replying to emails.

<strong>Technologies Used:</strong>

<ul>
  <li><strong>HTML:</strong> For structuring the pages and forms.</li>
  <li><strong>CSS:</strong> For styling the email client interface.</li>
  <li><strong>JavaScript:</strong> For handling user interactions and making API calls.</li>
  <li><strong>Django:</strong> For backend services (not modified but utilized).</li>
</ul>
<strong>Features:</strong>

<strong>Inbox Page:</strong>

<ul>
  <li>I created an Inbox page that displays a list of emails with a summary including the sender, subject, and timestamp.</li>
  <li>Emails are categorized by their read/unread status, with unread emails highlighted with a white background and read emails with a gray background.</li>
  <li>Implemented functionality to click on an email to view its full content on a separate Email page.</li>
  <li>Included navigation buttons to switch between the Inbox, Sent mailbox, and Archive.</li>
</ul>
<strong>Email Page:</strong>

<ul>
  <li>Developed a page to display the content of a selected email, including the sender, recipients, subject, timestamp, and body.</li>
  <li>Added functionality to mark the email as read when it is viewed.</li>
  <li>Included options to archive or unarchive the email and to reply to it.</li>
</ul>
<strong>Send Mail:</strong>

<ul>
  <li>Implemented functionality to send an email through the composition form.</li>
  <li>Upon submission, the email is sent via a POST request to the API, and the Sent mailbox is loaded to reflect the new email.</li>
</ul>
<strong>Archive and Unarchive:</strong>

<ul>
  <li>Added functionality to archive or unarchive emails based on user actions when viewing an email.</li>
</ul>
<strong>Reply:</strong>

<ul>
  <li>Implemented a "Reply" button that pre-fills the composition form with the recipient, subject, and body based on the email being replied to.</li>
</ul>
