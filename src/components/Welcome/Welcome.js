import CustomButton from '../CustomButton/CustomButton';
import './Welcome.css';

function Welcome(props) {
  if (props.visible) {
    return (
      <div className='card welcome-section'>

        <h1>Welcome!</h1>
        <p>This personality test was made for fun, because I like both RPGs and assigning funny labels to people I know.</p>
        <p>The test will assign you an RPG class based on how much you agree or disagree with a series of statements.</p>
        <p>Each answer you give will score points to one out of six roles commonly seen in RPG games: Assaulter, Vanguard, Ruiner, Healer, Disruptor and Supporter.</p>
        <p>When you finish answering all the questions, you'll be given your class based on your two highest scoring roles. There are 30 classes in total.</p>
        <p>Have fun!</p>

        <CustomButton
          variant='contained'
          onClick={() => props.startBtnClick()}>
          Start
        </CustomButton>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

        <CustomButton
          variant='contained'
          onClick={() => props.customizationBtnClick()}>
          Customization
        </CustomButton>

      </div>
    );
  }
}

export default Welcome;
