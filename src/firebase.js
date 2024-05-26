import Swal from 'sweetalert2';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA5h99O9q7bp5k75y5MDQmrfmufvJiHt3Q",
  authDomain: "coreui-41b36.firebaseapp.com",
  projectId: "coreui-41b36",
  storageBucket: "coreui-41b36.appspot.com",
  messagingSenderId: "446111079971",
  appId: "1:446111079971:web:0819b5dff4b5d695059b96"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)

    return response
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message,
    });
  }
};

const registerWithEmailAndPassword = async (displayName, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Update display name
    await updateProfile(user, {
      displayName: displayName
    });
    console.log(user)
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message,
    });
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Password reset link sent!',
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message,
    });
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  // db,
  // signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};

// await db.collection("users").add({
//   uid: user.uid,
//   name,
//   authProvider: "local",
//   email,
// });

// const db = app.firestore();

// const googleProvider = new firebase.auth.GoogleAuthProvider();
// const signInWithGoogle = async () => {
//   try {
//     const res = await auth.signInWithPopup(googleProvider);
//     const user = res.user;
//     const query = await db
//       .collection("users")
//       .where("uid", "==", user.uid)
//       .get();
//     if (query.docs.length === 0) {
//       await db.collection("users").add({
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: err.message,
//     });
//   }
// };
