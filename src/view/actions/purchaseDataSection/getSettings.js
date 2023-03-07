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

import { addToEntityFromVariables } from '../../utils/entityVariablesConverter';
import { isDataElementToken } from '../../utils/validators';

export default ({
  purchasePropertiesType,
  purchasePropertiesRaw,
  purchasePropertiesJsonPairs,
  purchase
}) => {
  let data;
  const settings = {};

  ['app_id', 'time', 'product_id', 'currency', 'price', 'quantity'].forEach(
    (k) => {
      if (purchase[k]) {
        if (['price', 'quantity'].includes(k)) {
          const value = purchase[k];
          const v = isDataElementToken(value) ? value : Number(value);
          if (v) {
            if (!settings.purchase) {
              settings.purchase = {};
            }
            settings.purchase[k] = v;
          }
        } else {
          if (!settings.purchase) {
            settings.purchase = {};
          }
          settings.purchase[k] = purchase[k];
        }
      }
    }
  );

  if (purchasePropertiesType === 'json') {
    data = addToEntityFromVariables(
      {},
      purchasePropertiesJsonPairs.filter((p) => p.key || p.value)
    );

    if (Object.keys(data).length === 0) {
      data = null;
    }
  } else {
    try {
      data = JSON.parse(purchasePropertiesRaw);
    } catch {
      data = purchasePropertiesRaw;
    }
  }
  if (data) {
    if (!settings.purchase) {
      settings.purchase = {};
    }
    settings.purchase.properties = data;
  }

  return settings;
};
