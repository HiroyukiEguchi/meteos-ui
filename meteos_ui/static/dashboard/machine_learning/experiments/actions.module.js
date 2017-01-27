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
   * @ngname horizon.dashboard.machine_learning.experiments.actions
   *
   * @description
   * Provides all of the actions for experiments.
   */
  angular.module('horizon.dashboard.machine_learning.experiments.actions', ['horizon.framework', 'horizon.dashboard.machine_learning'])
   .run(registerExperimentActions);

  registerExperimentActions.$inject = [
    'horizon.framework.conf.resource-type-registry.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.dashboard.machine_learning.experiments.create.service',
    'horizon.dashboard.machine_learning.experiments.delete.service',
    'horizon.dashboard.machine_learning.experiments.resourceType',
  ];

  function registerExperimentActions(
    registry,
    gettext,
    createExperimentService,
    deleteExperimentService,
    resourceType)
  {
    var experimentsResourceType = registry.getResourceType(resourceType);

    experimentsResourceType.globalActions
      .append({
        id: 'createExperimentAction',
        service: createExperimentService,
        template: {
          type: 'create',
          text: gettext('Create Experiment')
        }
      });

    experimentsResourceType.batchActions
      .append({
        id: 'batchDeleteExperimentAction',
        service: deleteExperimentService,
        template: {
          type: 'delete-selected',
          text: gettext('Delete Experiments')
        }
      });
  }

})();
