import admin from 'firebase-admin';

// Initialize Firebase Admin SDK once.
if (!admin.apps.length) {
  try {
    // If a service account JSON is provided via FIREBASE_SERVICE_ACCOUNT_KEY env var, use it
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
      : undefined;
    admin.initializeApp({
      credential: serviceAccount
        ? admin.credential.cert(serviceAccount as admin.ServiceAccount)
        : admin.credential.applicationDefault()
    });
  } catch (err) {
    console.error('Error initializing Firebase Admin', err);
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();