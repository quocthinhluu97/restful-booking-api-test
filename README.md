<a id="readme-top"></a>
<br />
<div align="center">
  <h3 align="center">Restful Booking API Test</h3>

  <p align="center">
    An API automation test project written using Vitest
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Here's why I picked [Vitest](https://vitest.dev/guide/why) for this project:
* Instant watchmode
* Built-in assertions
* I want to try something new

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

How to install
* Install npm
  ```sh
  npm install npm@latest -g
  ```
* Verify the npm version in the environment
  ```sh
  npm -v 
  ```
* Install nodejs on Windows _Require node v20 or later_
  ```sh
  choco install nodejs-lts --version="20.16.0"
  ```
* Verify the node version in the environment
  ```sh
  node -v 
  ```
_For more information, please refer to [Official Nodejs Download Guide](https://nodejs.org/en/download/package-manager)_
<br>

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/quocthinhluu97/restful-booking-api-test.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```
4. (**Optional**) to open test report artifacts from Github Actions, you should install allure-command module globally
   ```sh
   npm install -g allure-commandline
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
* Run all test suites (specifically on Windows) and show an HTML report
   ```sh
   npm run test     
   ```

* Run all test suites but watch for changes and rerun tests when they change
   ```sh
   npx vitest
   ```
* Open test report
   ```sh
   npx allure open [REPORT_FOLDER]
   ```

_For more examples, please refer to the [Documentation](https://vitest.dev/guide/cli)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>


