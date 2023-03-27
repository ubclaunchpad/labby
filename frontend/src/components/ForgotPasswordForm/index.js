import "./index.css"

function ForgotPasswordForm() {
    return (
        <div className="ForgotPasswordForm">
            <h1>Forgot Password</h1>
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ForgotPasswordForm;