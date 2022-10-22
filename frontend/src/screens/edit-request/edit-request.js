import FormBuilder from "../../components/FormBuilder";
import Header from "../../components/Header";
import './index.css'


function EditRequest() {
  return (
    <div className="EditRequestPage">
      <div style={{backgroundColor: 'green', width: '100px'}}>
        {Header()}
      </div>
      <div style={{flex: 6}}>
        {FormBuilder()}
      </div>
      <div style={{flex: 2, backgroundColor: 'red'}}>
        Side
      </div>
    </div>
  );
}

export default EditRequest;