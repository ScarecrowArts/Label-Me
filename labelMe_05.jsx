//  Copyright (c) 2020 Scarecrow Arts
//  http://www.scarecrowarts.com
//  Version 0.04

var scriptPath = File($.fileName).parent.fsName;
var file = File;
var prefFile = File;
var textArray = [];
var win = 0; 
var myPanel;
var label; 
var img = [];
var button = [];

if ($.os.indexOf("Windows") != -1 ){
    win = 1;       
}



function myScript(thisObj){
    function myScript_buildUI(thisObj){
        myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "labelME", [100, 100, 12, 120], {resizeable:false});
        mySaveFilePath = "~/Documents/";
    
        var file = File(mySaveFilePath + "Path" + ".txt");
        

            userData = Folder.userData;  
            version = app.version.substring(0,4); 
            if(win == 1){
            prefFilePath = userData .toString()+ "/Adobe/After Effects/"+ version + "/Adobe After Effects " +  version + " Prefs-indep-general.txt";
}else{
                macPath1 = userData .toString();
                macPath = macPath1.substring(0,macPath1.lastIndexOf("/")+1);

                prefFilePath = macPath + "Preferences/Adobe/After Effects/"+ version + "/Adobe After Effects " +  version + " Prefs.txt";

    }
            prefFile = File([prefFilePath]); 
 
        
        
    /*   
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
            prefFile = File([prefFilePath]); 
            logInfo(prefFilePath); 
            dumpLog();
            
            function logInfo(Txt){
                logData += String(Txt);
            }
    
            function dumpLog(){
                var file = new File(mySaveFilePath + "Path" + ".txt");
        
                //MAGIC
                file.open("e", "TEXT", "????"); 
                file.seek(0,2);
                $.os.search(/windows/i)  != -1 ? file.lineFeed = 'windows'  : file.lineFeed = 'macintosh';  
                file.write(logData); 
                file.close();
                logData = "";
            }
        }
       */
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
        for(i = 0; i < 17; i++){
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
            
            button[i].size = [24,24];
            
            if(i!=0 ){
                button[i].fillBrush = button[i].graphics.newBrush(button[i].graphics.BrushType.SOLID_COLOR, colours[i-1]);
            }else{
                button[i].fillBrush = button[i].graphics.newBrush(button[i].graphics.BrushType.SOLID_COLOR, [0.4, 0.4, 0.4, 1]);
            }

            button[i].onDraw = customDraw;
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
        
        //FIX NONE TOOLTIP
        button[0].helpTip = '"None"';

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

    var comp=app.project.activeItem;   
    var activeItem = app.project.activeItem;


    app.beginUndoGroup("labelME");
if (activeItem != null && activeItem instanceof CompItem) {
    
    var layerNum = app.project.activeItem.selectedLayers.length; 
    for(b = 0; b < layerNum; b++){             
        layer = app.project.activeItem.selectedLayers[b];
        layer.label = label; 
        
    }
}else{
    
            var mySelectedItems = [];
            for (var i = 1; i <= app.project.numItems; i++){
            if(app.project.items[i].selected)
                app.project.items[i].label = label; 
            }
        
}
        
	myPanel.parent.show();
    myPanel.update();
	
    app.endUndoGroup();
}
myScript(this);

