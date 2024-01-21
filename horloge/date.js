function Date_Start() 
{
	Date_value = new Date;
	var month = 1 ;
	month += parseInt(Date_value.getMonth()) ;
	Date_format = Date_value.getFullYear() + "-" + month + "-" + Date_value.getDate();
	document.getElementById("date").innerHTML = Date_format;
}
