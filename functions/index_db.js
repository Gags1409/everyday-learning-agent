// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const { ApiAiApp } = require('actions-on-google');
const functions = require('firebase-functions');
process.env.DEBUG = 'actions-on-google:*';
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var Client = require('node-rest-client').Client;

const users = admin.database().ref('/words');
const wordAtt = users.child('word');

/** API.AI Actions {@link https://api.ai/docs/actions-and-parameters#actions} */
const Actions = {
  ADD_MEMBER: 'Add_member',
  CHECK_PHONE_NUMBER: 'check_phone_number'
};
/** API.AI Parameters {@link https://api.ai/docs/actions-and-parameters#parameters} */
const Parameters = {
  PHONE_NUMBER: 'phone-number'
};
/** API.AI Contexts {@link https://api.ai/docs/contexts} */
const Contexts = {
  CHECK_USER: 'check_user'
};
/** API.AI Context Lifespans {@link https://api.ai/docs/contexts#lifespan} */
const Lifespans = {
  DEFAULT: 5,
  END: 0
};


/**
 * Say a fact
 * @param {ApiAiApp} app ApiAiApp instance
 * @return {void}
 */
const checkPhoneNumber = app => {
  const parameter = Parameters.PHONE_NUMBER;
  /** @type {string} */
  const phnNumber = app.getArgument(parameter);
	console.log("its here");
	var username = wordAtt.child('test').once('value').then(function(snapshot) {
	  return (snapshot.val() && snapshot.val().timestamp) || '';
	});
	if(username != '') {
		app.tell('this is first successful api response '+username );
	} else {
		app.tell('this is first successful api response '+phnNumber);
	}
   
  }
  

/**
 * Say a cat fact
 * @param {ApiAiApp} app ApiAiApp instance
 * @return {void}
 */
const addMember = app => {
  app.tell('this is first successful api add member response');
};

/** @type {Map<string, function(ApiAiApp): void>} */
const actionMap = new Map();
actionMap.set(Actions.ADD_MEMBER, addMember);
actionMap.set(Actions.CHECK_PHONE_NUMBER, checkPhoneNumber);

/**
 * The entry point to handle a http request
 * @param {Request} request An Express like Request object of the HTTP request
 * @param {Response} response An Express like Response object to send back data
 */
exports.testApp  = functions.https.onRequest((request, response) => {
   var client = new Client();
 var args = {
    headers: { "X-Mashape-Authorization": "GDFKAXOlDmmsh3LVxDALn1JEyqTxp1PnnfZjsnS5Cz9pUkC" }
};
// direct way 
client.get("https://wordsapiv1.p.mashape.com/words/example", args , function (data, response) {
    // parsed response body as js object 
    console.log("api res..",data);
    // raw response 
    console.log(response);
});
  /** @type {string} */
  const phnNumber = '0123456789';
	console.log("its here");
	    admin.database().ref().child('words').orderByChild('word').equalTo('test').once('value', snap => {
                const node = snap.val();
				 console.log("node" , node);
                /*if (node.name) {
                     console.log("node.name" , node.name);
                } else {
                    console.log("no name");
                }*/
            });
	
	/*console.log("username..",username);
	if(username != '') {
		console.log('this is first successful api response '+username );
	} else {
		console.log('this is first successful api response '+phnNumber);
	}*/
});


