import React from 'react';
import ReactLoading from 'react-loading';

function Loading({type, color}) {
    return <div className="h-100 centeritem">
        <ReactLoading type={type} color={color} height="20%" width="20%" />
    </div>
}

export default Loading