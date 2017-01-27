/**
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

(function() {
  'use strict';

  angular
    .module('horizon.dashboard.machine_learning.models')
    .factory('horizon.dashboard.machine_learning.models.modelModel', modelModel);

  modelModel.$inject = [
    'horizon.app.core.openstack-service-api.meteos'
  ];

  function modelModel(meteos) {
    var model = {
      newModelSpec: {},

      // API methods
      init: init,
      createModel: createModel
    };

    function initNewModelSpec() {
      model.newModelSpec = {
        display_name: null,
        display_description: null,
        source_dataset_url: null,
        dataset_format: null,
        experiment_id: null,
        model_type: null,
        model_params: null,
        swift_tenant: null,
        swift_username: null,
        swift_password: null
      };
    }

    function init() {
      // Reset the new Model spec
      initNewModelSpec();
    }

    function createModel() {
      var finalSpec = angular.copy(model.newModelSpec);

      cleanNullProperties(finalSpec);

      return meteos.createModel(finalSpec);
    }

    function cleanNullProperties(finalSpec) {
      // Initially clean fields that don't have any value.
      // Not only "null", blank too.
      for (var key in finalSpec) {
        if (finalSpec.hasOwnProperty(key) && finalSpec[key] === null
            || finalSpec[key] === "") {
          delete finalSpec[key];
        }
      }
    }

    return model;
  }
})();