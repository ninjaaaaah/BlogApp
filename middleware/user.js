export default async function fetchUserDetails(uid) {
  const db = $nuxt.$fire.firestore
  const userRef = db.collection('users').doc(uid).get()
  const req = await fetch(userRef, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      id: id,
    }),
  })
  const fetchedUserDetails = await req.json()
  console.log('FETCHED USER DETAILS:', fetchedUserDetails)
  return fetchedUserDetails
}
