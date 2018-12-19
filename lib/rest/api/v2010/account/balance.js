'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var Page = require('../../../../base/Page');  /* jshint ignore:line */
var values = require('../../../../base/values');  /* jshint ignore:line */

var BalanceList;
var BalancePage;
var BalanceInstance;

/* jshint ignore:start */
/**
 * @description Initialize the BalanceList
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {string} accountSid - Account Sid.
 */
/* jshint ignore:end */
BalanceList = function BalanceList(version, accountSid) {
  /* jshint ignore:start */
  /**
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Api.V2010.AccountContext.BalanceContext}
   */
  /* jshint ignore:end */
  function BalanceListInstance(sid) {
    return BalanceListInstance.get(sid);
  }

  BalanceListInstance._version = version;
  // Path Solution
  BalanceListInstance._solution = {accountSid: accountSid};
  BalanceListInstance._uri = _.template(
    '/Accounts/<%= accountSid %>/Balance.json' // jshint ignore:line
  )(BalanceListInstance._solution);
  /* jshint ignore:start */
  /**
   * fetch a BalanceInstance
   *
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed BalanceInstance
   */
  /* jshint ignore:end */
  BalanceListInstance.fetch = function fetch(callback) {
    var deferred = Q.defer();
    var promise = this._version.fetch({uri: this._uri, method: 'GET'});

    promise = promise.then(function(payload) {
      deferred.resolve(new BalanceInstance(this._version, payload, this._solution.accountSid));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  return BalanceListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the BalancePage
 *
 * @param {V2010} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {BalanceSolution} solution - Path solution
 *
 * @returns BalancePage
 */
/* jshint ignore:end */
BalancePage = function BalancePage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(BalancePage.prototype, Page.prototype);
BalancePage.prototype.constructor = BalancePage;

/* jshint ignore:start */
/**
 * Build an instance of BalanceInstance
 *
 * @param {BalancePayload} payload - Payload response from the API
 *
 * @returns BalanceInstance
 */
/* jshint ignore:end */
BalancePage.prototype.getInstance = function getInstance(payload) {
  return new BalanceInstance(this._version, payload, this._solution.accountSid);
};


/* jshint ignore:start */
/**
 * Initialize the BalanceContext
 *
 * @property {string} accountSid - Account Sid.
 * @property {string} balance - Account balance
 * @property {string} currency - Currency units
 *
 * @param {V2010} version - Version of the resource
 * @param {BalancePayload} payload - The instance payload
 * @param {sid} accountSid - Account Sid.
 */
/* jshint ignore:end */
BalanceInstance = function BalanceInstance(version, payload, accountSid) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.balance = payload.balance; // jshint ignore:line
  this.currency = payload.currency; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {accountSid: accountSid, };
};

/* jshint ignore:start */
/**
 * Produce a plain JSON object version of the BalanceInstance for serialization.
 * Removes any circular references in the object.
 *
 * @returns Object
 */
/* jshint ignore:end */
BalanceInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

module.exports = {
  BalanceList: BalanceList,
  BalancePage: BalancePage,
  BalanceInstance: BalanceInstance
};