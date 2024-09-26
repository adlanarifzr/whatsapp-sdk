import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { ContactObject, InteractiveObject, LocationObject, MediaObject, MessageRequestBody, MessageResponseError, MessageResponseSuccess, ReactionObject, TemplateObject, TextObject } from './message.ts';
import pricing from './pricing.json';
import parsePhoneNumber from 'libphonenumber-js';

import type { WebhookPayloadObject, WebhookValueObject, WebhookStatusObject, WebhookMessageObject, WebhookErrorObject } from './webhook.js';
import { TemplateCreateRequestBody, TemplateUpdateRequestBody, TemplateLanguage, TemplateListRequestBody, TemplateListResponse } from './messageTemplate.js';

export type { WebhookPayloadObject, WebhookValueObject, WebhookStatusObject, WebhookMessageObject, WebhookErrorObject };
export { TemplateLanguage };

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
		return this.callMessageApi<MessageResponseSuccess>(body);
	};

	private callMessageApi = async <T>(body: Record<string, any>) => {
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
					throw new Error(JSON.stringify(error));
				}

				throw new Error(err.message);
			}
			
			throw err;
		}
	};

	private callMessageTemplateApi = async <T>(config?: AxiosRequestConfig) => {
		const endpoint = this.config.endpoint || 'https://graph.facebook.com';
		const version = this.config.version || 'v20.0';
		const url = `${endpoint}/${version}/${this.config.business_id}/message_templates`;
		try {
			const response = await axios.request({
				method: 'POST',
				url,
				...(config ?? {}),
				headers: {
					...(config?.headers ?? {}),
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.config.auth_token}`,
				}
			});
			return response.data;
		}
		catch(err) {
			if(err instanceof AxiosError) {
				const { error } = err.response?.data as MessageResponseError;
				if(error.message) {
					throw new Error(JSON.stringify(error));
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
		return this.callMessageApi<{ success: boolean; }>(body);
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

	/**
	 * **Deleting by ID**
	 * 
	 * To delete a template by ID, include the template's ID along with its name in your request; 
	 * only the template with the matching template ID will be deleted.
	 * 
	 * Documentation {@link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#deleting-templates}.
	 * 
	 * @param hsm_id The ID of the template.
	 * @param name The name of the template.
	 * @returns Object of axios response.
	 */
	deleteMessageTemplateById = async (hsm_id: string, name: string) => {
		return this.callMessageTemplateApi<{ success: boolean; }>({
			method: 'DELETE',
			params: {
				hsm_id,
				name
			}
		});
	};

	/**
	 * **Deleting by name**
	 * 
	 * Deleting a template by name deletes all templates that match that name 
	 * (meaning templates with the same name but different languages will also be deleted).
	 * 
	 * Documentation {@link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#deleting-templates}.
	 * 
	 * @param name The name of the template.
	 * @returns Object of axios response.
	 */
	deleteMessageTemplateByName = async (name: string) => {
		return this.callMessageTemplateApi<{ success: boolean; }>({
			method: 'DELETE',
			params: {
				name
			}
		});
	};

	/**
	 * **Create a message template**
	 * 
	 * Documentation {@link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#creating-templates}.
	 * 
	 * @param body The body of the request.
	 * @returns Object of axios response.
	 */
	createMessageTemplate = async (body: TemplateCreateRequestBody) => {
		return this.callMessageTemplateApi<{
			id: string,
			status: 'APPROVED' | 'PENDING' | 'REJECTED',
			category: 'AUTHENTICATION' | 'MARKETING' | 'UTILITY';
		}>({
			method: 'POST',
			data: body,
		});
	};

	/**
	 * **Update a message template**
	 * 
	 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#edit-a-message-template}.
	 * 
	 * @param body The body of the request.
	 * @returns Object of axios response.
	 */
	updateMessageTemplate = async (template_id: string | number, body: TemplateUpdateRequestBody) => {
		const endpoint = this.config.endpoint || 'https://graph.facebook.com';
		const version = this.config.version || 'v20.0';
		return this.callMessageTemplateApi<{ success: boolean }>({
			method: 'POST',
			url: `${endpoint}/${version}/${template_id}`,
			data: body,
		});
	};

	/**
	 * **Get all message templates**
	 * 
	 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates#retrieve-templates}.
	 * 
	 * @param params The query parameters.
	 * @returns Object of axios response.
	 */
	getMessageTemplates = async (params: TemplateListRequestBody) => {
		return this.callMessageTemplateApi<TemplateListResponse>({
			method: 'GET',
			params,
		});
	};
}