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

//const words = admin.database().ref().child('words');


/** API.AI Actions {@link https://api.ai/docs/actions-and-parameters#actions} */
const Actions = {
  GIVE_WORD: 'give.word',
  LEARN_ENGLISH_YES: 'Learn_english.Learn_english-yes',
  GIVE_EXAMPLE_YES: 'give.example.yes',
  MORE_INFO_YES: 'more.info.yes',
  TEST_LEARNING: 'test.learning',
  CHECK_ANSWER: 'check.answer',
  TEST_KNOWLEDGE: 'test.Knowledge.yes',
  WANT_TO_TEST: 'want.to.test'
};
/** API.AI Parameters {@link https://api.ai/docs/actions-and-parameters#parameters} */
const Parameters = {
  ANSWER: 'any'
};
/** API.AI Contexts {@link https://api.ai/docs/contexts} */
const Contexts = {
  //CHECK_USER: 'check_user'
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
	var username = dbPhnNo.child(phnNumber).once('value').then(function(snapshot) {
	  return (snapshot.val() && snapshot.val().name) || '';
	});
	if(username != '') {
		app.tell('this is first successful api response '+username );
	} else {
		app.tell('this is first successful api response '+phnNumber);
	}
   
  }
  
 /**
 * get word of the day froma json
 * @param {ApiAiApp} app ApiAiApp instance
 * @return {void}
 */
  const getWordOfTheDay = app => {
	/*let text_to_speech = '<speak>'
        + 'Your word of the day is test. '
        + 't.'
		+ 'e.'
		+ 's.'
		+ 't.'
        + '</speak>'
		*/
	let text_to_speech = '<speak>'
        + 'Your word of the day is inevitable. '
        + '<say-as interpret-as="characters">inevitable</say-as>.'
		+ 'It means, an unavoidable event.'
		+ 'Do you want an example to make it more clear?'
        + '</speak>'
	app.ask(text_to_speech);
  }
  
  const getExample = app => {
	let text_to_speech = '<speak>'
        + 'Example would be say <break time="3" />.'
        + 'don\'t argue with the inevitable.'
		+ 'It means, an unavoidable event.'
		+ 'Do you want more info to make it more clear?'
        + '</speak>'
		app.ask(text_to_speech);
  }
  
  const testLearning = app => {
	let text_to_speech = '<speak>'
        + 'Can you spell inevitable for me please?'
        + '</speak>'
		app.ask(text_to_speech);
  }
  
  
  const moreInfo = app => {
  //https://www.google.com.au/imgres?imgurl=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2Foriginals%2Ff9%2F32%2Fa3%2Ff932a34b0f9d2e4cb88d965076ddd5a0.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F74942781274376360%2F&docid=YYjXcI59Brk_PM&tbnid=pI7a4xyAC_BoHM%3A&vet=10ahUKEwj45Y2q4ezWAhWBEbwKHbpbANYQMwgrKAQwBA..i&w=700&h=434&bih=662&biw=1366&q=pamphlet%20example%20politics%20australia&ved=0ahUKEwj45Y2q4ezWAhWBEbwKHbpbANYQMwgrKAQwBA&iact=mrc&uact=8
	let text_to_speech = '<speak>'
        + 'Word inevitable also means "incapable of being avoided or prevented".'
        + 'It can be noun or adjective.'
		+ 'Some of similar words are fateful,inescapable, unavoidable.'
        + '</speak>'
		app.ask(text_to_speech);
  }
  
  const checkAnswer = app => {
	const parameter = Parameters.ANSWER;
    const answer = app.getArgument(parameter);
		app.ask("Your answer is" + answer);
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
actionMap.set(Actions.GIVE_WORD, getWordOfTheDay);
actionMap.set(Actions.LEARN_ENGLISH_YES, getWordOfTheDay);
actionMap.set(Actions.GIVE_EXAMPLE_YES, getExample);
actionMap.set(Actions.TEST_LEARNING, testLearning);
actionMap.set(Actions.TEST_KNOWLEDGE, testLearning);
actionMap.set(Actions.MORE_INFO_YES, moreInfo);
actionMap.set(Actions.CHECK_ANSWER, checkAnswer);
actionMap.set(Actions.WANT_TO_TEST, testLearning);







/**
 * The entry point to handle a http request
 * @param {Request} request An Express like Request object of the HTTP request
 * @param {Response} response An Express like Response object to send back data
 */
exports.testApp  = functions.https.onRequest((request, response) => {
  const app = new ApiAiApp({ request, response });
  console.log(`Request headers: ${JSON.stringify(request.headers)}`);
  console.log(`Request body: ${JSON.stringify(request.body)}`);
  app.handleRequest(actionMap);
});


