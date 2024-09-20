import './App.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports'; // No more errors with this import
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Authenticator>
                    {({ signOut, user }) => (
                        <main>
                            <h2>Welcome, {user?.userId}!</h2>
                            <button onClick={signOut}>Sign Out</button>
                        </main>
                    )}
                </Authenticator>
            </header>
        </div>
    );
}

export default withAuthenticator(App);

