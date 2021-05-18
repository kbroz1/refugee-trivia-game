function test(form){
    //The for loop is added to the function so that it will print the numbers 0,1,2 through an alert upon the page
    for (i = 0; i < 3; i++){
    //i = 0 sets the starting value for the loop and initializes the variable i.
        //i < 3 this is the condition for the loop to stop, once i is equal to or greater than 3, the loop will stop
        //i++ this increases i by 1 each cycle of the loop
        // alert(i);
        //the alert is set to print the value of i 
    if (form.elements[i].checked) {
    if (form.elements[i].value == answer1){
alert ("Correct");
}
else {
alert("Incorrect");
}

        
    
    
    

    //Means if index 1 is checked, alert Correct
    if (form.elements[1].checked) {
        alert("Correct");
    }
    else {
        alert("Incorrect");
    }
}
}
   
}

