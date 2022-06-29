import { rpgClasses } from '../../data/rpgClasses';
import CustomButton from '../CustomButton/CustomButton';
import './Results.css';

function percent(partial, total) {
  return ((100 * partial) / total).toFixed(1);
}

function findRpgClass(rpgClasses, roles) {
  return rpgClasses.find(cls => (
    cls.primaryRole === roles[0].name &&
    cls.secondaryRole === roles[1].name
  ));
}

function Results(props) {
  const sortedRoles = props.roles.sort((a, b) => b.value - a.value);

  let selectedClass;
  if (props.customRpgClasses.length) {
    selectedClass = findRpgClass(props.customRpgClasses, sortedRoles);
  } else {
    selectedClass = findRpgClass(rpgClasses, sortedRoles);
  }

  let rolesValueTotal = 0;
  props.roles.forEach(role => rolesValueTotal = rolesValueTotal + role.value);

  if (props.visible) {
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
            onClick={() => props.backBtnClick()}>
            Back
          </CustomButton>
        </div>

      </>
    );
  }
}

export default Results;
