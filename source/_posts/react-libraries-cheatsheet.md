---
title: CheatSheet for Several Popular React/React Native Libraries
date: 2022-08-19 15:14:12
mathjax: true
tags: [React, Programming]
---

This article presented several popular React/React Native libraries. It can be used as a cheatsheet for those libraries. 

<!-- more -->


# Moment.js
Parse, validate, manipulate, and display dates and times in JavaScript. The Moment project is in maintenance mode. Thus no new features will be added. 

## Installation 
```shell
npm install moment --save   # npm
yarn add moment             # Yarn
Install-Package Moment.js   # NuGet
spm install moment --save   # spm
meteor add momentjs:moment  # meteor
```

## Format dates
```javascript
moment().format('MMMM Do YYYY, h:mm:ss a'); // August 5th 2022, 8:54:30 pm
moment().format('dddd');                    // Friday
moment().format("MMM Do YY");               // Aug 5th 22
moment().format('YYYY [escaped] YYYY');     // 2022 escaped 2022
moment().format();                          // 2022-08-05T20:54:30+02:00
```

## Relative time
```javascript
moment("20111031", "YYYYMMDD").fromNow(); // 11 years ago
moment("20120620", "YYYYMMDD").fromNow(); // 10 years ago
moment().startOf('day').fromNow();        // 21 hours ago
moment().endOf('day').fromNow();          // in 3 hours
moment().startOf('hour').fromNow();       // an hour ago
```

## Calendar time
```javascript
moment().subtract(10, 'days').calendar(); // 07/26/2022
moment().subtract(6, 'days').calendar();  // Last Saturday at 8:55 PM
moment().subtract(3, 'days').calendar();  // Last Tuesday at 8:55 PM
moment().subtract(1, 'days').calendar();  // Yesterday at 8:55 PM
moment().calendar();                      // Today at 8:55 PM
moment().add(1, 'days').calendar();       // Tomorrow at 8:55 PM
moment().add(3, 'days').calendar();       // Monday at 8:55 PM
moment().add(10, 'days').calendar();      // 08/15/2022
``` 

## Multiple locale support
```javascript
moment.locale();         // en
moment().format('LT');   // 8:55 PM
moment().format('LTS');  // 8:55:36 PM
moment().format('L');    // 08/05/2022
moment().format('l');    // 8/5/2022
moment().format('LL');   // August 5, 2022
moment().format('ll');   // Aug 5, 2022
moment().format('LLL');  // August 5, 2022 8:55 PM
moment().format('lll');  // Aug 5, 2022 8:55 PM
moment().format('LLLL'); // Friday, August 5, 2022 8:55 PM
moment().format('llll'); // Fri, Aug 5, 2022 8:55 PM
```

## Notes and gotchas
```javascript
moment("2010 13",           "YYYY MM").isValid();     // false (not a real month)
moment("2010 11 31",        "YYYY MM DD").isValid();  // false (not a real day)
moment("2010 2 29",         "YYYY MM DD").isValid();  // false (not a leap year)
moment("2010 notamonth 29", "YYYY MMM DD").isValid(); // false (not a real month name)
moment('2012 juillet', 'YYYY MMM', 'fr');
moment('2012 July',    'YYYY MMM', 'en');
moment('2012 July',    'YYYY MMM', ['qj', 'en']);
moment('It is 2012-05-25', 'YYYY-MM-DD').isValid();       // true
moment('It is 2012-05-25', 'YYYY-MM-DD', true).isValid(); // false
moment('2012-05-25',       'YYYY-MM-DD', true).isValid(); // true
moment('2012.05.25',       'YYYY-MM-DD', true).isValid(); // false
```

## Array
```javascript
moment([2010, 1, 14, 15, 25, 50, 125]); // February 14th, 3:25:50.125 PM
moment([2010]);        // January 1st
moment([2010, 6]);     // July 1st
moment([2010, 6, 10]); // July 10th
```

## Add and subtract
```javascript
moment().add(7, 'days').add(1, 'months'); // with chaining
moment().add({days:7,months:1}); // with object literal
moment().subtract('seconds', 1); // Deprecated in 2.8.0
moment().subtract(1, 'seconds');
moment().subtract(1.5, 'months') == moment().subtract(2, 'months')
moment().subtract(.7, 'years') == moment().subtract(8, 'months') //.7*12 = 8.4, rounded to 8
```

## Many more ...



# React Native Firebase

## Installation
```shell
npm install --save @react-native-firebase/app
yarn add @react-native-firebase/app
```


To allow the Android app to securely connect to your Firebase project, a configuration file must be downloaded and added to your project. 


## Cloud Messaging
### Installation
```shell
yarn add @react-native-firebase/messaging
```

### Usage

#### iOS - reguesting permissions
iOS prevents messsages containing notification (or 'alert') payloads from being displayed unless you have received explicit permission from the user: 

```javascript
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
```

#### Receiving messages
Common use-cases for handling messages could be:
* Displaying a notification
* Syncing message data silently on the device
* Updating the application's UI

| State      | Description                                                          |
| ---------- | -------------------------------------------------------------------- |
| Foreground | When the application is open and in view.                            |
| Background | When the application is open, however in the background (minimised). |
| Quit       | When the device is locked or application is not active or running    |


#### Message handlers
* In cases where the message is data-only and the device is in the background or quit, both Android & iOS treat the message as low priority and will ignore it. You can increase the priority by setting the `priority` to `high` and `content-available` to `true` (iOS)
* On iOS in cases where the message is data-only and the device is in the background or quit, the message will be delayed until the background message handler is registered via `setBackgroundMessageHandler`, signaling the application's javascript is loaded and ready to run. 


#### Foreground state messages
For example: 
```javascript
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
}
```

The `remoteMessage` property contains all of the information about the message received, including any custom data and notification data. 


#### Background & Quit state messages
For example:
```javascript
// index.js
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent('app', () => App);
```

The handler must return a promise once your logic has completed to free up device resources. It must not attempt to update any UI (e.g. via state) - you can however perform network requests, update local storage etc. 

The `remoteMessage` property still contains all of the information about the meesage sent to the device. If the `RemoteMessage` payload contains a `notification` property when sent to the `setBackgroundMessageHandler` handler, the device will have displayed a notification to the user. 


#### Data-only message
When an incoming message is "data-only", both Android & iOS regard it as low priority and will prevent the application from waking. To allow data-only messages to trigger the background handler, you must set the "priority" to "high" on Android, and enable the `content-available` flag on iOS. For example, if using the Node.js `firebase-admin` package to send a message: 
```javascript
admin.messaging().sendToDevice(
  [], // device fcm tokens...
  {
    data: {
      owner: JSON.stringify(owner),
      user: JSON.stringify(user),
      picture: JSON.stringify(picture),
    },
  },
  {
    // Required for background/quit data-only messages on iOS
    contentAvailable: true,
    // Required for background/quit data-only messages on Android
    priority: 'high',
  },
);
```

## Authentication
### Installation
```shell
yarn add @react-native-firebase/auth
```

### What does it do
Firebase authentication provides backend services & easy-to-use SDKs to authenticate users to your app. 


### Usage
#### Listening to authentication state
```javascript
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}
```

#### Email/Password sign-in
Ensure that the "Email/Password" sign-in provider is enabled on the Firebase console. 
```javascript
import auth from '@react-native-firebase/auth';

auth()
  .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
```


## Cloud Firestore
### Installation
```shell
yarn add @react-native-firebase/firestore
```

### What does it do
Firestore is a flexible, scalable NoSQL cloud database to store and sync data. 

### Usage

#### Collections & Documents
Cloud Firestore stores data within "documents", which are contained within "collections", and documents can also contain collections. For example, we could store a list of our users documents within a "Users" collection. The collection method allows us to reference a collection within our code: 
```javascript
import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('Users');
```

The `collection` method returns a "CollectionReference" class, which provides properties and methods to query and fetch the data from Cloud Firestore. 
```javascript
import firestore from '@react-native-firebase/firestore';

// Get user document with an ID of ABC
const userDocument = firestore().collection('Users').doc('ABC');
```


#### Read data
##### One-time read
```javascript
import firestore from '@react-native-firebase/firestore';

const users = await firestore().collection('Users').get();
const user = await firestore().collection('Users').doc('ABC').get();
```

##### Realtime changes
```javascript
import firestore from '@react-native-firebase/firestore';

function onResult(QuerySnapshot) {
  console.log('Got Users collection result.');
}

function onError(error) {
  console.error(error);
}

firestore().collection('Users').onSnapshot(onResult, onError);
```

This can be used within any `useEffect` hooks to automatically unsubscribe when the hook needs to unsubscribe itself:
```javascript
import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

function User({ userId }) {
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);
}
```

#### Snapshot
Once a query has returned a result, Firestore returns either a `QuerySnapshot` (for collections queries) or a `DocumentSnapshot` (for document queries). These snapshots provide the ability to view the data, view query metadata, whether the document exists or not.


##### QuerySnapshot
A `QuerySnapshot` returned from a collection query allows you to inspect the collection, such as how many documents exist within it, access the documents within the collection, any changes since the last query, and more:
```javascript
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });
```


##### DocumentSnapshot
A `DocumentSnapshot` is returned from a query to a specific document, or as part of the documents returned via a `QuerySnapshot`. The snapshot provides the ability to view a document data, metadata, and whether a document actually exists. 
```javascript
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .doc('ABC')
  .get()
  .then(documentSnapshot => {
    console.log('User exists: ', documentSnapshot.exists);

    if (documentSnapshot.exists) {
      console.log('User data: ', documentSnapshot.data());
    }
  });
```


#### Querying
##### Filtering
```javascript
firestore()
  .collection('Users')
  // Filter results
  .where('age', '>=', 18)
  .get()
  .then(querySnapshot => {
    /* ... */
  });
```

##### Limiting
```javascript
firestore()
  .collection('Users')
  // Filter results
  .where('age', '>=', 18)
  // Limit results
  .limit(20)
  .get()
  .then(querySnapshot => {
    /* ... */
  });
```

##### Ordering
```javascript
firestore()
  .collection('Users')
  // Order results
  .orderBy('age', 'desc')
  .get()
  .then(querySnapshot => {
    /* ... */
  });
```

#### Writing data
##### Adding documents
```javascript
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .add({
    name: 'Ada Lovelace',
    age: 30,
  })
  .then(() => {
    console.log('User added!');
  });
```

##### Updating documents
```javascript
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .doc('ABC')
  .update({
    age: 31,
  })
  .then(() => {
    console.log('User updated!');
  });
```

#### Removing data
```javascript
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .doc('ABC')
  .delete()
  .then(() => {
    console.log('User deleted!');
  });
```








# React-i18next
react-i18next is a powerful internationalization framework for React / React native. 
## Installation
```shell
npm install react-i18next i18next --save
```

### Configure i18next
```javascript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;
```


### Translate your content 
#### Using the `useTranslation` hook
```javascript
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  return <h1>{t('Welcome to React')}</h1>
}

// i18n translations might still be loaded by the http backend
// use react's Suspense
export default function App() {
  return (
    <Suspense fallback="loading">
      <MyComponent />
    </Suspense>
  );
}
```

#### Translation files
Creata a new file `public/locales/<language_code>/translation.json` with the following sample content: 
```json
{
  "title": "Welcome to react using react-i18next",
  "description": {
    "part1": "To get started, edit <1>src/App.js</1> and save to reload.",
    "part2": "Switch language between english and german using buttons above."
  }
}
```


#### Using the trans component
```javascript
import React from 'react';
import { Trans } from 'react-i18next';

export default function MyComponent () {
  return <Trans>Welcome to <strong>React</strong></Trans>
}

// the translation in this case should be
"Welcome to <1>React</1>": "Welcome to <1>React and react-i18next</1>"
```




# Formik
Formik helps to create forms easily. 

## Installation
```shell
npm install formik --save
yarn add formik
```

## A simple newsletter signup form

```javascript
 import React from 'react';
 import { useFormik } from 'formik';
 
 const SignupForm = () => {
   // Note that we have to initialize ALL of fields with values. These
   // could come from props, but since we don’t want to prefill this form,
   // we just use an empty string. If we don’t do this, React will yell
   // at us.
   const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       email: '',
     },
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });
   return (
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="firstName">First Name</label>
       <input
         id="firstName"
         name="firstName"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.firstName}
       />
 
       <label htmlFor="lastName">Last Name</label>
       <input
         id="lastName"
         name="lastName"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.lastName}
       />
 
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         value={formik.values.email}
       />
 
       <button type="submit">Submit</button>
     </form>
   );
 };
```

Notice some patterns and symmetry forming: 
1. We reuse the same exact change handler function `handleChange` for each HTML input. 
2. We pass an `id` and `name` HTML attribute that matches the property name we defined in `initialValues`.
3. We access the field's value using the same name (`email` -> `formik.values.email`)


## Validation
For example:
```javascript
 import React from 'react';
 import { useFormik } from 'formik';
 
 // A custom validation function. This must return an object
 // which keys are symmetrical to our values/initialValues
 const validate = values => {
   const errors = {};
   if (!values.firstName) {
     errors.firstName = 'Required';
   } else if (values.firstName.length > 15) {
     errors.firstName = 'Must be 15 characters or less';
   }
 
   if (!values.lastName) {
     errors.lastName = 'Required';
   } else if (values.lastName.length > 20) {
     errors.lastName = 'Must be 20 characters or less';
   }
 
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
 
   return errors;
 };
 
 const SignupForm = () => {
   // Pass the useFormik() hook initial form values, a validate function that will be called when
   // form values change or fields are blurred, and a submit function that will
   // be called when the form is submitted
   const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       email: '',
     },
     validate,
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });
   return (
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="firstName">First Name</label>
       <input
         id="firstName"
         name="firstName"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.firstName}
       />
       {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
 
       <label htmlFor="lastName">Last Name</label>
       <input
         id="lastName"
         name="lastName"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.lastName}
       />
       {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
 
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         value={formik.values.email}
       />
       {formik.errors.email ? <div>{formik.errors.email}</div> : null}
 
       <button type="submit">Submit</button>
     </form>
   );
 };
```

## Visited fields
Our validation function runs on each keystroke against the entire form's values, our errors object contains all validation errors at any given moment. This is not what we want. 

Like `errors` and `values`, Formik keeps track of which fields have been visited. It stores this information in an object called `touched` that also mirrors the shape of `values`/`initialValues`. The keys of `touched` are the field names, and the values of `touched` are booleans. 

To take advantage of `touched`, we pass `formik.handleBlur` to each input's `onBlur` prop. This function works similarly to `formik.handleChange` in that it uses the `name` attribute to figure out which fields to update. 

```javascript
 import React from 'react';
 import { useFormik } from 'formik';
 
 const validate = values => {
   const errors = {};
 
   if (!values.firstName) {
     errors.firstName = 'Required';
   } else if (values.firstName.length > 15) {
     errors.firstName = 'Must be 15 characters or less';
   }
 
   if (!values.lastName) {
     errors.lastName = 'Required';
   } else if (values.lastName.length > 20) {
     errors.lastName = 'Must be 20 characters or less';
   }
 
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
 
   return errors;
 };
 
 const SignupForm = () => {
   const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       email: '',
     },
     validate,
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });
   return (
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="firstName">First Name</label>
       <input
         id="firstName"
         name="firstName"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.firstName}
       />
       {formik.touched.firstName && formik.errors.firstName ? (
         <div>{formik.errors.firstName}</div>
       ) : null}
 
       <label htmlFor="lastName">Last Name</label>
       <input
         id="lastName"
         name="lastName"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.lastName}
       />
       {formik.touched.lastName && formik.errors.lastName ? (
         <div>{formik.errors.lastName}</div>
       ) : null}
 
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.email}
       />
       {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
 
       <button type="submit">Submit</button>
     </form>
   );
 };
```

## Reducing boilerplate
### getFieldProps()
The code above is very explicit about exactly what Formik is doing. `onChange` -> `handleChange`, `onBlur` -> `handleBlur`, and so on. However, to save your time, `useFormik()` returns a helper method called `formik.getFieldProps()` to make it faster to wire up inputs. Given some field-level info, it returns to you the exact group of `onChange`, `onBlur`, `value`, `checked` for given field. You can then spread that on an `input`, `select`, or `textarea`. 
```javascript
 const SignupForm = () => {
   const formik = useFormik({
     initialValues: {
       firstName: '',
       lastName: '',
       email: '',
     },
     validate,
     onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
     },
   });
   return (
     <form onSubmit={formik.handleSubmit}>
       <label htmlFor="firstName">First Name</label>
       <input
         id="firstName"
         name="firstName"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.firstName}
       />
       {formik.touched.firstName && formik.errors.firstName ? (
         <div>{formik.errors.firstName}</div>
       ) : null}
 
       <label htmlFor="lastName">Last Name</label>
       <input
         id="lastName"
         name="lastName"
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.lastName}
       />
       {formik.touched.lastName && formik.errors.lastName ? (
         <div>{formik.errors.lastName}</div>
       ) : null}
 
       <label htmlFor="email">Email Address</label>
       <input
         id="email"
         name="email"
         type="email"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.email}
       />
       {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
 
       <button type="submit">Submit</button>
     </form>
   );
```

### Leveraging React context
To save you even more time, Formik comes with `React context`-powered API/components to make life easier and code less verbose: `<Formik />`, `<Form />`, `<Field />`, `<ErrorMessage />`. 

Since these components use React Context, we need to render a React Context Provider that holds our form state and helpers in our tree. If you did this yourself, it would look like: 
```javascript
import React from 'react';
import { useFormik } from 'formik';

const FormikContext = React.createContext({});

export const Formik = ({ children, ...props }) => {
    const formikStateAndHelpers = useFormik(props);
    return (
        <FormikContext.Provider value={formikStateAndHelpers}>
            {typeof children === 'function'
                ? children(formikStateAndHelpers)
                : children}
        </FormikContext.Provider>
    );
};
```

Let's now swap out the `useFormik()` hook for Formik's `<Formik>` component/render-prop:
```javascript
 import React from 'react';
 import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
 
 const SignupForm = () => {
   return (
     <Formik
       initialValues={{ firstName: '', lastName: '', email: '' }}
       validationSchema={Yup.object({
         firstName: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('Required'),
         lastName: Yup.string()
           .max(20, 'Must be 20 characters or less')
           .required('Required'),
         email: Yup.string().email('Invalid email address').required('Required'),
       })}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       <Form>
         <label htmlFor="firstName">First Name</label>
         <Field name="firstName" type="text" />
         <ErrorMessage name="firstName" />
 
         <label htmlFor="lastName">Last Name</label>
         <Field name="lastName" type="text" />
         <ErrorMessage name="lastName" />
 
         <label htmlFor="email">Email Address</label>
         <Field name="email" type="email" />
         <ErrorMessage name="email" />
 
         <button type="submit">Submit</button>
       </Form>
     </Formik>
   );
 };

```
Here we use `Yup` for validation. The `<Field>` component by default will render an `<input>` component that, given a `name` prop, will implicitly grab the respective `onChange`, `onBlur`, and `value` props and pass them to the element as well as any props you pass to it. For example:
```jsx
 // <input className="form-input" placeHolder="Jane"  />
 <Field name="firstName" className="form-input" placeholder="Jane" />
 
 // <textarea className="form-textarea"/></textarea>
 <Field name="message" as="textarea" className="form-textarea" />
 
 // <select className="my-select"/>
 <Field name="colors" as="select" className="my-select">
   <option value="red">Red</option>
   <option value="green">Green</option>
   <option value="blue">Blue</option>
 </Field>
```

### useField
We can do better with an abstraction. With Formik, you can and should build reusable input primitive components that you can shared around your application. `useField` does the same thing like `<Field>` render-prop component but via React Hooks: 
```javascript
 import React from 'react';
 import ReactDOM from 'react-dom';
 import { Formik, Form, useField } from 'formik';
 import * as Yup from 'yup';
 
 const MyTextInput = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input>. We can use field meta to show an error
   // message if the field is invalid and it has been touched (i.e. visited)
   const [field, meta] = useField(props);
   return (
     <>
       <label htmlFor={props.id || props.name}>{label}</label>
       <input className="text-input" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </>
   );
 };
 
 const MyCheckbox = ({ children, ...props }) => {
   // React treats radios and checkbox inputs differently other input types, select, and textarea.
   // Formik does this too! When you specify `type` to useField(), it will
   // return the correct bag of props for you -- a `checked` prop will be included
   // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
   const [field, meta] = useField({ ...props, type: 'checkbox' });
   return (
     <div>
       <label className="checkbox-input">
         <input type="checkbox" {...field} {...props} />
         {children}
       </label>
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
 };
 
 const MySelect = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
     <div>
       <label htmlFor={props.id || props.name}>{label}</label>
       <select {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
 };
 
 // And now we can use these
 const SignupForm = () => {
   return (
     <>
       <h1>Subscribe!</h1>
       <Formik
         initialValues={{
           firstName: '',
           lastName: '',
           email: '',
           acceptedTerms: false, // added for our checkbox
           jobType: '', // added for our select
         }}
         validationSchema={Yup.object({
           firstName: Yup.string()
             .max(15, 'Must be 15 characters or less')
             .required('Required'),
           lastName: Yup.string()
             .max(20, 'Must be 20 characters or less')
             .required('Required'),
           email: Yup.string()
             .email('Invalid email address')
             .required('Required'),
           acceptedTerms: Yup.boolean()
             .required('Required')
             .oneOf([true], 'You must accept the terms and conditions.'),
           jobType: Yup.string()
             .oneOf(
               ['designer', 'development', 'product', 'other'],
               'Invalid Job Type'
             )
             .required('Required'),
         })}
         onSubmit={(values, { setSubmitting }) => {
           setTimeout(() => {
             alert(JSON.stringify(values, null, 2));
             setSubmitting(false);
           }, 400);
         }}
       >
         <Form>
           <MyTextInput
             label="First Name"
             name="firstName"
             type="text"
             placeholder="Jane"
           />
 
           <MyTextInput
             label="Last Name"
             name="lastName"
             type="text"
             placeholder="Doe"
           />
 
           <MyTextInput
             label="Email Address"
             name="email"
             type="email"
             placeholder="jane@formik.com"
           />
 
           <MySelect label="Job Type" name="jobType">
             <option value="">Select a job type</option>
             <option value="designer">Designer</option>
             <option value="development">Developer</option>
             <option value="product">Product Manager</option>
             <option value="other">Other</option>
           </MySelect>
 
           <MyCheckbox name="acceptedTerms">
             I accept the terms and conditions
           </MyCheckbox>
 
           <button type="submit">Submit</button>
         </Form>
       </Formik>
     </>
   );
 };
```

## Arrays
For example: 
```javascript
 import React from 'react';
 import { Formik, Form, Field } from 'formik';
 
 export const BasicArrayExample = () => (
   <div>
     <h1>Friends</h1>
     <Formik
       initialValues={{
         friends: ['jared', 'ian'],
       }}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       <Form>
         <Field name="friends[0]" />
         <Field name="friends[1]" />
         <button type="submit">Submit</button>
       </Form>
     </Formik>
   </div>
 );
```








# React Navigation
React Navigation's native stack navigator provides a way for your app to transition between screens and manage navigation history.

## Installation 
```shell
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native
yarn add react-native-screens react-native-safe-area-context
yarn add @react-navigation/native
```

## Getting started
Wrapping your app in `NavigationContainer` in for example `index.js` or `App.js`:
```javascript
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```


### Installing the native stack navigator library

#### Install 
```shell
npm install @react-navigation/native-stack
yarn add @react-navigation/native-stack
```

#### Creating a native stack navigator
In `App.js`:
```javascript
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
```

### Moving between screens
#### Navigating to a new screen
```javascript
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
```

#### Navigate to a route multiple times
```javascript
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
```

Let's suppose that we acutally want to add another details screen:
```jsx
<Button
  title="Go to Details... again"
  onPress={() => navigation.push('Details')}
/>
```

#### Going back
The header provided by the native stack navigator will automatically include a back button when it is possible to go back from the active screen. Sometimes you'll want to be able to programmatically trigger this behavior, and for that you can use `navigation.goBack()`: 
```javascript
function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
```

### Passing parameters to routes
We can pass data to routes when we nagivate to them. There are two pieces to this:
1. Pass params to a route by putting them in an object as a second parameter to the `navigation.navigate` function.
2. Read the params in your screen component: `route.params`.

```javascript
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
```

#### Updating params
```javascript
navigation.setParams({
  query: 'someText',
});
```

#### Initial params
```javascript
<Stack.Screen
  name="Details"
  component={DetailsScreen}
  initialParams={{ itemId: 42 }}
/>
```

### Configuring the header bar
#### Setting the header title
```javascript
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'My home' }}
      />
    </Stack.Navigator>
  );
}
```

#### UPdating `options` with `setOptions`
```jsx
<Button
  title="Update the title"
  onPress={() => navigation.setOptions({ title: 'Updated!' })}
/>
```

#### Adjusting header styles
```javascript
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}
```


### Header buttons
#### Adding a button to the header
```javascript
function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
```

### Nesting navigators
Nesting navigators means readering a navigator inside a screen of another navigator, for example: 
```javascript
function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

#### How nesting navigators affects the behaviour
* Each navigator keeps its own navigation history.
* Each navigator has its own options.
* Each screen in a navigator has its own params.
* Navigation actions are handled by current navigator and bubble up if couldn't be handled. 
* Navigator specific methods are available in the navigators nested inside. 
* Nested navigators don't receive parent's events. 
* Parent navigator's UI is rendered on top of child navigator. 

### Tab navigation
#### Installation
```shell
npm install @react-navigation/bottom-tabs
yarn add @react-navigation/bottom-tabs
```


#### Minimal example of tab-based navigation
```javascript
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```


# Victory Native
Victory is an ecosystem of composable React components for building interactive data visualizations. 

## Installation
```shell
npm install --save victory-native
yarn add victory-native 
```

## Usage
For example:
```javascript
import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});
```


## Testing components that use Victory Native
```json
"jest": {
  "preset": "react-native",
  "transformIgnorePatterns": [
    "node_modules/(?!victory|react-native-svg|react-native)"
  ],
  "transform": {
    "^.+\\.jsx?$": "babel-jest"
  }
}
```

To test the above `App` component you can simply do:
```javascript
import "react-native";
import React from "react";
import App from "../App.js";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<App />);
  expect(tree).toMatchSnapshot();
});
```

# Redux

Redux is a predictable state container for JavaScript apps. Redux manages application's state with a single global object called Store. More importantly, it gives you live code editing combined with a time-travelling debugger. It is flexible to go with any view layer such as React, Angular, Vue, etc. 

## Principle of Redux
* Single source of truth: The state of your whole application is stored in an object tree within a single store. 
* State is read-only: The only way to change the state is to emit an action, an object describing what happened. Nobody can directly change the state of your application.
* Changes are made with pure functions: To specify how the state tree is transformed by actions, you write pure reducers. A reducer is a central place where state modification takes place. Reducer is a fnction which takes state and action as arguments, and returns a newly updated state. 

## Core concepts
Let us assume our application's state is described by a plain object called `initialState` which is as follows:
```JavaScript
const initialState = {
  isLoading: false,
  items: [],
  hasError: false
};
```

Every piece of code in your application cannot change this state. To change the state, you need to dispatch an action. 

### What is an action? 
An action is a plain object that describes the intention to cause change with a type property. It must have a type property which tells what type of action is being performed. 
```JavaScript
return {
  type: 'ITEMS_REQUEST',  // action type
  isLoading: true         // payload information
}
```

Actions and states are held together by a function called Reducer. An action is dispatched with an intention to caues change. This change is performed by the reducer. A reducer function that handles the `ITEMS_REQUEST` action is as follows: 
```JavaScript
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEMS_REQUEST':
      return Object.assign({}, state, {
        isLoading: action.isLoading
      })
    default:
      return state
  }
}
```

Redux components are as follows: 
``` 
             Dispatch
Action <-------------------- View
   |                          ^
   |                          |
   |                          |  Subscribe
   |                          |
   v                          |
Reducers -----------------> Store
```

## Data follows
Redux follows the unidirectional data flow. It means that your application data will follow in one-way binding data flow. 
* An action is dispatched when a user interacts with the application. 
* The root reducer function is called with the current state and the duspatched action. The root reducer may divide the task among smaller reducer functions, which ultimately returns a new state. 
* The store notifies the view by executing their callback functions.
* The view can retrieve updated state and re-render again. 


## Store
A store is an immutable object tree in Redux. A store is a state container which holds the application's state. Redux can have only a single store in your application. Whenever a store is created in Redux, you need to specify the reducer. 

```JavaScript
import { createStore } from 'redux'
import reducer from './reducers/reducer'
const store = createStore(reducer)
```

A `createStore` function can have three arguments: 
```JavaScript
createStore(reducer, [preloadedState], [enhancer])
```

### getState
If helps you retrieve the current state of your Redux store:
```JavaScript
store.getState()
```

### dispatch
It allows you to dispatch an action to change a state in your application. 
```JavaScript
store.dispatch({type: 'ITEMS_REQUEST'})
```

### subscribe
It helps you register a callback that Redux store will call when an action has been dispatched. As soon as the Redux state has been updated, the view will re-render automatically. 
```JavaScript
store.subscribe(() => { console.log(store.getState()); })
```

Note that subscribe function returns a function for unsubscribing the listener. To unsubscirbe the listener, we can use the code below: 
```JavaScript
const unsubscribe = store.subscribe(() => { console.log(store.getState()); });
unsubscirbe();
```

## Actions
Apart from the type attribute, the structure of an action object is totally up to the developer. It is recommended to keep your action object as light as possible and pass only the necessary information. To cause any change in the store, you need to dispatch an action first by using `store.dispatch()` function. The action object is as follows:
```JavaScript
{ type: GET_ORDER_STATUS, payload: {orderId, userId } }
{ type: GET_WISHLIST_ITEMS, payload: userId }
```

### Actions creators
Action creators are the functions that encapsulte the process of creation of an action object. These functions simply return a plain JS object which is an action. It promotes writing clean code and helps to achieve reusability. 

## Reducers
The following few things should never be performed inside the reducer:
* Mutation of functions arguments.
* API calls & routing logic.
* Calling non-pure function e.g. `Math.random()`

### The syntax
```JavaScript
(state, action) => newState
```

### An example
```JavaScript
const initialState = {
  isLoading: false,
  items: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEMS_REQUEST':
      return Object.assign({}, state, {
        isLoading: action.payload.isLoading
      })
    case 'ITEMS_REQUEST_SUCCESS':
      return Object.assign({}, state, {
        items: state.items.concat(action.items),
        isLoading: action.isLoading
      })
    default:
      return state;
  }
}

export default reducer;
```

We can write our logic in reducer and can split it on the logical data basis. Suppose, we want to design a web page where a user can access product order status and see wishlist information. We can separate the logic in different reducers files, and make them work independently. Let us assume that `GET_ORDER_STATUS` action is dispatched to get the status of order corresponding to some order id and user id. 
```JavaScript
/reducer/orderStatusReducer.js
import { GET_ORDER_STATUS } from '../constants/appConstant';
export default function (state = {}, action) {
  switch (action.type) {
    case GET_ORDER_STATUS:
      return { ...state, orderStatusData: action.payload.orderStatus };
    default:
      return state;
  }
}
```

Similarly, assume `GET_WISHLIST_ITEMS` action is dispatched to get the user's withlist information respective of a user. 
```JavaScript
/reducer/getWishlistDataReducer.js
import { GET_WISHLIST_ITEMS } from '../constants/appConstant'
export default function (state = {}, action) {
  switch (action.type) {
    case GET_WISHLIST_ITEMS:
      return { ...state, wishlistData: action.payload.wishlistData };
    default:
      return state;
  }
}
```

Now, we can combine both reducers by using Redux combineReducers utility. The combineReducers generate a function which returns an object whose values are different reducer functions. You can import all the reducers in index reducer file and combine them together as an object with their respective names. 
```JavaScript
/reducer/index.js
import { combineReducers } from 'redux';
import OrderStatusReducer from './orderStatusReducer';
import GetWishlistDataReducer from './getWishlistDataReducer'

const rootReducer = combineReducers ({
  orderStatusReducer: OrderStatusReducer,
  getWishlistDataReducer: GetWishlistDataReducer
});

export default rootReducer;
```

Now you can pass this `rootReducer` to the `createStore` method as follows:
```JavaScript
const store = createStore(rootReducer);
```

## Middleware
Redux itself is synchronous, so how the async operations like network request work with Redux? Here middlewares come handy. Reducers are the place where all the execution logic is written. Reducer has nothing to do with who performs it, how much time it is taking or logging the state of the app before and after the action is dispatched. In this case, Redux middleware function provides a medium to interact with dispatched action before they reach the reducer. Customized middleware functions can be created by writing high order functions (a function that returns another function), which wraps around some logic. Multiple middlewares can be combined together to add new functionality, and each middleware requires no knowledge of what came before and after. You can imagine middlewares somewhere between action dispatched and reducer. 

Commonly, middlewares are used to deal with asynchrnous actions in your app. Redux provides with API called `applyMiddleware` which allows us to use custom middleware as well as Redux middlewares like Redux-thunk and Redux-promise. It applies middlewares to store:
```JavaScript
applyMiddleware(...middleware)
```

And this can be applied to store as follows
```JavaScript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'
const store = createStore(rootReducer, applyMiddleware(thunk));
```

Conditional dispatch can be written inside middleware. Each middleware receives store's dispatch so that they can dispatch new action, and `getState` functions as arguments so that they can access the current state and return a function. Any return value from an inner function will be available as the value of dispatch function itself. The following is the syntax of a middleware:
```JavaScript
({ getState, dispatch }) => next => action
```

The `getState` function is useful to decide whether new data is to be fetched or cache result should get returned, depending upon the current state. 

For example, a custom middleware logger function. It simply logs the action and new state:
```JavaScript
import { createStore, applyMiddleware } from 'redux'
import userLogin from './reducers'

function logger({ getState }) {
  return next => action => {
    console.log('action', action);
    const returnVal = next(action);
    console.log('state when action is dispatched', getState());
    return returnVal;
  }
}

const store = createStore(userLogin, initialState = [], applyMiddleware(logger));
```

Another example of middleware where you can handle when to show or hide the loader is given below: 
```JavaScript
import isPromise from 'is-promise'

function loaderHandler({ dispatch }) {
  return next => action => {
    if (isPromise(action)) {
      dispatch({ type: 'SHOW_LOADER' });
      action
        .then(() => dispatch({ type: 'HIDE_LOADER' }))
        .catch(() => dispatch({ type: 'HIDE_LOADER' }));
    }
    return next(action);
  };
}

const store = createStore(
  userLogin, initialState = [], applyMiddleware(loaderHandler)
);
```

This middleware shows the loader when you are requesting any resource and hides it when resource request has been completed. 

## Redux Devtools
Redux-Devtools provide us debugging platform for Redux apps. 
* It lets you inspect every state and action payload. 
* It lets you go back in time by "cancelling" actions.
* If you change the reducer code, each "staged" action will be re-evaluated. 
* If the reducers throw, we can identify the error and also during which action this happended. 
* WIth `persistState()` store enhancer, you can persist debug sessions across page reloads. 

## Testing
We can use JEST as a testing engine. It works in the node environment and does not access DOM. 

### Test cases for action creators
Let us assume you have action creator as shown below: 
```JavaScript
export function itemsRequestSuccess(bool) {
  return {
    type: ITEMS_REQUEST_SUCCESS,
    isLoading: bool,
  }
}
```

This action creator can be tested as given below: 
```JavaScript
import * as action from '../actions/actions';
import * as types from '../../constants/ActionTypes';

describe('actions', () => {
  it('should create an action to check if item is loading', () => {
    const isLoading = true,
    const expectedAction = {
      type: types.ITEMS_REQUEST_SUCCESS, isLoading
    }
    expect(actions.itemsRequestSuccess(isLoading)).toEqual(expectedAction)
  })
})
```

### Test cases for reducers
We have learnt that reducer should return a new state when action is applied. So reducer is test ed on this behaviour. Consider a reducer as given below:
```JavaScript
const initialState = {
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ITEMS_REQUEST':
      return Object.assign({}, state, {
        isLoading: action.payload.isLoading
      })
    default:
      return state;
  }
}

export default reducer;
```

To test above reducer, we need to pass state and action to the reducer, and return a new state as shown below: 
```JavaScript
import reducer from '../../reducer/reducer'
import * as types from '../../constants/ActionTypes'

describe('reducer initial state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        isLoading: false,
      }
    ])
  })
  it ('should handle ITEMS_REQUEST', () => {
    expect(
      reducer(
        {
          isLoading: false,
        },
        {
          type: types.ITEMS_REQUEST,
          payload: { isLoading: true }
        }
      )
    ).toEqual({
      isLoading: true
    })
  })
})
```

## Integrate React
In the root `index.js` file:
```JavaScript
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/reducer'
import thunk from 'redux-thunk'
import App from './components/app'

const store = createStore(
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
  applyMiddleware(thunk)
)

render(
  <Provider store = {store}>
    <App />
  </Provider>
  document.getElementById('root')
)
```

Whenever a change occurs in a react-redux app, `mapStateToProps()` is called. In this function, we exactly specify which state we need to provide to our react component. With the help of `connect()` function, we are connecting these app's state to react component. `connect()` is a high order function which takes component as a parameter. It performs certain operations and returns a new component with correct data which we finally exported. 

Their definition:
```JavaScript
import { connect } from 'react-redux'
import Listing from '../components/listing/Listing'
import makeApiCall from '../services/services'

const mapStateToProps = (state) => {
  return {
    items: state.items,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(makeApiCall())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
```

The definition of a component to make an api call in `services.js` file is:
```JavaScript
import axios from 'axios'
import { itemsLoading, itemsFetchDataSuccess } from '../actions/actions'

export default function makeApiCall() {
  return (dispatch) => {
    dispatch(itemsLoading(true));
    axios.get('http://api.tvmaze.com/shows')
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        dispatch(itemsLoading(false));
        return response;
      })
      .then((response) => dispatch(itemsFetchDataSuccess(response.data)))
  };
}
```

## React example
In `index.js`:
```JavaScript
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../src/reducer/index'
import App from '../src/App'

const store = createStore(
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store = {store}>
    <App />
  </Provider>, document.getElementById('root')
)
```

In `app.js`
```JavaScript
import React, { Component } from 'react'
import './App.css'
import Counter from '../src/container/appContainer'

class App extends Component {
  render() {
    return (
      <div className = "App">
        <header className = "App-header">
          <Counter/>
        </header>
      </div>
    );
  }
}

export default App;
```

In `/container/counterContainer.js`:
```JavaScript
import { connect } from 'react-redux'
import Counter from '../component/counter'
import { increment, decrement, reset } from '../actions'

const mapStateToProps = (state) => {
  return {
    counter: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

In `/component/counter.js`:
```JavaScript
import React, { Component } from 'react'
class Counter extends Component {
  render() {
    const { counter, increment, decrement, reset } = this.props;
    return (
      <div className = "App">
        <div>{counter}</div>
        <div>
          <button onClick = {increment}>INCREMENT BY 1</button>
        </div>
        <div>
          <button onClick = {decrement}>DECREMENT BY 1</button>
        </div>
      </div>
    );
  }
}

export default Counter;
```

In `/actions/index.js`
```JavaScript
export function increment() {
  return {
    type: 'INCREMENT'
  }
}

export function decrement() {
  return {
    type: 'DECREMENT'
  }
}

export function reset() {
  return {
    type: 'RESET'
  }
}
```

In `/reducer/index.js`:
```JavaScript
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1
    case 'DECREMENT': return state - 1
    case 'RESET': return 0 
    default: return state
  }
}
```
