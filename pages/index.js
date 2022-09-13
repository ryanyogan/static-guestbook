import { useAuth } from "../lib/auth";

export default function Home() {
  const auth = useAuth();

  return auth.user ? (
    <div>
      <p>Email: {auth.user.email}</p>
      <button onClick={(e) => auth.signout()}>Sign out</button>
    </div>
  ) : (
    <button onClick={(e) => auth.signinWithGithub()}>Sign In</button>
  );
}
