function Clock_Start() 
{
	Time_value = new Date;
	Time_format = printFilledTime(Time_value.getHours()) + ":" + printFilledTime(Time_value.getMinutes()) + ":" + printFilledTime(Time_value.getSeconds());
	document.getElementById("clk").innerHTML = Time_format;
	setTimeout("Clock_Start()",1000);
}
function printFilledTime(value) 
{
	return (value > 9) ? "" + value : "0" + value;
}
