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
import {
  Content,
  Flex,
  Heading,
  Link,
  ContextualHelp,
  Text,
  View
} from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';

export default function ServerEventParametersFields() {
  return (
    <View>
      <Heading level="3">User Identification</Heading>

      <Content marginBottom="size-150">
        <Text>
          For tying the event to an user you need to fill in either the
          &rsquo;External User ID&rsquo; field, or the &rsquo;Braze User
          Identifier&rsquo; field or the &rsquo;User Alias&rsquo; section.
        </Text>
      </Content>

      <WrappedTextField
        name="user_identification.external_id"
        width="size-4600"
        label="External User ID"
        contextualHelp={
          <ContextualHelp>
            <Heading>Need help?</Heading>
            <Content>
              <p>
                Braze strongly recommends naming user IDs, also referred to as{' '}
                <strong>external_user_ids</strong>, in a UUIDs or GUIDs format.
              </p>
              <p>
                If your <strong>external_user_ids</strong> include names, email
                addresses, timestamps, or incrementors, Braze suggests using a
                new naming method that is more secure so that your user IDs are
                not as easy to guess or impersonate.
              </p>
              <Link>
                <a
                  href="https://www.braze.com/docs/developer_guide/platform_integration_guides/web/analytics/setting_user_ids/#suggested-user-id-naming-convention"
                  rel="noreferrer"
                  target="_blank"
                >
                  Learn more about Suggested user ID naming convention.
                </a>
              </Link>
            </Content>
          </ContextualHelp>
        }
        supportDataElement
      />

      <WrappedTextField
        name="user_identification.braze_id"
        width="size-4600"
        label="Braze User ID"
        supportDataElement
      />

      <Flex alignItems="top" gap="size-50">
        <Heading level="5" margin="0">
          User Alias
        </Heading>

        <ContextualHelp position="relative" top="-0.1rem">
          <Heading>Need help?</Heading>
          <Content>
            <p>
              An alias serves as an alternative unique user identifier. Use
              aliases to identify users along different dimensions than your
              core user ID.
            </p>
            <p>
              The user alias object consists of two parts: an{' '}
              <strong>alias_name</strong> for the identifier itself, and an{' '}
              <strong>alias_label</strong> indicating the type of alias. Users
              can have multiple aliases with different labels, but only one{' '}
              <strong>alias_name</strong> per <strong>alias_label</strong>.
            </p>
            <p>
              Learn more about{' '}
              <Link>
                <a
                  href="https://www.braze.com/docs/user_guide/data_and_analytics/user_data_collection/user_profile_lifecycle/#user-aliases"
                  target="_blank"
                  rel="noreferrer"
                >
                  User Aliases
                </a>
              </Link>
              .
            </p>
          </Content>
        </ContextualHelp>
      </Flex>

      <WrappedTextField
        name="user_identification.user_alias.alias_name"
        width="size-4600"
        label="Alias Name"
        supportDataElement
      />

      <WrappedTextField
        name="user_identification.user_alias.alias_label"
        width="size-4600"
        label="Alias Label"
        supportDataElement
      />
    </View>
  );
}
