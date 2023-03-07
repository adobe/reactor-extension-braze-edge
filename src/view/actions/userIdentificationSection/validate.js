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

export default ({ user_identification = {} }) => {
  const errors = {};
  const { braze_id, external_id, user_alias } = user_identification;

  const userAliasDefined = Object.keys(user_alias).some((k) => user_alias[k]);

  if (!braze_id && !external_id && !userAliasDefined) {
    errors['user_identification.external_id'] =
      'Please provide either an "External User ID", "Braze User ID", or a user alias.';
  }

  if (userAliasDefined) {
    if (user_alias.alias_name && !user_alias.alias_label) {
      errors['user_identification.user_alias.alias_label'] =
        'Plese provide an alias label.';
    }

    if (!user_alias.alias_name && user_alias.alias_label) {
      errors['user_identification.user_alias.alias_name'] =
        'Plese provide an alias name.';
    }
  }

  return errors;
};
