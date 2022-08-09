# JANE THERAPIST

# Description
Jane is a clinical therapist and wants her clients to answer simple questionnaires in order to better understand them. She needs a way to add/delete/edit questions and also see the answers of each client.

## Prerequites

- React
- Typescript
- JSON-SERVER
- SCSS

# Enviroment Variables
REACT_APP_BACKEND_API_URL = http://localhost:3000

# Running the Project
cd janet-therapist

install all dependencies
$ yarn 

then make sure the correct values have been set in the .env file (create a .env file after cloning, in the root of the project). You can run the following command to create the .env file.

$yarn start


start JSON-SERVER
$ cd src/services/database 
$ npx json-server --watch db.json

# Login as admin
janet@limbic.com
Enter a password that the frontend validates. Example: OfuU5050@@##

Within the DB files, you'd find all the users. As long as they exists in the database enter a password that
frontend validates. Example: IfeMe@@##
