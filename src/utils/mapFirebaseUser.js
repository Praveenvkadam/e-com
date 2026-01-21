export const mapFirebaseUser = (user) => {
  if (!user) return null;

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    providers: user.providerData.map((p) => p.providerId),
  };
};
