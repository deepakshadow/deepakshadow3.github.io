
let myFacebookToken;

$(document).ready(() => {

	myFacebookToken = window.prompt(" enter your facebook token: ", "");

	if(myFacebookToken == "" || myFacebookToken == null){
		alert('no user found');
	}else {
		getAllDetails();
	}

});

let getAllDetails = () => {


	//calling API to get all details

	$.ajax({
		type : 'GET',
		dataType : 'json',
		async : true,
		url : 'https://graph.facebook.com/me?fields=id,name,feed.limit(10){message,full_picture,created_time,story,name},cover,picture.type(large)&access_token=' + myFacebookToken,
		success : (response) => {

			$('.dataContainer').css('display', 'block');
			console.log(response);
			$('.userName').append(response.name);
			$('.navPicture').html('<a href="index.html" title="go to profile"><img class="img-fluid navProfilePicture" src="'+ response.picture.data.url +'"/></a>');
			$('.navPictureOne').html('<img class="img-fluid navProfilePictureFeed" src="'+ response.picture.data.url +'"/>');

			//calling feed data
			for(x of response.feed.data){
				let tempRow= "";



				tempRow += `<div class="col-12 p-3">
							<div class="row">
								<div class="col-3 pt-2">
									<img class="img-fluid navProfilePicture" src=" ${response.picture.data.url} "/>
								</div>
								<div class="col-9 pt-1">

									<div class="row">
										<div class="col siZe">
										${response.name}
										<br />
										${x.story}
										</div>
									</div>
									<div class="row">
										<div class="col siZe">${x.created_time}</div>
									</div>

								</div>
							</div>
						</div>`
				
				if(x.message != undefined){
					tempRow += `<div class="col-12 pt-1 text-center siZe">${x.message}</div>`
					
				}
				if(x.full_picture != undefined){
					tempRow += `<div class="col-12 text-center pt-2">
										<img class="img-fluid" src=" ${x.full_picture} "/>
									</div>

									<div class=" col-12 pt-2 text-center">
							<div class="row">
								<div class="col-3 col-xl-4">
									<i class="fas fa-thumbs-up siZe">&nbsp;Like</i>
								</div>
								<div class="col-5 col-xl-4">
									<i class="fas fa-comment siZe">&nbsp;Comment</i>
								</div>
								<div class="col-4 col-xl-4">
									<i class="fas fa-share siZe">&nbsp;Share</i>
								</div>
							</div>
							<hr style="color: grey;"/>
						</div>`
					
				}
				
				$('#feedHead').append(tempRow);
				
			}

		},
		error : (err) => {
			console.log(err.responseJSON.error.message);
			alert(err.responseJSON.error.message);
		},
		beforeSend : () => {
			alert(`please wait. data is processing`);
		},
		timeout : 3000,
		complete : () => {
			alert(`data fetched successfully. click ok to see details`);
		}
	})

}