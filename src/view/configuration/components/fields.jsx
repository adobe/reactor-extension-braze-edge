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
  Link,
  TextField,
  ContextualHelp,
  Heading
} from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';

export default function ConfigurationFields() {
  return (
    <Flex direction="column" gap="size-65">
      <WrappedTextField
        name="restUrl"
        component={TextField}
        width="size-4600"
        label="Braze Rest Endpoint URL"
        isRequired
        necessityIndicator="label"
        supportDataElement
        contextualHelp={
          <ContextualHelp>
            <Heading>Need help?</Heading>
            <Content>
              <p>
                Braze manages several clusters. Use the correct REST endpoint
                based on which instance you are provisioned to.
              </p>
              <p>
                Find out your instance by talking to your Braze onboarding
                manager.
              </p>
              <p>
                Or you can log in to your Braze dashboard and copy the URL from
                your browser address bar. Then, go to the{' '}
                <Link>
                  <a
                    href="https://www.braze.com/docs/user_guide/administrative/access_braze/braze_instances"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Braze instances
                  </a>
                </Link>{' '}
                page and find the instance that matches your dashboard URL.
              </p>
            </Content>
          </ContextualHelp>
        }
      />

      <WrappedTextField
        name="apiKey"
        component={TextField}
        width="size-4600"
        label="API Key"
        isRequired
        necessityIndicator="label"
        supportDataElement
        contextualHelp={
          <ContextualHelp>
            <Heading>Need help?</Heading>
            <Content>
              <p>
                An API key is included in each request as a request header and
                acts as an authentication key that allows you to utilize
                Braze&rsquo;s REST APIs
              </p>
              <Link>
                <a
                  href="https://www.braze.com/docs/api/basics/#rest-api-key"
                  rel="noreferrer"
                  target="_blank"
                >
                  Learn how to generate a REST API key from inside Braze
                  dashboard.
                </a>
              </Link>
            </Content>
          </ContextualHelp>
        }
      />
    </Flex>
  );
}
