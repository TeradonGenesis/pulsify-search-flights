<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

NestJS API to search for flights using Rapid API

## Running the server locally
1. Install the dependencies
```bash
$ yarn install
```

2. Copy the .env.sample to .env. Then setup your credentials

RAPID_API_KEY=

API_KEY=

4. Build the app and start the app locally
```bash
$ yarn build
$ yarn start
```

## Running the server through docker
1. Setup your credentials in docker-compose.yml
RAPID_API_KEY=
API_KEY=

2. Run the below commands and the server will run in localhost:3000

```bash
$ docker-compose up --build
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Sequence Diagram
![sequence drawio](https://github.com/user-attachments/assets/470d5a08-20a6-4e66-a7c5-8919a0ad4016)

Explanation
1. The user Browser calls the /v1/flights/search/roundtrip in Search Flights API and then this triggers the call to the SkyScanner Rapid API, /flights/search-roundtrip to retrive the flight search results
   
3. The response returned by /flights/search-roundtrip have a status that is complete or incomplete. If its complete, the search results will be returned in the itineraries section. However if the status is incomplete, the itineraries will be empty. This is because the SkyScanner API needs sometime to retrieve all the search results

4. In the event it is incomplete, the Search Flights API will then proceed to call SkyScanner Rapid API /flights/search-incomplete using the session ID retrieved from the previous API call. This is used to retrieve the same search parameters from the previous call.

5. If the status returned by /flights/search-incomplete is still incomplete, it will retry the same API call until it hits the maximum amount of retries (5 tries) or the status finally returns complete. In between each API call, there will be an interval of 5 seconds before it runs the next call.

6. The retry mechanism ensures that in the event the search results is taking too long to return by the SkyScanner API, the results will still be retrieved in the subsequent call. The delay between each API call (intervals) ensures that we are not bombarding or DDOS the SkyScanner API and possible getting our access locked. These control mechanisms can be configured from the .env and is customizable depending on the needs

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
