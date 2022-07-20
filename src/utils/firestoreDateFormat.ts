import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormatter(timestamp: FirebaseFirestoreTypes.Timestamp) {
  if(timestamp) {
    const date = new Date(timestamp.toDate())

    const day = date.toLocaleDateString()
    const hour = date.toTimeString().split(' ')[0]

    return `${day} às ${hour}`
  }
}