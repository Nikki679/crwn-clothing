import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAq1JnvEBP_SLWaraFU9zUwtaC6SeB0wvE",
  authDomain: "crwn-clothing-db-474a5.firebaseapp.com",
  projectId: "crwn-clothing-db-474a5",
  storageBucket: "crwn-clothing-db-474a5.appspot.com",
  messagingSenderId: "1093126899900",
  appId: "1:1093126899900:web:342646318f37eed40b28b9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) =>{
const collectionRef = collection(db,collectionKey);
const batch = writeBatch(db);
objectsToAdd.forEach((object)=>{
  const docRef = doc(collectionRef, object.title.toLowerCase());
  batch.set(docRef, object)
})
await batch.commit();
console.log("done");
}

export const getCategoriesAndDocuments = async () =>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return  querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  // const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
  //   const {title,items}= docSnapshot.data();
  //   acc[title.toLowerCase()]= items;
  //   return acc;
  // },{})
  // return categoryMap;
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformaton = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log('userSnapshot',userSnapshot)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformaton,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  console.log('userSnapshot',userSnapshot)
  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email && !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve,reject)=>{
    const unsubscribe= onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
} 