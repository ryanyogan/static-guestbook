import { compareDesc, parseISO } from "date-fns";
import { firestore } from "./firebase-admin";

export async function getAllSites() {
  try {
    const snapshot = await firestore.collection("sites").get();
    const sites = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
  } catch (error) {
    return { error };
  }
}

export async function getAllUserSites(userId) {
  const snapshot = await firestore
    .collection("sites")
    .where("authorId", "==", userId)
    .get();

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}

export async function getAllUserFeedback(userId) {
  const snapshot = await firestore
    .collection("feedback")
    .where("authorId", "==", userId)
    .get();

  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await firestore
      .collection("feedback")
      .where("siteId", "==", siteId)
      .get();

    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (error) {
    return { error };
  }
}
