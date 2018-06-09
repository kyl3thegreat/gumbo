// When user clicks the edit button 
$(".top").on("click", '.editSettings', (e)=> {

        e.preventDefault()

        $('.editSettings').html('<img class="save" src="/images/tick-light.png" alt="" srcset=""  width="25" height="25" >')
        $('.editSettings').removeClass()
        let company = $('.company p'),
        school = $('.school p'),
        bio = $('.bio p'),
        email = $('.email p'),
        gender = $('.gender p')
        age = $('h4 .age')
        
        // Target all the changeable properties
        $('.company').append('<div class="form-group"><label class="col-sm-2 col-form-label col-form-label-sm" for="company">Company</label><input type="text" class="form-control" id="companyInput" value="'+ company.text() +'"></div>')
        company.remove()
        $('.school').append('<div class="form-group"><label class="col-sm-2 col-form-label col-form-label-sm" for="school">School</label><input type="text" class="form-control" id="schoolInput" value="'+ school.text() +'"></div>')
        school.remove()
        $('.bio').append('<div class="form-group"><label class="col-sm-2 col-form-label col-form-label-sm" for="bio">About me</label><textarea class="form-control" id="bioInput" rows="3">'+ bio.text() +'</textarea></div>')
        bio.remove()
        $('.email').append('<div class="form-group"><label class="col-sm-2 col-form-label col-form-label-sm" for="email">Email address</label><input type="email" class="form-control" id="emailInput" value="'+ email.text() +'"></div>')
        email.remove()
        $('.gender').append('<div class="form-group"><label class="col-sm-2 col-form-label col-form-label-sm" for="gender">Gender</label><select class="form-control" id="genderInput"><option>Male</option><option>Female</option><option>Both</option></select></div>')
        gender.remove()
        age.html('<div class="form-group"><label class="col-sm-2 col-form-label col-form-label-sm" for="age">Age</label><input type="text" class="form-control" id="ageInput" value="'+ age.text() +'"></div>')
        $('.bottom ul').append('<li class="photo"><div class="form-group"><label class="col-sm-2 col-form-label col-form-label-sm" for="photo">Change Proifile Pic</label><input type="text" class="form-control" id="photoInput"></div></li>')
})

$('.top').on('click', '.save', (e) => {

        e.preventDefault()

        let companyInput = $('#companyInput').val().trim(),
                schoolInput = $('#schoolInput').val().trim(),
                bioInput = $('#bioInput').val().trim(),
                emailInput = $('#emailInput').val().trim(),
                genderInput = $('#genderInput').val().trim()
                ageInput = $('#ageInput').val()
                photoInput = $('#photoInput').val()

        let profileData;

        if(photoInput != ''){
                profileData = {
                        company: companyInput,
                        school: schoolInput,
                        bio: bioInput,
                        email: emailInput,
                        gender: genderInput,
                        age: ageInput,
                        photo: photoInput
                }
        }
        else {
                profileData = {
                        company: companyInput,
                        school: schoolInput,
                        bio: bioInput,
                        email: emailInput,
                        gender: genderInput,
                        age: ageInput,
                }
        }


        // Call to update our data
  $.ajax({
        method: "PUT",
        url: "/user/profile/edit",
        data: profileData
      })
      .then(function() {
          window.location.reload();
      });
        
})

