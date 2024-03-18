import React from "react";
import styles from "./styles.module.scss";
import { COLORS } from "../../constants/colors";

const HorizontalStepper = ({ numSteps, currentStep }) => {
  const steps = new Array(numSteps).fill("");

  return (
    <div className={styles.container}>
      {steps.map((step, index) => (
        <div key={index} className={styles.stepContainer}>
          <div
            className={[
              styles.stepCircle,
              index < currentStep || index + 1 === currentStep
                ? styles.activeStepCircle
                : null,
            ].join(" ")}
          >
            {index + 1 >= currentStep ? <h1>{index + 1}</h1> : <p></p>}
          </div>

          {index < steps.length - 1 && (
            <div
              className={[
                styles.line,
                index + 1 < currentStep ? styles.activeLine : null,
              ].join(" ")}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default HorizontalStepper;
