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

import SendBrazePurchaseEvent from '../sendBrazePurchaseEvent';
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
  productIdInput: screen.getByLabelText(/product id/i, {
    selector: '[name="purchase.product_id"]'
  }),
  currencyInput: screen.getByLabelText(/currency/i, {
    selector: '[name="purchase.currency"]'
  }),
  priceInput: screen.getByLabelText(/price/i, {
    selector: '[name="purchase.price"]'
  }),
  quantityInput: screen.getByLabelText(/quantity/i, {
    selector: '[name="purchase.quantity"]'
  }),
  purchaseTimeInput: screen.getByLabelText(/purchase time/i, {
    selector: '[name="purchase.time"]'
  }),
  appIdentifierInput: screen.getByLabelText(/app identifier/i, {
    selector: '[name="purchase.app_id"]'
  }),
  purchasePropertiesRawTextarea: screen.getByLabelText(
    /purchase properties raw/i
  ),
  userAttributesRawTextarea: screen.getByLabelText(/user attributes raw/i)
});

describe('SendBrazePurchaseEvent view', () => {
  test('sets form values from settings', async () => {
    renderView(SendBrazePurchaseEvent);

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
        purchase: {
          app_id: 'ios',
          time: '123',
          product_id: 'ID123',
          currency: 'USD',
          price: '100',
          quantity: '5',
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
      productIdInput,
      priceInput,
      currencyInput,
      quantityInput,
      purchaseTimeInput,
      appIdentifierInput,
      purchasePropertiesRawTextarea,
      userAttributesRawTextarea
    } = getFormFields();

    expect(externalIdInput.value).toBe('external id');
    expect(brazeIdInput.value).toBe('braze id');
    expect(aliasNameInput.value).toBe('alias name');
    expect(aliasLabelInput.value).toBe('alias label');
    expect(productIdInput.value).toBe('ID123');
    expect(priceInput.value).toBe('100');
    expect(currencyInput.value).toBe('USD');
    expect(quantityInput.value).toBe('5');
    expect(purchaseTimeInput.value).toBe('123');
    expect(appIdentifierInput.value).toBe('ios');
    expect(purchasePropertiesRawTextarea.value).toBe('{\n  "a": "b"\n}');
    expect(userAttributesRawTextarea.value).toBe(
      '{\n  "first_name": "Alex",\n  "country": "US",\n  "custom": "value"\n}'
    );
  });

  test('sets settings from form values', async () => {
    renderView(SendBrazePurchaseEvent);

    extensionBridge.init();

    const {
      externalIdInput,
      brazeIdInput,
      aliasNameInput,
      aliasLabelInput,
      productIdInput,
      purchaseTimeInput,
      priceInput,
      currencyInput,
      quantityInput,
      appIdentifierInput,
      purchasePropertiesRawTextarea,
      userAttributesRawTextarea
    } = getFormFields();

    await changeInputValue(externalIdInput, 'external id');
    await changeInputValue(brazeIdInput, 'braze id');
    await changeInputValue(aliasNameInput, 'alias name');
    await changeInputValue(aliasLabelInput, 'alias label');
    await changeInputValue(productIdInput, 'ID222');
    await changeInputValue(purchaseTimeInput, '123');
    await changeInputValue(priceInput, '123');
    await changeInputValue(currencyInput, 'USD');
    await changeInputValue(quantityInput, '13');
    await changeInputValue(appIdentifierInput, 'ios');
    await changeInputValue(purchasePropertiesRawTextarea, '{{"a":"b"}');
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
      purchase: {
        app_id: 'ios',
        time: '123',
        product_id: 'ID222',
        currency: 'USD',
        price: '123',
        quantity: '13',
        properties: { a: 'b' }
      },
      attributes: {
        a: 'b'
      }
    });
  });

  test('handles form validation correctly', async () => {
    renderView(SendBrazePurchaseEvent);

    extensionBridge.init();

    const {
      externalIdInput,
      productIdInput,
      purchaseTimeInput,
      currencyInput,
      priceInput
    } = getFormFields();

    await extensionBridge.validate();

    expect(externalIdInput).toHaveAttribute('aria-invalid', 'true');
    expect(productIdInput).toHaveAttribute('aria-invalid', 'true');
    expect(purchaseTimeInput).toHaveAttribute('aria-invalid', 'true');
    expect(priceInput).toHaveAttribute('aria-invalid', 'true');
    expect(currencyInput).toHaveAttribute('aria-invalid', 'true');
  });
});
