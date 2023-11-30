{
    let deleteBug = function(){

        $('.delete-bug').on('click', function(e){
            e.preventDefault();

            $.ajax({
                type: 'GET',
                url: $(this).attr('href'),
                success: function(data){
                    $(`#bug-${data.data.bug_id}`).remove();
                },
                error: function(error){
                    console.error(error.responseText);
                }
            });
        });
    }

    let searchBugsBySearchTerm = function(){
        let searchBar = $('#bug-search');

        $(searchBar).on('keyup', function(){
            let self = this;
            let searchValue = $(this).val();
            let projectId = $('main').attr('id').split('-')[1];
            if (searchValue == ''){
                showFullBugList(projectId);
            }else{
                $.ajax({
                    type: "GET",
                    url: `/issue/search?searchTerm=${searchValue}&pId=${projectId}`,
                    success: function(data){
                        let bugTable = $('table');

                        bugTable.html('<tr><td>Title</td><td>Description</td><td>Labels</td><td>Author</td></tr>');

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

    let filterByLabel = function(){
        let projectId = $('main').attr('id').split('-')[1];
        let filters = $('.label-filter');
        filterElements = [];

        $(filters).change(function(){
            let self = this;
            let filterValue = $(self).attr('id').split('-')[1];

            $('.author-filter').each(function(){
                let self = this;
                if($(self).is(':checked')){
                    $(self).prop('checked', false);
                }
            });


            if($(self).is(':checked')){
                filterElements.push(filterValue);

            }else if(filterElements.includes(filterValue) && !$(self).is(':checked')){

                filterElements.splice(filterElements.indexOf(filterValue), 1);
            }

            if(filterElements.length == 0){
                showFullBugList(projectId);
            }else{
        
                $.ajax({
                    type: 'GET',
                    url: `/issue/filter/label/${projectId}`,
                    data: {
                        labels: filterElements 
                    },
                    success: function(data){
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

            }
        });
    }

    let filterByAuthor = function(){
        let projectId = $('main').attr('id').split('-')[1];
        let filters = $('.author-filter');

        $(filters).change(function(){
            let self = this;
            let filterValue = $(self).attr('id').split('-')[1];

            $('.label-filter').each(function(){
                let self = this;
                if($(self).is(':checked')){
                    $(self).prop('checked', false);
                }
            });

            $(filters).not(this).prop('checked', false);

            if($(self).is(':checked')){
                
                $.ajax({
                    type: 'GET',
                    url: `/issue/filter/author/${projectId}`,
                    data: {
                        author: filterValue
                    },
                    success: function(data){
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

            }else{
                showFullBugList(projectId);
            }
        });
    }

    let showFullBugList = function(projectId){

        $.ajax({
            type: "GET",
            url: `/projects/${projectId}`,
            success: function(data){

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
    }


    let newBugDom = function(bug){
        let labels = "";
        for (let i = 0; i < bug.labels.length; i++){
            if(i == bug.labels.length-1){
                labels += bug.labels[i];
            }else{
                labels += bug.labels[i] + ", ";
            }
        }
        let user = $('main').attr('data-user');

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




    deleteBug();
    searchBugsBySearchTerm();
    filterByLabel();
    filterByAuthor();
}