/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#contacts-object}.
 */
export type ContactObject = {
	/**
	 * **Optional.** 
	 * 
	 * Full contact address(es) formatted as an addresses object. The object can contain the following fields:
	 * - street (string) – Optional. Street number and name.
	 * - city (string) – Optional. City name.
	 * - state (string) – Optional. State abbreviation.
	 * - zip (string) – Optional. ZIP code.
	 * - country (string) – Optional. Full country name.
	 * - country_code (string) – Optional. Two-letter country abbreviation.
	 * - type (string) – Optional. Standard values are HOME and WORK.
	 */
	addresses: Array<{
		/**
		 * **Optional.** 
		 * 
		 * Street number and name.
		 */
		street?: string;

		/**
		 * **Optional.** 
		 * 
		 * City name.
		 */
		city?: string;

		/**
		 * **Optional.** 
		 * 
		 * State abbreviation.
		 */
		state?: string;

		/**
		 * **Optional.** 
		 * 
		 * ZIP code.
		 */
		zip?: string;

		/**
		 * **Optional.** 
		 * 
		 * Full country name.
		 */
		country?: string;

		/**
		 * **Optional.** 
		 * 
		 * Two-letter country abbreviation.
		 */
		country_code?: string;

		/**
		 * **Optional.** 
		 * 
		 * Standard values are HOME and WORK.
		 */
		type?: 'HOME' | 'WORK' | string;
	}>;

	/**
	 * **Optional.** 
	 * 
	 * YYYY-MM-DD formatted string.
	 */
	birthday?: string;

	/**
	 * **Optional.** 
	 * 
	 * Contact email address(es) formatted as an emails object. The object can contain the following fields:
	 * - email (string) – Optional. Email address.
	 * - type (string) – Optional. Standard values are HOME and WORK.
	 */
	emails?: Array<{
		/**
		 * **Optional.** 
		 * 
		 * Email address.
		 */
		email: string;

		/**
		 * **Optional.** 
		 * 
		 * Standard values are HOME and WORK.
		 */
		type?: 'HOME' | 'WORK' | string;
	}>;

	/**
	 * **Required.** 
	 * 
	 * Full contact name formatted as a name object. The object can contain the following fields:
	 * - formatted_name (string) – Required. Full name, as it normally appears.
	 * - first_name (string) – Optional*. First name.
	 * - last_name (string) – Optional*. Last name.
	 * - middle_name (string) – Optional*. Middle name.
	 * - suffix (string) – Optional*. Name suffix.
	 * - prefix (string) – Optional*. Name prefix.
	 */
	name: {
		/**
		 * **Required.** 
		 * 
		 * Full name, as it normally appears.
		 */
		formatted_name: string;

		/**
		 * **Optional.** 
		 * 
		 * First name.
		 */
		first_name?: string;

		/**
		 * **Optional.** 
		 * 
		 * Last name.
		 */
		last_name?: string;

		/**
		 * **Optional.** 
		 * 
		 * Middle name.
		 */
		middle_name?: string;

		/**
		 * **Optional.** 
		 * 
		 * Name suffix.
		 */
		suffix?: string;

		/**
		 * **Optional.** 
		 * 
		 * Name prefix.
		 */
		prefix?: string;
	};

	/**
	 * **Optional.** 
	 * 
	 * Contact organization information formatted as an org object. The object can contain the following fields:
	 * - company (string) – Optional. Name of the contact's company.
	 * - department (string) – Optional. Name of the contact's department.
	 * - title (string) – Optional. Contact's business title.
	 */
	org?: {
		/**
		 * **Optional.** 
		 * 
		 * Name of the contact's company.
		 */
		company?: string;

		/**
		 * **Optional.** 
		 * 
		 * Name of the contact's department.
		 */
		department?: string;

		/**
		 * **Optional.** 
		 * 
		 * Contact's business title.
		 */
		title?: string;
	};

	/**
	 * **Optional.** 
	 * 
	 * Contact phone number(s) formatted as a phone object. The object can contain the following fields:
	 * - phone (string) – Optional. Automatically populated with the `wa_id` value as a formatted phone number.
	 * - type (string) – Optional. Standard Values are CELL, MAIN, IPHONE, HOME, and WORK.
	 * - wa_id (string) – Optional. WhatsApp ID.
	 */
	phones: Array<{
		/**
		 * **Optional.** 
		 * 
		 * Automatically populated with the `wa_id` value as a formatted phone number.
		 */
		phone?: string;

		/**
		 * **Optional.** 
		 * 
		 * Standard Values are CELL, MAIN, IPHONE, HOME, and WORK.
		 */
		type?: 'CELL' | 'MAIN' | 'IPHONE' | 'HOME' | 'WORK' | string;

		/**
		 * **Optional.** 
		 * 
		 * WhatsApp ID.
		 */
		wa_id?: string;
	}>;

	/**
	 * **Optional.** 
	 * 
	 * Contact URL(s) formatted as a urls object. The object can contain the following fields:
	 * - url (string) – Optional. URL.
	 * - type (string) – Optional. Standard values are HOME and WORK.
	 */
	urls?: Array<{
		/**
		 * **Optional.** 
		 * 
		 * URL.
		 */
		url: string;

		/**
		 * **Optional.** 
		 * 
		 * Standard values are HOME and WORK.
		 */
		type?: 'HOME' | 'WORK' | string;
	}>;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#action-object}.
 */
export type ActionObject = {
	/**
	 * **Required for List Messages.** 
	 * 
	 * Button content. It cannot be an empty string and must be unique within the message. Emojis are supported, markdown is not.
	 * 
	 * Maximum length: 20 characters.
	 */
	button?: string;

	/**
	 * **Required for Reply Buttons.** 
	 * 
	 * A button object can contain the following parameters:
	 * 
	 * - type: only supported type is reply (for Reply Button)
	 * - title: Button title. It cannot be an empty string and must be unique within the message. Emojis are supported, markdown is not. Maximum length: 20 characters.
	 * - id: Unique identifier for your button. This ID is returned in the webhook when the button is clicked by the user. Maximum length: 256 characters.
	 * 
	 * You can have up to 3 buttons. You cannot have leading or trailing spaces when setting the ID.
	 */
	buttons?: Array<{
		/**
		 * **Required.** 
		 * 
		 * Unique identifier for your button. This ID is returned in the webhook when the button is clicked by the user. Maximum length: 256 characters.
		 */
		id: string;

		/**
		 * **Required.** 
		 * 
		 * Button title. It cannot be an empty string and must be unique within the message. Emojis are supported, markdown is not. Maximum length: 20 characters.
		 */
		title: string;

		/**
		 * **Required.** 
		 * 
		 * Only supported type is reply (for Reply Button)
		 */
		type: 'reply';
	}>;

	/**
	 * **Required for Single Product Messages and Multi-Product Messages.** 
	 * 
	 * Unique identifier of the Facebook catalog linked to your WhatsApp Business Account. 
	 * This ID can be retrieved via the [Meta Commerce Manager](https://business.facebook.com/commerce/).
	 */
	catalog_id?: string;

	/**
	 * **Required for Single Product Messages and Multi-Product Messages.** 
	 * 
	 * Unique identifier of the product in a catalog.
	 * 
	 * To get this ID go to [Meta Commerce Manager](https://business.facebook.com/commerce/) and select your Meta Business account. 
	 * You will see a list of shops connected to your account. 
	 * Click the shop you want to use. On the left-side panel, click Catalog > Items, and find the item you want to mention. 
	 * The ID for that item is displayed under the item's name.
	 */
	product_retailer_id?: string;

	/**
	 * **Required for List Messages and Multi-Product Messages.** 
	 * 
	 * Array of section objects. Minimum of 1, maximum of 10. See section object.
	 */
	sections?: Array<SectionObject>;

	/**
	 * **Optional for Flows Messages.** 
	 * 
	 * The current mode of the Flow, either draft or published.
	 * 
	 * Default: published
	 */
	mode?: 'draft' | 'published';

	/**
	 * **Required for Flows Messages.** 
	 * 
	 * Must be 3.
	 */
	flow_message_version?: '3';

	/**
	 * **Required for Flows Messages.** 
	 * 
	 * A token that is generated by the business to serve as an identifier.
	 */
	flow_token?: string;

	/**
	 * **Required for Flows Messages.** 
	 * 
	 * Unique identifier of the Flow provided by WhatsApp.
	 */
	flow_id?: string;

	/**
	 * **Required for Flows Messages.** 
	 * 
	 * Text on the CTA button, eg. "Signup".
	 * 
	 * Maximum length: 20 characters (no emoji).
	 */
	flow_cta?: string;

	/**
	 * **Optional for Flows Messages.** 
	 * 
	 * navigate or data_exchange. Use navigate to predefine the first screen as part of the message. 
	 * Use data_exchange for advanced use-cases where the first screen is provided by your endpoint.
	 * {@link https://developers.facebook.com/docs/whatsapp/flows/guides/implementingyourflowendpoint}
	 * 
	 * Default: navigate
	 */
	flow_action?: 'navigate' | 'data_exchange';

	/**
	 * **Optional for Flows Messages.** 
	 * 
	 * Required only if flow_action is navigate. The object can contain the following parameters:
	 * - screen (string) – Required. The id of the first screen of the Flow.
	 * - data (object) – Optional. The input data for the first screen of the Flow. Must be a non-empty object.
	 * 
	 * Default: navigate
	 */
	flow_action_payload: {
		/**
		 * **Required.** 
		 * 
		 * The id of the first screen of the Flow.
		 */
		screen: string;

		/**
		 * **Optional.** 
		 * 
		 * The input data for the first screen of the Flow. Must be a non-empty object.
		 */
		data?: Record<any, any>;
	};
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#header-object}.
 */
export type HeaderObject = {
	/**
	 * **Required if type is set to document.** 
	 * 
	 * Contains the media object for this document.
	 */
	document?: MediaObject;

	/**
	 * **Required if type is set to image.** 
	 * 
	 * Contains the media object for this image.
	 */
	image?: MediaObject;

	/**
	 * **Required if type is set to text.** 
	 * 
	 * Text for the header. Formatting allows emojis, but not markdown.
	 * 
	 * Maximum length: 60 characters.
	 */
	text?: string;

	/**
	 * **Required.** 
	 * 
	 * The header type you would like to use. Supported values:
	 * - text: Used for List Messages, Reply Buttons, and Multi-Product Messages.
	 * - video: Used for Reply Buttons.
	 * - image: Used for Reply Buttons.
	 * - document: Used for Reply Buttons.
	 */
	type: 'text' | 'video' | 'image' | 'document';

	/**
	 * **Required if type is set to video.** 
	 * 
	 * Contains the media object for this video.
	 */
	video?: MediaObject;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#section-object}.
 */
export type SectionObject = {
	/**
	 * **Required for Multi-Product Messages.** 
	 * 
	 * Array of product objects. There is a minimum of 1 product per section and a maximum of 30 products across all sections.
	 * 
	 * Each product object contains the following field:
	 * - product_retailer_id (string) – Required for Multi-Product Messages. Unique identifier of the product in a catalog. 
	 * To get this ID, go to the Meta Commerce Manager, select your account and the shop you want to use. 
	 * Then, click Catalog > Items, and find the item you want to mention. 
	 * The ID for that item is displayed under the item's name.
	 */
	product_items?: Array<{
		/**
		 * **Required.** 
		 * 
		 * Unique identifier of the product in a catalog. 
		 * To get this ID, go to the Meta Commerce Manager, select your account and the shop you want to use. 
		 * Then, click Catalog > Items, and find the item you want to mention. 
		 * The ID for that item is displayed under the item's name.
		 */
		product_retailer_id: string;
	}>;

	/**
	 * **Required for List Messages.** 
	 * 
	 * Contains a list of rows. You can have a total of 10 rows across your sections.
	 * 
	 * Each row must have a title (Maximum length: 24 characters) and an ID (Maximum length: 200 characters). 
	 * You can add a description (Maximum length: 72 characters), but it is optional.
	 * 
	 * @example
	 * "rows": [
	 *   {
	 *     "id":"unique-row-identifier-here",
	 *     "title": "row-title-content-here",
	 *     "description": "row-description-content-here",           
	 *   }
	 * ]
	 */
	rows?: Array<{
		/**
		 * **Required.** 
		 * 
		 * Unique row identifier. Maximum length: 200 characters.
		 */
		id: string;

		/**
		 * **Required.** 
		 * 
		 * Row title. Maximum length: 24 characters.
		 */
		title: string;

		/**
		 * **Optional.** 
		 * 
		 * Row description. Maximum length: 72 characters.
		 */
		description?: string;
	}>;

	/**
	 * **Required if the message has more than one section.** 
	 * 
	 * Title of the section.
	 * 
	 * Maximum length: 24 characters.
	 */
	title?: string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#interactive-object}.
 */
export type InteractiveObject = {
	/**
	 * **Required.** 
	 * 
	 * Action you want the user to perform after reading the message.
	 */
	action: ActionObject;

	/**
	 * **Optional for type product. Required for other message types.**
	 * 
	 * An object with the body of the message.
	 * 
	 * The body object contains the following field:
	 * - text (string) – **Required if body is present.** 
	 * The content of the message. Emojis and markdown are supported. 
	 * Maximum length: 1024 characters.
	 */
	body?: {
		/**
		 * **Required.** 
		 * 
		 * The content of the message. Emojis and markdown are supported. Maximum length: 1024 characters.
		 */
		text: string;
	};

	/**
	 * **Optional.** An object with the footer of the message.
	 * 
	 * The footer object contains the following field:
	 * - text (string) – **Required if footer is present.** 
	 * The footer content. Emojis, markdown, and links are supported. 
	 * Maximum length: 60 characters.
	 */
	footer?: {
		/**
		 * **Required.** 
		 * 
		 * The footer content. Emojis, markdown, and links are supported. Maximum length: 60 characters.
		 */
		text: string;
	};

	/**
	 * **Required for type product_list. Optional for other types.** 
	 * 
	 * Header content displayed on top of a message. 
	 * You cannot set a header if your interactive object is of product type. 
	 * See [header object](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#header-object) for more information.
	 */
	header?: HeaderObject;

	/**
	 * **Required.** 
	 * 
	 * The type of interactive message you want to send. Supported values:
	 * 
	 * - button: Use for Reply Buttons.
	 * - catalog_message: Use for Catalog Messages.
	 * - list: Use for List Messages.
	 * - product: Use for Single-Product Messages.
	 * - product_list: Use for Multi-Product Messages.
	 * - flow: Use for Flows Messages.
	 */
	type: 'button' | 'catalog_message' | 'list' | 'product' | 'product_list' | 'flow';
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#location-object}.
 */
export type LocationObject = {
	/**
	 * **Required.** 
	 * 
	 * Location latitude in decimal degrees.
	 */
	latitude: number;

	/**
	 * **Required.** 
	 * 
	 * Location longitude in decimal degrees.
	 */
	longitude: number;

	/**
	 * **Required.** 
	 * 
	 * Name of the location.
	 */
	name: string;

	/**
	 * **Required.** 
	 * 
	 * Address of the location.
	 */
	address: string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#media-object}.
 */
export type MediaObject = {
	/**
	 * **Required when type is audio, document, image, sticker, or video and you are not using a link.**
	 * 
	 * The media object ID. Do not use this field when message type is set to text.
	 */
	id?: string

	/**
	 * **Required when type is audio, document, image, sticker, or video and you are not using an uploaded media ID (i.e. you are hosting the media asset on your public server).**
	 * 
	 * The protocol and URL of the media to be sent. Use only with HTTP/HTTPS URLs.
	 * 
	 * Do not use this field when message type is set to text.
	 * 
	 * **Cloud API users only:**
	 * - See Media HTTP Caching if you would like us to cache the media asset for future messages.
	 * - When we request the media asset from your server you must indicate the media's MIME type by including the Content-Type HTTP header. For example: Content-Type: video/mp4. 
	 * See [Supported Media Types](https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#supported-media-types) for a list of supported media and their MIME types.
	 */
	link?: string

	/**
	 * **Optional.**
	 * 
	 * Media asset caption. Do not use with audio or sticker media.
	 * 
	 * **On-Premises API users:**
	 * - For v2.41.2 or newer, this field is is limited to 1024 characters.
	 * - Captions are currently not supported for document media.
	 */
	caption?: string;

	/**
	 * **Optional.**
	 * 
	 * Describes the filename for the specific document. Use only with document media.
	 * 
	 * **The extension of the filename will specify what format the document is displayed as in WhatsApp.**
	 */
	filename?: string;

	/**
	 * **Optional. On-Premises API only.**
	 * 
	 * This path is optionally used with a link when the HTTP/HTTPS link is not directly accessible and requires additional configurations like a bearer token. 
	 * For information on configuring providers, see the [Media Providers](https://developers.facebook.com/docs/whatsapp/api/settings/media-providers) documentation.
	 */
	provider?: string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#template-object}.
 */
export type TemplateObject = {
	/**
	 * **Required.** 
	 * 
	 * Name of the template.
	 */
	name: string;

	/**
	 * **Required.** 
	 * 
	 * Contains a language object. Specifies the language the template may be rendered in.
	 * 
	 * The language object can contain the following fields:
	 * - policy (string) – Required. The language policy the message should follow. The only supported option is deterministic. 
	 * See [Language Policy Options](https://developers.facebook.com/docs/whatsapp/api/messages/message-templates#language-policy-options).
	 * - code (string) – Required. The code of the language or locale to use. Accepts both language and language_locale formats (e.g., en and en_US). 
	 * For all codes, see [Supported Languages](https://developers.facebook.com/docs/whatsapp/api/messages/message-templates#supported-languages).
	 */
	language: {
		/**
		 * **Required.** 
		 * 
		 * The code of the language or locale to use. Accepts both language and language_locale formats (e.g., en and en_US). 
		 * For all codes, see [Supported Languages](https://developers.facebook.com/docs/whatsapp/api/messages/message-templates#supported-languages).
		 */
		code: string;

		/**
		 * **Required.** 
		 * 
		 * The language policy the message should follow. The only supported option is deterministic. 
		 * See [Language Policy Options](https://developers.facebook.com/docs/whatsapp/api/messages/message-templates#language-policy-options).
		 */
		policy?: 'deterministic';
	};

	/**
	 * **Optional.** 
	 * 
	 * Array of components objects containing the parameters of the message.
	 */
	components?: Array<ComponentObject>;

	/**
	 * **Optional.** Only used for On-Premises API.
	 * 
	 * Namespace of the template.
	 */
	namespace?: string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#text-object}.
 */
export type TextObject = {
	/**
	 * **Required for text messages.**
	 * 
	 * The text of the text message which can contain URLs which begin with http:// or https:// and formatting. 
	 * See available formatting options [here](https://developers.facebook.com/docs/whatsapp/on-premises/reference/messages#formatting).
	 * 
	 * If you include URLs in your text and want to include a preview box in text messages (preview_url: true), make sure the URL starts with http:// or https:// —https:// URLs are preferred. 
	 * You must include a hostname, since IP addresses will not be matched.
	 * 
	 * Maximum length: 4096 characters
	 */
	body: string;

	/**
	 * **Optional. Cloud API only.**
	 * 
	 * Set to true to have the WhatsApp Messenger and WhatsApp Business apps attempt to render a link preview of any URL in the body text string. 
	 * URLs must begin with http:// or https://. If multiple URLs are in the body text string, only the first URL will be rendered.
	 * 
	 * If preview_url is omitted, or if unable to retrieve a preview, a clickable link will be rendered instead.
	 * 
	 * On-Premises API users, use preview_url in the top-level message payload instead. See [Parameters](https://developers.facebook.com/docs/whatsapp/on-premises/reference/messages#parameters).
	 */
	preview_url?: string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#reaction-object}.
 */
export type ReactionObject = {
	/**
	 * **Required.** 
	 * 
	 * The WhatsApp Message ID (wamid) of the message on which the reaction should appear. The reaction will not be sent if:
	 * 
	 * - The message is older than 30 days
	 * - The message is a reaction message
	 * - The message has been deleted
	 * 
	 * If the ID is of a message that has been deleted, the message will not be delivered.
	 */
	message_id: string;

	/**
	 * **Required.**
	 * 
	 * Emoji to appear on the message.
	 * 
	 * - All emojis supported by Android and iOS devices are supported.
	 * - Rendered-emojis are supported.
	 * - If using emoji unicode values, values must be Java- or JavaScript-escape encoded.
	 * - Only one emoji can be sent in a reaction message
	 * - Use an empty string to remove a previously sent emoji.
	 */
	emoji: string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#button-parameter-object}.
 */
export type ButtonParameterObject = {
	/**
	 * **Required.**
	 * 
	 * Indicates the type of parameter for the button.
	 */
	type: 'payload' | 'text';

	/**
	 * **Required for quick_reply buttons.**
	 * 
	 * Developer-defined payload that is returned when the button is clicked in addition to the display text on the button.
	 * 
	 * See [Callback from a Quick Reply Button Click](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/set-up-webhooks#received-callback-from-a-quick-reply-button-click) for an example.
	 */
	payload?: Record<any, any>;

	/**
	 * **Required for URL buttons.**
	 * 
	 * Developer-provided suffix that is appended to the predefined prefix URL in the template.
	 */
	text?: string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#components-object}.
 */
export type ComponentObject = {
	/**
	 * **Required.**
	 * 
	 * Describes the component type.
	 * 
	 * For text-based templates, we only support the type=body.
	 */
	type: 'header' | 'body' | 'button';

	/**
	 * **Required when type=button. Not used for the other types.**
	 * 
	 * Type of button to create.
	 * 
	 * - quick_reply: Refers to a previously created quick reply button that allows for the customer to return a predefined message.
	 * - url: Refers to a previously created button that allows the customer to visit the URL generated by appending the text parameter to the predefined prefix URL in the template.
	 * - catalog: Refers to a previously created catalog button that allows for the customer to return a full product catalog.
	 */
	sub_type?: 'quick_reply' | 'url' | 'catalog';

	/**
	 * **Required when type=button.**
	 * 
	 * Array of parameter objects with the content of the message.
	 * 
	 * For components of type=button, see the button parameter object.
	 */
	parameters?: Array<ParameterObject>;

	/**
	 * **Required when type=button. Not used for the other types. **
	 * 
	 * Position index of the button. You can have up to 10 buttons using index values of 0 to 9.
	 */
	index?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#currency-object}.
 */
export type CurrencyObject = {
	/**
	 * **Required.**
	 * 
	 * Default text if localization fails.
	 */
	fallback_value: string;

	/**
	 * **Required.**
	 * 
	 * Currency code as defined in ISO 4217. 
	 * 
	 * {@link https://www.iso.org/iso-4217-currency-codes.html}
	 */
	code: string;

	/**
	 * **Required.**
	 * 
	 * Amount multiplied by 1000.
	 */
	amount_1000: number;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#date-time-object}.
 */
export type DateTimeObject = {
	/**
	 * **Required.**
	 * 
	 * Default text. For Cloud API, we always use the fallback value, and we do not attempt to localize using other optional fields.
	 */
	fallback_value: string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages#parameter-object}.
 */
export type ParameterObject = {
	/**
	 * **Required.**
	 * 
	 * Describes the parameter type. Supported values:
	 * - currency
	 * - date_time
	 * - document
	 * - image
	 * - text
	 * - video
	 * 
	 * For text-based templates, the only supported parameter types are currency, date_time, and text.
	 */
	type: 'currency' | 'date_time' | 'document' | 'image' | 'text' | 'video';

	/**
	 * **Required when type=text.**
	 * 
	 * The message’s text. Character limit varies based on the following included component type.
	 * 
	 * For the header component type:
	 * - 60 characters
	 * 
	 * For the body component type:
	 * - 1024 characters if other component types are included
	 * - 32768 characters if body is the only component type included 
	 */
	text?: string;

	/**
	 * **Required when type=currency.**
	 * 
	 * A currency object.
	 */
	currency?: CurrencyObject;

	/**
	 * **Required when type=date_time.**
	 * 
	 * A date_time object.
	 */
	date_time?: DateTimeObject;

	/**
	 * **Required when type=image.**
	 * 
	 * A media object of type image. Captions not supported when used in a media template.
	 */
	image?: MediaObject;

	/**
	 * **Required when type=document.**
	 * 
	 * A media object of type document. 
	 * Only PDF documents are supported for media-based message templates. 
	 * Captions not supported when used in a media template.
	 */
	document?: MediaObject;

	/**
	 * **Required when type=video.**
	 * 
	 * A media object of type video. Captions not supported when used in a media template.
	 */
	video?: MediaObject;
};