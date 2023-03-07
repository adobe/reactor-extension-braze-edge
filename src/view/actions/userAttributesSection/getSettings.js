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
import userAttributesComboboxFields from './userAttributesComboboxFields';

const { getUserAttributeId } = userAttributesComboboxFields;

export default ({
  userAttributesType,
  userAttributesRaw,
  userAttributesJsonPairs
}) => {
  let data;
  const settings = {};

  if (userAttributesType === 'json') {
    data = addToEntityFromVariables(
      {},
      userAttributesJsonPairs
        .filter((p) => p.key || p.value)
        .map(({ key, value }) => ({ key: getUserAttributeId(key), value }))
    );

    if (Object.keys(data).length === 0) {
      data = null;
    }
  } else {
    try {
      data = JSON.parse(userAttributesRaw);
    } catch {
      data = userAttributesRaw;
    }
  }

  if (data) {
    settings.attributes = Object.entries(data).reduce((acc, [k, v]) => {
      acc[getUserAttributeId(k)] = v;
      return acc;
    }, {});
  }

  return settings;
};
