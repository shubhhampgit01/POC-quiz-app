import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { quizData } from "../quiz/data";
import Stepper from "../../components/stepper";
import Button from "../../components/button";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { setQuizUserData } from "../../store/slices/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

import { useNavigate } from "react-router-dom";
const Solutions = () => {
  const { quizUserData } = useSelector((state) => state.quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = quizUserData[currentQuestionIndex];
  const [imagePosition, setImagePosition] = useState(0);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(currentQuestionIndex + 1);

  const navigate = useNavigate();

  const steps = Array.from(
    { length: quizData.length },
    (_, index) => `Step ${index + 1}`
  );

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setImagePosition(-200);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setImagePosition(0); // Reset image position for the next question

        setCurrentStep(currentQuestionIndex + 2);
      }, 500);
    } else {
      localStorage.setItem("quizUserData", JSON.stringify(quizUserData));
      navigate("/result");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentStep(currentStep - 1);
    } else {
    }
  };

  console.log(quizUserData, "data quiz");

  return (
    <div className={styles.container}>
      <div className={styles.quizContainer}>
        <div
          className={styles.leftSide}
          style={{
            transform: `translateX(${imagePosition}%)`,
            transition: "transform 0.25s",
          }}
        >
          <div
            className={styles.gradientLayer}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))`,
            }}
          ></div>
          <img
            className={styles.leftImage}
            alt="image"
            src={currentQuestion.question.questionImage}
          />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.quizMain}>
            <div className={styles.stepperContainer}>
              {/* <HorizontalStepper currentStep={2} numSteps={4} /> */}
              <Stepper
                steps={steps}
                currentStep={currentStep}
                onChange={setCurrentStep}
              />
            </div>

            <div className={`${styles.glass} ${styles.absolute}`}></div>
            <div className={styles.bottomQuiz}>
              <h1>{currentQuestion.question.question}</h1>
              <div className={styles.optionContainer}>
                {/* <div className={`${styles.glass2} ${styles.absolute2}`}></div> */}
                {currentQuestion.question.options.map((item, index) => {
                  const isCorrectOption =
                    currentQuestion.question.correctOption;
                  const isSelectedOption = currentQuestion.selectedOption;

                  console.log(isCorrectOption, "is correct");
                  console.log(isSelectedOption, "is selecetd");
                  return (
                    <div
                      className={
                        item == isCorrectOption
                          ? `${styles.selectedOption} ${styles.singleOption}`
                          : item === isSelectedOption &&
                            item !== isCorrectOption
                          ? `${styles.singleOption} ${styles.wrongSelectedOption}`
                          : `${styles.singleOption}`
                      }
                    >
                      <p>{item}</p>

                      {item == isCorrectOption ? (
                        <div
                          className={`${styles.tickMark} ${styles.selectedTick}`}
                        >
                          <TiTick />
                        </div>
                      ) : item === isSelectedOption &&
                        item !== isCorrectOption ? (
                        <div
                          className={`${styles.tickMark} ${styles.wrongSelectedTick}`}
                        >
                          <RxCross2 />
                        </div>
                      ) : (
                        <div className={styles.tickMark}></div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={styles.btnContainer}>
                <div onClick={handleBack} className={styles.backBtn}>
                  <MdOutlineKeyboardBackspace className={styles.backArrow} />
                  <p>Back</p>
                </div>
                <Button onClick={handleNextQuestion} type={"next"}>
                  {currentQuestionIndex == quizData.length - 1
                    ? "Result"
                    : "Next"}
                </Button>
              </div>
              <div className={styles.qnProgress}>
                {currentQuestionIndex + 1}/{quizData.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
