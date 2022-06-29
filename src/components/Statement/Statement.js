import { Slider } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';
import './Statement.css';

const sliderMarks = [
  {
    value: 0,
    label: 'disagree',
  },
  {
    value: 6,
    label: 'neutral',
  },
  {
    value: 12,
    label: 'agree',
  },
];

function Statement(props) {
  if (props.visible) {
    return (
      <>

        <div className='card'>
          <div className='statement-section'>
            <div className='statement-count'>
              <span>Statement {props.currentStatement + 1}</span>/{props.statements.length}
            </div>

            <div className='statement-text'>{props.statements[props.currentStatement].text}</div>
          </div>

          <div className='answer-section'>
            <Slider
              min={0}
              max={12}
              value={props.sliderValue}
              track={false}
              marks={sliderMarks}
              color='primary'
              onChange={(e, v) => props.sliderChange(v)}
            />
            <CustomButton
              variant='contained'
              onClick={() => props.nextBtnClick(props.statements[props.currentStatement].role)}>
              Next
            </CustomButton>
          </div>
        </div>

      </>
    );
  }
}

export default Statement;
