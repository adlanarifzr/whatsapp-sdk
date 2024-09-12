import { TemplateLanguage } from './messageTemplate';

/**
 * Documentation: {@link https://developers.facebook.com/docs/graph-api/webhooks/getting-started#event-notifications}.
 */
export type WebhookPayloadObject = {
	/**
	 * The specific webhook a business is subscribed to. The webhook is whatsapp_business_account.
	 */
	object: 'whatsapp_business_account' | string;

	/**
	 * An array of entry objects. Entry objects have the following properties:
	 * - id — String. The WhatsApp Business Account ID for the business that is subscribed to the webhook.
	 * <pre>
	 * - changes — Array of objects. An array of change objects. Change objects have the following properties: 
	 *   - value — Object. A value object. See [Value Object](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components/#value-object).
	 *   - field — String. Notification type. Value will be messages.
	 * </pre>
	 */
	entry: Array<{
		/**
		 * The WhatsApp Business Account ID for the business that is subscribed to the webhook.
		 */
		id: string;

		/**
		 * An array of change objects. Change objects have the following properties:
		 */
		changes: Array<{
			/**
			 * A value object. See [Value Object](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components/#value-object).
			 */
			value: WebhookValueObject;

			/**
			 * Notification type.
			 */
			field: 'messages' | 'message_template_status_update' | 'message_template_components_update';
		}>;
	
	}>;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components/#value-object}.
 */
export type WebhookValueObject = {
	/**
	 * Array of contact objects with information for the customer who sent a message to the business. 
	 * Contact objects have the following properties:
	 * - wa_id — String. The customer's WhatsApp ID. A business can respond to a customer using this ID. This ID may not match the customer's phone number, which is returned by the API as input when sending a message to the customer.
	 * - profile — Object. A customer profile object.
	 */
	contacts?: Array<{
		/**
		 * The customer's WhatsApp ID. A business can respond to a customer using this ID. This ID may not match the customer's phone number, which is returned by the API as input when sending a message to the customer.
		 */
		wa_id: string;

		/**
		 * A customer profile object.
		 */
		profile: {
			/**
			 * The customer's name.
			 */
			name: string;
		};
	}>;

	/**
	 * An array of error objects describing the error. 
	 * Error objects have the following properties, which map to their equivalent properties in API error response payloads.
	 */
	errors?: Array<WebhookErrorObject>;

	/**
	 * Product used to send the message. Value is always whatsapp.
	 */
	messaging_product: 'whatsapp';

	/**
	 * Information about a message received by the business that is subscribed to the webhook. 
	 * See [Messages Object](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components/#messages-object).
	 */
	messages?: Array<WebhookMessageObject>;

	/**
	 * A metadata object describing the business subscribed to the webhook. Metadata objects have the following properties:
	 * - display_phone_number — String. The phone number that is displayed for a business.
	 * - phone_number_id — String. ID for the phone number. A business can respond to a message using this ID.
	 */
	metadata: {
		/**
		 * The phone number that is displayed for a business.
		 */
		display_phone_number: string;

		/**
		 * ID for the phone number. A business can respond to a message using this ID.
		 */
		phone_number_id: string;
	};

	/**
	 * Status object for a message that was sent by the business that is subscribed to the webhook. 
	 * See [Statuses Object](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components/#statuses-object).
	 */
	statuses?: Array<WebhookStatusObject>;

	/**
	 * Only applicable for message template webhook.
	 * 
	 * The template ID.
	 */
	message_template_id?: string | number;

	/**
	 * Only applicable for message template webhook.
	 * 
	 * The template name.
	 */
	message_template_name?: string;

	/**
	 * Only applicable for message template webhook.
	 * 
	 * The template language
	 */
	message_template_language?: TemplateLanguage;

	/**
	 * Only applicable for message template webhook.
	 * 
	 * The new template header after the change.
	 * 
	 * Remains empty if the user did not enter a header.
	 */
	message_template_title?: string;

	/**
	 * Only applicable for message template webhook.
	 * 
	 * The new template body after the change.
	 * 
	 * Remains empty if the user did not enter new body text.
	 */
	message_template_element?: string;

	/**
	 * Only applicable for message template webhook.
	 * 
	 * The new template footer after the change.
	 * 
	 * Remains empty if the user did not enter new footer text.
	 */
	message_template_footer?: string;

	/**
	 * Only applicable for message template webhook.
	 * 
	 * The new list of buttons on the template after the change.
	 * 
	 * Only URL type and Phone number type buttons are supported for this webhook.
	 */
	message_template_buttons?: Array<{
		/**
		 * **Required.**
		 * 
		 * Type of button.
		 */
		message_template_button_type: string;

		/**
		 * **Required.**
		 * 
		 * Button label text.
		 * 
		 * For type URL, if using a variable, must include the example property and a sample value.
		 * 
		 * 25 characters maximum.
		 */
		message_template_button_text: string;

		/**
		 * **Required if message_template_button_type is URL.**
		 */
		message_template_button_url?: string;

		/**
		 * **Required if message_template_button_type is PHONE_NUMBER.**
		 */
		message_template_button_phone_number?: string;
	}>;

	/**
	 * Only applicable for message template webhook (status changed).
	 * 
	 * Field: message_template_status_update
	 * 
	 * The template ID.
	 */
	event?: 'REJECTED' | 'APPROVED' | 'PENDING_DELETION';

	/**
	 * Only applicable for message template webhook (status changed).
	 * 
	 * Field: message_template_status_update
	 */
	reason?: 'INCORRECT_CATEGORY' | 'NONE' | string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components/#statuses-object}.
 */
export type WebhookStatusObject = {
	/**
	 * Arbitrary string included in sent message. See [Message](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#message-object) object.
	 */
	biz_opaque_callback_data?: string;

	/**
	 * Information about the conversation.
	 */
	conversation: {
		/**
		 * Represents the ID of the conversation the given status notification belongs to.
		 */
		id: string;

		/**
		 * Describes conversation category
		 */
		origin: {
			/**
			 * Indicates conversation category. This can also be referred to as a conversation entry point.
			 * - authentication – Indicates the conversation was opened by a business sending template categorized as AUTHENTICATION to the customer. This applies any time it has been more than 24 hours since the last customer message.
			 * - marketing – Indicates the conversation was opened by a business sending template categorized as MARKETING to the customer. This applies any time it has been more than 24 hours since the last customer message.
			 * - utility – Indicates the conversation was opened by a business sending template categorized as UTILITY to the customer. This applies any time it has been more than 24 hours since the last customer message.
			 * - service – Indicates that the conversation opened by a business replying to a customer within a customer service window.
			 * - referral_conversion – Indicates a [free entry point](https://developers.facebook.com/docs/whatsapp/pricing#free-entry-point-conversations) conversation.
			 */
			type: 'authentication' | 'marketing' | 'utility' | 'service' | 'referral_conversion';
		};

		/**
		 * Date when the conversation expires. 
		 * This field is only present for messages with a `status` set to `sent`.
		 */
		expiration_timestamp?: string;
	};

	/**
	 * An array of error objects describing the error. 
	 * Error objects have the following properties, which map to their equivalent properties in API error response payloads.
	 */
	errors?: Array<WebhookErrorObject>;

	/**
	 * The ID for the message that the business that is subscribed to the webhooks sent to a customer
	 */
	id: string;

	/**
	 * An object containing pricing information.
	 */
	pricing: {
		/**
		 * Type of pricing model used by the business. Current supported value is CBP
		 */
		pricing_model: 'CBP';

		/**
		 * Indicates the conversation category:
		 * - authentication – Indicates an authentication conversation.
		 * - authentication-international – Indicates an [authentication-international](https://developers.facebook.com/docs/whatsapp/pricing/authentication-international-rates#authentication-international-rates) conversation.
		 * - marketing – Indicates an marketing conversation.
		 * - utility – Indicates a utility conversation.
		 * - service – Indicates an service conversation.
		 * - referral_conversion – Indicates a [free entry point](https://developers.facebook.com/docs/whatsapp/pricing#free-entry-point-conversations) conversation.
		 */
		category: 'marketing' | 'utility' | 'authentication' | 'authentication-international' | 'service' | 'referral_conversion';
	};

	/**
	 * The customer's WhatsApp ID. A business can respond to a customer using this ID. 
	 * This ID may not match the customer's phone number, which is returned by the API as input when sending a message to the customer.
	 */
	recipient_id: string;

	/**
	 * The status of the message that was sent.
	 * - delivered – A webhook is triggered when a message sent by a business has been delivered
	 * - read – A webhook is triggered when a message sent by a business has been read
	 * - sent – A webhook is triggered when a business sends a message to a customer
	 * - failed – A webhook is triggered when a message sent by a business has failed
	 */
	status: 'sent' | 'delivered' | 'read' | 'failed' | string;

	/**
	 * Webhook sent timestamp.
	 */
	timestamp: string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components/#messages-object}.
 */
export type WebhookMessageObject = {
	/**
	 * When the messages type is set to audio, including voice messages, this object is included in the messages object:
	 * - id — String. ID for the audio file.
	 * - mime_type — String. Mime type of the audio file.
	 */
	audio?: {
		/**
		 * ID for the audio file.
		 */
		id: string;

		/**
		 * Mime type of the audio file.
		 */
		mime_type: string;
	};

	/**
	 * When the messages type field is set to button, this object is included in the messages object:
	 * - payload – String. The payload for a button set up by the business that a customer clicked as part of an interactive message.
	 * - text — String. Button text.
	 */
	button?: {
		/**
		 * The payload for a button set up by the business that a customer clicked as part of an interactive message.
		 */
		payload: string;

		/**
		 * Button text.
		 */
		text: string;
	};

	/**
	 * Context object. Only included when a user replies or interacts with one of your messages. 
	 * Context objects can have the following properties:
	 * - forwarded — Boolean. Set to true if the message received by the business has been forwarded.
	 * - frequently_forwarded — Boolean. Set to true if the message received by the business has been forwarded more than 5 times.
	 * - from — String. The WhatsApp ID for the customer who replied to an inbound message.
	 * - id — String. The message ID for the sent message for an inbound reply.
	 * <pre>
	 * - referred_product — Object. Referred product object describing the product the user is requesting information about. You must parse this value if you support Product Enquiry Messages. See Receive Response From Customers. Referred product objects have the following properties:
	 *   - catalog_id — String. Unique identifier of the Meta catalog linked to the WhatsApp Business Account.
	 *   - product_retailer_id — String. Unique identifier of the product in a catalog.
	 * </pre>
	 */
	context?: {
		/**
		 * Set to true if the message received by the business has been forwarded.
		 */
		forwarded: boolean;

		/**
		 * Set to true if the message received by the business has been forwarded more than 5 times.
		 */
		frequently_forwarded: boolean;

		/**
		 * The WhatsApp ID for the customer who replied to an inbound message.
		 */
		from: string;

		/**
		 * The message ID for the sent message for an inbound reply.
		 */
		id: string;

		/**
		 * Referred product object describing the product the user is requesting information about. 
		 * You must parse this value if you support Product Enquiry Messages. 
		 * See [Receive Response From Customers](https://developers.facebook.com/docs/whatsapp/cloud-api/receive-response-from-customers). 
		 * Referred product objects have the following properties:
		 */
		referred_product?: {
			/**
			 * Unique identifier of the Meta catalog linked to the WhatsApp Business Account.
			 */
			catalog_id: string;

			/**
			 * Unique identifier of the product in a catalog.
			 */
			product_retailer_id: string;
		};
	};

	/**
	 * A document object. When messages type is set to document, this object is included in the messages object. 
	 * Document objects can have the following properties:
	 * - caption — String. Caption for the document, if provided.
	 * - filename — String. Name for the file on the sender's device.
	 * - sha256 — String. SHA 256 hash.
	 * - mime_type — _String. _ Mime type of the document file.
	 * - id — String. ID for the document.
	 */
	document?: {
		/**
		 * Caption for the document, if provided.
		 */
		caption: string;

		/**
		 * Name for the file on the sender's device.
		 */
		filename: string;

		/**
		 * SHA 256 hash.
		 */
		sha256: string;

		/**
		 * Mime type of the document file.
		 */
		mime_type: string;

		/**
		 * ID for the document.
		 */
		id: string;
	};

	/**
	 * An array of error objects describing the error. 
	 * Error objects have the following properties, which map to their equivalent properties in API error response payloads.
	 */
	errors?: Array<WebhookErrorObject>;

	/**
	 * The customer's WhatsApp ID. A business can respond to a customer using this ID. 
	 * This ID may not match the customer's phone number, which is returned by the API as input when sending a message to the customer.
	 */
	from: string;

	/**
	 * The ID for the message that was received by the business. You could use messages endpoint to mark this specific message as read.
	 */
	id: string;

	/**
	 * An identity object. Webhook is triggered when a customer's phone number or profile information has been updated. 
	 * See messages system identity. Identity objects can have the following properties:
	 * - acknowledged — State of acknowledgment for the messages system customer_identity_changed.-
	 * - created_timestamp — String. The time when the WhatsApp Business Management API detected the customer may have changed their profile information.-
	 * - hash — String. The ID for the messages system customer_identity_changed
	 */
	identity?: {
		/**
		 * State of acknowledgment for the messages system customer_identity_changed.
		 */
		acknowledged: boolean;

		/**
		 * The time when the WhatsApp Business Management API detected the customer may have changed their profile information.
		 */
		created_timestamp: string;

		/**
		 * The ID for the messages system customer_identity_changed
		 */
		hash: string;
	};

	/**
	 * When messages type is set to image, this object is included in the messages object.
	 * - caption — String. Caption for the image, if provided.
	 * - sha256 — String. Image hash.
	 * - id — String. ID for the image.
	 * - mime_type — String. Mime type for the image.
	 */
	image?: {
		/**
		 * Caption for the image, if provided.
		 */
		caption: string;

		/**
		 * Image hash.
		 */
		sha256: string;

		/**
		 * ID for the image.
		 */
		id: string;

		/**
		 * Mime type for the image.
		 */
		mime_type: string;
	};

	/**
	 * When a customer has interacted with your message, this object is included in the messages object.
	 */
	interactive?: {
		type: {
			/**
			 * Sent when a customer clicks a button. Object with the following properties:
			 */
			button_reply?: {
				/**
				 * Unique ID of a button.
				 */
				id: string;

				/**
				 * Title of a button.
				 */
				title: string;
			};

			/**
			 * Sent when a customer selects an item from a list. Object with the following properties:
			 */
			list_reply?: {
				/**
				 * Unique ID of the selected list item.
				 */
				id: string;

				/**
				 * Title of the selected list item.
				 */
				title: string;

				/**
				 * Description of the selected row.
				 */
				description: string;
			};
		};
	};

	/**
	 * Included in the messages object when a customer has placed an order. Order objects have the following properties:
	 * - catalog_id — String. ID for the catalog the ordered item belongs to.
	 * - text — String. Text message from the user sent along with the order.
	 * <pre>
	 * - product_items — Array of product item objects containing the following fields: 
	 *   - product_retailer_id — String. Unique identifier of the product in a catalog.
	 *   - quantity — String. Number of items.
	 *   - item_price — String. Price of each item.
	 *   - currency — String. Price currency.
	 * </pre>
	 */
	order?: {
		/**
		 * ID for the catalog the ordered item belongs to.
		 */
		catalog_id: string;

		/**
		 * Text message from the user sent along with the order.
		 */
		text: string;

		/**
		 * Array of product item objects containing the following fields:
		 */
		product_items: Array<{
			/**
			 * Unique identifier of the product in a catalog.
			 */
			product_retailer_id: string;

			/**
			 * Number of items.
			 */
			quantity: string;

			/**
			 * Price of each item.
			 */
			item_price: string;

			/**
			 * Price currency.
			 */
			currency: string;
		}>;
	};

	/**
	 * Referral object. When a customer clicks an ad that redirects to WhatsApp, this object is included in the messages object. Referral objects have the following properties:
	 * - source_url – String. The Meta URL that leads to the ad or post clicked by the customer. Opening this url takes you to the ad viewed by your customer.
	 * - source_type – String. The type of the ad’s source; ad or post.
	 * - source_id – String. Meta ID for an ad or a post.
	 * - headline – String. Headline used in the ad or post.
	 * - body – String. Body for the ad or post.
	 * - media_type – String. Media present in the ad or post; image or video.
	 * - image_url – String. URL of the image, when media_type is an image.
	 * - video_url – String. URL of the video, when media_type is a video.
	 * - thumbnail_url – String. URL for the thumbnail, when media_type is a video.
	 * - ctwa_clid – String. Click ID generated by Meta for ads that click to WhatsApp.
	 * 
	 * The referral object can be included in the following types of message: text, location, contact, image, video, document, voice, and sticker.
	 */
	referral?: {
		/**
		 * The Meta URL that leads to the ad or post clicked by the customer. Opening this url takes you to the ad viewed by your customer.
		 */
		source_url: string;

		/**
		 * The type of the ad’s source; ad or post.
		 */
		source_type: string;

		/**
		 * Meta ID for an ad or a post.
		 */
		source_id: string;

		/**
		 * Headline used in the ad or post.
		 */
		headline: string;

		/**
		 * Body for the ad or post.
		 */
		body: string;

		/**
		 * Media present in the ad or post; image or video.
		 */
		media_type: string;

		/**
		 * URL of the image, when media_type is an image.
		 */
		image_url?: string;

		/**
		 * URL of the video, when media_type is a video.
		 */
		video_url?: string;

		/**
		 * URL for the thumbnail, when media_type is a video.
		 */
		thumbnail_url?: string;

		/**
		 * Click ID generated by Meta for ads that click to WhatsApp.
		 */
		ctwa_clid?: string;
	};

	/**
	 * When messages type is set to sticker, this object is included in the messages object. Sticker objects have the following properties:
	 * - mime_type – String. image/webp.
	 * - sha256 – String. Hash for the sticker.
	 * - id – String. ID for the sticker.
	 * - animated – Boolean. Set to true if the sticker is animated; false otherwise.
	 */
	sticker?: {
		/**
		 * image/webp.
		 */
		mime_type: string;

		/**
		 * Hash for the sticker.
		 */
		sha256: string;

		/**
		 * ID for the sticker.
		 */
		id: string;

		/**
		 * Set to true if the sticker is animated; false otherwise.
		 */
		animated: boolean;
	};

	/**
	 * When messages type is set to system, a customer has updated their phone number or profile information, this object is included in the messages object. 
	 * System objects have the following properties:
	 * - body – String. Describes the change to the customer's identity or phone number.
	 * - identity – String. Hash for the identity fetched from server.
	 * - new_wa_id – String. New WhatsApp ID for the customer when their phone number is updated. Available on webhook versions v11.0 and earlier.
	 * - wa_id – String. New WhatsApp ID for the customer when their phone number is updated. Available on webhook versions v12.0 and later.
	 * <pre>
	 * - type – String. Type of system update. Will be one of the following:. 
	 *   - customer_changed_number – A customer changed their phone number.
	 *   - customer_identity_changed – A customer changed their profile information.
	 * </pre>
	 * - customer – String. The WhatsApp ID for the customer prior to the update.
	 */
	system?: {
		/**
		 * Describes the change to the customer's identity or phone number.
		 */
		body: string;

		/**
		 * Hash for the identity fetched from server.
		 */
		identity: string;

		/**
		 * New WhatsApp ID for the customer when their phone number is updated. Available on webhook versions v11.0 and earlier.
		 */
		new_wa_id?: string;

		/**
		 * New WhatsApp ID for the customer when their phone number is updated. Available on webhook versions v12.0 and later.
		 */
		wa_id: string;

		/**
		 * Type of system update. Will be one of the following:
		 * - customer_changed_number – A customer changed their phone number.
		 * - customer_identity_changed – A customer changed their profile information.
		 */
		type: 'customer_changed_number' | 'customer_identity_changed';

		/**
		 * The WhatsApp ID for the customer prior to the update.
		 */
		customer: string;
	};
	
	/**
	 * When messages type is set to text, this object is included. Text objects have the following properties:
	 * - body — String. The text of the message.
	 */
	text?: {
		/**
		 * The text of the message.
		 */
		body: string;
	};

	/**
	 * Unix timestamp indicating when the WhatsApp server received the message from the customer.
	 */
	timestamp: string;

	/**
	 * The type of message that has been received by the business that has subscribed to Webhooks. Possible value can be one of the following:
	 * - audio
	 * - button
	 * - document
	 * - text
	 * - image
	 * - interactive
	 * - order
	 * - sticker
	 * - system – for customer number change messages
	 * - unknown
	 * - video
	 */
	type: 'audio' | 'button' | 'document' | 'text' | 'image' | 'interactive' | 'order' | 'sticker' | 'system' | 'unknown' | 'video';

	/**
	 * When messages type is set to video, this object is included in messages object. Video objects have the following properties:
	 * - caption – String. The caption for the video, if provided.
	 * - filename – String. The name for the file on the sender's device.
	 * - sha256 – String. The hash for the video.
	 * - id – String. The ID for the video.
	 * - mime_type – String. The mime type for the video file.
	 */
	video?: {
		/**
		 * The caption for the video, if provided.
		 */
		caption: string;

		/**
		 * The name for the file on the sender's device.
		 */
		filename: string;

		/**
		 * The hash for the video.
		 */
		sha256: string;

		/**
		 * The ID for the video.
		 */
		id: string;

		/**
		 * The mime type for the video file.
		 */
		mime_type: string;
	};
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components/}.
 */
export type WebhookErrorObject = {
	/**
	 * Error code. Example: 130429.
	 */
	code: number;

	/**
	 * Error code title. Example: Rate limit hit.
	 */
	title: string;

	/**
	 * Error code message. This value is the same as the title value. 
	 * For example: Rate limit hit. 
	 * 
	 * Note that the message property in API error response payloads pre-pends this value with the a # symbol and the error code in parenthesis. 
	 * For example: (#130429) Rate limit hit.
	 */
	message: number;

	/**
	 * An error data object with the following properties:
	 * - details — String. Describes the error. 
	 */
	error_data: {
		/**
		 * Describes the error.
		 * 
		 * Example: Message failed to send because there were too many messages sent from this phone number in a short period of time.
		 */	
		details: string;
	};
};