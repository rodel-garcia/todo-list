Todo list
=========

Basic app just to demonstrate knowledege in specific technologies.


https://user-images.githubusercontent.com/4024589/131122145-4ea3c5a3-5935-41ef-9327-d728e488b41c.mp4

**NOTE**: This app is not using any database, it only save data in memory. 

----------------------
Implementation Details
----------------------

![image](https://user-images.githubusercontent.com/4024589/131126649-9a12e86d-7a8b-4ba1-ae8d-d907a0cb8afc.png)

This following technology is use in order to meet requirements.

- Client:
  - [reactjs 17.2](https://reactjs.org/) (create-react-app w/ typescript template)
  - [react-router-dom 5.2](https://reactrouter.com/)
  - [semantic ui 2.4](https://semantic-ui.com/)
  - [node-sass 6.0](https://github.com/sass/node-sass)
  - [@apollo-client 3.4](https://www.apollographql.com/docs/react)
  
- Server:
  - [nodejs 14.15](https://nodejs.org/)
  - [apollo-server-express 3.1](https://www.npmjs.com/package/apollo-server-express)
  - [express 4.17](https://expressjs.com/)
  - [graphql 15.5](https://graphql.org/)
  - [nodemon 2.0](https://www.npmjs.com/package/nodemon)
  - [uuid 8.3](https://www.npmjs.com/package/uuid)

------------
Installation
-------------

Please make the machine to have nodejs 14 and git installed.

1. Clone this project: 
```
git clone https://github.com/rodel-garcia/todo-list.git
```

2. Navigate to project root and install the package.
```
npm install
```

3. The browser is automatically open in http://localhost:3000 serving the app.

**NOTE** This app is using [concurrently](https://www.npmjs.com/package/concurrently) to run both `client` and `server` in single instance.

- client: http://localhost:3000/tasks
- backend: http://localhost:4000/graphql

-------
Testing
-------

from the root directory just simply run `npm run test`.
it only runs **component testing** implemented in client / frontend side, there's no test implemented for local_server / backend.

---------------
Troubleshooting
---------------

- incase having error installing the package, remove the **package-lock.json** and try `npm install` again or, try to navigate to each package and install manually for each:
```
cd client
npm install


cd local_server
npm install
```


