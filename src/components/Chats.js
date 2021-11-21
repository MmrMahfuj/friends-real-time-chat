import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from './firebase';

import { useAuth } from './contexts/AuthContext';
import axios from 'axios';


const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');

    }

    const getFile = async (url) => {
        const res = await fetch(url);
        const data = await res.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if (!user) {
            history.push('/');

            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "ffa3c3e9-3cde-46a0-a56f-2e0b8fdab4c0",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let form_data = new FormData();
                form_data.append('email', user.email);
                form_data.append('username', user.email);
                form_data.append('secret', user.uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        form_data.append('avatar', avatar, avatar.name)

                        axios.post('https://api.chatengine.io/users', form_data, {
                            headers: {
                                "private-key": "c6c67c93-e7c3-482d-ac09-cccc757fb72e"
                            }
                        })
                            .then(() => {
                                setLoading(false)
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    })

            })
    }, [user, history])

    if (!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Friends
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="ffa3c3e9-3cde-46a0-a56f-2e0b8fdab4c0"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;