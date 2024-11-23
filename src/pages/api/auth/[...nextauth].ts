import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers:[
        CredentialsProvider({
        type:'credentials',
        credentials: {},
        authorize(credentials, req) {
            const {email, password} = credentials as {
                email: string;
                password: string;
            };

            if(email !== 'neal.kotval@gmail.com' && password !== "1234"){
                return null;
            }

            return {id: "1234", name: 'Neal Kotval', email: "neal.kotval@gmail.com"}
        }

        })
    ]
}

export default NextAuth(authOptions);