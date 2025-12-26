
/*$(".alert").delay(5000).slideUp(200, function() {
    $(this).hide();
});*/

$('#name').bind('keyup blur',function(){
    var node = $(this);
    node.val(node.val().replace(/[^a-zA-Z\s]/g,'') ); }
);

$('.cls_number').keyup(function(e)
                                {
  if (/\D/g.test(this.value))
  {
    // Filter non-digits from input value.
    this.value = this.value.replace(/\D/g, '');
  }
});

$('#father_name').bind('keyup blur',function(){
    var node = $(this);
    node.val(node.val().replace(/[^a-zA-Z\s]/g,'') ); }
);


function valid_form_login(){
	var flg = 0;
	$('.alert').hide();

	filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; ///^.+@.+\..{2,15}$/;
    if (!(filter.test($.trim($("#email").val())))) {
        $("#email").addClass('field_error');
        if (flg == 0) {
            $("#email").focus();
			$('#error_form').html('Please enter valid email address').show();
            flg = flg + 1;
        }
    }
    else {
        $("#email").removeClass('field_error');
    }

	if ($.trim($("#password").val()) == "") {
		 $("#password").addClass('field_error');
        if (flg == 0) {
            $("#password").focus();
			$('#error_form').html('Please enter password').show();
        }
		flg = flg + 1;
    }

    else {
        $("#password").removeClass('field_error');
	}

	if ($.trim($("#captcha").val()) == "") {
		 $("#captcha").addClass('field_error');
        if (flg == 0) {
            $("#captcha").focus();
			$('#error_form').html('Please enter answer').show();
        }
		flg = flg + 1;
    }

    else {
        $("#captcha").removeClass('field_error');
	}



	if(flg==0){
		return true;
	}else {
		return false;
	}
}

//-----------------------------------------------------

function valid_form_register(){

	var flg = 0;
	$('.alert').hide();

	if ($.trim($("#name").val()) == "") {
		 $("#name").addClass('field_error');
        if (flg == 0) {
            $("#name").focus();
			$('#error_form').html('Please enter name').show();
        }
		flg = flg + 1;
    }

    else {
        $("#name").removeClass('field_error');
	}

	if ($.trim($("#name").val()) != "" && $("#name").val().length<3 ) {

		 $("#name").addClass('field_error');
        if (flg == 0) {
            $("#name").focus();
			$('#error_form').html('Please enter valid name').show();
        }
		flg = flg + 1;

	}else {
        $("#name").removeClass('field_error');
	}

	if ($.trim($("#cnic").val()) == "") {
		 $("#cnic").addClass('field_error');
        if (flg == 0) {
            $("#cnic").focus();
			$('#error_form').html('Please enter CNIC').show();
        }
		flg = flg + 1;
    }

    else {
        $("#cnic").removeClass('field_error');
	}


	if ($.trim($("#cnic").val()) != "" && $("#cnic").val().length<13 ) {

		 $("#cnic").addClass('field_error');
        if (flg == 0) {
            $("#cnic").focus();
			$('#error_form').html('Please enter valid CNIC').show();
        }
		flg = flg + 1;

	}else {
        $("#cnic").removeClass('field_error');
	}


	filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; ///^.+@.+\..{2,15}$/;
    if (!(filter.test($.trim($("#email").val())))) {
        $("#email").addClass('field_error');
        if (flg == 0) {
            $("#email").focus();
			$('#error_form').html('Please enter valid email address').show();
            flg = flg + 1;
        }
    }
    else {
        $("#email").removeClass('field_error');
    }

	if ($.trim($("#mobile").val()) == "") {
		 $("#mobile").addClass('field_error');
        if (flg == 0) {
            $("#mobile").focus();
			$('#error_form').html('Please enter phone number').show();
        }
		flg = flg + 1;
    }

    else {
        $("#mobile").removeClass('field_error');
	}

	if ($.trim($("#mobile").val()) != "" && $("#mobile").val().length<11 ) {

		 $("#mobile").addClass('field_error');
        if (flg == 0) {
            $("#mobile").focus();
			$('#error_form').html('Please enter valid phone number').show();
        }
		flg = flg + 1;

	}else {
        $("#mobile").removeClass('field_error');
	}

	if ($.trim($("#gender").val()) == "") {
		 $("#gender").addClass('field_error');
        if (flg == 0) {
            $("#gender").focus();
			$('#error_form').html('Please select gender').show();
        }
		flg = flg + 1;
    }

    else {
        $("#gender").removeClass('field_error');
	}

	if ($.trim($("#password").val()) == "") {
		 $("#password").addClass('field_error');
        if (flg == 0) {
            $("#password").focus();
			$('#error_form').html('Please enter password').show();
        }
		flg = flg + 1;
    }

    else {
        $("#password").removeClass('field_error');
	}

	if ($.trim($("#password").val()) != "" && $("#password").val().length<8 ) {

		 $("#password").addClass('field_error');
        if (flg == 0) {
            $("#password").focus();
			$('#error_form').html('passwords must be at least 8 characters').show();
        }
		flg = flg + 1;

	}else {
        $("#password").removeClass('field_error');
	}

	if ($.trim($("#password-confirm").val()) == "") {
		 $("#password-confirm").addClass('field_error');
        if (flg == 0) {
            $("#password-confirm").focus();
			$('#error_form').html('Please enter confirm password').show();
        }
		flg = flg + 1;
    }

    else {
        $("#password-confirm").removeClass('field_error');
	}

	if ($.trim($("#password-confirm").val()) != "") {

		if ($.trim($("#password").val()) != $.trim($("#password-confirm").val())) {
		 $("#password-confirm").addClass('field_error');
        if (flg == 0) {
            $("#password-confirm").focus();
			$('#error_form').html('Confirm password did not match').show();
        }
		flg = flg + 1;
    }

    else {
        $("#password-confirm").removeClass('field_error');
	}

	}

	if ($.trim($("#captcha").val()) == "") {
		 $("#captcha").addClass('field_error');
        if (flg == 0) {
            $("#captcha").focus();
			$('#error_form').html('Please enter answer').show();
        }
		flg = flg + 1;
    }

    else {
        $("#captcha").removeClass('field_error');
	}

	if(flg==0){
		return true;
	}else {
		return false;
	}
}

//-----------------------------------------

function valid_form_forgot(){
	var flg = 0;
	$('.alert').hide();

	filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; ///^.+@.+\..{2,15}$/;
    if (!(filter.test($.trim($("#email").val())))) {
        $("#email").addClass('field_error');
        if (flg == 0) {
            $("#email").focus();
			$('#error_form').html('Please enter valid email address').show();
            flg = flg + 1;
        }
    }
    else {
        $("#email").removeClass('field_error');
    }


	if ($.trim($("#captcha").val()) == "") {
		 $("#captcha").addClass('field_error');
        if (flg == 0) {
            $("#captcha").focus();
			$('#error_form').html('Please enter answer').show();
        }
		flg = flg + 1;
    }

    else {
        $("#captcha").removeClass('field_error');
	}


	if(flg==0){
		return true;
	}else {
		return false;
	}
}

$('#id_change_password').click(function(){
	var flg = 0;
	$('.alert').hide();

	$('#id_btn_forgot').show();
	$('#id_btn_forgot_loading').hide();
	$('#old_password').val('').removeClass('field_error');
	$('#new_password').val('').removeClass('field_error');
	$('#confirm_password').val('').removeClass('field_error');
	$('#changePasswordModal').modal('show');
});

$('#id_btn_forgot').click(function(){
	var flg = 0;
	$('.alert').hide();

	if ($.trim($("#old_password").val()) == "") {
		 $("#old_password").addClass('field_error');
        if (flg == 0) {
            $("#old_password").focus();
			$('#error_form_forgot').html('Please enter old password').show();
        }
		flg = flg + 1;
    }

    else {
        $("#old_password").removeClass('field_error');
	}

	if ($.trim($("#old_password").val()) != "" && $("#old_password").val().length<8 ) {

		 $("#old_password").addClass('field_error');
        if (flg == 0) {
            $("#old_password").focus();
			$('#error_form_forgot').html('old passwords must be at least 8 characters').show();
        }
		flg = flg + 1;

	}else {
        $("#old_password").removeClass('field_error');
	}

	if ($.trim($("#new_password").val()) == "") {
		 $("#new_password").addClass('field_error');
        if (flg == 0) {
            $("#new_password").focus();
			$('#error_form_forgot').html('Please enter new password').show();
        }
		flg = flg + 1;
    }

    else {
        $("#new_password").removeClass('field_error');
	}

	if ($.trim($("#new_password").val()) != "" && $("#new_password").val().length<8 ) {

		 $("#new_password").addClass('field_error');
        if (flg == 0) {
            $("#new_password").focus();
			$('#error_form_forgot').html('new passwords must be at least 8 characters').show();
        }
		flg = flg + 1;

	}else {
        $("#new_password").removeClass('field_error');
	}


	if ($.trim($("#confirm_password").val()) == "") {
		 $("#confirm_password").addClass('field_error');
        if (flg == 0) {
            $("#confirm_password").focus();
			$('#error_form_forgot').html('Please enter confirm password').show();
        }
		flg = flg + 1;
    }

    else {
        $("#confirm_password").removeClass('field_error');
	}


	if ($.trim($("#confirm_password").val()) != "") {

		if ($.trim($("#new_password").val()) != $.trim($("#confirm_password").val())) {
		 $("#confirm_password").addClass('field_error');
        if (flg == 0) {
            $("#confirm_password").focus();
			$('#error_form_forgot').html('Confirm password did not match').show();
        }
		flg = flg + 1;
    }

    else {
        $("#confirm_password").removeClass('field_error');
	}

	}

	if(flg==0){
		$('.alert').hide();

		$('#id_btn_forgot').hide();
	    $('#id_btn_forgot_loading').show();

		$.post(base_path+"/user/password_change", $('#forgot_form').serialize(), function (data) {
            var obj = eval(data);
			if (obj.status == 'success') {
					$('#id_btn_forgot_loading').hide();
					//$('#id_btn_forgot').show();
					$('#success_form_forgot').html(obj.message).show();

					setTimeout(function(){
				  		$('#changePasswordModal').modal('hide')
					}, 5000);

			}else {
				    $('#id_btn_forgot_loading').hide();
					$('#id_btn_forgot').show();
					$('#error_form_forgot').html(obj.message).show();
			}
        }, "json");
	}


});

function getFileExtension(filename){

  var ext = /^.+\.([^.]+)$/.exec(filename);

  return ext == null ? "" : ext[1];

}

function GetFileSize(id) {
        var fi = document.getElementById(id);
        if (fi.files.length > 0) {
            for (var i = 0; i <= fi.files.length - 1; i++) {
                var fsize = fi.files.item(i).size;
                return Math.round((fsize / 1024))
            }
        }
    }

function valid_form_application(){

    $('#btn_final').attr('disabled', true);

	var flg = 0;

	if ($.trim($("#cnic").val()) == "" ) {

		 $("#cnic").addClass('field_error');
        if (flg == 0) {
            $("#cnic").focus();
			alert('Please enter CNIC ');
        }
		flg = flg + 1;

	}else {
        $("#cnic").removeClass('field_error');
	}


	if ($.trim($("#cnic").val()) != "" && $("#cnic").val().length<13 ) {

		 $("#cnic").addClass('field_error');
        if (flg == 0) {
            $("#cnic").focus();
			alert('CNIC must be at least 13 characters');
        }
		flg = flg + 1;

	}else {
        $("#cnic").removeClass('field_error');
	}

	if ($.trim($("#dob").val()) != "" && $("#dob").val().length<10 ) {

		 $("#dob").addClass('field_error');
        if (flg == 0) {
            $("#dob").focus();
			alert('Please enter valid date of birth');
        }
		flg = flg + 1;

	}else {
        $("#dob").removeClass('field_error');
	}

	if ($.trim($("#name").val()) == "" ) {

		 $("#name").addClass('field_error');
        if (flg == 0) {
            $("#name").focus();
			alert('Please enter Name ');
        }
		flg = flg + 1;

	}else {
        $("#name").removeClass('field_error');
	}


	if ($.trim($("#father_name").val()) == "" ) {

		 $("#father_name").addClass('field_error');
        if (flg == 0) {
            $("#father_name").focus();
			alert('Please enter Father Name ');
        }
		flg = flg + 1;

	}else {
        $("#father_name").removeClass('field_error');
	}


	if ($.trim($("#phone_number").val()) != "" && $("#phone_number").val().length<11 ) {

		 $("#phone_number").addClass('field_error');
        if (flg == 0) {
            $("#phone_number").focus();
			alert('Please enter valid phone number');
        }
		flg = flg + 1;

	}else {
        $("#phone_number").removeClass('field_error');
	}

	if ($.trim($("#emergency_contact_number").val()) != "" && $("#emergency_contact_number").val().length<11 ) {

		 $("#emergency_contact_number").addClass('field_error');
        if (flg == 0) {
            $("#emergency_contact_number").focus();
			alert('Please enter valid emergency contact number');
        }
		flg = flg + 1;

	}else {
        $("#emergency_contact_number").removeClass('field_error');
	}


	if ($.trim($("#permanent_address").val()) != "" && $("#permanent_address").val().length<5 ) {

		 $("#permanent_address").addClass('field_error');
        if (flg == 0) {
            $("#permanent_address").focus();
			alert('Permanent address must be at least 20 characters');
        }
		flg = flg + 1;

	}else {
        $("#permanent_address").removeClass('field_error');
	}

	if ($.trim($("#current_address").val()) != "" && $("#current_address").val().length<5 ) {

		 $("#current_address").addClass('field_error');
        if (flg == 0) {
            $("#current_address").focus();
			alert('Current address must be at least 20 characters');
        }
		flg = flg + 1;

	}else {
        $("#current_address").removeClass('field_error');
	}



	var check_category = $('.cls_check_category').filter(':checked').length;

	if(check_category==0){
		if (flg == 0) {
			alert('Please select your category.');
        }
		flg = flg + 1;

	}

	if ($.trim($("#hidden_photo").val()) == "" && $("#photo_upload").val()== "" ) {


        if (flg == 0) {

			alert('Please upload your picture.');
        }
		flg = flg + 1;

	}else {

	}

	if ($.trim($("#photo_upload").val()) != "") {
		var ex = getFileExtension($("#photo_upload").val());
		ex = ex.toLowerCase();
		if(ex =='png' || ex =='jpg' || ex =='jpeg'){
		}else {
			if (flg == 0) {
			alert('Uploaded picture is not a valid image 1. Only JPG, PNG files are allowed');
			}
			flg = flg + 1;

		}

	}

	if ($.trim($("#photo_upload").val()) != "") {
		  var file_size = GetFileSize("photo_upload");

			if(file_size>500) {
				if (flg == 0) {
					alert('Uploaded picture maximum image size 500 kb allowed.');
					$('#'.id).val('');
					$('#show_uploaded_img').attr('src', img_src).show();
					$('#del_button').trigger('click').hide();
				}
				flg = flg + 1;
			}


	}



	if ($.trim($("#cnic_front").val()) == "" ) {


        if (flg == 0) {

			alert('Please upload front side of your CNIC.');
        }
		flg = flg + 1;

	}else {

	}

	if ($.trim($("#cnic_front").val()) != "") {
		var ex = getFileExtension($("#cnic_front").val());
		ex = ex.toLowerCase();
		if(ex =='png' || ex =='jpg' || ex =='jpeg'){
		}else {
			if (flg == 0) {
			alert('Uploaded CNIC Front is not a valid image 1. Only JPG, PNG files are allowed');

			}
			flg = flg + 1;

		}

	}

	if ($.trim($("#cnic_front").val()) != "") {
		  var file_size = GetFileSize("cnic_front");
			if(file_size>500) {
				if (flg == 0) {
					alert('Uploaded CNIC Front maximum image size 500 kb allowed.');
					$('#id_img_place_front').attr('src', img_f).show();
					//$('#id_cnic_front').trigger('click').hide();
					//$('#cnic_front').val('');
				}
				flg = flg + 1;
			}


	}

	if ($("#cnic_back").val()== "" ) {


        if (flg == 0) {

			alert('Please upload back side of your CNIC.');
        }
		flg = flg + 1;

	}else {

	}

	if ($.trim($("#cnic_back").val()) != "") {
		var ex = getFileExtension($("#cnic_back").val());
		ex = ex.toLowerCase();
		if(ex =='png' || ex =='jpg' || ex =='jpeg'){
		}else {
			if (flg == 0) {
			alert('Uploaded CNIC Back is not a valid image 1. Only JPG, PNG files are allowed');
			}
			flg = flg + 1;

		}

	}

	if ($.trim($("#cnic_back").val()) != "") {
		  var file_size = GetFileSize("cnic_back");
			if(file_size>500) {
				if (flg == 0) {
					alert('Uploaded CNIC Back maximum image size 500 kb allowed.');
					$('#id_img_place_front').attr('src', img_b).show();
					//$('#id_cnic_back').trigger('click').hide();
					//$('#cnic_back').val('');
				}
				flg = flg + 1;
			}


	}

	if ($.trim($("#medical").val()) != "") {
		var ex = getFileExtension($("#medical").val());
		ex = ex.toLowerCase();
		if(ex =='png' || ex =='jpg' || ex =='jpeg'){
		}else {
			if (flg == 0) {
			alert('Uploaded Medical Certificate is not a valid image 1. Only JPG, PNG files are allowed');
			}
			flg = flg + 1;

		}

	}

	if ($.trim($("#medical").val()) != "") {
		  var file_size = GetFileSize("medical");

			if(file_size>500) {
				if (flg == 0) {
					alert('Uploaded Medical Certificate maximum image size 500 kb allowed.');
					$('#'.id).val('');
				}
				flg = flg + 1;
			}


	}



	if(flg==0){
		return true;
	}else {
        $('#btn_final').attr('disabled', false);
		return false;
	}

}



function valid_form_application_renewal_submit(){
	var flg = 0;
    $('#btn_final').attr('disabled', true);
	if ($.trim($("#phone_number").val()) != "" && $("#phone_number").val().length<11 ) {

		 $("#phone_number").addClass('field_error');
        if (flg == 0) {
            $("#phone_number").focus();
			alert('Please enter valid phone number');
        }
		flg = flg + 1;

	}else {
        $("#phone_number").removeClass('field_error');
	}

	if ($.trim($("#emergency_contact_number").val()) != "" && $("#emergency_contact_number").val().length<11 ) {

		 $("#emergency_contact_number").addClass('field_error');
        if (flg == 0) {
            $("#emergency_contact_number").focus();
			alert('Please enter valid emergency contact number');
        }
		flg = flg + 1;

	}else {
        $("#emergency_contact_number").removeClass('field_error');
	}

	var check_category = $('.cls_check_category').filter(':checked').length;

	if(check_category==0){
		if (flg == 0) {
			alert('Please select your category.');
        }
		flg = flg + 1;

	}

	if ($.trim($("#hidden_photo").val()) == "" && $("#photo_upload").val()== "" ) {


        if (flg == 0) {

			alert('Please upload your picture.');
        }
		flg = flg + 1;

	}else {

	}

	if ($.trim($("#cnic_front").val()) == "" ) {


        if (flg == 0) {

			alert('Please upload front side of your CNIC.');
        }
		flg = flg + 1;

	}else {

	}

	if ($("#cnic_back").val()== "" ) {


        if (flg == 0) {

			alert('Please upload back side of your CNIC.');
        }
		flg = flg + 1;

	}else {

	}



	if(flg==0){
		return true;
	}else {
        $('#btn_final').attr('disabled', false);
		return false;
	}

}




function valid_form_renewal_search(){
	var flg = 0;

	if ($.trim($("#cnic").val()) == "" ) {

		 $("#cnic").addClass('field_error');
        if (flg == 0) {
            $("#cnic").focus();
			alert('Please enter CNIC ');
        }
		flg = flg + 1;

	}else {
        $("#cnic").removeClass('field_error');
	}


	if ($.trim($("#cnic").val()) != "" && $("#cnic").val().length<13 ) {

		 $("#cnic").addClass('field_error');
        if (flg == 0) {
            $("#cnic").focus();
			alert('CNIC must be at least 13 characters');
        }
		flg = flg + 1;

	}else {
        $("#cnic").removeClass('field_error');
	}

	if ($.trim($("#dob").val()) != "" && $("#dob").val().length<10 ) {

		 $("#dob").addClass('field_error');
        if (flg == 0) {
            $("#dob").focus();
			alert('Please enter valid date of birth');
        }
		flg = flg + 1;

	}else {
        $("#dob").removeClass('field_error');
	}



	if(flg==0){


		var cnic = $.trim($("#cnic").val());
		var dob = $.trim($("#dob").val())

		var form = document.getElementById('search_cnic_form');
		var cnicValue = document.getElementById('cnic').value;
		var dobValue = document.getElementById('dob').value;
		// Concatenate CNIC and DOB to the original action URL
		var newActionUrl = Search_cnicURL+'/'+cnicValue+'/'+dobValue;
		form.action = newActionUrl;

		return true;
	}else {
		return false;
	}

}



