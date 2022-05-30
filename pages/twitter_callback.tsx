import { useEffect } from "react";
import { useRouter } from "next/router";
import { Loading, Text } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToken,
  setRefreshToken,
  setUser,
  getUserData,
} from "../src/features/Authentication/slices/authenticationSlice";
import useTwitterTokenMutation from "../src/hooks/useTwitterTokenMutation";
import useLoginWithTwitterMutation from "../src/hooks/useLoginWithTwitterMutation";
import { RootState } from "../store";

function TwitterCallback() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.authentication);
  const { oauth_token, oauth_verifier, denied } = router.query;
  const twitterTokenMutation = useTwitterTokenMutation();
  const loginWithTwitterMutation = useLoginWithTwitterMutation();

  useEffect(() => {
    if (oauth_token && oauth_verifier) {
      twitterTokenMutation.mutate({
        oauthToken: oauth_token,
        oauthVerifier: oauth_verifier,
      });
    }
  }, [oauth_token, oauth_verifier]);

  useEffect(() => {
    if (twitterTokenMutation.isSuccess) {
      console.log("twitterTokenMutation", twitterTokenMutation.data);
      loginWithTwitterMutation.mutate({
        accessToken: twitterTokenMutation.data.oauth_token,
        tokenSecret: twitterTokenMutation.data.oauth_token_secret,
      });
    }
  }, [twitterTokenMutation.status]);

  useEffect(() => {
    if (loginWithTwitterMutation.isSuccess) {
      dispatch(setAccessToken(loginWithTwitterMutation.data.access_token));
      dispatch(setRefreshToken(loginWithTwitterMutation.data.refresh_token));
      dispatch(getUserData());
      router.push("/complete_profile");
    }
  }, [loginWithTwitterMutation.status]);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

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
