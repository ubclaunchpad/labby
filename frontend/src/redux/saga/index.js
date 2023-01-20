import { all, fork } from "redux-saga/effects";
import questionSaga from "./questionSaga";
import logicSaga from "./logicSaga";
import surveySaga from "./surveySaga";
import billingSaga from "./billingSaga";
import costSaga from "./costSaga";
import formSaga from "./formSaga";
import ticketSaga from "./ticketSaga";
import userSaga from "./userSaga";
import projectSaga from "./projectSaga";
import costCenterSaga from "./costCenterSaga";

export default function* rootSaga() {
  yield all([
    fork(questionSaga),
    fork(logicSaga),
    fork(surveySaga),
    fork(billingSaga),
    fork(costSaga),
    fork(formSaga),
    fork(ticketSaga),
    fork(userSaga),
    fork(projectSaga),
    fork(costCenterSaga),
  ]);
}
