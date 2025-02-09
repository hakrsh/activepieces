import { intercomClient } from '.';
import { intercomAuth } from '../../index';
import { DropdownOption, PiecePropValueSchema, Property } from '@activepieces/pieces-framework';

export const conversationIdProp = (displayName: string, required= true) =>
	Property.Dropdown({
		displayName,
		required,
		refreshers: [],
		options: async ({ auth }) => {
			if (!auth) {
				return {
					options: [],
					disabled: true,
					placeholder: 'Please connect your account first.',
				};
			}

			const authValue = auth as PiecePropValueSchema<typeof intercomAuth>;
			const client = intercomClient(authValue);

			const response = await client.conversations.list();
			const options: DropdownOption<string>[] = [];

			for await (const conversation of response) {
				options.push({
					value: conversation.id,
					label: `${conversation.source.author.email}, ${conversation.title ?? ''}, ${
						conversation.id
					}`,
				});
			}

			return {
				disabled: false,
				options,
			};
		},
	});

export const tagIdProp = (displayName: string, required= true) =>
	Property.Dropdown({
		displayName,
		required,
		refreshers: [],
		options: async ({ auth }) => {
			if (!auth) {
				return {
					options: [],
					disabled: true,
					placeholder: 'Please connect your account first.',
				};
			}

			const authValue = auth as PiecePropValueSchema<typeof intercomAuth>;
			const client = intercomClient(authValue);

			const response = await client.tags.list();
			const options: DropdownOption<string>[] = [];

			for (const tag of response.data) {
				options.push({
					value: tag.id,
					label: tag.name,
				});
			}

			return {
				disabled: false,
				options,
			};
		},
	});

export const companyIdProp = (displayName: string, required= true) =>
	Property.Dropdown({
		displayName,
		required,
		refreshers: [],
		options: async ({ auth }) => {
			if (!auth) {
				return {
					options: [],
					disabled: true,
					placeholder: 'Please connect your account first.',
				};
			}

			const authValue = auth as PiecePropValueSchema<typeof intercomAuth>;
			const client = intercomClient(authValue);

			const response = await client.companies.list();
			const options: DropdownOption<string>[] = [];

			for await (const company of response) {
				options.push({
					value: company.id,
					label: company.name,
				});
			}

			return {
				disabled: false,
				options,
			};
		},
	});
