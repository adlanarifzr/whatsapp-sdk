/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components}.
 */
export type TemplateComponentObject = {
	/**
	 * **Required.**
	 * 
	 * Type of the component.
	 */
	type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';

	/**
	 * **Required if type HEADER.**
	 * 
	 * Format of the component.
	 */
	format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'LOCATION';

	/**
	 * **Required if type is TEXT.**
	 * 
	 * Text to appear in template header when sent. 
	 * Only supports 1 variable for HEADER type.
	 * BODY type may contain multiple variables.
	 * FOOTER type cannot contain variables.
	 * 
	 * If the string contains a variable, you must include the example property and a sample variable value.
	 * 
	 * 60 characters maximum for HEADER type.
	 * 1024 characters maximum for BODY type.
	 * 60 characters maximum for FOOTER type.
	 */
	text?: string;

	/**
	 * Example data for the component.
	 */
	example?: {
		/**
		 * **Required if text string contains variables.**
		 * 
		 * Sample header text.
		 */
		header_text?: Array<string>;

		/**
		 * **Required if format is IMAGE/VIDEO/DOCUMENT.**
		 * 
		 * Uploaded media asset handle. 
		 * Use the [Resumable Upload API](https://developers.facebook.com/docs/graph-api/guides/upload) to generate an asset handle.
		 */
		header_handle?: string;

		/**
		 * **Required if <TEXT> string contains variables.**
		 * 
		 * Array of sample strings. Number of strings must match the number of variables included in the string.
		 */
		body_text?: Array<Array<string>>;
	};

	/**
	 * Buttons are optional interactive components that perform specific actions when tapped. 
	 * Templates can have a mixture of up to 10 button components total, although there are limits to individual buttons of the same type as well as combination limits.
	 * 
	 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components#buttons}.
	 */
	buttons?: Array<{
		/**
		 * **Required.**
		 * 
		 * Type of button.
		 */
		type: 'URL' | 'PHONE_NUMBER' | 'QUICK_REPLY' | 'COPY_CODE' | 'FLOW',

		/**
		 * **Required.**
		 * 
		 * Button label text.
		 * 
		 * For type URL, if using a variable, must include the example property and a sample value.
		 * 
		 * 25 characters maximum.
		 */
		text: string;

		/**
		 * **Required if type is PHONE_NUMBER.**
		 */
		phone_number?: string;

		/**
		 * **Required if type is URL.**
		 */
		url?: string;

		/**
		 * **Required if URL contains a variable.**
		 */
		example?: Array<string>;

		/**
		 * **Required if type is FLOW.**
		 * 
		 * Unique identifier of the Flow provided by WhatsApp. The Flow must be published.
		 */
		flow_id?: string;

		/**
		 * **Optional if type is FLOW.**
		 * 
		 * Use navigate to predefine the first screen as part of the template message. 
		 * Use data_exchange for advanced use-cases where the first screen is provided by your endpoint.
		 * 
		 * Default: navigate
		 */
		flow_action?: 'navigate' | 'data_exchange';

		/**
		 * **Required if type is FLOW and flow_action is navigate.**
		 * 
		 * The id of the first screen of the Flow.
		 */
		navigate_screen?: string;
	}>;
};


/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories}.
 */
export enum TemplateLanguage {
	Afrikaans = 'af',
	Albanian = 'sq',
	Arabic = 'ar',
	Azerbaijani = 'az',
	Bengali = 'bn',
	Bulgarian = 'bg',
	Catalan = 'ca',
	'Chinese (CHN)' = 'zh_CN',
	'Chinese (HKG)' = 'zh_HK',
	'Chinese (TAI)' = 'zh_TW',
	Croatian = 'hr',
	Czech = 'cs',
	Danish = 'da',
	Dutch = 'nl',
	English = 'en',
	'English (UK)' = 'en_GB',
	'English (US)' = 'en_US',
	Estonian = 'et',
	Filipino = 'fil',
	Finnish = 'fi',
	French = 'fr',
	Georgian = 'ka',
	German = 'de',
	Greek = 'el',
	Gujarati = 'gu',
	Hausa = 'ha',
	Hebrew = 'he',
	Hindi = 'hi',
	Hungarian = 'hu',
	Indonesian = 'id',
	Irish = 'ga',
	Italian = 'it',
	Japanese = 'ja',
	Kannada = 'kn',
	Kazakh = 'kk',
	Kinyarwanda = 'rw_RW',
	Korean = 'ko',
	'Kyrgyz (Kyrgyzstan)' = 'ky_KG',
	Lao = 'lo',
	Latvian = 'lv',
	Lithuanian = 'lt',
	Macedonian = 'mk',
	Malay = 'ms',
	Malayalam = 'ml',
	Marathi = 'mr',
	Norwegian = 'nb',
	Persian = 'fa',
	Polish = 'pl',
	'Portuguese (BR)' = 'pt_BR',
	'Portuguese (POR)' = 'pt_PT',
	Punjabi = 'pa',
	Romanian = 'ro',
	Russian = 'ru',
	Serbian = 'sr',
	Slovak = 'sk',
	Slovenian = 'sl',
	Spanish = 'es',
	'Spanish (ARG)' = 'es_AR',
	'Spanish (SPA)' = 'es_ES',
	'Spanish (MEX)' = 'es_MX',
	Swahili = 'sw',
	Swedish = 'sv',
	Tamil = 'ta',
	Telugu = 'te',
	Thai = 'th',
	Turkish = 'tr',
	Ukrainian = 'uk',
	Urdu = 'ur',
	Uzbek = 'uz',
	Vietnamese = 'vi',
	Zulu = 'zu'
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#creating-templates}.
 */
export type TemplateCreateRequestBody = {
	/**
	 * **Required.**
	 * 
	 * Template name.
	 * 
	 * Maximum 512 characters.
	 */
	name: string;

	/**
	 * **Required.**
	 * 
	 * Template category.
	 * 
	 * See [Template Categories](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories) below.
	 */
	category: 'AUTHENTICATION' | 'MARKETING' | 'UTILITY';

	/**
	 * **Optional.**
	 * 
	 * Set to true to allow us to [automatically assign a category](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#automatic-categorization). 
	 * If omitted, the template may be rejected due to miscategorization.
	 */
	allow_category_change?: boolean;

	/**
	 * **Required.**
	 * 
	 * Template [language and locale code](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/supported-languages).
	 */
	language: TemplateLanguage;

	/**
	 * **Optional.**
	 * 
	 * The exact name of the Utility Template Library template.
	 * 
	 * Learn how to create templates using [Utility Template Library](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-message-templates/utility-templates)
	 */
	library_template_name?: string;

	/**
	 * **Optional.**
	 * 
	 * The website and/or phone number of the business being used in the template.
	 * 
	 * **Note: For utility templates that contain buttons, this property is not optional.**
	 * 
	 * Learn how to create templates using [Utility Template Library](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-message-templates/utility-templates)
	 */
	library_template_button_inputs?: Array<{
		type: 'URL' | 'PHONE_NUMBER';
		base_url?: string;
		url_suffix_example?: string;
		phone_number?: string;
	}>;

	/**
	 * **Required.** 
	 * 
	 * Components that make up the template.
	 * 
	 * See [Template Components](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components) below.
	 */
	components: Array<TemplateComponentObject>;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#edit-a-message-template}.
 */
export type TemplateUpdateRequestBody = {
	/**
	 * **Required if components property is omitted.**
	 * 
	 * Template category.
	 * 
	 * See [Template Categories](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-categories) below.
	 */
	category?: 'AUTHENTICATION' | 'MARKETING' | 'UTILITY';

	/**
	 * **Required if category property is omitted.** 
	 * 
	 * Array of template components objects.
	 * 
	 * See [Template Components](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/#template-components) below.
	 */
	components?: Array<TemplateComponentObject>;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates#retrieve-templates}.
 */
export type TemplateListRequestBody = {
	/**
	 * **Optional.**
	 * 
	 * List of [template fields](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-hsm/#fields) you want returned.
	 */
	fields?: string;

	/**
	 * **Optional.**
	 * 
	 * The maximum number of templates you want returned in each page of results.
	 * 
	 * Default is 25.
	 */
	limit?: number;

	/**
	 * **Optional.**
	 * 
	 * The cursor of current page, which will return next result.
	 */
	after?: string;

	/**
	 * **Optional.**
	 * 
	 * The cursor of current page, which will return previous result.
	 */
	before?: string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/graph-api/reference/whats-app-business-hsm/#fields}.
 */
export type TemplateObject = {
	/**
	 * Template ID.
	 */
	id: string;

	/**
	 * The category type of the message template.
	 */
	category?: 'AUTHENTICATION' | 'MARKETING' | 'UTILITY';

	/**
	 * An array of JSON objects describing the message template components.
	 */
	components?: Array<TemplateComponentObject>;

	/**
	 * The correct category for the template.
	 */
	correct_category?: 'AUTHENTICATION' | 'MARKETING' | 'UTILITY';

	/**
	 * Optional boolean field for opting out/in of link tracking at template level
	 */
	cta_url_link_tracking_opted_out?: boolean;

	/**
	 * The language (and locale) of the element translation
	 */
	language?: TemplateLanguage;

	/**
	 * Template Library name that this HSM is clone from
	 */
	library_template_name?: string;

	/**
	 * Template message delivery retry time-to-live (TTL) override value. 
	 * If unable to deliver the template message to the WhatsApp user, we will periodically retry for this period of time. 
	 * If we are unable to deliver the message for this period of time, the message will be dropped. 
	 * 
	 *  Only allowed for authentication message templates. See [Time-To-Live](https://developers.facebook.com/docs/whatsapp/business-management-api/authentication-templates/#time-to-live). 
	 */
	message_send_ttl_seconds?: number;

	/**
	 * The message template name
	 */
	name: string;

	/**
	 * Previous category of the template. See [Template Categories](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates#categories).
	 */
	previous_category?: 'AUTHENTICATION' | 'MARKETING' | 'UTILITY';

	/**
	 * Quality score of the HSM
	 */
	quality_score?: {
		/**
		 * Timestamp of the quality score
		 */
		date?: number;
		
		/**
		 * List of reasons for the score of the HSM
		 */
		reasons?: Array<string>;

		/**
		 * Quality score of the HSM
		 */
		score?: string;
	};

	/**
	 * The reason the message template was rejected
	 */
	rejected_reason?: 'ABUSIVE_CONTENT' | 'INVALID_FORMAT' | 'NONE' | 'PROMOTIONAL' | 'TAG_CONTENT_MISMATCH' | 'SCAM';

	/**
	 * The status of the message template
	 */
	status: 'APPROVED' | 'IN_APPEAL' | 'PENDING' | 'REJECTED' | 'PENDING_DELETION' | 'DELETED' | 'DISABLED' | 'PAUSED' | 'LIMIT_EXCEEDED';

	/**
	 * Sub category of the template
	 */
	sub_category?: string;
};

/**
 * Documentation: {@link https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates#example-response-2}.
 */
export type TemplateListResponse = {
	/**
	 * Array of message templates.
	 */
	data: Array<TemplateObject>;

	/**
	 * Information about the data pagination.
	 */
	paging: {
		/**
		 * Cursors for pagination.
		 */
		cursors: {
			/**
			 * Hash of the previous page cursor.
			 */
			before: string;

			/**
			 * Hash of the next page cursor.
			 */
			after: string;
		};

		/**
		 * URL of the next page of data.
		 */
		next: string;
	};
};