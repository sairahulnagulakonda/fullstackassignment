import LoginForm from "@/pages/login";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/LoginForm.css";
import BooksPage from "@/pages/books";

const Home: React.FC = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Home;
