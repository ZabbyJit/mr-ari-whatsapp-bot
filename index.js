const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', qr => {
  console.log('📲 Scan this QR to activate Mr. Ari:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('🤖 Mr. Ari is now online and ready to serve.');
});

client.on('message', async message => {
  const msg = message.body.toLowerCase();

  if (msg.includes('menu')) {
    message.reply('📋 Here’s our menu: https://arizonacrunchychicken.de/menu');
  } else if (msg.includes('offer')) {
    message.reply('🎁 Unlock 20% off your first 2 orders! Scan the QR or order here: https://wa.me/49xxxxxxxxx');
  } else {
    message.reply('👋 Welcome to Arizona Crunchy Chicken! Type "menu" or "offer" to get started.');
  }
});

client.initialize();