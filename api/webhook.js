const twilio = require('twilio');

module.exports = async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse incoming WhatsApp message
    const { Body, From, To } = req.body;
    const message = Body.trim().toLowerCase();
    const userPhone = From; // Format: whatsapp:+2671234567

    console.log('Received:', { message, from: userPhone });

    // Simple command parsing
    let response = '';

    if (message === 'hello' || message === 'hi') {
      response = 'Hello! I can help you deploy apps.\n\nCommands:\n- deploy\n- status\n- help';
    }
    else if (message === 'help') {
      response = `WhatsApp DevOps Bot

Commands:
- deploy [project] [env]
- status
- list
- help

Example: "deploy blog production"`;
    }
    else if (message === 'list') {
      response = `Your Projects:
1. demo-blog
2. demo-api

Reply with "deploy [number or name] production"`;
    }
    else if (message.startsWith('deploy')) {
      response = 'Deployment started! (Coming soon in next step)';
    }
    else {
      response = 'Unknown command. Type "help" for available commands.';
    }

    // Send response back to WhatsApp
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message(response);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());

  } catch (error) {
    console.error('Error:', error);

    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message('Error processing your request. Please try again.');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }
}
