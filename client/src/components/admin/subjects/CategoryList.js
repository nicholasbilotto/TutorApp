import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories, deleteCategory } from '../../../actions';


class CategoryList extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }


  renderList() {
    return this.props.categories
      .filter(category => category.subject === this.props.subject)
      .map(category => {
        return (
          <div className="item" key={category.id}>
          <div className="right floated content">
            <Link to={{ pathname: `/admin/edit/category/${category.id}`, state: { category }}} className="ui button">Edit</Link>
            <Link to={{ pathname: `/admin/delete/category/${category.id}`, state: { category }}} className="ui negative button">Delete</Link>
          </div>
            <i className="large middle aligned icon book" />
            <div className="content">
              {category.title}
              <div className="description">{category.description}</div>
            </div>
          </div>
        );
      });
  }

  render() {
    return (
      <div>
        <h2>Categories</h2>
        <div className="ui middle aligned divided list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: Object.values(state.categories),
  };
};

export default connect(
  mapStateToProps,
  { fetchCategories, deleteCategory }
)(CategoryList);
