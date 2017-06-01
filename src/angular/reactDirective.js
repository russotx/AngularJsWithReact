import app from '../../main'
import React from "react";
import ReactDOM from "react-dom";
import Layout from "../react/Layout";

const reactDirective = app.directive('reactDirective', function() {
  return {
      template: '<div id="reactapp" class="react-part"></div>',
      scope: {
        todos: '=',
        // markComplete is a function that we'll pass to React as props
        markComplete:'&'
      },
      link: function(scope, el, attrs){
              // newItem is a function that fires an alert, the value is a string passed from React in Layout.js        
              scope.newItem = (value) => alert (value);

              // scope.markComplete = (todoItem) => {scope.markItemCompleted(todoItem)}
              const reactapp = document.getElementById('reactapp');

              scope.$watch('todos', 
                // callback function to run every time 'todos' changes
                // checks if newValue exists
                function(newValue, oldValue) {
                  if (angular.isDefined(newValue)) {
                    // render the react app every time the value changes
                    // only renders in the virtual DOM, React won't render anything in the real DOM unless 
                    // the React diffing algorithm sees a change.
                    ReactDOM.render(
                      // passing newValue and scope properties from Angular directive to React component as props.
                      // scope.markComplete is a function passed in as props
                      // Layout component is defined in Layout.js, maps todos to li components which fire markComplete when clicked
                      // and adds buttons that fire newItem
                      <Layout 
                        todos={newValue} 
                        newItem={scope.newItem} 
                        markComplete={scope.markComplete}
                      />, 
                      reactapp);
                  }
                }, 
                true);

            }
    }
});

export default reactDirective
