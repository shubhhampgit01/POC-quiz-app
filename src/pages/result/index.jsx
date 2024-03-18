import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useIntersectionObserver from "../../hooks/useOnscrollAnimation";
import { setQuizUserData } from "../../store/slices/quizSlice";
const Result = () => {
  const navigate = useNavigate();
  const { quizUserData } = useSelector((state) => state.quiz);
  const { animationTriggered, ref } = useIntersectionObserver();

  const calculateScore = () => {
    const totalQuestions = quizUserData.length;
    const correctAnswers = quizUserData.filter(
      (item) => item.selectedOption === item.question.correctOption
    ).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
    return { correctAnswers, incorrectAnswers, percentage };
  };
  console.log(quizUserData, "data quiz ka");
  const { correctAnswers, incorrectAnswers, percentage } = calculateScore();
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.resultContainer}>
        <div className={`${styles.glass} ${styles.absolute}`}></div>

        {/* <div className={styles.resultContent}>
          <h1>Your Quiz Result</h1>
          <div className={styles.score}>
            <div
              className={styles.circleContainer}
              
            >
              {percentage}
            </div>
            <div className={styles.percentage}>
              <p>Percentage Score: {percentage}%</p>
            </div>
          </div>
        </div> */}

        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div
                ref={ref}
                className={
                  animationTriggered
                    ? `${styles.circleContainer} ${styles.circleContainerAnimation}`
                    : `{${styles.circleContainer}}`
                }
              >
                {percentage}%
              </div>
            </div>
            <div class="flip-card-back">
              <div className={styles.retake}>
                <div>
                  <h1>Correct : {correctAnswers}</h1>
                  <h1>Incorrect : {incorrectAnswers}</h1>
                </div>

                <button
                  onClick={() => {
                    dispatch(setQuizUserData([]));
                    localStorage.removeItem("quizUserData");
                    navigate("/quiz");
                  }}
                  class={styles.startbtn}
                >
                  Retake
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* quiz result */}
      </div>
      <button
        onClick={() => {
          navigate("/solutions");
        }}
        class={styles.startbtn}
      >
        Solutions
      </button>
    </div>
  );
};

export default Result;
