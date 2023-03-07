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

const buildFetchObject = ({
  apiKey,
  user_identification,
  event,
  attributes
}) => {
  const body = {};

  if (event) {
    body.events = [
      {
        ...event,
        ...user_identification
      }
    ];
  }

  if (attributes) {
    body.attributes = [
      {
        ...attributes,
        ...user_identification
      }
    ];
  }

  return {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  };
};

const buildUrl = (restUrl) => {
  let separator = '/';
  if (restUrl.substr(-1) === '/') {
    separator = '';
  }

  return `${restUrl}${separator}users/track`;
};

module.exports = async ({ utils }) => {
  const { getExtensionSettings, getSettings, fetch } = utils;
  const { restUrl, apiKey } = getExtensionSettings();
  const { user_identification, event, attributes } = getSettings();

  return fetch(
    buildUrl(restUrl),
    buildFetchObject({ apiKey, user_identification, event, attributes })
  );
};
