






   $("#editsettings").on("click", ()=>{
        console.log("clicked")
        $('#settingsForm')
.append('<form id="mySearch"></form>'); //append a new form element with id mySearch to <body>
$('#mySearch') 
//add in all the needed input elements
.append('<Label>Email Address</Label><input class="editinput" type="text" name="btnSearch" id="btnSearch" value="">')
.append('<Label>Age</Label><input class="editinput" type="text" name="txtField1" id="txtField" value="">')
.append('<Label>Bio</Label><textField class="editinput" type="text" name="txtField2" id="txtField" value=""></textField>')
.append('<Label>Gender</Label><input class="editinput" type="text" name="txtField3" id="selType" value="">')
.append('<Label>Picture</Label><input class="editinput" type="file" name="txtField4" id="selType2" value="">')
   })
