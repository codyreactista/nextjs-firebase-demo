import Metatags from "@components/Metatags";
import PostFeed from "@components/PostFeed";
import UserProfile from "@components/UserProfile";
import { getUserWithUsername, postToJSON } from "@lib/firebase";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query as firebaseQuery,
  where,
} from "firebase/firestore";

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <Metatags
        title={user.username}
        description={`${user.username}'s public profile`}
      />
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = firebaseQuery(
      collection(userDoc.ref, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}
