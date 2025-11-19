import app from './app.js'
import {getFirestore, collection, addDoc, getDocs} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js'

export async function subscribeToHellfireClube(subscription){
    const db = getFirestore(app)
    const hellfireClubeCollection = collection (db, 'hellfire-clube')
    const docRef = await addDoc(hellfireClubeCollection, subscription)
    return docRef.id

}

export async function getHellfireClubeSubscriptions() {
    const db = getFirestore(app)
    const hellfireClubeCollection = collection (db, 'hellfire-clube')
    const hellfireClubeCollectionSnapshot = await getDocs(hellfireClubeCollection)
    const subscriptions = hellfireClubeCollectionSnapshot.docs.map(doc => doc.data());
    return subscriptions;
}

