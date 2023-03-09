/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { screen } from '@testing-library/react';
import renderView from '../../__tests_helpers__/renderView';

import SendBrazeEvent from '../sendEvent';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

import { changeInputValue } from '../../__tests_helpers__/jsDomHelpers';

let extensionBridge;

beforeEach(() => {
  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
});

const getFormFields = () => ({
  externalIdInput: screen.getByLabelText(/external user id/i, {
    selector: '[name="user_identification.external_id"]'
  }),
  brazeIdInput: screen.getByLabelText(/braze user id/i, {
    selector: '[name="user_identification.braze_id"]'
  }),
  aliasNameInput: screen.getByLabelText(/alias name/i, {
    selector: '[name="user_identification.user_alias.alias_name"]'
  }),
  aliasLabelInput: screen.getByLabelText(/alias label/i, {
    selector: '[name="user_identification.user_alias.alias_label"]'
  }),
  eventNameInput: screen.getByLabelText(/event name/i, {
    selector: '[name="event.name"]'
  }),
  eventTimeInput: screen.getByLabelText(/event time/i, {
    selector: '[name="event.time"]'
  }),
  appIdentifierInput: screen.getByLabelText(/app identifier/i, {
    selector: '[name="event.app_id"]'
  }),
  eventPropertiesRawTextarea: screen.getByLabelText(/event properties raw/i),
  userAttributesRawTextarea: screen.getByLabelText(/user attributes raw/i)
});

describe('SendBrazeEvent view', () => {
  test('sets form values from settings', async () => {
    renderView(SendBrazeEvent);

    extensionBridge.init({
      settings: {
        user_identification: {
          external_id: 'external id',
          braze_id: 'braze id',
          user_alias: {
            alias_name: 'alias name',
            alias_label: 'alias label'
          }
        },
        event: {
          app_id: 'ios',
          time: '123',
          name: 'event name',
          properties: { a: 'b' }
        },
        attributes: {
          first_name: 'Alex',
          country: 'US',
          custom: 'value'
        }
      }
    });

    const {
      externalIdInput,
      brazeIdInput,
      aliasNameInput,
      aliasLabelInput,
      eventNameInput,
      eventTimeInput,
      appIdentifierInput,
      eventPropertiesRawTextarea,
      userAttributesRawTextarea
    } = getFormFields();

    expect(externalIdInput.value).toBe('external id');
    expect(brazeIdInput.value).toBe('braze id');
    expect(aliasNameInput.value).toBe('alias name');
    expect(aliasLabelInput.value).toBe('alias label');
    expect(eventNameInput.value).toBe('event name');
    expect(eventTimeInput.value).toBe('123');
    expect(appIdentifierInput.value).toBe('ios');
    expect(eventPropertiesRawTextarea.value).toBe('{\n  "a": "b"\n}');
    expect(userAttributesRawTextarea.value).toBe(
      '{\n  "first_name": "Alex",\n  "country": "US",\n  "custom": "value"\n}'
    );
  });

  test('sets settings from form values', async () => {
    renderView(SendBrazeEvent);

    extensionBridge.init();

    const {
      externalIdInput,
      brazeIdInput,
      aliasNameInput,
      aliasLabelInput,
      eventNameInput,
      eventTimeInput,
      appIdentifierInput,
      eventPropertiesRawTextarea,
      userAttributesRawTextarea
    } = getFormFields();

    await changeInputValue(externalIdInput, 'external id');
    await changeInputValue(brazeIdInput, 'braze id');
    await changeInputValue(aliasNameInput, 'alias name');
    await changeInputValue(aliasLabelInput, 'alias label');
    await changeInputValue(eventNameInput, 'event');
    await changeInputValue(eventTimeInput, '123');
    await changeInputValue(appIdentifierInput, 'ios');
    await changeInputValue(eventPropertiesRawTextarea, '{{"a":"b"}');
    await changeInputValue(userAttributesRawTextarea, '{{"a":"b"}');

    expect(extensionBridge.getSettings()).toEqual({
      user_identification: {
        external_id: 'external id',
        braze_id: 'braze id',
        user_alias: {
          alias_name: 'alias name',
          alias_label: 'alias label'
        }
      },
      event: {
        app_id: 'ios',
        time: '123',
        name: 'event',
        properties: { a: 'b' }
      },
      attributes: {
        a: 'b'
      }
    });
  });

  test('handles form validation correctly', async () => {
    renderView(SendBrazeEvent);

    extensionBridge.init();

    const { externalIdInput, eventNameInput, eventTimeInput } = getFormFields();

    await extensionBridge.validate();

    expect(externalIdInput).toHaveAttribute('aria-invalid', 'true');
    expect(eventNameInput).toHaveAttribute('aria-invalid', 'true');
    expect(eventTimeInput).toHaveAttribute('aria-invalid', 'true');
  });
});
