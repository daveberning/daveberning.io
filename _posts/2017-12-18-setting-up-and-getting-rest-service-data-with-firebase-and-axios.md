---
title: Setting Up and Getting REST Service Data With Firebase and Axios
layout: post
author: Dave Berning
date: 2017-08-27 18:27:17 -0400
seo:
  name: ''
  type: ''
  author: ''
  publisher: ''
  image: ''
backgroundImage: ''
---
So…if you’ve worked in field for a few years you’ll know that blogs can sometimes be overly verbose when you just want them to be simple. Which, can be good, but if you’re looking for a brief explanation for something, this can become frustrating. So, here is my attempt at giving you what you may be looking for upon your Google search. For this article, I assume you know how to create a [Firebase](http://firebase.google.com/) account, a Firebase project, and have a basic idea of what a REST service is.

## Setting Up a REST Service With Firebase

First, let’s set up a REST service with Firebase. After all, without a REST service you cannot get data. You will need to create an account if you haven’t already. For small teams and projects, it’s free.

Once you sign in, you’ll see you console dashboard, go ahead and create a project if you haven’t already.

### Authentication

You don’t want just anyone to access every bit of data if they have no need to. So we will need to restrict the data that comes through to a specific user. _To make things easier, I’m only going to go over Firebase for Web and “Email/Password” authentication._

Go to **Authentication > Sign-in Method** and make sure that “Email/Password” is enabled, if it isn’t by default. Next, you will want to go to Users and click on “Create User”. From here, you will add the credentials that you want to use then you will see a _generated User UID_ (this ID is important for later).

![](/firebase.png)Now that we have our sign-in method and user created, let modify the authentication rules. The current snippet that Firebase provides allows any user that is logged in (authenticated) to see _all_ the data; even if it doesn’t pertain to them. Obviously, we don’t want that. So we will need to modify this to allow only the user that is logged in, to only see their own data and no one else’s.

    {
      "rules": {
        "users": {
          "$uid": {
            ".read": "$uid === auth.uid",
            ".write": "$uid === auth.uid"
          }
        }
      }
    }

After you paste the above code in, click on “Publish”. We now have everything we need for a basic REST service with Firebase. Now, let’s add some data to a REST endpoint so we can see data coming back when we call it.

## Adding Faux Data to a User’s REST Endpoint

Let’s add some faux data. The easiest way to do this is to just write some JSON or copy the snippet below into a .json file and _import_ it. First, you will need to create your endpoints. For naming conventions, where going to use…

**https://PROJECT-NAME.firebaseio.com/users/{uid}**

**Note:** You can copy your UID on the Authentication > Users screen and copying the value under UID.

    [
      {
        "name": "Billie Joe Armstrong",
        "birthYear": 1972,
        "band": "Green Day"
      }
    ]

You should see something like the screenshot below. At this point, we have our Firebase account ready and our REST service with faux data set up. Now, let’s grab some data with Axios and see it returned in the console so we can use it.

## ![](/firebase2.png)Fetching Data with Axios and the GET Method

Now we finally get to the point of this whole article. I eventually figured this out myself but only after reading a lot of post that didn’t really work for me.

In order for us to get the data for the specific user, we will need to leverage the Firebase API and grab the data per the UID.

### Checking If a Firebase User is Logged In

This code snippet below is what you will need to add to your application to check if a user is logged in. If so, the firebase.auth() method will return a user object with user information including the uid.

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // Your code here
      }
    })

### **GET With Axios**

To get data from Firebase with Axios you will need two things, 1) user’s UID and 2) a database secret.

As stated before, the user’s UID is returned with the user object in the Firebase auth() function. Simply concatenate **user.uid** in your REST call. For the database secret, you will need to generate one.

In order to generate one, you will need to go to **Settings** (top left by Overview) **> Service Accounts > Database Secrets**. Simply click on the “Add Secret” button and copy the secret. _It’s vert important that you never share your secret on a public repo or anywhere else online. It’s a secret for a reason._

Now, we finally have everything we need. Let’s delve into your code now and get a 200 response with actual data that you can use in your application.

    axios.get('https://PROJECT-NAME.firebaseio.com/users/' + user.uid + '.json?auth=DATABASE-SECRET')
    .then((response) => {
      console.log(response)
    });

Copying that Axios get method with your credentials should result in a **200 response**. Woo! I hope this helps in getting a better understanding of Firebase for your web application.