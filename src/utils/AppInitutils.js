export { createAssignSelfPrefs }


let createAssignSelfPrefs = ( rawPrefsArray ) => {

    // const jsonPreferences = {
    //     "alwaysRenderSelf" : {
    //         "value" : true,
    //         "tip" : "Render dropdown selects for Self as pilot and specified role, for example PIC, Student, etc.",
    //         "defaultRole" : "59",
    //         "defaultPerson" : "self"
    //     }
    // }

    let jsonPreferences =
    {
        "alwaysRenderSelf" : false,
        "tip" : "Render dropdown selects for Self as pilot and specified role, for example PIC, Student, etc.",
        "defaultRole" : "59",
        "defaultPerson" : "self"
    }


    for ( let i = 0; i < rawPrefsArray.length; i++ ){

        console.log("rawPrefsArray[i].preference_value: ", rawPrefsArray[i].preference_value)

            if( rawPrefsArray[i].preference_code == "always_render_self"){
                //alert(rawPrefsArray[i].preference_value)
               if(rawPrefsArray[i].preference_value == 1 ){
                   jsonPreferences.alwaysRenderSelf = true;
               }
            }

           if( rawPrefsArray[i].preference_code == "default_role" ){
               jsonPreferences.defaultRole = rawPrefsArray[i].preference_value;
           }

           if( rawPrefsArray[i].preference_code == "self"){
               jsonPreferences.defaultPerson = rawPrefsArray[i].preference_value;
           }

    }

    return jsonPreferences;

}