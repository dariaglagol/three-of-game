import React from 'react';
// @ts-ignore
import './style.css';

const USER_POSSIBLE_INPUTS = [-1, 0, 1];

const PlayButtons = (props: any) => {
  const { onPlayBtnClick, disabled } = props;

  return (
    <div className='button-wrapper'>
      {USER_POSSIBLE_INPUTS.map((item) => (
          <button
            key={item}
            onClick={() => onPlayBtnClick(item)}
            className="button"
            disabled={disabled}
          >
            {item}
          </button>
      ))}
    </div>

  );
};

export default PlayButtons;
