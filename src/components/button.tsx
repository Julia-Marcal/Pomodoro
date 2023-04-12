import React from 'react';

interface Props {
  text: string;
  onClick?: () => void;
  classname?: string;
}

export function Button(props: Props): JSX.Element {
  return (
    <button onClick={props.onClick} className={props.classname}>
      {props.text}
    </button>
  );
}
