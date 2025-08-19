const Imap = require('imap');
const { simpleParser } = require('mailparser');

function getotp() {
  return new Promise((resolve, reject) => {
    const imap = new Imap({
      user: 'sayujtestingproject@gmail.com',
      password: 'YOUR_APP_PASSWORD_HERE', // Use the app password here
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    });

    function openInbox(cb) {
      imap.openBox('INBOX', false, cb);
    }

    imap.once('ready', () => {
      openInbox((err, box) => {
        if (err) {
          reject(err);
          return;
        }

        // Search for unseen emails from last 5 minutes
        const sinceDate = new Date(Date.now() - 5 * 60000);
        imap.search(['UNSEEN', ['SINCE', sinceDate.toISOString()]], (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          if (!results || results.length === 0) {
            reject('No new emails found');
            imap.end();
            return;
          }

          const f = imap.fetch(results, { bodies: '' });
          f.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, (err, parsed) => {
                if (err) {
                  reject(err);
                  return;
                }

                // Extract 6-digit OTP from email text
                const otpMatch = parsed.text.match(/\b\d{6}\b/);
                if (otpMatch) {
                  resolve(otpMatch[0]);
                  imap.end();
                }
              });
            });
          });

          f.once('error', (err) => reject(err));
        });
      });
    });

    imap.once('error', (err) => reject(err));
    imap.connect();
  });
}

module.exports = { getotp};
