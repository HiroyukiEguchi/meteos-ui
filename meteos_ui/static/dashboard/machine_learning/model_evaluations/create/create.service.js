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
   * @name horizon.dashboard.machine_learning.model_evaluations.create.service
   * @description Service for the model_evaluation create modal
   */
  angular
    .module('horizon.dashboard.machine_learning.model_evaluations')
    .factory('horizon.dashboard.machine_learning.model_evaluations.create.service', createService);

  createService.$inject = [
    '$location',
    'horizon.app.core.openstack-service-api.policy',
    'horizon.framework.util.actions.action-result.service',
    'horizon.framework.util.i18n.gettext',
    'horizon.framework.util.q.extensions',
    'horizon.framework.widgets.modal.wizard-modal.service',
    'horizon.framework.widgets.toast.service',
    'horizon.dashboard.machine_learning.model_evaluations.model_evaluationModel',
    'horizon.dashboard.machine_learning.model_evaluations.events',
    'horizon.dashboard.machine_learning.model_evaluations.resourceType',
    'horizon.dashboard.machine_learning.model_evaluations.workflow'
  ];

  function createService(
    $location, policy, actionResult, gettext, $qExtensions, wizardModalService, toast, model, events, resourceType, createWorkflow
  ) {
    var scope;
    var message = {
      success: gettext('ModelEvaluation %s was successfully created.')
    };

    var service = {
      initAction: initAction,
      perform: perform,
      allowed: allowed
    };

    return service;

    //////////////

    function initAction() {
    }

    function perform(selected, newScope) {
      scope = newScope;
      scope.workflow = createWorkflow;
      scope.model = model;
      scope.model.init();
      // for creation according to selected item
      scope.selected = selected;
      return wizardModalService.modal({
        scope: scope,
        workflow: createWorkflow,
        submit: submit
      }).result;
    }

    function allowed() {
      return $qExtensions.booleanAsPromise(true);
      //return policy.ifAllowed({ rules: [['model_evaluation', 'add_model_evaluation']] });
    }

    function submit(){
      return model.createModelEvaluation().then(success);
    }

    function success(response) {
      response.data.id = response.data.id;
      toast.add('success', interpolate(message.success, [response.data.id]));
      var result = actionResult.getActionResult()
                   .created(resourceType, response.data.id);
      if(result.result.failed.length == 0 && result.result.created.length > 0){
        $location.path('/project/machine_learning/model_evaluations');
      }else{
        return result.result;
      }
    }
  }
})();
