import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import StudentLogin from './StudentLogin';
import AdminLogin from './admin/AdminLogin';
import AdminEdit from './admin/AdminEdit';
import EditSubject from './admin/subjects/EditSubject';
import EditStudent from './admin/students/EditStudent';
import EditCategory from './admin/subjects/EditCategory';
import EditQuestion from './admin/questions/EditQuestion';
import Student from './student/Student';
import DeleteCategory from './admin/subjects/DeleteCategory';
import DeleteSubject from './admin/subjects/DeleteSubject';
import DeleteStudent from './admin/students/DeleteStudent';
import DeleteQuestion from './admin/questions/DeleteQuestion';
import ReviewTest from './admin/students/ReviewTest';
import Test from './student/Test';
import Header from './Header';
import history from '../history';
import 'semantic-ui-css/semantic.min.css';
//i love you

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={StudentLogin} />
          <Route path="/admin" exact component={AdminLogin} />

          <Route path="/admin/edit" exact component={AdminEdit} />
          <Route path="/admin/edit/students" exact component={AdminEdit} />
          <Route path="/admin/edit/newstudent" exact component={AdminEdit} />
          <Route path="/admin/edit/subjects" exact component={AdminEdit} />
          <Route path="/admin/edit/newsubject" exact component={AdminEdit} />

          <Route path="/admin/edit/subject/:id" exact component={EditSubject} />
          <Route path="/admin/edit/subject/:id/newcategory" exact component={EditSubject} />
          <Route path="/admin/edit/subject/:id/questions" exact component={EditSubject} />
          <Route path="/admin/edit/subject/:id/newquestion" exact component={EditSubject} />
          <Route path="/admin/edit/student/:id" exact component={EditStudent} />
          <Route path="/admin/edit/student/:id/review/:testid" exact component={ReviewTest} />

          <Route path="/student/:id" exact component={Student} />
          <Route path="/student/:id/test/:testid" exact component={Test} />

          <Route path="/admin/edit/category/:id" exact component={EditCategory} />
          <Route path="/admin/edit/question/:id" exact component={EditQuestion} />

          <Route path="/admin/delete/student/:id" exact component={DeleteStudent} />
          <Route path="/admin/delete/subject/:id" exact component={DeleteSubject} />
          <Route path="/admin/delete/question/:id" exact component={DeleteQuestion} />
          <Route path="/admin/delete/category/:id" exact component={DeleteCategory} />
        </div>
      </Router>
    </div>
  );
};

export default App;
