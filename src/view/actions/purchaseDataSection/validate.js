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

/* eslint-disable camelcase */

import parseJson from '../../utils/parseJson';
import { isDataElementToken, isObject } from '../../utils/validators';
import checkRequired from '../../utils/checkRequired';

export default ({
  purchasePropertiesJsonPairs = [],
  purchasePropertiesType,
  purchasePropertiesRaw,
  purchase = {}
}) => {
  const errors = {};
  const { time, product_id, price, currency, quantity } = purchase;

  if (purchasePropertiesType === 'raw') {
    if (purchasePropertiesRaw) {
      if (isDataElementToken(purchasePropertiesRaw)) {
        return errors;
      }

      const { message = '', parsedJson } = parseJson(purchasePropertiesRaw);
      if (message || !isObject(parsedJson)) {
        return {
          purchasePropertiesRaw: `Please provide a valid JSON object or a data element.${
            message ? ` ${message}.` : ''
          }`
        };
      }
    }
  } else {
    purchasePropertiesJsonPairs.forEach((q, index) => {
      if (!q.key && q.value) {
        errors[`purchasePropertiesJsonPairs.${index}.key`] =
          'Please provide a key name.';
      }
    });
  }

  [
    ['purchase.product_id', product_id, 'an identifier for the purchase'],
    ['purchase.currency', currency, 'a currency'],
    ['purchase.price', price, 'a price'],
    ['purchase.time', time, 'a purchase time']
  ].forEach(([key, value, errorVariableDescription]) => {
    checkRequired(key, value, errorVariableDescription || `a ${key}`, errors);
  });

  [
    [price, 'purchase.price'],
    [quantity, 'purchase.quantity']
  ].forEach(([value, key]) => {
    if (value && !isDataElementToken(value)) {
      const numberValue = Number(value);
      if (Number.isNaN(numberValue)) {
        errors[key] = 'The value must be a number or a data element.';
      }
    }
  });
  return errors;
};
