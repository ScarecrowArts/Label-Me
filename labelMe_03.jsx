//  Copyright (c) 2020 Scarecrow Arts
//  http://www.scarecrowarts.com
//  Version 0.03

var scriptPath = File($.fileName).parent.fsName;
var file = File;
var prefFile = File;
var textArray = [];

var myPanel;
var label; 
var img = [];
var button = [];

function myScript(thisObj){
    function myScript_buildUI(thisObj){
        myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "labelME", [100, 100, 12, 560], {resizeable:false});
        mySaveFilePath = "~/Documents/";

        var file = File(mySaveFilePath + "Path" + ".txt");
       
        if (file.exists){
            file.open("r");
            prefFilePath = file.readln();
            file.close(); 
            prefFile = File([prefFilePath]); 
        }else{      
            //prefFile = file.openDlg("Open a file", "Acceptable Files:*.txt,*.json,*xml");
            username = prompt("Username","scarecrow");
            version = prompt("AE Version",17); 
            prefFilePath = "/Users/" + username + "/AppData/Roaming/Adobe/After Effects/"+ version + ".0/Adobe After Effects 17.0 Prefs-indep-general.txt";
            //myFilePath = prefFile.fsName;
            prefFile = File([prefFilePath]); 
            logInfo(prefFilePath); 
            dumpLog();
            
            function logInfo(Txt){
                logData += String(Txt);
            }
    
            function dumpLog(){
                var file = new File(mySaveFilePath + "Path" + ".txt");
        
                //The Magic
                file.open("e", "TEXT", "????"); 
                file.seek(0,2);
                $.os.search(/windows/i)  != -1 ? file.lineFeed = 'windows'  : file.lineFeed = 'macintosh';  
                file.write(logData); 
                file.close();
                logData = "";
            }
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
/*
        img[0] = scriptPath + "/labelME/none.png"
        img[1] = scriptPath + "/labelME/red.png"
        img[2] = scriptPath + "/labelME/yellow.png"
        img[3] = scriptPath + "/labelME/aqua.png"
        img[4] = scriptPath + "/labelME/pink.png"
        img[5] = scriptPath + "/labelME/lavender.png"
        img[6] = scriptPath + "/labelME/peach.png"
        img[7] = scriptPath + "/labelME/seafoam.png"
        img[8] = scriptPath + "/labelME/blue.png"
        img[9] = scriptPath + "/labelME/green.png"
        img[10] = scriptPath + "/labelME/purple.png"
        img[11] = scriptPath + "/labelME/orange.png"
        img[12] = scriptPath + "/labelME/brown.png"
        img[13] = scriptPath + "/labelME/fuchsia.png"
        img[14] = scriptPath + "/labelME/cyan.png"
        img[15] = scriptPath + "/labelME/sandstone.png"
        img[16] = scriptPath + "/labelME/darkgreen.png"
*/
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
        
        function customDraw(){ 
            with( this ) {
                graphics.drawOSControl();
                graphics.rectPath(0,0,size[0],size[1]);
                graphics.fillPath(fillBrush);

                if( text ) graphics.drawString(text,textPen,(size[0]-graphics.measureString (text,graphics.font,size[0])[0])/2,3,graphics.font);
            }
        }
    
      
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
        
        for (var i = 1; i <= 16; i++){      
            // var sect = "Label Preference Color Section 5";     
            // var key = "Label Color ID 2 # " + i.toString();      
            //var prefType = PREFType.PREF_Type_MACHINE_INDEPENDENT;    
            //var thePref = app.preferences.getPrefAsString(sect,key, prefType); 

            for(j = 0; j < textArray.length; j++){
                str = textArray[j].substr(1,20+i.toString().length);
                length = str.length; 

                if(str == '"Label Color ID 2 # ' + i){
                    if(i!=1){    
                        myLine = textArray[j];
                        myCode = myLine.split('FF')[1];
                        myDecodedCode = prefCodeToHexCode (myCode);
                        rgb = convertHex(myDecodedCode);         
                        colours[i-1] =  rgb;
                    }else{
                        if(hasChecked1 == 0){
                            myLine = textArray[j];
                            myCode = myLine.split('FF')[1];
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
        for(i = 0; i < 17; i++){
            //var labelColor1 = app.preferences.getPrefAsLong("Label Preference Color Section 5", "Label Color ID 2 # " + (i +1), PREFType.PREF_Type_MACHINE_INDEPENDENT);
            button[i] = myPanel.grp.add("iconbutton", undefined, undefined, {style:'toolbutton'}, "button0" + i)
            //alert(colours[1]); 
            
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
            
            button[i].size = [24,24];
            
            if(i!=0 ){
                button[i].fillBrush = button[i].graphics.newBrush(button[i].graphics.BrushType.SOLID_COLOR, colours[i-1]);
            }else{
                button[i].fillBrush = button[i].graphics.newBrush(button[i].graphics.BrushType.SOLID_COLOR, [0.4, 0.4, 0.4, 1]);
            }

            button[i].onDraw = customDraw;
        }        
        
        //TOOL TIPS
        button[0].helpTip = "None";
        button[1].helpTip = "Red";
        button[2].helpTip = "Yellow";
        button[3].helpTip = "Aqua";
        button[4].helpTip = "Pink";
        button[5].helpTip = "Lavender";
        button[6].helpTip = "Peach";
        button[7].helpTip = "Sea Foam";
        button[8].helpTip = "Blue";
        button[9].helpTip = "Green";
        button[10].helpTip = "Purple";
        button[11].helpTip = "Orange";
        button[12].helpTip = "Brown";
        button[13].helpTip = "Fuchsia";
        button[14].helpTip = "Cyan";
        button[15].helpTip = "Sandstone";
        button[16].helpTip = "Dark Green";

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

    var myScriptPal = myScript_buildUI(thisObj);

    if (myScriptPal != null && myScriptPal instanceof Window){
        myScriptPal.center();
        myScriptPal.show();
    }
}

function runMe(){
    var layerNum = app.project.activeItem.selectedLayers.length; 
    var comp=app.project.activeItem;   

    app.beginUndoGroup("labelME");

    for(b = 0; b < layerNum; b++){             
        layer = app.project.activeItem.selectedLayers[b];
        layer.label = label; 
    }

	myPanel.parent.show();
    myPanel.update();
	
    app.endUndoGroup();
}
myScript(this);

