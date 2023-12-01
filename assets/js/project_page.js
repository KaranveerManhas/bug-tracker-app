{
    // Function to delete bug on project page
    let deleteBug = function(){
        // Add event listener to delete link of every bug in the list
        $('.delete-bug').on('click', function(e){
            e.preventDefault();

            // Ajax call to delete bug from database
            $.ajax({
                type: 'GET',
                url: $(this).attr('href'),
                success: function(data){
                    // On success, delete that bug container from DOM
                    $(`#bug-${data.data.bug_id}`).remove();
                },
                error: function(error){
                    console.error(error.responseText);
                }
            });
        });
    }

    // Function to search bugs by title or description
    let searchBugsBySearchTerm = function(){
        // Search-bar input element
        let searchBar = $('#bug-search');
        // Add event listener
        $(searchBar).on('keyup', function(){
            let self = this;
            // Get the value of search bar
            let searchValue = $(this).val();
            // Get project id from main tag's id attribute
            let projectId = $('main').attr('id').split('-')[1];
            // If search bar is emptied out after searching something, show the full bug list again
            if (searchValue == ''){
                showFullBugList(projectId);

            // Otherwise make ajax call to find bugs that match the search string
            }else{
                $.ajax({
                    type: "GET",
                    url: `/bugs/search?searchTerm=${searchValue}&pId=${projectId}`,
                    success: function(data){
                        // On success, get the bug table
                        let bugTable = $('table');
                        // Set the innerHTML to just the heading of the table
                        bugTable.html('<tr><td>Title</td><td>Description</td><td>Labels</td><td>Author</td></tr>');
                        // For each bug found, append it to the table as a table row
                        for(bug of data.bugs){
                            let newBug = newBugDom(bug);
                            $(bugTable).append(newBug);
                        }
                    },
                    error: function(err){
                        console.log(err.responseText);
                    }
                });
                
            }
        });
    }

    // Filter bugs by their labels
    let filterByLabel = function(){
        // Get project id from main tag's id attribute
        let projectId = $('main').attr('id').split('-')[1];
        // Select all label filters
        let filters = $('.label-filter');
        // Make an array to store selected filters
        filterElements = [];
        // Add Event Listener to filters
        $(filters).change(function(){
            let self = this;
            // Filter value is stored in the id of each filter in the form 'label-${value_of_label}'
            let filterValue = $(self).attr('id').split('-')[1];

            // Set the author filters to unchecked if even one label filter is checked
            $('.author-filter').each(function(){
                let self = this;
                if($(self).is(':checked')){
                    $(self).prop('checked', false);
                }
            });

            // If label filter is checked, then add it to the filterElements array
            if($(self).is(':checked')){
                filterElements.push(filterValue);
            // If filter is already present in the array and the filter is unchecked then remove it from the array 
            }else if(filterElements.includes(filterValue) && !$(self).is(':checked')){

                filterElements.splice(filterElements.indexOf(filterValue), 1);
            }
            // If the array's length is zero which means there is no filter applied then show full bug list
            if(filterElements.length == 0){
                showFullBugList(projectId);
            }else{
                // Else make an ajax call to find bugs with those labels
                $.ajax({
                    type: 'GET',
                    url: `/bugs/filter/label/${projectId}`,
                    data: {
                        labels: filterElements 
                    },
                    success: function(data){
                        // Get table where the bugs will be listed and set the innerHTML to just the first row containing the titles of the bug table
                        let bugTable = $('table');

                            bugTable.html('<tr><td>Title</td><td>Description</td><td>Labels</td><td>Author</td></tr>');
                            // Append each bug to the table 
                            for(bug of data.data.bugs){
                                let newBug = newBugDom(bug);
                                $(bugTable).append(newBug);
                            }
                    },
                    error: function(err){
                        console.log(err.responseText);
                    }
                });

            }
        });
    }
    // Function to filter bugs by author
    let filterByAuthor = function(){
        // Get project ID from main tag's id attribute
        let projectId = $('main').attr('id').split('-')[1];
        // Get all author filters
        let filters = $('.author-filter');
        // Add event listeners to those filters
        $(filters).change(function(){
            let self = this;
            // Get filter value which is the author id stored in the id attribute in the form 'author-${author_id}'
            let filterValue = $(self).attr('id').split('-')[1];
            // Uncheck all label filters
            $('.label-filter').each(function(){
                let self = this;
                if($(self).is(':checked')){
                    $(self).prop('checked', false);
                }
            });
            // To make sure only one author filter can be applied at one time, since there cannot be two authors for a single bug
            $(filters).not(this).prop('checked', false);

            // If filter is checked, make an ajax call
            if($(self).is(':checked')){
                // And pass the author id extracted above as data to the controller
                $.ajax({
                    type: 'GET',
                    url: `/bugs/filter/author/${projectId}`,
                    data: {
                        author: filterValue
                    },
                    success: function(data){
                        // Set the bug table 
                        let bugTable = $('table');

                            bugTable.html('<tr><td>Title</td><td>Description</td><td>Labels</td><td>Author</td></tr>');

                            for(bug of data.data.bugs){
                                let newBug = newBugDom(bug);
                                $(bugTable).append(newBug);
                            }
                    },
                    error: function(err){
                        console.log(err.responseText);
                    }
                });
            // If author is unchecked, then show full bug list again
            }else{
                showFullBugList(projectId);
            }
        });
    }

    // Function to show full bug list on the project page
    let showFullBugList = function(projectId){
        // Making the ajax call and passing the project id
        $.ajax({
            type: "GET",
            url: `/projects/${projectId}`,
            success: function(data){
                // Resetting innerHTML of bug table
                let bugTable = $('table');

                bugTable.html('<tr><td>Title</td><td>Description</td><td>Labels</td><td>Author</td></tr>');
                // Appending each bug to the list
                for(bug of data.data.bugs){
                    let newBug = newBugDom(bug);
                    $(bugTable).append(newBug);
                }
            },
            error: function(err){
                console.log(err.responseText);
            }
        });
    }

    // Function to create new bug DOM element 
    let newBugDom = function(bug){
        // This will store all the labels on the bug
        let labels = "";
        // Running a loop to store all the labels
        for (let i = 0; i < bug.labels.length; i++){
            if(i == bug.labels.length-1){
                labels += bug.labels[i];
            }else{
                labels += bug.labels[i] + ", ";
            }
        }
        // Getting local user's id from main tag, if it exists
        let user = $('main').attr('data-user');

        // If local user exists and matches the bug's author id, then create a bug DOM with a delete button
        if(user && user == bug.author._id){
            return $(`
        <tr id="bug-${bug._id}">
        <td class="bug-title">
            <div>
                <a href="/issue/${bug._id}">${bug.title}</a>
                <a href="/issue/delete/${bug._id}>" class="delete-bug">
                <i class="fa-solid fa-trash-can" ></i>
                </a>
            </div>
        </td>
        <td>
          <p class="description"> ${bug.description}</p>
        </td>
        <td class="labels">
            <p>${labels}</p>
        </td>
        <td>
          ${bug.author.name}
        </td>
      </tr>
        `);
        // Else create a new bug DOM without the delete button
        }else{
            return $(`
        <tr id="bug-${bug._id}">
        <td class="bug-title">
          ${bug.title}
        </td>
        <td>
          <p class="description"> ${bug.description}</p>
        </td>
        <td class="labels">
            <p>${labels}</p>
        </td>
        <td>
          ${bug.author.name}
        </td>
      </tr>
        `);
        }

        
    }



// Call all functions
    deleteBug();
    searchBugsBySearchTerm();
    filterByLabel();
    filterByAuthor();
}