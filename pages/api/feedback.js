import { getAllUserFeedback } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export default async function handler(req, res) {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { feedback } = await getAllUserFeedback(uid);

    return res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ error });
  }
}
