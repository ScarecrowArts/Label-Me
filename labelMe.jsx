﻿//  Scarecrow Arts LLC
//  http://www.scarecrowarts.com
//  Version 1.3.6

var scriptPath = File($.fileName).parent.fsName;
var file = File;
var prefFile = File;
var textArray = [];
var win = 0; 
var myMainPanel;
var label; 
var button = [];
var hasClosed = false;
var colors = [];
var isBeta = 0;
var labelKeys = 0;

if ($.os.indexOf("Windows") != -1 ){
    win = 1;       
}

function myAEScript(thisObj){
    function myAEScript_buildUI(thisObj) {

        if (hasClosed) {
            var remover = myMainPanel.children.length;
            for (tt = 0; tt < remover; tt++) {
                myMainPanel.remove(0);
            }
        }
    
        if (hasClosed == false) {
            myMainPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "labelME", undefined, { resizeable: true });
            mySaveFilePath = "~/Documents/";
            app.preferences.saveToDisk();
            var file = File(mySaveFilePath + "Path" + ".txt");

            userData = Folder.userData;      
            
            //version = app.version.substring(0, 9);

            //Version names too long, new way to cut out the "X"
            //This could be a very hacky fix, no idea how other names are handled if they dont use x.

            //inV = app.version.split("x").length > 1;
            //alert(inV); 
          
            version = app.version.split("x")[0];

            prefixName = "";
            prefName = " Prefs-indep-general.txt";

            lang = app.isoLanguage;

            //en_US for English (United States)
            if (lang == "en_US"){
                prefName = " Prefs-indep-general";
            }

            //de_DE for German (Germany)
            if (lang == "de_DE"){
                prefName = " Einstellungen-indep-general";
            }			

            //es_ES for Spanish (Spain)
            if (lang == "es_ES"){
                prefixName = "Preferencias ";
                prefName = "-indep-general";
            }

            //fr_FR for French (France)
            if (lang == "fr_FR"){
                prefName = ' Pr' + '\xE9' + 'fs-indep-general';
            }

            //it_IT for Italian (Italy)
            if (lang == "it_IT"){
                prefixName = "Preferenze di ";
                prefName = "-indep-general";
            }

            //ja_JP for Japanese (Japan)
            if (lang == "ja_JP"){
                prefName = " Prefs-indep-general";
            }

            //ko_KR for Korean (Korea)
            if (lang == "ko_KR"){
                prefName = " Prefs-indep-general";
            }
        
            //pt_BR for Portugese (Brazil)
            if (lang == "pt_BR") {
                prefixName = "Prefer" + '\xEA' + "ncias do ";
                prefName = "-indep-general";
            }


            //If X in version number 
            if (win == 1) {
                prefFilePath = userData.toString() + "/Adobe/After Effects/" + version + "/" + prefixName + "Adobe After Effects " + version + prefName + ".txt";
            } else {
                macPath1 = userData.toString();
                macPath = macPath1.substring(0, macPath1.lastIndexOf("/") + 1);

                prefFilePath = macPath + "Preferences/Adobe/After Effects/" + version + "/" + prefixName + "Adobe After Effects " + version + prefName + ".txt";
            }

            prefFile = File([prefFilePath]);

            //If 3 digits, no x
            if (prefFile.exists == false) {                
                if (win == 1) {
                    prefFilePath = userData.toString() + "/Adobe/After Effects/" + version.substring(0, 4) + "/" + prefixName + "Adobe After Effects " + version.substring(0, 4) + prefName + ".txt";
                } else {
                    macPath1 = userData.toString();
                    macPath = macPath1.substring(0, macPath1.lastIndexOf("/") + 1);

                    prefFilePath = macPath + "Preferences/Adobe/After Effects/" + version.substring(0, 4) + "/" + prefixName + "Adobe After Effects " + version.substring(0, 4) + prefName + ".txt";
                }
               
                prefFile = File([prefFilePath]);
            }

            //If 4 digits, no x
            if (prefFile.exists == false) {
                if (win == 1) {
                    prefFilePath = userData.toString() + "/Adobe/After Effects/" + version.substring(0, 6) + "/" + prefixName + "Adobe After Effects " + version.substring(0, 4) + prefName + ".txt";
                } else {
                    macPath1 = userData.toString();
                    macPath = macPath1.substring(0, macPath1.lastIndexOf("/") + 1);

                    prefFilePath = macPath + "Preferences/Adobe/After Effects/" + version.substring(0, 6) + "/" + prefixName + "Adobe After Effects " + version.substring(0, 4) + prefName + ".txt";
                }
                
                prefFile = File([prefFilePath]);
            }

            //Nothing found, check for beta
            if (prefFile.exists == false) {
                if (win == 1) {
                    prefFilePath = userData.toString() + "/Adobe/After Effects (Beta)/" + version + "/" + prefixName + "Adobe After Effects " + version + prefName + ".txt";
                } else {
                    macPath1 = userData.toString();
                    macPath = macPath1.substring(0, macPath1.lastIndexOf("/") + 1);

                    prefFilePath = macPath + "Preferences/Adobe/After Effects (Beta)/" + version + "/" + prefixName + "Adobe After Effects " + version + prefName + ".txt";
                }

                prefFile = File([prefFilePath]);

                if(prefFile.exists)
                    isBeta = 1;
            }

            //Check beta 3 char
            if (prefFile.exists == false) {
                if (win == 1) {
                    prefFilePath = userData.toString() + "/Adobe/After Effects (Beta)/" + version.substring(0, 4) + "/" + prefixName + "Adobe After Effects " + version.substring(0, 4) + prefName + ".txt";
                } else {
                    macPath1 = userData.toString();
                    macPath = macPath1.substring(0, macPath1.lastIndexOf("/") + 1);

                    prefFilePath = macPath + "Preferences/Adobe/After Effects (Beta)/" + version.substring(0, 4) + "/" + prefixName + "Adobe After Effects " + version.substring(0, 4) + prefName + ".txt";
                }

                prefFile = File([prefFilePath]);

                if (prefFile.exists)
                    isBeta = 1;
            }

            //Check beta 4 char
            if (prefFile.exists == false) {
                if (win == 1) {
                    prefFilePath = userData.toString() + "/Adobe/After Effects (Beta)/" + version.substring(0, 6) + "/" + prefixName + "Adobe After Effects " + version.substring(0, 6) + prefName + ".txt";
                } else {
                    macPath1 = userData.toString();
                    macPath = macPath1.substring(0, macPath1.lastIndexOf("/") + 1);

                    prefFilePath = macPath + "Preferences/Adobe/After Effects (Beta)/" + version.substring(0, 6) + "/" + prefixName + "Adobe After Effects " + version.substring(0, 6) + prefName + ".txt";
                }

                prefFile = File([prefFilePath]);

                if (prefFile.exists)
                    isBeta = 1;
            }

            prefFile = File([prefFilePath]);

            if (version_to_number(version) >= version_to_number("22.6.0")) {
                labelKeys = 1;
            }
            
            //Still nothing found, complain, cry
            if (prefFile.exists == false) {
                alert("No preference file found. Make sure you have saved your preferences and enable scripts to read/write files.");
                alert("If that doesn't work write an angry email to Brandy@ScarecrowArts.com");
                return; 
            }
        }

        function version_to_number(version) {
            var parts = version.split('.');
            var sum = 0;
            for (var i = 0; i < parts.size; i++) {
                sum *= 100;
                sum += parseInt(parts[i]);
            }
            return sum;
        }

        var textArray = readTxt();
        
        function readTxt() {
            var txtArray = [];
            var currentLine;

            prefFile.open("r");
            while(!prefFile.eof){
                currentLine = prefFile.readln();
                txtArray.push(currentLine);
            }
            
            prefFile.close();
            return txtArray;
        }    

        res = "group\{\orientation:'column',\}";

        //MARGINS REMOVED
        myMainPanel.grp = myMainPanel.add(res);
        myMainPanel.margins = 0;
        myMainPanel.grp.margins = 0;
        myMainPanel.grp.margins.top = 0;
        myMainPanel.grp.margins.bottom = 0;
        myMainPanel.grp.margins.left = 0;
        myMainPanel.grp.margins.right = 0;
        myMainPanel.grp.spacing = 0;
        myMainPanel.grp.spacing.top = 0;
        myMainPanel.grp.spacing.bottom = 0;
        myMainPanel.grp.spacing.left = 0;
        myMainPanel.grp.spacing.right = 0;
        myMainPanel.grp.padding = 0;
        myMainPanel.grp.padding.top = 0;
        myMainPanel.grp.padding.bottom = 0;
        myMainPanel.grp.padding.left = 0;
        myMainPanel.grp.padding.right = 0;

        if (hasClosed == false) {
            //DRAW GUI ICONS
            function customDraw() {
                with (this) {
                    graphics.drawOSControl();
                    graphics.rectPath(0, 0, size[0], size[1]);
                    graphics.fillPath(fillBrush);

                    if (text) graphics.drawString(text, textPen, (size[0] - graphics.measureString(text, graphics.font, size[0])[0]) / 2, 3, graphics.font);
                }
            }

            //CONVERT SAVE FILE TO HEX CODE
            function prefCodeToHexCode(str) {
                return str.replace(/"([^"]+)"/g, function (u, code) {
                    var result = "";

                    for (var i = 0; i < code.length; i++) { result += code.charCodeAt(i).toString(16); };
                    return result;
                });
            };

            function ascii_to_hexa(str) {
                var arr1 = [];

                for (var n = 0, l = str.length; n < l; n++) {
                    var hex = Number(str.charCodeAt(n)).toString(16);
                    arr1.push(hex);
                }

                return arr1.join('');
            }

            function convertHex(hex) {
                var result = [];
                hex = hex.replace('#', '');
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);

                result = [r / 255, g / 255, b / 255, 1];
                return result;
            }

            function asciiToRGB(str) {
                var arr = [];

                for (var i = 1, l = str.length; i < l; i++) {
                    var hex = Number(str.charCodeAt(i)).toString(16);
                    arr.push(parseInt(hex, 16) / 65533);
                }

                arr.push(1);
                return arr;
            }

            //colors = [];
            hasChecked1 = 0;

            //DECODE COLOR
            for (var i = 1; i <= 16; i++) {
                for (j = 0; j < textArray.length; j++) {
                    str = textArray[j].substr(1, 20 + i.toString().length);
                    length = str.length;

                    if (str == '"Label Color ID 2 # ' + i) {
                        if (i != 1) {
                            myLine = textArray[j];

                            myCode0 = myLine.split('" = ')[1];
                            myCode = myCode0.substring(2, myCode0.length);

                            myDecodedCode = prefCodeToHexCode(myCode);
                            rgb = convertHex(myDecodedCode);

                            colors[i - 1] = rgb;
                        } else {
                            if (hasChecked1 == 0) {
                                myLine = textArray[j];

                                myCode0 = myLine.split('" = ')[1];
                                myCode = myCode0.substring(2, myCode0.length);

                                myDecodedCode = prefCodeToHexCode(myCode);
                                rgb = convertHex(myDecodedCode);

                                colors[0] = rgb;
                                hasChecked1 = 1;
                            }
                        }
                    }
                }
            }
        }
        //INITIALIZE BUTTONS
        for(i = 0; i <= 17; i++){
            button[i] = myMainPanel.grp.add("iconbutton", undefined, undefined, {style:'toolbutton'}, "button0" + i)
 
            //MARGINS REMOVED
            button[i].margins = 0;
            button[i].margins.top = 0;
            button[i].margins.bottom = 0;
            button[i].margins.left = 0;
            button[i].margins.right = 0;
            button[i].spacing = 0;
            button[i].spacing.top = 0;
            button[i].spacing.bottom = 0;
            button[i].spacing.left = 0;
            button[i].spacing.right = 0;
            button[i].padding = 0;
            button[i].padding.top = 0;
            button[i].padding.bottom = 0;
            button[i].padding.left = 0;
            button[i].padding.right = 0;
            
            button[i].size = [24+(myMainPanel.size[0]/1),(myMainPanel.size[1]/18)];
            
            if(i!=0 && i!= 17){
                button[i].fillBrush = button[i].graphics.newBrush(button[i].graphics.BrushType.SOLID_COLOR, colors[i-1]);
            }else{
                button[i].fillBrush = button[i].graphics.newBrush(button[i].graphics.BrushType.SOLID_COLOR, [0.4, 0.4, 0.4, 1]);
            }

            button[i].onDraw = customDraw;
        }
         
        //RE-COLOR DEFAULT ICON
        button[17].fillBrush = button[17].graphics.newBrush(button[17].graphics.BrushType.SOLID_COLOR, [1, 1, 1, 0]);
        button[17].text = "X";
        button[17].textPen = button[17].graphics.newPen (button[17].graphics.PenType.SOLID_COLOR,[1,1,1], 1);
        
        button[17].onDraw = customDraw;  
        
        function customDraw(){
            with( this ) {
                //FONT FAMILY
                fontFont = ScriptUI.newFont("MinionPro", "BOLD", 26);
                
                graphics.drawOSControl();
                graphics.rectPath(0,0,size[0],size[1]);
                graphics.fillPath(fillBrush);
                
                //RE-CENTER
                if( text ) graphics.drawString(text,textPen,(myMainPanel.size[0]/2)-13,-7+(myMainPanel.size[1]*.02),fontFont);
            }
        }

        if (hasClosed == false) {
            buttonTips = [];
            hasChecked2 = 0;

            //Different versions of AE store this differently
            is5 = 0;
            is7 = 0;

            for (j = 0; j < textArray.length; j++) {
                if (textArray[j] == '["Label Preference Text Section 5"]')
                    is5 = 1;
                if (textArray[j] == '["Label Preference Text Section 7"]')
                    is7 = 1;
            }

            //TOOL TIPS
            for (var i = 1; i <= 16; i++) {
                for (j = 0; j < textArray.length; j++) {
                    str = textArray[j].substr(1, 19 + i.toString().length);
                    length = str.length;
                    run = 0;
                    runRed = 0;

                    if (str == '"Label Text ID 2 # ' + i) {
                        if (i != 1) {
                            if (run == 0) {
                                myLine = textArray[j];
                                myLine1 = myLine.split('" = ')[1];
                                buttonTips[i] = myLine1;
                            }

                            run = 1;
                        } else {
                            if (hasChecked2 == 0) {
                                myLine = textArray[j];

                                if (textArray[j - i] == '["Label Preference Text Section 7"]' || is7 == 0) {
                                    myLine1 = myLine.split('" = ')[1];
                                    buttonTips[1] = myLine1;
                                    hasChecked2 = 1;
                                }
                            }
                        }
                    }
                }
            }

            for (j = 0; j < textArray.length; j++) {
                if (textArray[j].search('"Adjustment Label Index 2" =') != -1) {
                    myLine = textArray[j];
                    myLine1 = myLine.split('" = ')[1];
                    adjustmentLabel = myLine1.substr(1, myLine1.length - 2);
                }

                if (textArray[j].search('"Audio Label Index 2" =') != -1) {
                    myLine = textArray[j];
                    myLine1 = myLine.split('" = ')[1];
                    audioLabel = myLine1.substr(1, myLine1.length - 2);
                }

                if (textArray[j].search('"Camera Label Index 2" =') != -1) {
                    myLine = textArray[j];
                    myLine1 = myLine.split('" = ')[1];
                    cameraLabel = myLine1.substr(1, myLine1.length - 2);
                }

                if (textArray[j].search('"Comp Label Index 2" =') != -1) {
                    myLine = textArray[j];
                    myLine1 = myLine.split('" = ')[1];
                    compLabel = myLine1.substr(1, myLine1.length - 2);
                }

                if (textArray[j].search('"Folder Label Index 2" =') != -1) {
                    myLine = textArray[j];
                    myLine1 = myLine.split('" = ')[1];
                    folderLabel = myLine1.substr(1, myLine1.length - 2);
                }

                if (textArray[j].search('"Light Label Index 2" =') != -1) {
                    myLine = textArray[j];
                    myLine1 = myLine.split('" = ')[1];
                    lightLabel = myLine1.substr(1, myLine1.length - 2);
                }

                if (textArray[j].search('"Null Label Index" =') != -1) {
                    myLine = textArray[j];
                    myLine1 = myLine.split('" = ')[1];
                    nullLabel = myLine1.substr(1, myLine1.length - 2);
                }

                if (textArray[j].search('"Shape Label Index 2" =') != -1) {
                    myLine = textArray[j];
                    myLine1 = myLine.split('" = ')[1];
                    shapeLabel = myLine1.substr(1, myLine1.length - 2);
                }

                if (textArray[j].search('"Solid Label Index 2" =') != -1) {
                    myLine = textArray[j];
                    myLine1 = myLine.split('" = ')[1];
                    solidLabel = myLine1.substr(1, myLine1.length - 2);
                }

                if (textArray[j].search('"Still Label Index 2" =') != -1) {
                    myLine = textArray[j];
                    myLine1 = myLine.split('" = ')[1];
                    stillLabel = myLine1.substr(1, myLine1.length - 2);
                }

                if (textArray[j].search('"Text Label Index"') != -1) {
                    myLine = textArray[j];
                    myLine1 = myLine.split('" = ')[1];
                    textLabel = myLine1.substr(1, myLine1.length - 2);
                }

                if (textArray[j].search('"Video Label Index 2" =') != -1) {
                    myLine = textArray[j];
                    myLine1 = myLine.split('" = ')[1];
                    videoLabel = myLine1.substr(1, myLine1.length - 2);
                }
            }
        }
        for (var yy = 1; yy < button.length; yy++) {
            button[yy].helpTip = buttonTips[yy];
        }
    
        //FIX NONE/DEFAULT TOOLTIP
        button[0].helpTip = '"None"';
        button[17].helpTip = '"Return to Default"';

        //DO THE THING
        button[0].onClick =  onButtonPress00;
        button[1].onClick =  onButtonPress01;
        button[2].onClick =  onButtonPress02;
        button[3].onClick =  onButtonPress03;       
        button[4].onClick =  onButtonPress04;      
        button[5].onClick =  onButtonPress05;
        button[6].onClick =  onButtonPress06;
        button[7].onClick =  onButtonPress07;
        button[8].onClick =  onButtonPress08;       
        button[9].onClick =  onButtonPress09;      
        button[10].onClick =  onButtonPress10;
        button[11].onClick =  onButtonPress11;
        button[12].onClick =  onButtonPress12;
        button[13].onClick =  onButtonPress13;       
        button[14].onClick =  onButtonPress14;
        button[15].onClick =  onButtonPress15;
        button[16].onClick =  onButtonPress16;
        button[17].onClick =  onButtonPress17;
        myMainPanel.layout.layout(true);
        return myMainPanel;
    }

    //Yes, I made a function for every color. Please dont @ me
    function onButtonPress00(){
        label = 0;
        mainFunction(); 
    }

    function onButtonPress01(){
        label = 1; 
        mainFunction(); 
    }
   
    function onButtonPress02(){
        label = 2; 
        mainFunction(); 
    }

    function onButtonPress03(){
        label = 3; 
        mainFunction(); 
    }

    function onButtonPress04(){
        label = 4; 
        mainFunction(); 
    }

    function onButtonPress05(){
        label = 5; 
        mainFunction(); 
    }

    function onButtonPress06(){
        label = 6; 
        mainFunction(); 
    }

    function onButtonPress07(){
        label = 7; 
        mainFunction(); 
    }

    function onButtonPress08(){
        label = 8; 
        mainFunction(); 
    }

    function onButtonPress09(){
        label = 9; 
        mainFunction(); 
    }

    function onButtonPress10(){
        label = 10; 
        mainFunction(); 
    }

    function onButtonPress11(){
        label = 11; 
        mainFunction(); 
    }

    function onButtonPress12(){
        label = 12; 
        mainFunction(); 
    }

    function onButtonPress13(){
        label = 13; 
        mainFunction(); 
    }

    function onButtonPress14(){
        label = 14; 
        mainFunction(); 
    }

    function onButtonPress15(){
        label = 15; 
        mainFunction(); 
    }

    function onButtonPress16(){
        label = 16; 
        mainFunction(); 
    }

    function onButtonPress17(){
        var comp=app.project.activeItem;   
        var activeItem = app.project.activeItem;
        app.beginUndoGroup("Restore Defaults"); 

        //Color Keyframes
        if (labelKeys == 1 && activeItem != null && activeItem instanceof CompItem){

             props = app.project.activeItem.selectedProperties;
     
             if(props.length > 0){

                     for(p = 0; p < props.length; p ++){
                     keySelection = props[p].selectedKeys; 

                     if(keySelection.length > 0){
                                for (n = 0; n < keySelection.length; n++) {
                                    t = props[p].selectedKeys[n];
                                    props[p].setLabelAtKey(t,0);        
                                }
                        }
                  }
                  //end if has colored keys --- not for this??
                  //return;
               }
            }

        if (activeItem != null && activeItem instanceof CompItem) {}else{
            var mySelectedItems = app.project.selection; 

            for (var i = 0; i <= mySelectedItems.length; i++){
                layer = mySelectedItems[i]; 

                if(layer instanceof FootageItem){
                    layer.label = Number(videoLabel);
                    
                    if(layer.name.search('Adjustment Layer ') != -1){
                        layer.label = Number(adjustmentLabel);  
                    }

                    if(layer.name.search(' Solid ') != -1){
                        layer.label = Number(solidLabel); 
                    }
                            
                    if(layer.name.search('Null ') != -1){
                        layer.label = Number(nullLabel);                           
                    }
                        
                     if(layer.hasAudio && !layer.hasVideo){
                            layer.label = Number(audioLabel);      
                     }
                }

                if(layer instanceof CompItem){
                    layer.label = Number(compLabel); 
                }              
                
                if(layer instanceof FolderItem){
                    layer.label = Number(folderLabel); 
                }                             
            }
        }                            
       
        if(app.project.selection.length == 1){
            layer = app.project.selection[0]; 

            if(layer instanceof FootageItem){
                layer.label = Number(videoLabel); 
                
                if(layer.name.search('Adjustment Layer ') != -1){
                    layer.label = Number(adjustmentLabel);  
                }
        
                if(layer.name.search(' Solid ') != -1){
                    layer.label = Number(solidLabel); 
                }
                        
                if(layer.name.search('Null ') != -1){
                    layer.label = Number(nullLabel);                           
                }
            
               if(layer.hasAudio && !layer.hasVideo){
                            layer.label = Number(audioLabel);      
               }            
            }
                  
            if(layer instanceof CompItem){
                layer.label = Number(compLabel); 
            }              
                
            if(layer instanceof FolderItem){
                layer.label = Number(folderLabel); 
            }               
        }

        if (activeItem != null && activeItem instanceof CompItem) {
            var layerNum = app.project.activeItem.selectedLayers.length; 
        }else{
            var layerNum = app.project.selection.length;                     
        }
                     
        for(b = 0; b < layerNum; b++){             
            //alert(layer.typeName); 
            if (activeItem instanceof CompItem) {
                maskColored = false;    

                layer = app.project.activeItem.selectedLayers[b];
                maskColor = colors[0].slice(0, 3);

                
                colorMasks(layer);
                if (maskColored)
                    continue; 
            }else{
                layer = app.project.selection[b];
            }

            if (layer instanceof AVLayer){
                // Layer is an AV layer
                layer.label = Number(videoLabel); 
                 if (!layer.hasVideo && layer.hasAudio)
                    {
                        layer.label = Number(audioLabel); 
                    }

                if (layer.source instanceof FootageItem){
                    if (layer.source.mainSource instanceof PlaceholderSource){
                        layer.label = Number(solidLabel); 
                    }
              
                    if (layer.source.mainSource instanceof SolidSource){
                        layer.label = Number(solidLabel); 
                    }
                }

                if (layer.adjustmentLayer){
                    layer.label = Number(adjustmentLabel); 
                }

                if (layer.nullLayer){
                    layer.label = Number(nullLabel); 
                }

                if (layer.source instanceof CompItem){
                    layer.label = Number(compLabel); 
                }
        
                if (layer.guideLayer){
                    // AV Layer is a guide layer
                }
            }

            // Checking for a text layer
            if (layer.property("sourceText") !== null){// Or "Source Text", "text", or "Text"
                layer.label = Number(textLabel); 
            }

            // Checking for a light layer
            if (layer.property("intensity") !== null){// Or "Intensity", "color", or "Color"
                layer.label = Number(lightLabel); 
            }

            // Checking for a camera layer
            if (layer.property("zoom") !== null){// Or "Zoom" or other values
                layer.label = Number(cameraLabel); 
            }

            // Checking for a text layer (as of After Effects 7.0)
            if (layer instanceof TextLayer){
                layer.label = Number(textLabel);
            }

            // Checking for a light layer (as of After Effects 7.0)
            if (layer instanceof LightLayer){
                layer.label = Number(lightLabel);
            }

            // Checking for a camera layer (as of After Effects 7.0)
            if (layer instanceof CameraLayer){
                layer.label = Number(cameraLabel); 
            }
        
            if (layer instanceof ShapeLayer){
                layer.label = Number(shapeLabel);
            }
        }
		app.endUndoGroup();
    }

    var myAEScriptPal = myAEScript_buildUI(thisObj);

    if (myAEScriptPal != null && myAEScriptPal instanceof Window){
        myAEScriptPal.center();
        myAEScriptPal.show();
    }

    myMainPanel.onResize = function () {

        hasClosed = true; 
        myAEScript_buildUI(thisObj);

    }
}

function mainFunction(){
    var comp = app.project.activeItem;   
    var activeItem = app.project.activeItem;

    app.beginUndoGroup("labelME");

    if(label == 0){
        maskColor = [0.4, 0.4, 0.4]}else{
        maskColor = colors[label - 1].slice(0, 3)
    }

    if (app.project.selection.length == 1) {
        app.project.selection[0].label = label;
    }

    //Color Keyframes
    if (labelKeys == 1 && activeItem != null && activeItem instanceof CompItem){

    //color prop groups first
    if (activeItem != null && activeItem instanceof CompItem) {
        var layerNum = app.project.activeItem.selectedLayers.length;

        for (b = 0; b < layerNum; b++) {
            var layer = app.project.activeItem.selectedLayers[b];
            shapeKeysColor(layer);
            colorMaskKeys(layer);         
        }
    }

    props = app.project.activeItem.selectedProperties;

    //non prop group keys
     if(props.length > 0){
            
         for (p = 0; p < props.length; p++){
             pname = props[p].matchName;

             //check name or if property group, already colored keys
             if (pname == "ADBE Mask Atom" || pname == "ADBE Vector Group" || pname == "ADBE Vector Shape - Group" || props[p].numProperties > 0)
                 continue;

             keySelection = props[p].selectedKeys; 

             if(keySelection.length > 0){
                        for (n = 0; n < keySelection.length; n++) {
                            t = props[p].selectedKeys[n];
                            props[p].setLabelAtKey(t,label);        
                        }
                } 
          }
          //end if has colored keys
           return;
       }
    }

    if (activeItem != null && activeItem instanceof CompItem){
        var layerNum = app.project.activeItem.selectedLayers.length; 
        
        for(b = 0; b <= layerNum; b++){             
            var layer = app.project.activeItem.selectedLayers[b];
            layer.label = label;

       }
    }

	if(activeItem == null){
		var mySelectedItems = app.project.selection; 

		if(mySelectedItems.length > 0){
			for (var i = 0; i <= mySelectedItems.length; i++){
				mySelectedItems[i].label = label; 
			}   
        }
    }
	 
    myMainPanel.parent.show();
    myMainPanel.update();

    app.endUndoGroup();
}

function colorMaskKeys(layer) {
    var masks = layer('Masks');
    if (masks != null && masks.numProperties > 0) {
        for (var m = 1; m <= masks.numProperties; m++) {
            var myMask = masks.property(m);
            if (myMask.selected == true) {
                //check if keys selected
                hasSetKeysM = false;
                for (mpn = 1; mpn <= myMask.numProperties; mpn++) {
                    thisMpn = myMask.property(mpn);
                    theseMpKeys = (thisMpn.selectedKeys);
                    for (mp = 0; mp < theseMpKeys.length; mp++) {
                        thisMpn.setLabelAtKey(theseMpKeys[mp], label);
                        hasSetKeysM = true;
                    }                   
                }

                //No keys selected, color mask path
                if (!hasSetKeysM)
                    colorMasks(layer);
            }
        }
    }
}

function shapeKeysColor(layer) {

    myLayer = layer;
    if (myLayer instanceof ShapeLayer) {
        var myContents = myLayer.property("Contents");
        propertySearch(myContents);
    } 
    
    function propertySearch(a) {
            for (var j = 1; j <= a.numProperties; j++) {
               
                for (var k = 1; k <= a.property(j).numProperties; k++) {
                    theseShapeKeys = a.property(j).property(k).selectedKeys;
                    if (theseShapeKeys != null) {
                        if (theseShapeKeys.length > 0) {
                            for (sk = 0; sk < theseShapeKeys.length; sk++) {
                                a.property(j).property(k).setLabelAtKey(theseShapeKeys[sk], label);
                            }
                        }
                    }
                    propertySearch(a.property(j).property(k));
                }
            }
        }   
}


function colorMasks(layer){
    var masks = layer('Masks');
		 
    if (masks!= null && masks.numProperties > 0) {							  
        for (var m = 1; m <= masks.numProperties; m++) {	
            var myMask = masks.property(m);
						
            if (myMask.selected == true) {
                maskColored = true; 
                myMask.color = maskColor;
            }
        }
    }
}
myAEScript(this);