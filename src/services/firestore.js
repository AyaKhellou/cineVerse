import { updateDoc, arrayUnion, doc, arrayRemove, getDoc } from "firebase/firestore";
import { db } from '../firebase-config'

export async function addFavorite(userId, movieId) {
    await updateDoc(
        doc(db, "users", userId),
        {
            favorites: arrayUnion(movieId)
        }
    );
}

export async function removeFavorite(userId, movieId) {
    await updateDoc(doc(db, "users", userId),{
            favorites: arrayRemove(movieId)
        }
    );
}


export async function getUserData(userId) {
    const snapshot = await getDoc(
        doc(db, "users", userId)
    );

    if (snapshot.exists()) {
        return snapshot.data();
    }

    return null;
}
