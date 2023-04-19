import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
// import img from "../assets/images/not-found.svg";
// import Wrapper from "../assets/wrappers/ErrorPage";
import styles from "../styles/error.module.scss";
const Error = () => {
  return (
    <div className={styles.wrapper}>
      <img src={img} alt="not found" />
      <h3>Ohh! Page Not Found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <Link to="/">back home</Link>
    </div>
  );
};
export default Error;
