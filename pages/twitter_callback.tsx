import { useEffect } from "react";
import { useRouter } from "next/router";
import { Loading, Text } from "@nextui-org/react";
import useTwitterTokenMutation from "../src/hooks/useTwitterTokenMutation";

function TwitterCallback() {
  const router = useRouter();
  const { oauth_token, oauth_verifier, denied } = router.query;
  const twitterTokenMutation = useTwitterTokenMutation();

  useEffect(() => {
    if (oauth_token && oauth_verifier) {
      twitterTokenMutation.mutate({
        oauthToken: oauth_token,
        oauthVerifier: oauth_verifier,
      });
    }
  }, [oauth_token, oauth_verifier]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
      }}
    >
      <Loading type="spinner" color="white" size="lg" />
      <Text margin="$10" size={24} css={{ textAlign: "center" }}>
        Wait a bit while we are authenticating you 🎉
      </Text>
    </div>
  );
}

export default TwitterCallback;
