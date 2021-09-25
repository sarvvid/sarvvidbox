import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from 'react-navigation';

import Intro from '../screens/intro';
import SignIn from '../screens/signin';
import SignUp from '../screens/signup';
import Home from '../screens/home';
import FileManager from '../screens/filemanager';
import Settings from '../screens/settings';
import Account from '../screens/account';
import FileDetails from '../screens/filedetails';
import Chat from '../screens/chat';
import ChatIntro from '../screens/chatIntro';
import Scanner from '../screens/scanner';
import Faq from '../screens/faq';
import Terms from '../screens/terms';
import Referral from '../screens/Referral'
const screens = {
   Intro:{
       screen: Intro,
       navigationOptions: {
        headerShown: false,
        headerMode: 'none'
    }
       
   },
   Signin: {
       screen: SignIn,
       navigationOptions: {
        headerShown: false,
    }
   },
   Signup: {
       screen: SignUp,
       navigationOptions: {
        headerShown: false,
    }
   },
   Home: {
       screen: Home,
       navigationOptions: {
           headerShown: false,
       }
   },
   Filemanager: {
       screen: FileManager,
       navigationOptions: {
        headerShown: false,
    }
   },
   Settings: {
       screen: Settings,
       navigationOptions: {
        headerShown: false,
    }
   },
   Account: {
       screen: Account,
       navigationOptions: {
        headerShown: false,
    }
   },
   Filedetails : {
       screen: FileDetails,
       navigationOptions: {
        headerShown: false,
    }
   },
   ChatIntro : {
       screen: ChatIntro,
       navigationOptions: {
        headerShown: false,
    }
   },
   Chat : {
       screen: Chat,
       navigationOptions: {
        headerShown: false,
    }
   },
   Scanner : {
       screen: Scanner,
       navigationOptions: {
        headerShown: false,
    }
   },
}

const Stack = createStackNavigator();
const screenOptionStyle = {
	headerShown: false,
    headerMode: 'none'
};
const HomeStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name='Home' component={Home}/>
			<Stack.Screen name='FileManager' component={FileManager}/>
			<Stack.Screen name='Settings' component={Settings}/>
			<Stack.Screen name='Account' component={Account}/>
			<Stack.Screen name='Filedetails' component={FileDetails}/>
			<Stack.Screen name='ChatIntro' component={ChatIntro}/>
			<Stack.Screen name='Chat' component={Chat}/>
			<Stack.Screen name='Scanner' component={Scanner}/>
			<Stack.Screen name='Faq' component={Faq}/>
			<Stack.Screen name='Terms' component={Terms}/>
            <Stack.Screen name='Referral' component={Referral}/>
		</Stack.Navigator>
	);
};
export default HomeStackNavigator;