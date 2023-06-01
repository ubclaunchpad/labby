import { ToastContainer as ToastView } from "react-toastify";

function ToastContainer() {
    return (
        <ToastView
            position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="light"
        />
    );
}

export default ToastContainer;
