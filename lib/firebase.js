import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const { apiKey, authDomain, projectId, storageBucket } = process.env;

const config = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
};

export const fb = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(config);

export const db = fb.firestore();

export const auth = fb.auth();
