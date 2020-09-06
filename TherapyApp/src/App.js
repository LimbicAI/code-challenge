/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

import LoginScreen from './screens/Login';
import ClientHomeScreen from './screens/HomeClient';
import TherapistHomeScreen from './screens/HomeTherapist';
import TherapistClientsScreen from './screens/TherapistClients';
import TherapistClientScreen from './screens/TherapistClient';
import TherapistQuestionsScreen from './screens/TherapistQuestions';
import TherapistQuestionScreen from './screens/TherapistQuestion';
import AnswerQuestionScreen from './screens/AnswerQuestion';

const Stack = createStackNavigator();

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="Client Home"
            component={ClientHomeScreen}
            options={{title: 'Client', headerBackTitle: 'Log out'}}
          />
          <Stack.Screen
            name="Therapist Home"
            component={TherapistHomeScreen}
            options={{title: 'Therapist', headerBackTitle: 'Log out'}}
          />
          <Stack.Screen
            name="Therapist Clients"
            component={TherapistClientsScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="Therapist Client"
            component={TherapistClientScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="Therapist Questions"
            component={TherapistQuestionsScreen}
            options={{title: ''}}
          />
          <Stack.Screen
            name="Therapist Question"
            component={TherapistQuestionScreen}
            options={{title: 'Edit'}}
          />
          <Stack.Screen
            name="Answer Question"
            component={AnswerQuestionScreen}
            options={{title: 'Answer'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
