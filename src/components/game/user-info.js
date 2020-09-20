import React from 'react';

let UserInfo = ({user}) => (
    <div className={'user-info'}>
        {user.username}#{user.discriminator}
    </div>
);


export default UserInfo;
