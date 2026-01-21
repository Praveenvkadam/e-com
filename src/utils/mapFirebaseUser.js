export const mapFirebaseUser = (user) => {
  if (!user) return null;

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    providerId: user.providerData?.[0]?.providerId || null,
  };
};
