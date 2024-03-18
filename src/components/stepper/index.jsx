import { useEffect, useRef, useState } from "react";

import { COLORS } from "../../constants/colors";

import styles from "./styles.module.scss";

const Stepper = ({ steps, currentStep, onChange }) => {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      if (count === stepNumber) {
        // current step
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: false,
        };
        count++;
      } else if (count < stepNumber) {
        // step completed
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        // step pending
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };
  useEffect(() => {
    // Create Object
    const stepsState = steps.map((step, index) => {
      return Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      );
    });
    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div key={index} className={styles.display_steps_container}>
        <div className={styles.container}>
          <div
            className={styles.number_container}
            style={
              step.selected
                ? { backgroundColor: COLORS.white, borderColor: COLORS.green }
                : {}
            }
            // onClick={() => onChange(index + 1)}
          >
            {/* Display Number */}
            {step.completed ? (
              <span className={styles.check}></span>
            ) : (
              <h1 textStyle="fs-sb-18" color={COLORS.white}>
                
              </h1>
            )}
          </div>
          <div className={styles.description_container}>
            {/* Display description */}
            {/* <h1
              textStyle="fs-sb-14"
              color={COLORS.emperor}
              style={{ textAlign: "center" }}
            >
              {steps[index]}
            </h1> */}
          </div>
        </div>
        {index !== steps.length - 1 && (
          <div
            className={styles.line}
            style={step.completed ? { borderColor: COLORS.green } : {}}
          >
            {/* Display line */}
          </div>
        )}
      </div>
    );
  });
  return <div className={styles.main_container}>{displaySteps}</div>;
};

export default Stepper;
