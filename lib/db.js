import firebase from "./firebase";

const firestore = firebase.firestore();

export function updateUser(uid, data) {
  return firestore.collection("user").doc(uid).update(data);
}

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
  const site = firestore.collection("sites").doc();
  site.set(data);

  return site;
}

export function createFeedback(data) {
  const feedback = firestore.collection("feedback").doc();
  feedback.set(data);

  return feedback;
}

export function deleteFeedback(id) {
  return firestore.collection("feedback").doc(id).delete();
}
