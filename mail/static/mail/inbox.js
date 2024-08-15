document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  //submit handler
  document.querySelector("#compose-form").addEventListener('submit', send_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
  
}

function view_email (id) {
  
        fetch(`/emails/${id}`)
        .then(response => response.json())
        .then(viewEmail => {
          const viewSingleEmail = document.createElement('div');
          viewSingleEmail.innerHTML =
          `
          <div class="viewSingleEmailCard" id="${viewEmail.id}" style="border: 1px solid black; background: lightgrey;">
            <div class="textPadding"><h6><strong>Sender: </strong> ${viewEmail.senderl}</h6></div>
            <div class="textPadding"><h6><strong>Recipients: </strong>${viewEmail.recipients}</h6></div>
            <div class="textPadding"><h6><strong>Subject: </strong>${viewEmail.subject}</h6></div>
            <div class="textPadding"><h6><strong>Timestamp: </strong>${viewEmail.timestamp}</h6></div>
            <div class="textPadding"><h6>${viewEmail.body}</h6></div>
          </div>
          `;
          document.querySelector('#emails-view').innerHTML = ``;
          document.querySelector('#emails-view').append(viewSingleEmail);

          const reply_button = document.createElement('button')
          reply_button.innerHTML = "Reply"
          reply_button.className = "replyButton"
          reply_button.addEventListener('click', function() {
            compose_email()

          document.querySelector('#compose-recipients').value = viewEmail.sender;
          
          document.querySelector('#compose-subject').value = '';
          let subject = viewEmail.subject;
          if (subject.split(' ',1)[0] !="Re:") {
            subject = "Re: " + viewEmail.subject;
          }
          document.querySelector('#compose-body').value = `On ${viewEmail.timestamp} ${viewEmail.sender} wrote: ${viewEmail.body}`; 
          })
          document.querySelector('.viewSingleEmailCard').append(reply_button)
        })
        fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            read: true
          })
        })
      }

function archive(id) {
    fetch(`/emails/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          archived: true
      })
    })
    .then(() => {load_mailbox('inbox')})
} 

function unarchive(id) {
    fetch(`/emails/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          archived: false
      })
    })
    .then(() => {load_mailbox('inbox')})
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
        // Print emails
        emails.forEach (singleEmail => {
          const newEmail = document.createElement('div');
          if (singleEmail.read === false) {
          newEmail.innerHTML = `
              <div class="emailCard grid-container" id="${singleEmail.id}" style="border: 1px solid black; background: white;">
                <div class="grid-item"><h6><strong>Sender: </strong>${singleEmail.sender}</h6></div>
                <div class="grid-item"><h6><strong>Subject</strong>: ${singleEmail.subject}</h6></div>
                <div class="grid-item"><h6><strong>Timestamp: </strong>${singleEmail.timestamp}</h6></div>
                <form>
                <button class="archiveButton" type="submit" value="Submit" id="archiveButton-${singleEmail.id}">archive</button>
                </form>
              </div>
          `;
          newEmail.addEventListener('click', function() {
            view_email(singleEmail.id)
          });
          /*
          if (singleEmail.archived === true) {
            let archiveButtonText = document.getElementById(`archiveButton-${singleEmail.id}`)
            archiveButtonText.innerHTML = "unarchive"
            } else if (singleEmail.archived === false) {
              let archiveButtonText = document.getElementById(`archiveButton-${singleEmail.id}`)
            archiveButtonText.innerHTML =  "archive"  
            } 
            */
            document.querySelector('form').addEventListener('submit', function(event) {
              event.preventDefault()
              let id = singleEmail.id
              console.log(id)

              if (singleEmail.archived === false) {
                archive(id)
              } else if (singleEmail.archived === true) {
                unarchive(id)
              }
            }); 
            
            document.querySelector('#emails-view').append(newEmail);
          

          } else if (singleEmail.read === true) {
            newEmail.innerHTML = `
                <div class="emailCard grid-container" id="${singleEmail.id}" style="border: 1px solid black; background: lightgrey;">
                  <div class="grid-item"><h6><strong>Sender: </strong>${singleEmail.sender}</h6></div>
                  <div class="grid-item"><h6><strong>Subject: </strong>${singleEmail.subject}</h6></div>
                  <div class="grid-item"><h6><strong>Timestamp: </strong>${singleEmail.timestamp}</h6></div>
                  <form>
                  
                  </form>
                </div>
          `;
          if (mailbox === 'inbox' || mailbox === 'archive') {
          const form = document.querySelector('form')
          form.innterHTML = `<button class="archiveButton" type="submit" value="Submit" id="archiveButton-${singleEmail.id}">archive</button>`
        
          document.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault()
            let id = singleEmail.id
            console.log(id)

            if (singleEmail.archived === false) {
              archive(id)
            } else if (singleEmail.archived === true) {
              unarchive(id)
            }
          }); 
          }

          newEmail.addEventListener('click', function() {
            view_email(singleEmail.id)
          })
          /*
          if (singleEmail.archived === true) {
            let archiveButtonText = document.getElementById(`archiveButton-${singleEmail.id}`)
            archiveButtonText.innerHTML = "unarchive"
            } else if (singleEmail.archived === false) {
              let archiveButtonText = document.getElementById(`archiveButton-${singleEmail.id}`)
            archiveButtonText.innerHTML =  "archive"
            }
          */
               
            document.querySelector('#emails-view').append(newEmail);
      
        }
        })
    })
  }

function send_email(event) {
  event.preventDefault();

  let recipient = document.querySelector('#compose-recipients').value;
  let subject = document.querySelector('#compose-subject').value;
  let body = document.querySelector('#compose-body').value;

  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipient,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
      console.log(result);
  });
  localStorage.clear();
  load_mailbox('sent');
  return false;
}

/*

<form>
                  <button class="archiveButton" type="submit" value="Submit" id="archiveButton-${singleEmail.id}">archive</button>
                  </form>
*/