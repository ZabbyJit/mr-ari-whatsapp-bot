const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true, args: ['--no-sandbox'] }
});

client.on('qr', qr => {
  console.log('📲 Scan this QR code to launch Mr. Ari:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Mr. Ari is online. Intelligence mode active.');
});

client.on('message', async msg => {
  const text = msg.body.toLowerCase();

  if (text.includes('menu')) {
    msg.reply('🍔 Welcome to Arizona Crunchy Chicken! Here’s our delicious menu:\n\n1️⃣ Crispy Chicken Combo\n2️⃣ Spicy Wings\n3️⃣ Signature Burger\n\nReply with the number to order now!');
  } else if (text === '1') {
    msg.reply('🔥 Crispy Chicken Combo selected! Great choice.\nWould you like extra sauce or fries?');
  } else if (text === '2') {
    msg.reply('🌶️ Spicy Wings selected! You love heat. How many portions would you like?');
  } else if (text === '3') {
    msg.reply('🍔 Signature Burger selected! Classic and delicious.\nWould you like to add cheese or extra toppings?');
  } else {
    msg.reply('👋 Hey! Welcome to Arizona Crunchy Chicken. Type "menu" to explore our offerings!');
  }
});

client.initialize();