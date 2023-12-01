{

    let displayDropdown = function(){
        let inputBox = $('.label-div>input');
        let dropdown = $('.dropdown');
        
        $('body').on('click', function(e){
            let elem = $(e.target);
            if(elem.attr('id') != 'labels'){
                hide();
            }else{
                show();
            }
        });
    }

    let addLabelToInputBox = function(){
        let dropdownElements = $('.dropdown>a');
        let inputBox = $('.label-div>input');

        dropdownElements.on('click', function(e){
            e.preventDefault();
            let self = $(this);
            let label = self.attr('id');
            $(inputBox).val($(inputBox).val()+label+",");
        });
    }

    let hide = function(){
        $('.dropdown').css('display', 'none');
    }

    let show = function(){
        $('.dropdown').css('display', 'block');
    }

    addLabelToInputBox();
    displayDropdown();
}