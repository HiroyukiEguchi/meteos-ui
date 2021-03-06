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

  /**
   * @ngdoc overview
   * @ngname horizon.dashboard.machine_learning.datasets.actions
   *
   * @description
   * Provides all of the actions for datasets.
   */
  angular.module('horizon.dashboard.machine_learning.datasets.actions', ['horizon.framework', 'horizon.dashboard.machine_learning'])
   .run(registerDatasetActions);

  registerDatasetActions.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.dashboard.machine_learning.datasets.create.service',
    'horizon.dashboard.machine_learning.datasets.delete.service',
    'horizon.dashboard.machine_learning.datasets.resourceType',
  ];

  function registerDatasetActions(
    registry,
    gettext,
    createDatasetService,
    deleteDatasetService,
    resourceType)
  {
    var datasetsResourceType = registry.getResourceType(resourceType);

    datasetsResourceType.globalActions
      .append({
        id: 'createDatasetAction',
        service: createDatasetService,
        template: {
          type: 'create',
          text: gettext('Create Dataset')
        }
      });

    datasetsResourceType.batchActions
      .append({
        id: 'batchDeleteDatasetAction',
        service: deleteDatasetService,
        template: {
          type: 'delete-selected',
          text: gettext('Delete Datasets')
        }
      });
  }

})();
