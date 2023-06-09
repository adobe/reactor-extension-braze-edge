/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/* eslint-disable camelcase */

const sendEvent = require('../sendEvent');
const arc = {};

describe('Send Braze Event module', () => {
  test('makes a fetch call to the provided url', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      restUrl: 'https://someurl.com',
      apiKey: 'token'
    };

    const settings = {
      user_identification: {
        external_id: 'external id'
      },
      event: {
        time: '12345',
        name: 'event name',
        properties: {
          'custom property': '1'
        }
      },
      attributes: {
        language: 'en'
      }
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    return sendEvent({ arc, utils }).then(() => {
      expect(fetch).toHaveBeenCalledWith('https://someurl.com/users/track', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer token'
        },
        body:
          '{' +
          '"partner":"adobe",' +
          '"events":[' +
          '{' +
          '"time":"12345",' +
          '"name":"event name",' +
          '"properties":{"custom property":"1"},' +
          '"external_id":"external id"' +
          '}' +
          '],' +
          '"attributes":[' +
          '{' +
          '"language":"en",' +
          '"external_id":"external id"' +
          '}' +
          ']' +
          '}'
      });
    });
  });
});
