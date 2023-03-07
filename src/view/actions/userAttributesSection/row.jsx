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

import React from 'react';

import { ActionButton, Flex, View } from '@adobe/react-spectrum';
import Delete from '@spectrum-icons/workflow/Delete';
import WrappedField from '../../components/wrappedTextField';
import WrappedComboboxField from '../../components/wrappedComboBox';
import fieldsData from './userAttributesFields';
import userAttributesComboboxFields from './userAttributesComboboxFields';

const { getUserAttributesNames, getUserAttributeId } =
  userAttributesComboboxFields;

export default function UserAttributesSectionRow(
  remove,
  currentJsonPairs,
  variable,
  index,
  variables
) {
  const { id, key, value } = variable;
  const {
    [index]: { key: currentKey }
  } = currentJsonPairs;

  const { description, contextualHelp, render } =
    fieldsData[getUserAttributeId(currentKey)] || {};
  return (
    <Flex direction="row" gap="size-200" key={`data${id}`}>
      <View flex>
        <WrappedComboboxField
          name={`userAttributesJsonPairs.${index}.key`}
          defaultValue={key}
          aria-label={`User Attribute JSON Key ${index}`}
          width="100%"
          supportDataElement
          allowsCustomValue
          defaultItems={getUserAttributesNames().map((k) => ({
            id: k,
            name: k
          }))}
        />
      </View>
      <View flex>
        {render?.({
          description
        }) || (
          <WrappedField
            name={`userAttributesJsonPairs.${index}.value`}
            defaultValue={value}
            aria-label={`User Attribute JSON Value ${index}`}
            width="100%"
            description={description}
            contextualHelp={contextualHelp}
            supportDataElement
          />
        )}
      </View>
      <View width="size-450">
        {variables.length > 1 && (
          <ActionButton
            aria-label={`Delete User Attribute JSON Row ${index}`}
            isQuiet
            onPress={() => {
              remove(index);
            }}
          >
            <Delete />
          </ActionButton>
        )}
      </View>
    </Flex>
  );
}
