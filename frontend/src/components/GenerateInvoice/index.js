import { NavLink } from "react-router-dom";

function GenerateInvoice() {
  return (
    <NavLink to="/pdf">
      <div className="GenerateInvoice">Generate Invoice</div>
    </NavLink>
  );
}

export default GenerateInvoice;
