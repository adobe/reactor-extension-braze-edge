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

const userAttributes = [
  { id: 'first_name', name: 'First Name' },
  { id: 'last_name', name: 'Last Name' },
  { id: 'phone', name: 'Phone' },
  { id: 'email', name: 'Email' },
  { id: 'gender', name: 'Gender' },
  { id: 'city', name: 'City' },
  { id: 'country', name: 'Country' },
  { id: 'language', name: 'Language' },
  { id: 'dob', name: 'Date of Birth' },
  { id: 'time_zone', name: 'Time Zone' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'twitter', name: 'Twitter' }
];

const userAttributesIdsMap = userAttributes.reduce(
  (previousValue, currentValue) => {
    previousValue[currentValue.id] = currentValue.name;
    return previousValue;
  },
  {}
);

const userAttributesNamesMap = userAttributes.reduce(
  (previousValue, currentValue) => {
    previousValue[currentValue.name] = currentValue.id;
    return previousValue;
  },
  {}
);
export default {
  getUserAttributeId: (name) => userAttributesNamesMap[name] || name,
  getUserAttributeName: (id) => userAttributesIdsMap[id] || id,
  getUserAttributesNames: () =>
    userAttributes.map((userAttribute) => userAttribute.name)
};
