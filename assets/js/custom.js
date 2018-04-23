let myFacebookToken;

$(document).ready(() => {

	myFacebookToken = window.prompt("enter your facebook token: ", "");

	if(myFacebookToken == "" || myFacebookToken == null){
		alert(`no user found`);
	}else {
		getAllDetails();
	} // if condition end

}); //end document ready

let getAllDetails = () => {

	//calling the api to get user details
	$.ajax({
		type : 'GET',
		dataType : 'json',
		async : true,
		url : 'https://graph.facebook.com/me?fields=name,quotes,gender,hometown,birthday,email,cover,picture.type(large)&access_token=' + myFacebookToken,
		success : (response) => {
			$('#dataContainer').css('display', 'block');

			console.log(response);

			$('.navPicture').html('<img src="' + response.picture.data.url + '" class="img-fluid navProfilePicture" />');
			
			$('.userName').append(response.name);
			$('#favQuote').append(response.quotes);
			$('#birthDay').append(response.birthday);
			$('#emailId').append(response.email);
			$('#gender').append(response.gender);
			$('#home').append(response.hometown.name);
			$('#cover').css('background-image', 'url(' + response.cover.source + ')');
			$('#profilePicture').html('<img src="' + response.picture.data.url + '"  class="img-fluid profilePhoto"/>');

		},
		error : (err) => {
			console.log(err.responseJSON.error.message);
			alert(err.responseJSON.error.message);
		},
		beforeSend : () => {
			alert(`data is loading. please wait`);
		},
		timeout : 3000,
		complete : () => {
			alert(`data fetched successfully. click ok to see details`)
		}
	}) //ajax call end
}