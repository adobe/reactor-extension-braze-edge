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

import Configuration from '../configuration';
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

const getFromFields = () => ({
  restUrlInput: screen.getByLabelText(/rest endpoint url/i, {
    selector: '[name="restUrl"]'
  }),
  apiKeyInput: screen.queryByLabelText(/api key/i, {
    selector: '[name="apiKey"]'
  })
});

describe('Configuration view', () => {
  test('sets form values from settings', async () => {
    renderView(Configuration);

    extensionBridge.init({
      settings: {
        restUrl: 'http://www.braze.com',
        apiKey: '54321'
      }
    });

    const { restUrlInput, apiKeyInput } = getFromFields();

    expect(restUrlInput.value).toBe('http://www.braze.com');
    expect(apiKeyInput.value).toBe('54321');
  });

  test('sets settings from form values', async () => {
    renderView(Configuration);

    extensionBridge.init({
      settings: {
        restUrl: 'http://www.braze.com',
        apiKey: '54321'
      }
    });

    const { restUrlInput, apiKeyInput } = getFromFields();

    await changeInputValue(restUrlInput, 'http://www.braze2.com');
    await changeInputValue(apiKeyInput, '111111');

    expect(extensionBridge.getSettings()).toEqual({
      restUrl: 'http://www.braze2.com',
      apiKey: '111111'
    });
  });

  test('handles form validation correctly', async () => {
    renderView(Configuration);

    extensionBridge.init({
      settings: {
        restUrl: 'http://www.braze.com',
        apiKey: '5555'
      }
    });

    const { restUrlInput, apiKeyInput } = getFromFields();

    expect(restUrlInput).not.toHaveAttribute('aria-invalid');
    expect(apiKeyInput).not.toHaveAttribute('aria-invalid');

    await changeInputValue(restUrlInput, '');
    await changeInputValue(apiKeyInput, '');
    await extensionBridge.validate();

    expect(restUrlInput).toHaveAttribute('aria-invalid', 'true');
    expect(apiKeyInput).toHaveAttribute('aria-invalid');
  });
});
