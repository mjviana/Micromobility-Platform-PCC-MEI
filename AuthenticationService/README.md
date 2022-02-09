# Introduction 
This is a NodeJs project that is responsible for: 
  - Register new users
  - Sign up users
  - Recover password

<h3 align="left">Used Languages and Tools:</h3>
<p align="left"> 
  </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
  <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> <a> 
  <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> 
  <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> </p>

# Build and Test

Talk to [Mário Viana](mailto:a13728@alunos.ipca.p) if you need help to setup the project

1.  At the root of the project create a .env file
2.  In the .env file put the MongoDb connection string: <br> <code> MONGO_URI=mongodb://mongodb:27017/Micromobility</code>
3.  In the .env file put the SendGrid API Key: <br> <code>SG_APIKEY = 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</code>
4.  In the .env file put the JWT Scret:<br> <code>JWT_SECRET = SUPER_SECRET_JWT_kEY_THAT_NO_ONE_WILL_DISCOVER</code>
5.	run command <code>npm install -g</code>  
6.	run command <code>npm start</code>

<p>The .env file should look like this: </p> 

![env file](./assets/images/.env_file.jpg ".env file")

# Project Structure
![project structure](./assets/images/project_structure.jpg "project structure")