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
   * @ngdoc controller
   * @name createModelSpecController
   * @ngController
   * @description
   * Controller for the model spec step in create workflow
   */
  angular
    .module('horizon.dashboard.machine_learning.models')
    .controller('createModelSpecController', createModelSpecController);

  createModelSpecController.$inject = [
    '$scope',
    'horizon.framework.util.i18n.gettext'
  ];

  function createModelSpecController($scope, gettext) {
    var ctrl = this;

    ctrl.modelTypeOptions = [
      'LogisticRegression',
      'DecisionTreeRegression',
      'LinearRegression',
      'KMeans',
      'Recommendation',
      'Word2Vec',
      'FPGrowth'
    ];

    ctrl.modelFormatOptions = [
      { label: gettext('CSV'), value: 'csv' },
      { label: gettext('LibSVM'), value: 'libsvm' },
      { label: gettext('Text'), value: 'text' }
    ];

  }
})();
