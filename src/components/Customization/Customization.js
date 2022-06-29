import { TextField } from '@mui/material';
import { useState } from 'react';
import { rpgClasses } from '../../data/rpgClasses.js';
import CustomButton from '../CustomButton/CustomButton';
import './Customization.css';

function Customization(props) {

  const [customRpgClasses, setCustomRpgClasses] = useState([]);

  if (props.visible) {
    return (
      <>
        <div className='card welcome-section'>

          <h1>Customization</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <ul>
            <li>Lorem</li>
            <li>Ipsum</li>
            <li>Dolor</li>
          </ul>

          <CustomButton
            variant='contained'
            onClick={() => props.backBtnClick()}>
            Back
          </CustomButton>

        </div>

        <ul className='roles-section'>
          {rpgClasses.map(rpgClass => (
            <>
              <li>

                <div>
                  <span>Primary role</span><br />
                  <span className={'role role-' + rpgClass.primaryRole}>
                    {rpgClass.primaryRole}
                  </span>
                </div>

                <div>
                  <span>Secondary role</span><br />
                  <span className={'role role-' + rpgClass.secondaryRole}>
                    {rpgClass.secondaryRole}
                  </span>
                </div>

                <TextField defaultValue={rpgClass.name} /> <br />

                <TextField multiline maxRows={3} defaultValue={rpgClass.description} />
              </li>
              <hr />
            </>
          ))}
        </ul>

        <div className='end-section'>
          <CustomButton
            variant='contained'
            onClick={() => props.saveBtnClick(customRpgClasses)}>
            Save
          </CustomButton>

          <CustomButton
            variant='contained'
            onClick={() => props.startBtnClick()}>
            Start
          </CustomButton>
        </div>
      </>
    );
  }
}

export default Customization;
