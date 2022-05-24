import { Button, Slider, styled } from '@mui/material';
import React, { useState } from 'react';
import { classes } from './classes';
import { rolesDefault } from './roles';
import { statementsDefault } from './statements';

export default function App() {

  const [showWelcome, setShowWelcome] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [statements, setStatements] = useState(() => statementsDefault.sort(() => 0.5 - Math.random()));
  const [currentStatement, setCurrentStatement] = useState(0);
  const [sliderValue, setSliderValue] = useState(6);
  const [roles, setRoles] = useState(rolesDefault);

  const CustomButton = styled(Button)({
    borderRadius: '50px',
    backgroundColor: '#531',
    color: '#eca',
    '&:hover': {
      backgroundColor: '#642'
    }
  });

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

  function handleNextBtnClick(statementRole) {
    const rolesNewValue = roles.map(r => {
      if (r.name === statementRole) {
        return {
          ...r,
          value: r.value + sliderValue
        }
      };
      return r;
    });
    setRoles(rolesNewValue);
    setSliderValue(6);
    goToNextStatement();
  }

  function goToNextStatement() {
    const nextStatement = currentStatement + 1;
    if (nextStatement < statements.length) {
      setCurrentStatement(nextStatement);
    } else {
      setShowResults(true);
    };
  };

  function percent(partial, total) {
    return ((100 * partial) / total).toFixed(1);
  }

  function resetTest() {
    setRoles(rolesDefault);
    setCurrentStatement(0);
    setStatements(() => statementsDefault.sort(() => 0.5 - Math.random()))
    setShowResults(false);
  }

  function renderWelcome() {
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
          onClick={() => setShowWelcome(false)}>
          Start
        </CustomButton>

      </div>
    );
  }

  function renderResults() {
    const sortedRoles = roles.sort((a, b) => b.value - a.value);

    const selectedClass = classes.find(cls => (
      cls.primaryRole === sortedRoles[0].name &&
      cls.secondaryRole === sortedRoles[1].name
    ));

    let rolesValueTotal = 0;
    roles.forEach(role => rolesValueTotal = rolesValueTotal + role.value);

    return (
      <>

        <div className='result-section'>
          <div className='card'>

            <h2 className='result-heading'>
              You are<br />
              <span className='result-heading-class'>The {selectedClass.name}</span>
            </h2>

            <p className='result-description'>{selectedClass.description}</p>

            <div className='result-roles-section'>

              <div className='result-roles-block'>
                <span>Primary role</span><br />
                <span className={'role role-' + selectedClass.primaryRole}>
                  {selectedClass.primaryRole}
                </span>
              </div>

              <div className='result-roles-block'>
                <span>Secondary role</span><br />
                <span className={'role role-' + selectedClass.secondaryRole}>
                  {selectedClass.secondaryRole}
                </span>
              </div>

            </div>
          </div>

          <ul className='roles-section'>
            {sortedRoles.map(role => (
              <>

                <li>
                  <h4>
                    <span className={'role role-' + role.name}>{role.name}</span>
                    <span> - {percent(role.value, rolesValueTotal)}%</span>
                  </h4>
                  <p>{role.description}</p>
                </li>
                <hr />

              </>
            ))}
          </ul>
        </div>

        <div className='end-section'>
          <CustomButton
            variant='contained'
            onClick={() => resetTest()}>
            Retake
          </CustomButton>
        </div>

      </>
    );
  }

  function renderStatements() {
    return (
      <>

        <div className='card'>
          <div className='statement-section'>
            <div className='statement-count'>
              <span>Statement {currentStatement + 1}</span>/{statements.length}
            </div>

            <div className='statement-text'>{statements[currentStatement].text}</div>
          </div>

          <div className='answer-section'>
            <Slider
              min={0}
              max={12}
              value={sliderValue}
              track={false}
              marks={sliderMarks}
              color='primary'
              onChange={(e, v) => setSliderValue(v)}
            />
            <CustomButton
              variant='contained'
              onClick={() => handleNextBtnClick(statements[currentStatement].role)}>
              Next
            </CustomButton>
          </div>
        </div>

      </>
    );
  }

  return (
    <>
      {
        showWelcome ? renderWelcome() :
          showResults ? renderResults() :
            renderStatements()
      }
    </>
  );
}
