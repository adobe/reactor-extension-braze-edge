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

/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Heading,
  View,
  Link,
  Flex,
  ContextualHelp,
  Content
} from '@adobe/react-spectrum';
import getEmptyDataJson from './getEmptyValue';

import UserAttributesEditor from '../../components/rawJsonEditor';
import UserAttributesRow from './row';
import userAttributesComboboxFields from './userAttributesComboboxFields';

import {
  addToVariablesFromEntity,
  addToEntityFromVariables
} from '../../utils/entityVariablesConverter';

const { getUserAttributeName, getUserAttributeId } =
  userAttributesComboboxFields;

export default function UserAttributesSectionFields() {
  const { setValue, watch } = useFormContext();
  const [userAttributesRaw, userAttributesJsonPairs] = watch([
    'userAttributesRaw',
    'userAttributesJsonPairs'
  ]);

  return (
    <View>
      <Flex alignItems="center" gap="size-75">
        <Heading level="3">User Attributes</Heading>

        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              Any fields in the attributes object will create or update an
              attribute of that name with the given value on the specified user
              profile.
            </p>

            <p>
              Learn more about the{' '}
              <Link>
                <a
                  href="https://www.braze.com/docs/api/objects_filters/user_attributes_object"
                  rel="noreferrer"
                  target="_blank"
                >
                  User attributes object specification
                </a>
              </Link>
              .
            </p>
          </Content>
        </ContextualHelp>
      </Flex>

      <UserAttributesEditor
        label="User Attributes"
        radioLabel="Select the way you want to provide the user atrributes"
        description="A valid JSON object or a data element."
        typeVariable="userAttributesType"
        rawVariable="userAttributesRaw"
        jsonVariable="userAttributesJsonPairs"
        getEmptyJsonValueFn={getEmptyDataJson}
        row={UserAttributesRow}
        onTypeSwitch={(v) => {
          // Auto Update Data Content
          if (v === 'json') {
            let variables = [];
            try {
              variables = addToVariablesFromEntity(
                [],
                JSON.parse(userAttributesRaw)
              ).map(({ key, value }) => ({
                key: getUserAttributeName(key),
                value
              }));
            } catch (e) {
              // Don't do anything
            }

            if (variables.length === 0) {
              variables.push(getEmptyDataJson());
            }

            setValue('userAttributesJsonPairs', variables, {
              shouldValidate: true,
              shouldDirty: true
            });
          } else if (
            userAttributesJsonPairs.length > 1 ||
            userAttributesJsonPairs[0].key
          ) {
            let entity = JSON.stringify(
              addToEntityFromVariables(
                {},
                userAttributesJsonPairs.map(({ key, value }) => ({
                  key: getUserAttributeId(key),
                  value
                }))
              ),
              null,
              2
            );

            if (entity === '{}') {
              entity = '';
            }

            setValue('userAttributesRaw', entity, {
              shouldValidate: true,
              shouldDirty: true
            });
          }
          // END: Auto Update Data Content
        }}
      />
    </View>
  );
}
