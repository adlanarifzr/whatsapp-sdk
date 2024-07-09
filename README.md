Whatsapp Cloud API unofficial SDK
=================================

This repository contains the open source Node.js client for [Whatsapp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api). At the moment, it is focusing on handling `/messages` endpoint APIs and webhook. More will be updated.

Installation
------------

`npm install @adlanarifzr/whatsapp-sdk`

Usage
-----

```typescript
import WhatsappSdk from '@adlanarifzr/whatsapp-sdk';

// Initialized class
const wa = new WhatsappSdk({
	phone_number_id: PHONE_NUMBER_ID,
	auth_token: AUTH_TOKEN,
});

// Send template message (also support other type of messages)
const result = await wa.sendTemplateMessage('+60123456789', {
	name: 'hello_world',
	language: {
		code: 'en_US',
	},
});

// Calculate the cost of the message based on conversation type
const cost = wa.getMessagePrice('+60123456789', 'utility');
```