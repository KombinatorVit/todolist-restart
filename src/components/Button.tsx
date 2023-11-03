import React from 'react';

type ButtonPropsType = {
    name: string
    onClick: () => void
}

const Button = (props: ButtonPropsType) => {
    return (
        <button onClick={props.onClick}>
            {props.name}
        </button>
    );
};

export default Button;