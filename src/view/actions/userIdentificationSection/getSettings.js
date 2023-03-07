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

export default ({ user_identification }) => {
  const result = {};
  ['external_id', 'braze_id'].forEach((key) => {
    if (user_identification[key]) {
      if (!result.user_identification) {
        result.user_identification = {};
      }

      result.user_identification[key] = user_identification[key];
    }
  });

  ['alias_name', 'alias_label'].forEach((key) => {
    if (user_identification?.user_alias[key]) {
      if (!result.user_identification) {
        result.user_identification = {};
      }

      if (!result.user_identification.user_alias) {
        result.user_identification.user_alias = {};
      }

      result.user_identification.user_alias[key] =
        user_identification.user_alias[key];
    }
  });
  return result;
};
