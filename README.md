# node-express-mongoose
JWT based authorization &amp; role based authentication. Mongoose to bulkInsert, find &amp; save data. express for setting up the api server.

1. For problem part a & b:

Step 1: Clone the app from repo.
Step 2: npm install
Step 3: node create.data

NOTE: For now the application is configured with my mongodb cluster URL. It can be edited in config.js => mongodbClusterUrl.

2. For part 2:

Only Step 3 will change.
Either do "npm run start" or "npm start" or "node app"

routes:

1. http://localhost:8080/login
2. http://localhost:8080/api/getuser
3. http://localhost:8080/api/getpost
4. http://localhost:8080/admin/users

API's are protected & hence require bearer token in Headers as "Authorization". 
On successful login you get a token that is valid for a given time.

NOTE: By default user with id: 1, 2, 3 will be set as admin, others will be simple users.

Please write me at "rudra.utpal@gmail.com" or call me at "+91 6200557251" for any query.