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
  START_LEARNING: 'start.learning',
  CHECK_CATEGORY: 'check.category',
  GIVE_WORD: 'give.word',
  TEST_WORD: 'test.word',
  CHECK_ANSWER: 'check.answer'
};
/** API.AI Parameters {@link https://api.ai/docs/actions-and-parameters#parameters} */
const Parameters = {
    CATEGORY: 'learn-category',
	ANY :'any',
	ANYTHING :'anything',
	ANSWER: 'answer'
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
	//if(answer == 'opal') { 
		let text_to_speech = '<speak>'
			+ 'Well done Priya!Here is the next one.'
			+ '<break time="1" />Can you spell opal?'
			+ '</speak>'
		app.ask(text_to_speech);
	//}
  }
  
	const testWord = app => {
		const parameter = Parameters.ANYTHING;
		const answer = app.getArgument(parameter);
		//app.ask("Your answer is" + answer);
		if(answer == 'opal') {
			let text_to_speech = '<speak>'
			+ 'Well done Priya!".'
			+ '<break time="1" />Other words related to public transport and opal are.'
			+ 'Tap on.'
			+ 'Tap off.'
			+ 'bus.'
			+ 'train.'
			+ 'station.'
			+ '<break time="1" />Do you want to proceed?'
			+ '</speak>'
			app.ask(text_to_speech);
		} else {
			let text_to_speech = '<speak>'
			+ 'Your answered ' + answer + '.Good Try, but the correct spelling is ' 
			+ '<break time="1" />o.'
			+ '<break time="1" />p.'
			+ '<break time="1" />a.'
			+ '<break time="1" />l.'
			+ 'Do you want to try again?'
			+ '</speak>'
			app.ask(text_to_speech);
		}
	}
  
   const  checkCategory   = app => {
	let text_to_speech = '<speak>'
        + 'Great! would you like to learn about?'
		+ 'Public Transport like trains and buses.'
		+ 'or <break time="1" />Directions. '
		+ 'or <break time="1" />Cars, taxis.'
		+ '<break time="1" />or Something else.'
        + '</speak>'
	app.ask(text_to_speech);
	}
 const giveWord   = app => {
	//const parameter = Parameters.ANY;
    //const answer = app.getArgument(parameter);
	let text_to_speech = '<speak>'
        + 'Awesome! Let\'s learn about opal cards. '
		+ '<break time="1" />They are smartcard tickets that you keep,relaod and reuse to pay for travel on public transport in NSW.'
		+ '<break time="1" />Spelled as '
		+ '<break time="1" />o.'
		+ '<break time="1" />p.'
		+ '<break time="1" />a.'
		+ '<break time="1" />l.'
		+ '<break time="1" />Can you spell opal?'
        + '</speak>'
	app.ask(text_to_speech);
	/*if ( answer == 'Groceries' || answer == 'Transport' || answer == 'Payment') {
		if(answer == 'Groceries') {
			word = 'trolly';	
		} else if(answer == 'Transport') {
			word = 'opal';
		} else if(answer == 'Payment') {
			word = 'receipt';
		}
		return app.ask("Awesome! Let's learn about " + word );
	}
	return app.ask("Sorry i can't help you with " + answer  + "now. But will add this category for future.");*/
 }
/**
 * start learning
 * @param {ApiAiApp} app ApiAiApp instance
 * @return {void}
 */
const startLearning = app => {

/*const richResponse = app.buildRichResponse()
      .addSimpleResponse('What would you like to learn?')
      .addSuggestions(['Groceries', 'Transport', 'Payment']);*/

    return app.ask('What would you like to learn?');
/*


const screenOutput = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
   app.askWithList(
	 app.buildRichResponse()
    .addSimpleResponse('What would you like to learn?')
    .addSuggestions(
      ['List']),
    // Build a list
    app.buildList('Things to learn about')
    // Add the first item to the list
    .addItems(app.buildOptionItem('GROCERIES',
      ['supermarket','food shop', 'foodstuffs'])
      .setTitle('Groceries')
      .setDescription('words and items come across while shopping..')
    // Add the second item to the list
    .addItems(app.buildOptionItem('TRANSPORT',
      ['travel', 'transit', 'conveyance'])
      .setTitle('Transport')
      .setDescription('common words come across while travelling')
    )
    // Add third item to the list
    .addItems(app.buildOptionItem('PAYMENT_RELATED',
      ['payment', 'deposit', 'refund'])
      .setTitle('Payment')
      .setDescription('common words come across while payment')
    )
  ));*/
};

/** @type {Map<string, function(ApiAiApp): void>} */
const actionMap = new Map();
actionMap.set(Actions.START_LEARNING, startLearning);
actionMap.set(Actions.CHECK_CATEGORY, checkCategory );
actionMap.set(Actions.GIVE_WORD, giveWord);
actionMap.set(Actions.TEST_WORD, testWord);
actionMap.set(Actions.CHECK_ANSWER, checkAnswer);


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


