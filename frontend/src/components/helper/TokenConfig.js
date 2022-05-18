import React from 'react';

export const tokenConfig = (token) => {
// Headers
const config = {
    headers: {
    'Content-Type': 'application/json',
    },
};

// If token, add to headers config
if (token) {
    config.headers['Authorization'] = `Token ${token}`;
}

return config;
};