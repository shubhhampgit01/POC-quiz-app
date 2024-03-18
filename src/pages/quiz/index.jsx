import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { quizData } from "./data";
import Stepper from "../../components/stepper";
import Button from "../../components/button";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { setQuizUserData } from "../../store/slices/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import HorizontalStepper from "../../components/stepper2";
import { useNavigate } from "react-router-dom";
const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = quizData[currentQuestionIndex];
  const [imagePosition, setImagePosition] = useState(0);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(currentQuestionIndex + 1);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const { quizUserData } = useSelector((state) => state.quiz);

  const [selectedOptions, setSelectedOptions] = useState(
    Array(quizData.length).fill(null)
  );
  const navigate = useNavigate();

  const steps = Array.from(
    { length: quizData.length },
    (_, index) => `Step ${index + 1}`
  );
  console.log(currentQuestion, "current");

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      if (selectedOptions[currentQuestionIndex] == null) {
        return;
      }
      setImagePosition(-200); // Start image transition
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setImagePosition(0); // Reset image position for the next question
        if (selectedOptions[currentQuestionIndex] !== null) {
          setCurrentStep(answeredQuestions + 1);
        }
      }, 500);
    } else {
      localStorage.setItem("quizUserData", JSON.stringify(quizUserData));
      navigate("/result");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
    }
  };

  const handleOptionSelect = (selectedOption) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestionIndex] = selectedOption;
    setSelectedOptions(updatedSelectedOptions);
    dispatch(setQuizUserData({ question: currentQuestion, selectedOption }));
  };

  useEffect(() => {
    const unansweredCount = selectedOptions.filter(
      (option) => option === null
    ).length;
    setAnsweredQuestions(selectedOptions.length - unansweredCount);
  }, [selectedOptions]);

  console.log(answeredQuestions, "answered");
  console.log(quizUserData, "data");

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
            src={currentQuestion.questionImage}
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
              <h1>{currentQuestion.question}</h1>
              <div className={styles.optionContainer}>
                {/* <div className={`${styles.glass2} ${styles.absolute2}`}></div> */}
                {currentQuestion.options.map((item, index) => (
                  <div
                    onClick={() => handleOptionSelect(item)}
                    className={
                      selectedOptions[currentQuestionIndex] === item
                        ? `${styles.selectedOption} ${styles.singleOption}`
                        : styles.singleOption
                    }
                  >
                    <p>{item}</p>

                    {selectedOptions[currentQuestionIndex] === item ? (
                      <div
                        className={`${styles.tickMark} ${styles.selectedTick}`}
                      >
                        <TiTick />
                      </div>
                    ) : (
                      <div className={styles.tickMark}></div>
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.btnContainer}>
                <div onClick={handleBack} className={styles.backBtn}>
                  <MdOutlineKeyboardBackspace className={styles.backArrow} />
                  <p>Back</p>
                </div>
                <Button
                  onClick={handleNextQuestion}
                  type={
                    selectedOptions[currentQuestionIndex] == null
                      ? "null"
                      : "next"
                  }
                >
                  {currentQuestionIndex == quizData.length - 1
                    ? "Submit"
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

export default Quiz;
