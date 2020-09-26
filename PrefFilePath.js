var prefFile = File;
var textArray = [];
var win = 0; 

userData = Folder.userData;
version = app.version.substring(0, 4);

prefixName = "";
prefName = " Prefs-indep-general.txt";

lang = app.isoLanguage;

//en_US for English (United States)
if (lang == "en_US") {
    prefName = " Prefs-indep-general";
}

//de_DE for German (Germany)
if (lang == "de_DE") {
    prefName = " Einstellungen-indep-general";
}

//es_ES for Spanish (Spain)
if (lang == "es_ES") {
    prefixName = "Preferencias ";
    prefName = "-indep-general";
}

//fr_FR for French (France)
if (lang == "fr_FR") {
    prefName = ' Pr' + '\xE9' + 'fs-indep-general';
}

//it_IT for Italian (Italy)
if (lang == "it_IT") {
    prefixName = "Preferenze di ";
    prefName = "-indep-general";
}

//ja_JP for Japanese (Japan)
if (lang == "ja_JP") {
    prefName = " Prefs-indep-general";
}

//ko_KR for Korean (Korea)
if (lang == "ko_KR") {
    prefName = " Prefs-indep-general";
}

if (win == 1) {
    prefFilePath = userData.toString() + "/Adobe/After Effects/" + version + "/" + prefixName + "Adobe After Effects " + version + prefName + ".txt";
} else {
    macPath1 = userData.toString();
    macPath = macPath1.substring(0, macPath1.lastIndexOf("/") + 1);

    prefFilePath = macPath + "Preferences/Adobe/After Effects/" + version + "/" + prefixName + "Adobe After Effects " + version + prefName + ".txt";
}

alert(prefFilePath);
        