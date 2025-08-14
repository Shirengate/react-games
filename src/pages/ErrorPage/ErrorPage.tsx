
import { useNavigate } from "react-router";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
    const navigate = useNavigate()
  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorTitle}>Страница не найдена</h2>
        <p className={styles.errorMessage}>
          Кажется, такой страницы не существует. Проверьте URL или вернитесь на
          главную.
        </p>
        <div onClick={() => navigate(-1)} className={styles.homeLink}>
          Вернуться на назад
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;