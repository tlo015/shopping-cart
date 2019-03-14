console.log ('connect.js');

function validateForm() {
    var name = document.ccform.UMname.value;
    var street = document.ccform.UMstreet.value;
    var city = document.ccform.UMcity.value;
    var state = document.ccform.UMstate.value;
    var zip = trimBetweenSpaces(trimBegEndSpaces(stripOffNonDigit(document.ccform.UMzip.value)));

    var CCN = trimBetweenSpaces(trimBegEndSpaces(stripOffNonDigit(document.ccform.UMcard.value)));
    var expireDate = trimBetweenSpaces(trimBegEndSpaces(stripOffNonDigit(document.ccform.UMexpirM.value + document.ccform.UMexpirY.value)));

    if (CCN.length == 0 || expireDate.Length == 0) {
        alert ("Error: You have not entered any Credit card information");
        document.ccform.UMcard.focus == true;
        return false;
        } else {
            if (CCN.length !== 12) {
                alert ("Error: Invalid Credit Card number \nPlease check again");
                document.ccform.UMexpirM.focus == true;
                return false;
            }
            if (expireDate.length < 4) {
                alert ("Error: Incorrect expire date \nPlease enter in the format MM/YY");
                document.ccform.UMexpirM.focus == true;
                return false; }
                    document.ccform.UMexpir.value = expireDate;
    }
    
    if (name.length == 0) {
        alert ("Error: You have not entered your name");
        document.ccform.UMcard.focus == true;
        return false;
    }; 
    
    if (street.length == 0) {
            alert ("Error: You have not entered your address");
            document.ccform.UMstreet.focus == true;
            return false;
    }; 
    
    if (city.length == 0) {
            alert ("Error: You have not entered your city");
            document.ccform.UMcity.focus == true;
            return false;
    }; 
    
    if (state.length == 0 || state.length < 2) {
            alert ("Error: You have entered your state incorrectly");
            document.ccform.UMstate.focus == true;
            return false;
    }; 
    
    if (zip.length == 0 || zip.length < 5 ) {
            alert ("Error: You have not entered your name");
            document.ccform.UMcard.focus == true;
            return false;
    };

}

// Stiff off any non digit char
function stripOffNonDigit(objValue) {
    var ch
    var tempStr = new String()

    for (var i=0; i<objValue.length; i++) {
        if (isDigitChar(objValue.charAt(i)) == true)
        tempStr = tempStr + objValue.charAt(i)
    }
    return tempStr
}

// Removes leading and trailing blanks from a value
function trimBegEndSpaces(object_value) {
    var leading_blanks = 0
    var string_end = (object_value.length)-1
    if (string_end < 0) string_end = 0

    // find first nonblank: start with first character and scan forwards
    while (leading_blanks <= string_end && object_value.charAt(leading_blanks) == " ")
    {leading_blanks++}

    // find last nonblank: start with last character and scan backwards
    while (string_end > leading_blanks && object_value.charAt(string_end) == " ")
    {string_end--}

    return object_value = object_value.substring(leading_blanks,string_end+1)
}

// Remove any additional spaces
function trimBetweenSpaces(objValue) {
    var blankExists = false
    var newValue = new String()
    var ch

    for (var i=0; i < objValue.length; i++) {
        ch = objValue.charAt(i)
        if ( ch == " " ) {
            if ( blankExists == false ) {
                blankExists = true
                newValue = newValue + ch 
            }
        } else {
            newValue = newValue + ch
            blankExists = false
        }
    }
    
    if ( newValue == null )
        return objValue
    else
        return newValue
};

