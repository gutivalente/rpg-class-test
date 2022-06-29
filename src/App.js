import { useReducer, useState } from 'react';
import Customization from './components/Customization/Customization';
import Footer from './components/Footer/Footer';
import Results from './components/Results/Results';
import Statement from './components/Statement/Statement';
import Welcome from './components/Welcome/Welcome';
import { rolesDefault } from './data/roles';
import { statementsDefault } from './data/statements';


export default function App() {

  const [statements, setStatements] = useState(() => statementsDefault.sort(() => 0.5 - Math.random()));

  const reducer = (state, action) => {
    switch (action.type) {
      case 'startBtn':
        return {
          ...state,
          showWelcome: false,
          showCustomization: false,
          showStatement: true
        };

      case 'customizationBtn':
        return {
          ...state,
          showWelcome: false,
          showResults: false,
          showCustomization: true
        };

      case 'saveBtn':
        console.log(action.payload);
        return {
          ...state,
          customRpgClasses: action.payload
        }

      case 'sliderChange':
        return {
          ...state,
          sliderValue: action.payload
        }

      case 'nextBtn':
        const rolesNewValue = state.roles.map(r => {
          if (r.name === action.payload) {
            return {
              ...r,
              value: r.value + state.sliderValue
            };
          };
          return r;
        });
        const newState = {
          ...state,
          roles: rolesNewValue,
          sliderValue: 6
        };

        const nextStatement = state.currentStatement + 1;
        if (nextStatement < statements.length) {
          return {
            ...newState,
            currentStatement: nextStatement
          };
        } else {
          return {
            ...newState,
            showStatement: false,
            showResults: true
          };
        };

      case 'backBtn':
        setStatements(() => statementsDefault.sort(() => 0.5 - Math.random()));
        return {
          ...state,
          showWelcome: true,
          showCustomization: false,
          showResults: false,
          roles: rolesDefault,
          currentStatement: 0
        };
      default:
        break;
    };
  };

  const [state, dispatch] = useReducer(reducer, {
    showWelcome: true,
    showCustomization: false,
    showStatement: false,
    showResults: false,
    currentStatement: 0,
    sliderValue: 6,
    roles: rolesDefault,
    customRpgClasses: []
  });


  return (
    <>
      <Welcome
        visible={state.showWelcome}
        startBtnClick={() => dispatch({ type: 'startBtn' })}
        customizationBtnClick={() => dispatch({ type: 'customizationBtn' })} />

      <Customization
        visible={state.showCustomization}
        backBtnClick={() => dispatch({ type: 'backBtn' })}
        saveBtnClick={customRpgClasses => dispatch({ type: 'saveBtn', payload: customRpgClasses })}
        startBtnClick={() => dispatch({ type: 'startBtn' })} />

      <Statement
        visible={state.showStatement}
        currentStatement={state.currentStatement}
        statements={statements}
        sliderValue={state.sliderValue}
        sliderChange={v => dispatch({ type: 'sliderChange', payload: v })}
        nextBtnClick={statementRole => dispatch({ type: 'nextBtn', payload: statementRole })} />

      <Results
        visible={state.showResults}
        roles={state.roles}
        customRpgClasses={state.customRpgClasses}
        backBtnClick={() => dispatch({ type: 'backBtn' })} />

      <Footer />
    </>
  );
}
