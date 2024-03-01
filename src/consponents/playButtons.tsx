import React from 'react';
import './style.css';

const USER_POSSIBLE_INPUTS = [-1, 0, 1];

type PlayButtonsProps = {
  onPlayBtnClick: (item: number) => void,
  disabled: boolean,
};

const PlayButtons = (props: PlayButtonsProps) => {
  const { onPlayBtnClick, disabled } = props;

  return (
    <div className='play-button-wrapper'>
      {USER_POSSIBLE_INPUTS.map((item) => (
          <button
            key={item}
            onClick={() => onPlayBtnClick(item)}
            className="play-button button"
            disabled={disabled}
          >
            {item}
          </button>
      ))}
    </div>
  );
};

export default PlayButtons;
