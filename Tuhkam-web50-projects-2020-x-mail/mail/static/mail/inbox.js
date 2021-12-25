document.addEventListener('DOMContentLoaded', function () {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  
  // Add event listener to send email button
  document.querySelector('#compose-submit').addEventListener("click", (response) =>{
    response.preventDefault();
    send_email();
    console.log('email sent');
    });

  // By default, load the inbox
  load_mailbox('inbox');

});


//Send an email
function send_email() {

  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: document.querySelector('#compose-recipients').value,
      subject: document.querySelector('#compose-subject').value,
      body: document.querySelector('#compose-body').value
    })
  })
  .then(response => response.json())
      .then(result => {
        console.log(result)
        
        
        if ("message" in result) {
            // The email was sent successfully!
            document.querySelector('#message').style.display = 'block';
            document.querySelector('#message').innerHTML = result.message;
            document.querySelector('#error').style.display = 'none';
            console.log('then done')
            setTimeout(function() {
              load_mailbox('sent');
              console.log('delay done')
              //your code to be executed after 1 second
            }, 1000);

        }

        if ("error" in result) {
            // There was an error in sending the email
            document.querySelector('#error').style.display = 'block';
            document.querySelector('#error').innerHTML = result.error;
            console.log('error done')
        }
      
      });

    }
  




//Compose view
function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#message').style.display = 'none';
  document.querySelector('#error').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

}


//Reply view
function reply_email(email) {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#message').style.display = 'none';
  document.querySelector('#error').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = email.sender;
  document.querySelector('#compose-subject').value = email.subject.slice(0,4)==="Re: " ? email.subject : "Re: " + email.subject ;
  document.querySelector('#compose-body').value = `\n\n<< On ${email.timestamp} ${email.sender} wrote >> \n ${email.body}`;
  
  }




//Mark email as read
function mark_read(email){
  fetch(`/emails/${email.id}`, {
    method: 'PUT',
    body: JSON.stringify({
        read: true
    })
  });
}


//Archive email
function archive(email) {
  fetch(`/emails/${email.id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: true
    })
  }).then( () => load_mailbox("inbox"));
}



//Unarchive email
function unarchive(email) {
  fetch(`/emails/${email.id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: false
    })
  }).then( () => load_mailbox("inbox"));
}



function load_mailbox(mailbox) {

  //Mark the mailbox type
  if (mailbox == 'sent') {
    window.mailtype = 'sent';
  } else {
    window.mailtype = 'ok';
  }

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Clear the mailbox area of possible old content.
  document.querySelector('#emails-view').innerHTML = "";

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  //Display mailbox
  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {

      //Loop over emails
      emails.forEach(email => {

        //Create mail-row div element
        const mail_row = document.createElement('div');
        mail_row.classList.add('mail-row');

        //Add message elements to mail-row
        const sender = document.createElement('p');
        sender.classList.add('sender');
        sender.innerHTML = email.sender;
        mail_row.append(sender);

        const subject = document.createElement('p');
        subject.innerHTML = email.subject;
        mail_row.append(subject);

        const time = document.createElement('p');
        time.classList.add('time');
        time.innerHTML = email.timestamp;
        mail_row.append(time);


        //If read flag true, make bg grey
        if (email.read == true) {
          mail_row.style.backgroundColor = 'silver';
        } else {
          mail_row.style.backgroundColor = 'white';
        }

        //If subject missing, say so and make it grey
        if (email.subject == '') {
          subject.innerHTML = 'No Subject';
          subject.style.color = 'grey';
        } else {
          subject.innerHTML = email['subject'];
        }

        //Add event listener to mail-row div
        mail_row.addEventListener('click', () => load_email(email));

        //Add mail_row to #emails-view
        document.querySelector('#emails-view').append(mail_row);

      });

    });

}







//Display email view
function load_email(email) {

  // Show the email and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none'

  // Clear the email area of possible old content.
  document.querySelector('#email-view').innerHTML = "";

  //Call marker
  mark_read(email);

  //Get email content
  fetch(`/emails/${email.id}`)
    .then(response => response.json())
    .then(email => {

      // Show the sender name
      document.querySelector('#email-view').innerHTML = `<h3>From: ${email.sender}</h3>`;

      //Create mail_read div
      const mail_show = document.createElement('div');
      mail_show.classList.add('mail-show');

      const time = document.createElement('h5');
      time.innerHTML = `Sent: ${email.timestamp}`;
      mail_show.append(time);

      const recipients = document.createElement('h5');
      recipients.innerHTML = `To: ${email.recipients}`;
      mail_show.append(recipients);

      const subject = document.createElement('h5');
      subject.innerHTML = `Subject: ${email.subject}`;
      mail_show.append(subject);

      const body = document.createElement('p');
      body.innerHTML = `Message: ${email.body}`;
      mail_show.append(body);

      document.querySelector('#email-view').append(mail_show);

      //Add reply button
      const reply_btn = document.createElement('button');
      reply_btn.classList.add('btn', 'btn-sm', 'btn-outline-primary');
      reply_btn.innerHTML = "Reply";
      reply_btn.style.marginRight = '0.2rem';
      mail_show.append(reply_btn);
      reply_btn.addEventListener('click', () => reply_email(email));

      //Place archive buttons to mail-show divs, except for Sent folder
      if (window.mailtype =='sent') {
        return;
      } else {

        if (email.archived == false) {
          const archive_btn = document.createElement('button');
          archive_btn.classList.add('btn', 'btn-sm', 'btn-outline-primary');
          archive_btn.innerHTML = "Archive";
          mail_show.append(archive_btn);
          archive_btn.addEventListener('click', () => archive(email));

        } else {
          const archive_btn = document.createElement('button');
          archive_btn.classList.add('btn', 'btn-sm', 'btn-outline-primary');
          archive_btn.innerHTML = "Restore";
          mail_show.append(archive_btn);
          archive_btn.addEventListener('click', () => unarchive(email));
        }
      }
  });
}