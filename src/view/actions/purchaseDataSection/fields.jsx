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

import WrappedTextField from '../../components/wrappedTextField';
import PurchasePropertiesEditor from '../../components/rawJsonEditor';
import PurchasePropertiesRow from './row';

import {
  addToVariablesFromEntity,
  addToEntityFromVariables
} from '../../utils/entityVariablesConverter';

export default function PurchaseDataSectionFields() {
  const { setValue, watch } = useFormContext();
  const [purchasePropertiesRaw, purchasePropertiesJsonPairs] = watch([
    'purchasePropertiesRaw',
    'purchasePropertiesJsonPairs'
  ]);

  return (
    <View>
      <Flex alignItems="center" gap="size-75">
        <Heading level="3">Purchase Data</Heading>

        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              A purchase object is an object that gets passed through the API
              when a purchase has been made.
            </p>
            <p>
              The purchase object has many different fields that allow Braze’s
              backend to store and use this information for customization, data
              collection, and personalization.
            </p>
            <p>
              Learn more about the{' '}
              <Link>
                <a
                  href="https://www.braze.com/docs/api/objects_filters/purchase_object/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Purchase object specification
                </a>
              </Link>
              .
            </p>
          </Content>
        </ContextualHelp>
      </Flex>

      <WrappedTextField
        name="purchase.product_id"
        width="size-4600"
        label="Product ID"
        necessityIndicator="label"
        isRequired
        supportDataElement
      />

      <WrappedTextField
        name="purchase.time"
        width="size-4600"
        label="Purchase Time"
        necessityIndicator="label"
        isRequired
        description={
          <span>
            Date as a string in{' '}
            <Link>
              <a
                href="https://en.wikipedia.org/wiki/ISO_8601"
                rel="noreferrer"
                target="_blank"
              >
                ISO 8601
              </a>
            </Link>{' '}
            format.
          </span>
        }
        supportDataElement
      />

      <WrappedTextField
        name="purchase.currency"
        width="size-4600"
        label="Currency"
        necessityIndicator="label"
        isRequired
        description={
          <span>
            Currency as a string in{' '}
            <Link>
              <a
                href="https://en.wikipedia.org/wiki/ISO_4217"
                rel="noreferrer"
                target="_blank"
              >
                ISO 4217 Alphabetic Currency Code
              </a>
            </Link>{' '}
            format.
          </span>
        }
        supportDataElement
      />

      <WrappedTextField
        name="purchase.price"
        width="size-4600"
        label="Price"
        necessityIndicator="label"
        isRequired
        supportDataElement
      />

      <WrappedTextField
        name="purchase.quantity"
        width="size-4600"
        label="Quantity"
        contextualHelp={
          <ContextualHelp>
            <Heading>Need help?</Heading>
            <Content>
              <p>
                Currently, Braze treats a quantity <strong>X</strong> as{' '}
                <strong>X</strong> separate purchases with quantity 1.
              </p>
            </Content>
          </ContextualHelp>
        }
        description={
          <span>
            If not provided, the default value will be 1. The maximum value must
            be lower than 100.
          </span>
        }
        supportDataElement
      />

      <WrappedTextField
        name="purchase.app_id"
        width="size-4600"
        label="App Identifier"
        supportDataElement
        contextualHelp={
          <ContextualHelp>
            <Heading>Need help?</Heading>
            <Content>
              <p>
                The App Identifier or <strong>app_id</strong> is a parameter
                associating activity with a specific app in your app group. It
                designates which app within the app group you are interacting
                with.
              </p>
              <p>
                For example, you will find that you will have an{' '}
                <strong>app_id</strong> for your iOS app, an app_id for your
                Android app, and an <strong>app_id</strong> for your web
                integration. At Braze, you might find that you have multiple
                apps for the same platform across the various platform types
                that Braze supports.
              </p>
              <p>
                Learn more about the{' '}
                <Link>
                  <a
                    href="https://www.braze.com/docs/api/identifier_types/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    API identifier types
                  </a>
                </Link>
                .
              </p>
            </Content>
          </ContextualHelp>
        }
      />

      <PurchasePropertiesEditor
        label="Purchase Properties"
        radioLabel="Select the way you want to provide the purchase data"
        description="A valid JSON object or a data element."
        typeVariable="purchasePropertiesType"
        rawVariable="purchasePropertiesRaw"
        jsonVariable="purchasePropertiesJsonPairs"
        getEmptyJsonValueFn={getEmptyDataJson}
        row={PurchasePropertiesRow}
        onTypeSwitch={(v) => {
          // Auto Update Data Content
          if (v === 'json') {
            let variables = [];
            try {
              variables = addToVariablesFromEntity(
                [],
                JSON.parse(purchasePropertiesRaw)
              );
            } catch (e) {
              // Don't do anything
            }

            if (variables.length === 0) {
              variables.push(getEmptyDataJson());
            }

            setValue('purchasePropertiesJsonPairs', variables, {
              shouldValidate: true,
              shouldDirty: true
            });
          } else if (
            purchasePropertiesJsonPairs.length > 1 ||
            purchasePropertiesJsonPairs[0].key
          ) {
            let entity = JSON.stringify(
              addToEntityFromVariables({}, purchasePropertiesJsonPairs),
              null,
              2
            );

            if (entity === '{}') {
              entity = '';
            }

            setValue('purchasePropertiesRaw', entity, {
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
