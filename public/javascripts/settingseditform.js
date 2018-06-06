







   $("#editsettings").on("click", ()=>{
        $(this).val('Save');
        console.log("clicked")
        $('#settingsForm')
.append('<form id="mySearch"></form>'); //append a new form element with id mySearch to <body>
$('#mySearch')
//add in all the needed input elements
.append('<Label>Email Address</Label><input type="text" name="txtField" id="txtField" value="">')
.append('<Label>Age</Label><input type="text" name="txtField1" id="txtField" value="">')
.append('<Label>Bio</Label><textarea class="form-control" rows="3"></textarea> <br>')
.append('<Label>Gender</Label><select><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select> <br><br>')
.append('<Label>Picture</Label><input type="file" name="txtField5" id="txtField" value="">')
   })
        
    
