import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1', 
    platform: 'com.feihuan.iShare',
    projectId: '662b2b5ec87cb14f4ece', 
    databaseId: '662b31612a819df7d47e', 
    userCollectionId: '662b3182a52c05390c6c', 
    videoCollectionId: '662b3289eb1bcaf9aeaf',
    storageId: '662b3462b9920e5f7876'
}

const client = new Client(); 

client
.setEndpoint(appwriteConfig.endpoint) 
.setProject(appwriteConfig.projectId) 
.setPlatform(appwriteConfig.platform) 

const account = new Account(client);
const avatars = new Avatars(client); 
const databases = new Databases(client)

    // Register User
    export const createUser = async (email, password, username) => {
        try {

            const newAccount = await account.create(ID.unique(), email, password, username) 

            if(!newAccount) throw new Error 

            const avatarUrl = avatars.getInitials(username) 
            await signIn(email, password) 

            const newUser = await databases.createDocument(
                appwriteConfig.databaseId, 
                appwriteConfig.userCollectionId, 
                ID.unique(), 
                {
                    accountId: newAccount.$id, 
                    email, 
                    username, 
                    avatar: avatarUrl
                }
            ) 
            return newUser
            
        } catch (error) {
            console.log(error) 
            throw new Error(error)
        }
    }

    export async function signIn (email, password) {
        try {
            const session = await account.createEmailSession(email,password) 

            return session
        } catch (error) {
            throw new Error(error)
        }
    }

    export const getCurrentUser = async () => {

        try {
            const currentAccount = await account.get() 

            if(!account) throw Error

            const currentUser = await databases.listDocuments(
                appwriteConfig.databaseId, 
                appwriteConfig.userCollectionId, 
                [Query.equal('accountId', currentAccount.$id)]
            )

            if(!currentUser) throw Error 

            return currentUser.documents[0]

        } catch (error) {
            console.log(error)
        }
    }

    export async function getAllPosts() {
        try {
          const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
          );
      
          return posts.documents;
        } catch (error) {
          throw new Error(error);
        }
      }