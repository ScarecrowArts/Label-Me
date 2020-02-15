//  Copyright (c) 2020 Scarecrow Arts
//  http://www.scarecrowarts.com
//  Version 0.05

var scriptPath = File($.fileName).parent.fsName;
var file = File;
var prefFile = File;
var textArray = [];
var win = 0; 
var myPanel;
var label; 
var button = [];
var hasClosed = false;
if ($.os.indexOf("Windows") != -1 ){
    win = 1;       
}

function myScript(thisObj){
    function myScript_buildUI(thisObj) {

        if (hasClosed) {
            var remover = myPanel.children.length;
            for (tt = 0; tt < remover; tt++) {
                myPanel.remove(0);

            }
        }

        myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "labelME", undefined, { resizeable: true});
        mySaveFilePath = "~/Documents/";
        app.preferences.saveToDisk(); 
        var file = File(mySaveFilePath + "Path" + ".txt");

        userData = Folder.userData;  
        version = app.version.substring(0,4); 
        
        if(win == 1){
            prefFilePath = userData .toString()+ "/Adobe/After Effects/"+ version + "/Adobe After Effects " +  version + " Prefs-indep-general.txt";
        }else{
            macPath1 = userData .toString();
            macPath = macPath1.substring(0,macPath1.lastIndexOf("/")+1);

            prefFilePath = macPath + "Preferences/Adobe/After Effects/"+ version + "/Adobe After Effects " +  version + " Prefs-indep-general.txt";
        }
        
        prefFile = File([prefFilePath]); 
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
        myPanel.grp = myPanel.add(res);
        myPanel.margins = 0;
        myPanel.grp.margins = 0;
        myPanel.grp.margins.top = 0;
        myPanel.grp.margins.bottom = 0;
        myPanel.grp.margins.left = 0;
        myPanel.grp.margins.right = 0;
        myPanel.grp.spacing = 0;
        myPanel.grp.spacing.top = 0;
        myPanel.grp.spacing.bottom = 0;
        myPanel.grp.spacing.left = 0;
        myPanel.grp.spacing.right = 0;
        myPanel.grp.padding = 0;
        myPanel.grp.padding.top = 0;
        myPanel.grp.padding.bottom = 0;
        myPanel.grp.padding.left = 0;
        myPanel.grp.padding.right = 0;
        
        //DRAW GUI ICONS
        function customDraw(){ 
            with( this ) {
                graphics.drawOSControl();
                graphics.rectPath(0,0,size[0],size[1]);
                graphics.fillPath(fillBrush);

                if( text ) graphics.drawString(text,textPen,(size[0]-graphics.measureString (text,graphics.font,size[0])[0])/2,3,graphics.font);
            }
        }
    
        //CONVERT SAVE FILE TO HEX CODE
        function prefCodeToHexCode(str){
            return str.replace(/"([^"]+)"/g, function(u, code){
                var result = "";
                
                for (var i=0; i<code.length; i++){result += code.charCodeAt(i).toString(16);};
                    return result;
                });
            };
        
        function ascii_to_hexa(str){
            var arr1 = [];
            
            for (var n = 0, l = str.length; n < l; n ++) {
                var hex = Number(str.charCodeAt(n)).toString(16);
                arr1.push(hex);
            }
            
            return arr1.join('');
        }     

        function convertHex(hex){
            var result = []; 
            hex = hex.replace('#','');
            r = parseInt(hex.substring(0,2), 16);
            g = parseInt(hex.substring(2,4), 16);
            b = parseInt(hex.substring(4,6), 16);

            result = [r/255,g/255,b/255,1];
            return result;
        }
                
        function asciiToRGB(str) {      
            var arr = [];      
            
            for (var i = 1, l = str.length; i < l; i ++) {     
                var hex = Number(str.charCodeAt(i)).toString(16);      
                arr.push(parseInt(hex, 16)/65533);     
            }   
        
             arr.push(1);
             return arr;  
        } 

        var colours = [];
        hasChecked1 = 0;
        
        //DECODE COLOR
        for (var i = 1; i <= 16; i++){      
            for(j = 0; j < textArray.length; j++){
                str = textArray[j].substr(1,20+i.toString().length);
                length = str.length; 

                if(str == '"Label Color ID 2 # ' + i){
                    if(i!=1){             
                        myLine = textArray[j];
                        
                        myCode0 = myLine.split('" = ')[1];
                        myCode = myCode0.substring(2,myCode0.length); 
                        
                        myDecodedCode = prefCodeToHexCode (myCode);
                        rgb = convertHex(myDecodedCode);   
                        
                        colours[i-1] =  rgb;
                    }else{
                        if(hasChecked1 == 0){
                            myLine = textArray[j];

                            myCode0 = myLine.split('" = ')[1];
                            myCode = myCode0.substring(2,myCode0.length); 

                            myDecodedCode = prefCodeToHexCode (myCode);
                            rgb = convertHex(myDecodedCode);
                            
                            colours[0] =  rgb;
                            hasChecked1 = 1; 
                        }
                    }
                }
            }
        }            

        //INITIALIZE BUTTONS
        for(i = 0; i <= 17; i++){
            button[i] = myPanel.grp.add("iconbutton", undefined, undefined, {style:'toolbutton'}, "button0" + i)
 
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
            
            button[i].size = [24+(myPanel.size[0]/1),(myPanel.size[1]/18)];
            
            if(i!=0 && i!= 17){
                button[i].fillBrush = button[i].graphics.newBrush(button[i].graphics.BrushType.SOLID_COLOR, colours[i-1]);
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
                if( text ) graphics.drawString(text,textPen,(myPanel.size[0]/2)-13,-7,fontFont);
            }
        }
        
        hasChecked2 = 0;
        
        //Different versions of AE store this differently
        is5 = 0;
        is7 = 0; 
        
        for(j = 0; j < textArray.length; j++){
            if(textArray[j] == '["Label Preference Text Section 5"]')
                is5 = 1;
            if(textArray[j] == '["Label Preference Text Section 7"]')
                is7 = 1; 
            }
        
        //TOOL TIPS
        for (var i = 1; i <= 16; i++){      
            for(j = 0; j < textArray.length; j++){
                str = textArray[j].substr(1,19+i.toString().length);
                length = str.length; 
                run = 0; 
                runRed = 0; 
                
                if(str == '"Label Text ID 2 # ' + i){
                    if(i!=1){
                        if(run == 0){
                            myLine = textArray[j];
                            myLine1 = myLine.split('" = ')[1];
                            button[i].helpTip = myLine1;
                        }
                        
                        run = 1; 
                    }else{
                        if(hasChecked2 == 0){
                            myLine = textArray[j];
                                
                            if(textArray[j-i] == '["Label Preference Text Section 7"]' || is7 == 0){
                                myLine1 = myLine.split('" = ')[1];
                                button[1].helpTip = myLine1; 
                                hasChecked2 = 1; 
                            }       
                        }           
                    }
                }
            }
        }  

        for(j = 0; j < textArray.length; j++){
            if(textArray[j].search('"Adjustment Label Index 2" =') != -1){
                myLine = textArray[j];
                myLine1 = myLine.split('" = ')[1];
                adjustmentLabel = myLine1.substr(1, myLine1.length-2); 
            }
     
            if(textArray[j].search('"Audio Label Index 2" =') != -1){
                myLine = textArray[j];
                myLine1 = myLine.split('" = ')[1];
                audioLabel = myLine1.substr(1, myLine1.length-2); 
            }
                 
            if(textArray[j].search('"Camera Label Index 2" =') != -1){
                myLine = textArray[j];
                myLine1 = myLine.split('" = ')[1];
                cameraLabel = myLine1.substr(1, myLine1.length-2); 
            }
 
            if(textArray[j].search('"Comp Label Index 2" =') != -1){
                myLine = textArray[j];
                myLine1 = myLine.split('" = ')[1];
                compLabel = myLine1.substr(1, myLine1.length-2); 
            }
  
            if(textArray[j].search('"Folder Label Index 2" =') != -1){
                myLine = textArray[j];
                myLine1 = myLine.split('" = ')[1];
                folderLabel = myLine1.substr(1, myLine1.length-2); 
            }
                 
            if(textArray[j].search('"Light Label Index 2" =') != -1){
                myLine = textArray[j];
                myLine1 = myLine.split('" = ')[1];
                lightLabel = myLine1.substr(1, myLine1.length-2); 
            }
                          
            if(textArray[j].search('"Null Label Index" =') != -1){
                myLine = textArray[j];
                myLine1 = myLine.split('" = ')[1];
                nullLabel = myLine1.substr(1, myLine1.length-2); 
            }
                 
            if(textArray[j].search('"Shape Label Index 2" =') != -1){
                myLine = textArray[j];
                myLine1 = myLine.split('" = ')[1];
                shapeLabel = myLine1.substr(1, myLine1.length-2);  
            }
                 
            if(textArray[j].search('"Solid Label Index 2" =') != -1){
                myLine = textArray[j];
                myLine1 = myLine.split('" = ')[1];
                solidLabel = myLine1.substr(1, myLine1.length-2); 
            }

            if(textArray[j].search('"Still Label Index 2" =') != -1){
                myLine = textArray[j];
                myLine1 = myLine.split('" = ')[1];
                stillLabel = myLine1.substr(1, myLine1.length-2); 
            }

            if(textArray[j].search('"Text Label Index"') != -1){
                myLine = textArray[j];
                myLine1 = myLine.split('" = ')[1];
                textLabel = myLine1.substr(1, myLine1.length-2);                  
            }
                 
            if(textArray[j].search('"Video Label Index 2" =') != -1){
                myLine = textArray[j];
                myLine1 = myLine.split('" = ')[1];
                videoLabel = myLine1.substr(1, myLine1.length-2); 
            }
        }    
      
        //FIX NONE/DEFAULT TOOLTIP
        button[0].helpTip = '"None"';
        button[17].helpTip = '"Return to Default"';

        //DO THE THING
        button[0].onClick =  onTabClicked00;
        button[1].onClick =  onTabClicked01;
        button[2].onClick =  onTabClicked02;
        button[3].onClick =  onTabClicked03;       
        button[4].onClick =  onTabClicked04;      
        button[5].onClick =  onTabClicked05;
        button[6].onClick =  onTabClicked06;
        button[7].onClick =  onTabClicked07;
        button[8].onClick =  onTabClicked08;       
        button[9].onClick =  onTabClicked09;      
        button[10].onClick =  onTabClicked10;
        button[11].onClick =  onTabClicked11;
        button[12].onClick =  onTabClicked12;
        button[13].onClick =  onTabClicked13;       
        button[14].onClick =  onTabClicked14;
        button[15].onClick =  onTabClicked15;
        button[16].onClick =  onTabClicked16;
        button[17].onClick =  onTabClicked17;
        myPanel.layout.layout(true);
        return myPanel;
    }

    //Yes, I made a function for every color. Please dont @ me
    function onTabClicked00(){
        label = 0;
        runMe(); 
    }

    function onTabClicked01(){
        label = 1; 
        runMe(); 
    }
   
    function onTabClicked02(){
        label = 2; 
        runMe(); 
    }

    function onTabClicked03(){
        label = 3; 
        runMe(); 
    }

    function onTabClicked04(){
        label = 4; 
        runMe(); 
    }

    function onTabClicked05(){
        label = 5; 
        runMe(); 
    }

    function onTabClicked06(){
        label = 6; 
        runMe(); 
    }

    function onTabClicked07(){
        label = 7; 
        runMe(); 
    }

    function onTabClicked08(){
        label = 8; 
        runMe(); 
    }

    function onTabClicked09(){
        label = 9; 
        runMe(); 
    }

    function onTabClicked10(){
        label = 10; 
        runMe(); 
    }

    function onTabClicked11(){
        label = 11; 
        runMe(); 
    }

    function onTabClicked12(){
        label = 12; 
        runMe(); 
    }

    function onTabClicked13(){
        label = 13; 
        runMe(); 
    }

    function onTabClicked14(){
        label = 14; 
        runMe(); 
    }

    function onTabClicked15(){
        label = 15; 
        runMe(); 
    }

    function onTabClicked16(){
        label = 16; 
        runMe(); 
    }

    function onTabClicked17(){
        var comp=app.project.activeItem;   
        var activeItem = app.project.activeItem;
          
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
            if(activeItem instanceof CompItem){
                layer = app.project.activeItem.selectedLayers[b];
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
    }

    var myScriptPal = myScript_buildUI(thisObj);

    if (myScriptPal != null && myScriptPal instanceof Window){
        myScriptPal.center();
        myScriptPal.show();
    }

    myPanel.onResize = function () {

        hasClosed = true; 
        myScript_buildUI(thisObj);


    }
}

function runMe(){
    var comp=app.project.activeItem;   
    var activeItem = app.project.activeItem;

    app.beginUndoGroup("labelME");
    
    if (activeItem != null && activeItem instanceof CompItem){
        var layerNum = app.project.activeItem.selectedLayers.length; 
        
        for(b = 0; b < layerNum; b++){             
            layer = app.project.activeItem.selectedLayers[b];
            layer.label = label;  
        }
    }else{
        var mySelectedItems = app.project.selection; 
        
        for (var i = 0; i <= mySelectedItems.length; i++){
            mySelectedItems[i].label = label; 
        }   
    }

    if(app.project.selection.length == 1){
        app.project.selection[0].label = label; 
    }

    myPanel.parent.show();
    myPanel.update();



    app.endUndoGroup();
}

myScript(this);

