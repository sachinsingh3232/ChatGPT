import admin from 'firebase-admin'
import { getApps } from 'firebase-admin/app'

const serviceAccount = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_SERVICEACCOUNT_KEY as string
)

if (!getApps().length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

const adminDB = admin.firestore();
export { adminDB };