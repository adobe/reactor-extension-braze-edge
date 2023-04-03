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
import EventPropertiesEditor from '../../components/rawJsonEditor';
import EventPropertiesRow from './row';

import {
  addToVariablesFromEntity,
  addToEntityFromVariables
} from '../../utils/entityVariablesConverter';

export default function EventDataSectionFields() {
  const { setValue, watch } = useFormContext();
  const [eventPropertiesRaw, eventPropertiesJsonPairs] = watch([
    'eventPropertiesRaw',
    'eventPropertiesJsonPairs'
  ]);

  return (
    <View>
      <Flex alignItems="center" gap="size-75">
        <Heading level="3">Event Data</Heading>

        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              An event object is an object that gets passed through the API when
              a specific event occurs.
            </p>
            <p>
              The event object has many different fields that allow you to
              customize by setting and using event properties in messages, data
              collection, and personalization.
            </p>
            <p>
              Learn more about the{' '}
              <Link>
                <a
                  href="https://www.braze.com/docs/api/objects_filters/event_object/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Event object specification
                </a>
              </Link>
              .
            </p>
          </Content>
        </ContextualHelp>
      </Flex>

      <WrappedTextField
        name="event.name"
        width="size-4600"
        label="Event Name"
        necessityIndicator="label"
        isRequired
        supportDataElement
      />

      <WrappedTextField
        name="event.time"
        width="size-4600"
        label="Event Time"
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
        name="event.app_id"
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

      <EventPropertiesEditor
        label="Event Properties"
        radioLabel="Select the way you want to provide the event data"
        description="A valid JSON object or a data element."
        typeVariable="eventPropertiesType"
        rawVariable="eventPropertiesRaw"
        jsonVariable="eventPropertiesJsonPairs"
        getEmptyJsonValueFn={getEmptyDataJson}
        row={EventPropertiesRow}
        onTypeSwitch={(v) => {
          // Auto Update Data Content
          if (v === 'json') {
            let variables = [];
            try {
              variables = addToVariablesFromEntity(
                [],
                JSON.parse(eventPropertiesRaw)
              );
            } catch (e) {
              // Don't do anything
            }

            if (variables.length === 0) {
              variables.push(getEmptyDataJson());
            }

            setValue('eventPropertiesJsonPairs', variables, {
              shouldValidate: true,
              shouldDirty: true
            });
          } else if (
            eventPropertiesJsonPairs.length > 1 ||
            eventPropertiesJsonPairs[0].key
          ) {
            let entity = JSON.stringify(
              addToEntityFromVariables({}, eventPropertiesJsonPairs),
              null,
              2
            );

            if (entity === '{}') {
              entity = '';
            }

            setValue('eventPropertiesRaw', entity, {
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
