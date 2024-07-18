import axios, { AxiosError } from 'axios';
import type { ContactObject, InteractiveObject, LocationObject, MediaObject, ReactionObject, TemplateObject, TextObject } from './message.ts';
import pricing from './pricing.json';
import parsePhoneNumber from 'libphonenumber-js';

import type { WebhookPayloadObject, WebhookValueObject, WebhookStatusObject, WebhookMessageObject, WebhookErrorObject } from './webhook.ts';
export type { WebhookPayloadObject, WebhookValueObject, WebhookStatusObject, WebhookMessageObject, WebhookErrorObject };

export type WhatsappSdkConfig = {
	/**
	 * **Required.**
	 * 
	 * Access token to use for sending messages.
	 * 
	 * Learn how to create a permanent token [here](https://developers.facebook.com/docs/whatsapp/business-management-api/get-started#1--acquire-an-access-token-using-a-system-user-or-facebook-login).
	 */
	auth_token: string;

	/**
	 * **Required.**
	 * 
	 * Phone number ID to use for sending messages.
	 */
	phone_number_id: string;

	/**
	 * **Optional.**
	 * 
	 * Whatsapp Business Account ID.
	 */
	business_id?: string;

	/**
	 * **Optional.**
	 * 
	 * Endpoint to use for Graph API.
	 * 
	 * Default is https://graph.facebook.com.
	 */
	endpoint?: string;

	/**
	 * **Optional.**
	 * 
	 * Version of Graph API to use.
	 * 
	 * Default is 20.0.
	 */
	version?: string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/on-premises/reference/messages#parameters}.
 */
export type MessageRequestBody = {
	/**
	 * **Required when type=audio.**
	 * 
	 * A media object containing audio.
	 */
	audio?: MediaObject;

	/**
	 * **Optional.**
	 * 
	 * An arbitrary string, useful for tracking.
	 * 
	 * For example, you could pass the message template ID in this field to track your customer's journey starting from the first message you send. 
	 * You could then track the ROI of different message template types to determine the most effective one.
	 * 
	 * Any app subscribed to the messages webhook field on the WhatsApp Business Account can get this string, 
	 * as it is included in [statuses object](https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/components#statuses-object) 
	 * within webhook payloads.
	 * 
	 * Cloud API does not process this field, it just returns it as part of sent/delivered/read message webhooks.
	 * 
	 * Maximum 512 characters.
	 * 
	 * Cloud API only.
	 */
	biz_opaque_callback_data?: string;

	/**
	 * **Required when type=contacts.**
	 * 
	 * A contacts object.
	 */
	contacts?: Array<ContactObject>;

	/**
	 * **Required if replying to any message in the conversation.**
	 * 
	 * An object containing the ID of a previous message you are replying to. For example:
	 */
	context?: {
		/**
		 * **Required.**
		 * 
		 * The ID of the message you are replying to.
		 */
		message_id: string;
	};

	/**
	 * **Required when type=document.**
	 * 
	 * A media object containing a document.
	 */
	document?: MediaObject;

	/**
	 * **Required when type=image.**
	 * 
	 * A media object containing a image.
	 */
	image?: MediaObject;

	/**
	 * **Required when type=interactive.**
	 * 
	 * An interactive object. The components of each interactive object generally follow a consistent pattern: header, body, footer, and action.
	 */
	interactive?: InteractiveObject;

	/**
	 * **Required when type=location.**
	 * 
	 * A location object.
	 */
	location?: LocationObject;

	/**
	 * **Required.**
	 * 
	 * Messaging service used for the request. Use "whatsapp".
	 * 
	 * Cloud API only.
	 */
	messaging_product: 'whatsapp';

	/**
	 * **Required if type=text.**
	 * 
	 * Allows for URL previews in text messages — See the [Sending URLs in Text Messages](https://developers.facebook.com/docs/whatsapp/api/messages/text#urls). 
	 * This field is optional if not including a URL in your message. Values: false (default), true.
	 * 
	 * On-Premises API only. Cloud API users can use the same functionality with the preview_url field inside a text object.
	 */
	preview_url?: boolean;

	/**
	 * **Optional.**
	 * 
	 * Currently, you can only send messages to individuals. Set this as individual.
	 * 
	 * Default: individual
	 */
	recipient_type?: 'individual';

	/**
	 * **Optional.**
	 * 
	 * A message's status. You can use this field to mark a message as read. See the following guides for information:
	 * - Cloud API: [Mark Messages as Read](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/mark-message-as-read)
	 * - On-Premises API: [Mark Messages as Read](https://developers.facebook.com/docs/whatsapp/on-premises/guides/mark-as-read)
	 */
	status?: 'read';

	/**
	 * **Required when type=sticker.**
	 * 
	 * A media object containing a sticker.
	 * 
	 * Cloud API: Static and animated third-party outbound stickers are supported in addition to all types of inbound stickers. 
	 * A static sticker needs to be 512x512 pixels and cannot exceed 100 KB. 
	 * An animated sticker must be 512x512 pixels and cannot exceed 500 KB.
	 * 
	 * On-Premises API: Only static third-party outbound stickers are supported in addition to all types of inbound stickers. 
	 * A static sticker needs to be 512x512 pixels and cannot exceed 100 KB. Animated stickers are not supported.
	 */
	sticker?: MediaObject;

	/**
	 * **Required when type=template.**
	 * 
	 * A template object.
	 */
	template?: TemplateObject;

	/**
	 * **Required for text messages.**
	 * 
	 * A text object.
	 */
	text?: TextObject;

	/**
	 * **Required.**
	 * 
	 * WhatsApp ID or phone number of the customer you want to send a message to. 
	 * See [Phone Number Formats](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/phone-numbers#phone-number-formats).
	 * 
	 * If needed, On-Premises API users can get this number by calling the [contacts endpoint](https://developers.facebook.com/docs/whatsapp/on-premises/reference/contacts).
	 * 
	 * With the Cloud API, there is no longer a way to explicitly check if a phone number has a WhatsApp ID. 
	 * To send someone a message using the Cloud API, just send it directly to the customer's phone number —after they have [opted-in](https://developers.facebook.com/docs/whatsapp/overview/getting-opt-in). 
	 * See [Reference, Messages](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#examples) for examples.
	 */
	to: string;

	/**
	 * **Optional.**
	 * 
	 * The type of message you want to send. If omitted, defaults to text.
	 */
	type?: 'text' | 'template' | 'video' | 'document' | 'image' | 'contacts' | 'interactive' | 'location' | 'reaction' | 'sticker' | 'audio';

	/**
	 * **Required when type=video.**
	 * 
	 * A media object containing video.
	 */
	video?: MediaObject;

	/**
	 * **Required when type=reaction.**
	 * 
	 * A reaction object.
	 */
	reaction?: ReactionObject;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages/#successful-response}.
 */
export type MessageResponseSuccess = {
	/**
	 * A string that represents the messaging service used for the request. 
	 * This will always be "whatsapp".
	 */
	messaging_product: 'whatsapp';

	/**
	 * An array of objects containing the input phone number and the WhatsApp ID of the recipient. 
	 * This is useful for tracking the status of the message.
	 */
	contacts: Array<{
		/**
		 * The input phone number of the recipient.
		 */
		input: string;

		/**
		 * The WhatsApp ID of the recipient.
		 */
		wa_id: string;
	}>;

	/**
	 * An array of messages objects. 
	 * Each object contains the message ID and the status of the message.
	 */
	messages: Array<{
		/**
		 * ID of the message.
		 * 
		 * Messages are identified by a unique ID (WAMID). 
		 * You can track message status in the Webhooks through its WAMID. 
		 * You could also mark an incoming message as read through messages endpoint. 
		 * This WAMID can have a maximum length of up to 128 characters.
		 */
		id: string;

		/**
		 * Messages will have one of the following statuses which will be returned in each of the messages objects.
		 * - "accepted" : means the message was sent to the intended recipient
		 * - "held_for_quality_assessment": means the message send was delayed until quality can be validated and it will either be sent or dropped at this point
		 */
		message_status: 'accepted' | 'held_for_quality_assessment';
	}>;
};

export type MessageResponseError = {
	error: {
		message: string;
		type: 'GraphMethodException' | string;
		code: number;
		error_subcode: number;
		fbtrace_id: string;
	};
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests}.
 */
export type WebhookVerificationPayload = {
	/**
	 * This value will always be set to subscribe.
	 */
	'hub.mode': 'subscribe';

	/**
	 * An int you must pass back to response.
	 */
	'hub.challenge': number;

	/**
	 * A string that that we grab from the Verify Token field in your app's App Dashboard. 
	 * You will set this string when you complete the [Webhooks configuration settings](https://developers.facebook.com/docs/graph-api/webhooks/getting-started#configure-webhooks-product) steps.
	 */
	'hub.verify_token': string;
};

export default class WhatsappSdk {
	private config: WhatsappSdkConfig;

	constructor(config: WhatsappSdkConfig) {
		this.config = config;
	}

	private sendMessage = async (body: MessageRequestBody) => {
		return this.callApi<MessageResponseSuccess>(body);
	};

	private callApi = async <T>(body: Record<string, any>) => {
		const endpoint = this.config.endpoint || 'https://graph.facebook.com';
		const version = this.config.version || 'v20.0';
		const url = `${endpoint}/${version}/${this.config.phone_number_id}/messages`;
		try {
			const response = await axios.post<T>(url, body, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.config.auth_token}`,
				},
			});
			return response.data;
		}
		catch(err) {
			if(err instanceof AxiosError) {
				const { error } = err.response?.data as MessageResponseError;
				if(error.message) {
					throw new Error(error.message, {
						cause: error,
					});
				}

				throw new Error(err.message);
			}
			
			throw err;
		}
	};

	/**
	 * Send template message.
	 * 
	 * @param to Phone number of the recipient.
	 * @param template Template object.
	 * @param options Additional options.
	 * @returns Object of axios response.
	 */
	sendTemplateMessage = async (to: string, template: TemplateObject, options?: Partial<MessageRequestBody>) => {
		const body: MessageRequestBody = {
			messaging_product: 'whatsapp',
			to,
			type: 'template',
			template,
		};
		return this.sendMessage({ ...(options ?? {}), ...body });
	};

	/**
	 * Send text message.
	 * 
	 * @param to Phone number of the recipient.
	 * @param template Text object.
	 * @param options Additional options.
	 * @returns Object of axios response.
	 */
	sendTextMessage = async (to: string, text: TextObject, options?: Partial<MessageRequestBody>) => {
		const body: MessageRequestBody = {
			messaging_product: 'whatsapp',
			to,
			type: 'text',
			text,
		};
		return this.sendMessage({ ...(options ?? {}), ...body });
	};

	/**
	 * Send video message.
	 * 
	 * @param to Phone number of the recipient.
	 * @param template Video object.
	 * @param options Additional options.
	 * @returns Object of axios response.
	 */
	sendVideoMessage = async (to: string, video: MediaObject, options?: Partial<MessageRequestBody>) => {
		const body: MessageRequestBody = {
			messaging_product: 'whatsapp',
			to,
			type: 'video',
			video,
		};
		return this.sendMessage({ ...(options ?? {}), ...body });
	};

	/**
	 * Send image message.
	 * 
	 * @param to Phone number of the recipient.
	 * @param template Image object.
	 * @param options Additional options.
	 * @returns Object of axios response.
	 */
	sendImageMessage = async (to: string, image: MediaObject, options?: Partial<MessageRequestBody>) => {
		const body: MessageRequestBody = {
			messaging_product: 'whatsapp',
			to,
			type: 'image',
			image,
		};
		return this.sendMessage({ ...(options ?? {}), ...body });
	};

	/**
	 * Send audio message.
	 * 
	 * @param to Phone number of the recipient.
	 * @param template Audio object.
	 * @param options Additional options.
	 * @returns Object of axios response.
	 */
	sendAudioMessage = async (to: string, audio: MediaObject, options?: Partial<MessageRequestBody>) => {
		const body: MessageRequestBody = {
			messaging_product: 'whatsapp',
			to,
			type: 'audio',
			audio,
		};
		return this.sendMessage({ ...(options ?? {}), ...body });
	};

	/**
	 * Send document message.
	 * 
	 * @param to Phone number of the recipient.
	 * @param template Document object.
	 * @param options Additional options.
	 * @returns Object of axios response.
	 */
	sendDocumentMessage = async (to: string, document: MediaObject, options?: Partial<MessageRequestBody>) => {
		const body: MessageRequestBody = {
			messaging_product: 'whatsapp',
			to,
			type: 'document',
			document,
		};
		return this.sendMessage({ ...(options ?? {}), ...body });
	};

	/**
	 * Send contacts message.
	 * 
	 * @param to Phone number of the recipient.
	 * @param template Contacts object.
	 * @param options Additional options.
	 * @returns Object of axios response.
	 */
	sendContactsMessage = async (to: string, contacts: Array<ContactObject>, options?: Partial<MessageRequestBody>) => {
		const body: MessageRequestBody = {
			messaging_product: 'whatsapp',
			to,
			type: 'contacts',
			contacts,
		};
		return this.sendMessage({ ...(options ?? {}), ...body });
	};

	/**
	 * Send interactive message.
	 * 
	 * @param to Phone number of the recipient.
	 * @param template Interactive object.
	 * @param options Additional options.
	 * @returns Object of axios response.
	 */
	sendInteractiveMessage = async (to: string, interactive: InteractiveObject, options?: Partial<MessageRequestBody>) => {
		const body: MessageRequestBody = {
			messaging_product: 'whatsapp',
			to,
			type: 'interactive',
			interactive,
		};
		return this.sendMessage({ ...(options ?? {}), ...body });
	};

	/**
	 * Send location message.
	 * 
	 * @param to Phone number of the recipient.
	 * @param template Location object.
	 * @param options Additional options.
	 * @returns Object of axios response.
	 */
	sendLocationMessage = async (to: string, location: LocationObject, options?: Partial<MessageRequestBody>) => {
		const body: MessageRequestBody = {
			messaging_product: 'whatsapp',
			to,
			type: 'location',
			location,
		};
		return this.sendMessage({ ...(options ?? {}), ...body });
	};

	/**
	 * Send reaction message.
	 * 
	 * @param to Phone number of the recipient.
	 * @param template Reaction object.
	 * @param options Additional options.
	 * @returns Object of axios response.
	 */
	sendReactionMessage = async (to: string, reaction: ReactionObject, options?: Partial<MessageRequestBody>) => {
		const body: MessageRequestBody = {
			messaging_product: 'whatsapp',
			to,
			type: 'reaction',
			reaction,
		};
		return this.sendMessage({ ...(options ?? {}), ...body });
	};

	/**
	 * Send sticker message.
	 * 
	 * @param to Phone number of the recipient.
	 * @param template Sticker object.
	 * @param options Additional options.
	 * @returns Object of axios response.
	 */
	sendStickerMessage = async (to: string, sticker: MediaObject, options?: Partial<MessageRequestBody>) => {
		const body: MessageRequestBody = {
			messaging_product: 'whatsapp',
			to,
			type: 'sticker',
			sticker,
		};
		return this.sendMessage({ ...(options ?? {}), ...body });
	};

	/**
	 * Mark message as read.
	 * 
	 * @param message_id The ID of the message you received.
	 * @returns Object of axios response.
	 */
	sendReadReceipt = async (message_id: string) => {
		const body = {
			messaging_product: 'whatsapp',
			status: 'read',
			message_id,
		};
		return this.callApi<{ success: boolean; }>(body);
	};

	/**
	 * Verify the webhook payload.
	 * 
	 * @param payload Webhook payload to verify.
	 * @param verify_token Verify token to use for verification.
	 * @returns Challenge string if the payload is valid.
	 */
	verifyWebhookPayload = (payload: WebhookVerificationPayload, verify_token: string) => {
		if (payload['hub.verify_token'] === verify_token) {
			return payload['hub.challenge'];
		} else {
			throw new Error('Invalid verify token');
		}
	};

	/**
	 * Get the price of sending a message to the given phone number.
	 * {@link https://developers.facebook.com/docs/whatsapp/pricing}
	 * 
	 * @param to Phone number to send the message to.
	 * @param type Indicates conversation category. This can also be referred to as a conversation entry point.
	 * @returns Price of sending the message in USD currency.
	 */
	getMessagePrice = (to: string, type: 'marketing' | 'utility' | 'authentication' | 'authentication-international' | 'service' | 'referral_conversion') => {
		// Type referral_conversion is free
		if(type == 'referral_conversion') {
			return 0;
		}
		
		// Get the calling code from the given phone number
		const phoneNumber = parsePhoneNumber(to);
		if(!phoneNumber) {
			throw new Error('Invalid phone number');
		}

		const callingCode = +phoneNumber.countryCallingCode;
		return pricing[callingCode][type];
	}
}