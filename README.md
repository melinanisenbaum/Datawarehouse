# Datawarehouse
Acamica's 3rd Proyect

Data Warehouse Desktop
Fullstack Project of the Full Stack Web Development course by Acámica.

Used technology
Node.js
Nodemon Library
Express Library
Sequelize Library
Json Web Token (JWT)
MySQL
Postman
Swagger
Html
Css
JS

Step 1: Clone Project:
Clone repository from next link

Open terminal and run: mkdir datawarehouse git clone https://github.com/melinanisenbaum/Datawarehouse.git

Step 2: Install dependencies
In the root directory backend and frontend where the project was cloned run from the terminal:
npm install

Step 3: Set environment variables
Open file .env located inside the main folder and replace the config variables as you need.

Step 4: Create the database
You will need a MySQL editor as Workbench , to download it please go to this link: https://dev.mysql.com/downloads/workbench/
Open file db.sql located inside the database folder store inside the backend folder.
The file can be imported or its content can be copied and pasted into the SQL tab
You can run npm run database from the project root backend to create the whole database from the console and wait a few seconds while everything is configured

Step 5: Start the server
From the terminal located at the root of the project backend, execute:
npm run start

From the terminal located at the root of the project frontend, views:
open index.html

Step 6: Query the API
If you do not have Postman installed, please go to this link
Open Postman, Import the file datawarehouseAPI.postman_collection.json and view the tested queries.

API documentation
To view the API documentation, you can open the file spec.yaml located in the root directory/backend of the project.
