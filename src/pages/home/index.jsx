import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setQuizUserData } from "../../store/slices/quizSlice";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.quizText}>
        <div className={`${styles.glass} ${styles.absolute}`}></div>
        <h1 className={styles.title}>QUIZ</h1>
      </div>
      <button
        onClick={() => {
          dispatch(setQuizUserData([]));
          localStorage.removeItem("quizUserData");
          navigate("/quiz");
        }}
        class={styles.startbtn}
      >
        Start
      </button>
    </div>
  );
};

export default Home;
