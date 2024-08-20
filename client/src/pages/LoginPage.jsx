import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "622140840189-o5sk7mltpbipqsrfg2volh0kklfgu8j8.apps.googleusercontent.com",
      callback: async (response) => {
        const googleToken = response.credential;
        console.log("Encoded JWT ID token: " + response.credential);
        const { data } = await axios.post(
          "https://serlok.daffazuhdii.my.id/login/google",
          {
            googleToken,
          }
        );
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("name", data.name);
        navigate("/");
      },
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    window.google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">SerLok</h1>
            <p className="py-6">
              Aplikasi live location adalah alat yang memungkinkan pengguna
              untuk membagikan lokasi mereka secara real-time dengan orang lain.
              Fitur ini dapat ditemukan di berbagai aplikasi, seperti aplikasi
              pesan instan, aplikasi peta, dan aplikasi keamanan pribadi
            </p>
            <h5 className="text-3xl font-bold">Login now!</h5>
            <div className="flex justify-left mt-3" id="buttonDiv"></div>
          </div>
          <div className="card w-full max-w-sm shrink-0 mr-10">
            <img src="SerL_k.png" alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
}
