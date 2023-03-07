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

import { Content, Link, Text } from '@adobe/react-spectrum';
import ExtensionView from '../components/extensionView';

import UserIdentificationFields from './userIdentificationSection/fields';
import getUserIdentificationInitValues from './userIdentificationSection/getInitValues';
import getUserIdentificationSettings from './userIdentificationSection/getSettings';
import validateUserIdentificationFields from './userIdentificationSection/validate';

import EventDataFields from './eventDataSection/fields';
import getEventDataInitValues from './eventDataSection/getInitValues';
import getEventDataSettings from './eventDataSection/getSettings';
import validateEventDataFields from './eventDataSection/validate';

import UserAttributesFields from './userAttributesSection/fields';
import getUserAttributesInitValues from './userAttributesSection/getInitValues';
import getUserAttributesSettings from './userAttributesSection/getSettings';
import validateUserAttributesFields from './userAttributesSection/validate';

export default function SendCapiData() {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => ({
        ...getUserIdentificationInitValues(initInfo),
        ...getEventDataInitValues(initInfo),
        ...getUserAttributesInitValues(initInfo)
      })}
      getSettings={({ values }) => ({
        ...getUserIdentificationSettings(values),
        ...getEventDataSettings(values),
        ...getUserAttributesSettings(values)
      })}
      validate={(values) => ({
        ...validateUserIdentificationFields(values),
        ...validateEventDataFields(values),
        ...validateUserAttributesFields(values)
      })}
      render={() => (
        <>
          <Content>
            <Text>These events will be sent to Braze using the</Text>{' '}
            <Link>
              <a
                href="https://www.braze.com/docs/api/endpoints/user_data/post_user_track/"
                target="_blank"
                rel="noreferrer"
              >
                User Track
              </a>
            </Link>{' '}
            endpoint.
          </Content>
          <UserIdentificationFields />
          <EventDataFields />
          <UserAttributesFields />
        </>
      )}
    />
  );
}
