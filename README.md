## React Native Coding Challenge

### Instructions

1. Add the following inside and `.env` file in the `backend` directory:

```.env
PORT=8000
HOST=0.0.0.0
MONGO_URL=mongodb://therapy_app:sq3UYK7FqBTuJ8e@ds115434.mlab.com:15434/therapy-questions-answers
```

This will make it easier to test the app as there are some sample data to play with.

2. Install backend dependencies by running `npm install` inside the `backend` directory.

3. Install frontend dependencies by running `yarn` inside the `TherapyApp` directory.

4. Start GraphQL service by running `npm run start` inside the `backend` directory.

5. Start frontend app in an emulator by running `npx react-native run-ios` for iOS or `npx react-native run-android` for Android.

### Implemented Features

A Therapist page that lets you

- See a list of questions
- Add a new question
- Edit a question
- Delete a question
- See a list of clients
- See a client's answers

A Client page that lets you

- Answer questions

A dummy login page with 2 buttons that lead to either Client or Therapist pages.

### TODO

- Persist data locally
- Add answer types for questions
- Add pagination (cursor based) for Answers, Questions and Clients
- Add proper login and session tokens
- Add Dataloader
- Optimise backend for security and performance
- Add docker, terraform and CI for backend
- Add CI for building frontend
- Add latest node version for backend with nvm
- Convert both frontend and backend to TypeScript
- Add tests
